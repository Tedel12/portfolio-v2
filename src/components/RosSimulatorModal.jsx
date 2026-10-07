import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  X, 
  RotateCcw, 
  Play, 
  Pause, 
  Bot, 
  Terminal, 
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { useTheme } from '../context/useTheme'
import { playRobotSound } from '../utils/robotAudio'

const ARENA_WIDTH = 520;
const ARENA_HEIGHT = 380;
const ROBOT_RADIUS = 15;
const LIDAR_BEAMS = 24;
const LIDAR_MAX_RANGE = 140;

const DEFAULT_OBSTACLES = [
  { x: 130, y: 90, width: 45, height: 45 },
  { x: 290, y: 75, width: 60, height: 35 },
  { x: 390, y: 220, width: 40, height: 60 },
  { x: 150, y: 245, width: 70, height: 35 },
  { x: 270, y: 260, width: 40, height: 40 },
];

const RosSimulatorModal = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);

  // Pure physical simulation state stored strictly in ref to prevent React render rollbacks
  const robotStateRef = useRef({
    x: 70,
    y: 190,
    theta: 0, // radians
    vx: 0,    // linear velocity
    wz: 0     // angular velocity
  });

  const [isAutonomous, setIsAutonomous] = useState(false);
  const isAutonomousRef = useRef(false);
  isAutonomousRef.current = isAutonomous;

  // Steering persistence (hysteresis) for smooth Nav2-style obstacle avoidance
  const navHysteresisRef = useRef({ dir: 1, timer: 0 });

  const [telemetry, setTelemetry] = useState({
    linearX: 0.0,
    angularZ: 0.0,
    minLaserDist: 2.5,
    odomX: 0.70,
    odomY: 1.90,
    activeTopic: "/cmd_vel"
  });

  // Direct velocity modifier that never mutates/resets position
  const setVelocity = useCallback((vx, wz) => {
    if (vx !== undefined) robotStateRef.current.vx = vx;
    if (wz !== undefined) robotStateRef.current.wz = wz;
  }, []);

  // Reset arena
  const resetRobot = useCallback(() => {
    robotStateRef.current = { x: 70, y: 190, theta: 0, vx: 0, wz: 0 };
    navHysteresisRef.current = { dir: 1, timer: 0 };
    setTelemetry({
      linearX: 0.0,
      angularZ: 0.0,
      minLaserDist: 2.5,
      odomX: 0.70,
      odomY: 1.90,
      activeTopic: "/cmd_vel"
    });
    playRobotSound("pop", false);
  }, []);

  // Raycast collision detection with arena bounds and obstacles
  const computeLidarScan = (rx, ry, rtheta) => {
    const ranges = [];
    let minD = LIDAR_MAX_RANGE;

    for (let i = 0; i < LIDAR_BEAMS; i++) {
      // 24 beams from -90° to +90° relative to robot's heading
      const angle = rtheta - Math.PI / 2 + (i / (LIDAR_BEAMS - 1)) * Math.PI;
      let dist = LIDAR_MAX_RANGE;

      // Start rays from outside robot body (ROBOT_RADIUS + 2)
      for (let step = ROBOT_RADIUS + 3; step <= LIDAR_MAX_RANGE; step += 3) {
        const px = rx + Math.cos(angle) * step;
        const py = ry + Math.sin(angle) * step;

        // Arena boundary collision
        if (px <= 8 || px >= ARENA_WIDTH - 8 || py <= 8 || py >= ARENA_HEIGHT - 8) {
          dist = step;
          break;
        }

        // Obstacles collision
        let hit = false;
        for (const obs of DEFAULT_OBSTACLES) {
          if (
            px >= obs.x && 
            px <= obs.x + obs.width && 
            py >= obs.y && 
            py <= obs.y + obs.height
          ) {
            hit = true;
            break;
          }
        }
        if (hit) {
          dist = step;
          break;
        }
      }

      ranges.push({ angle, dist });
      if (dist < minD) minD = dist;
    }

    return { ranges, minD };
  };

  // Keyboard navigation listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key === 'arrowup' || key === 'z' || key === 'w') {
        robotStateRef.current.vx = 2.4;
      } else if (key === 'arrowdown' || key === 's') {
        robotStateRef.current.vx = -1.6;
      } else if (key === 'arrowleft' || key === 'q' || key === 'a') {
        robotStateRef.current.wz = -2.2;
      } else if (key === 'arrowright' || key === 'd') {
        robotStateRef.current.wz = 2.2;
      } else if (key === ' ') {
        robotStateRef.current.vx = 0;
        robotStateRef.current.wz = 0;
      } else if (key === 'escape') {
        onClose();
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'z', 'w', 's'].includes(key)) {
        robotStateRef.current.vx = 0;
      }
      if (['arrowleft', 'arrowright', 'q', 'a', 'd'].includes(key)) {
        robotStateRef.current.wz = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  // Main simulation loop (60 FPS)
  useEffect(() => {
    if (!isOpen) return;
    let animId;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let { x, y, theta, vx, wz } = robotStateRef.current;

      // LiDAR reading at current pose
      const { ranges, minD } = computeLidarScan(x, y, theta);

      // Autonomous navigation (Nav2 Reactive Algorithm)
      if (isAutonomousRef.current) {
        // Front cone beams (indices 7 to 16, centered around 0°)
        const frontBeams = ranges.slice(7, 17);
        const minFrontDist = Math.min(...frontBeams.map(b => b.dist));

        // Left vs Right sector clearance
        const leftDist = ranges.slice(0, 8).reduce((acc, b) => acc + b.dist, 0) / 8;
        const rightDist = ranges.slice(16, 24).reduce((acc, b) => acc + b.dist, 0) / 8;

        if (minFrontDist < 46) {
          // Obstacle detected ahead: steer smoothly without reversing
          if (navHysteresisRef.current.timer <= 0) {
            // Pick clear side and lock decision for at least 18 frames
            const turnLeft = leftDist >= rightDist;
            navHysteresisRef.current = {
              dir: turnLeft ? -1 : 1,
              timer: 20
            };
          } else {
            navHysteresisRef.current.timer -= 1;
          }

          // Advance smoothly with reduced velocity while turning
          vx = minFrontDist < 26 ? 0.3 : 1.2;
          wz = navHysteresisRef.current.dir * 2.2;
        } else {
          // Path ahead is clear: accelerate forward confidently
          vx = 2.2;
          // Smoothly decay any turning
          wz = (Math.random() - 0.5) * 0.15;
          navHysteresisRef.current.timer = 0;
        }

        robotStateRef.current.vx = vx;
        robotStateRef.current.wz = wz;
      }

      // Kinematics integration (Euler)
      theta += wz * 0.024;
      const nextX = x + Math.cos(theta) * vx * 1.35;
      const nextY = y + Math.sin(theta) * vx * 1.35;

      // Safe bounds collision check
      let canMove = true;
      if (
        nextX < ROBOT_RADIUS + 8 || 
        nextX > ARENA_WIDTH - ROBOT_RADIUS - 8 ||
        nextY < ROBOT_RADIUS + 8 || 
        nextY > ARENA_HEIGHT - ROBOT_RADIUS - 8
      ) {
        canMove = false;
      }

      // Safe obstacles collision check
      if (canMove) {
        for (const obs of DEFAULT_OBSTACLES) {
          if (
            nextX + ROBOT_RADIUS > obs.x &&
            nextX - ROBOT_RADIUS < obs.x + obs.width &&
            nextY + ROBOT_RADIUS > obs.y &&
            nextY - ROBOT_RADIUS < obs.y + obs.height
          ) {
            canMove = false;
            break;
          }
        }
      }

      if (canMove) {
        x = nextX;
        y = nextY;
      } else if (isAutonomousRef.current) {
        // In collision edge: turn quickly towards free space
        theta += 0.12;
      }

      // Commit updated state back into ref
      robotStateRef.current.x = x;
      robotStateRef.current.y = y;
      robotStateRef.current.theta = theta;

      // CLEAR CANVAS
      ctx.fillStyle = isDarkMode ? "#03150d" : "#f1f7f4";
      ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

      // DRAW GRID
      ctx.strokeStyle = isDarkMode ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.15)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < ARENA_WIDTH; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, ARENA_HEIGHT);
        ctx.stroke();
      }
      for (let gy = 0; gy < ARENA_HEIGHT; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(ARENA_WIDTH, gy);
        ctx.stroke();
      }

      // DRAW OBSTACLES
      for (const obs of DEFAULT_OBSTACLES) {
        ctx.fillStyle = isDarkMode ? "#063823" : "#cbd5e1";
        ctx.strokeStyle = isDarkMode ? "#10b981" : "#059669";
        ctx.lineWidth = 1.5;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      }

      // DRAW LIDAR RAYS
      for (const beam of ranges) {
        const bx = x + Math.cos(beam.angle) * beam.dist;
        const by = y + Math.sin(beam.angle) * beam.dist;

        ctx.strokeStyle = beam.dist < 40 
          ? "rgba(239, 68, 68, 0.65)" 
          : isDarkMode 
            ? "rgba(52, 211, 153, 0.35)" 
            : "rgba(5, 150, 105, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(bx, by);
        ctx.stroke();

        ctx.fillStyle = beam.dist < 40 ? "#ef4444" : "#34d399";
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // DRAW ROBOT
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(theta);

      // Chassis circle
      ctx.fillStyle = isDarkMode ? "#042013" : "#ffffff";
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, ROBOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Heading turret
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(ROBOT_RADIUS * 0.45, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Left & Right wheels
      ctx.fillStyle = "#021008";
      ctx.fillRect(-7, -ROBOT_RADIUS - 3, 14, 5);
      ctx.fillRect(-7, ROBOT_RADIUS - 2, 14, 5);

      // LiDAR Dome
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Throttled telemetry display update
      if (Math.random() < 0.2) {
        setTelemetry({
          linearX: parseFloat(vx.toFixed(2)),
          angularZ: parseFloat(wz.toFixed(2)),
          minLaserDist: parseFloat((minD / 30).toFixed(2)),
          odomX: parseFloat((x / 100).toFixed(2)),
          odomY: parseFloat((y / 100).toFixed(2)),
          activeTopic: isAutonomousRef.current ? "/nav2/cmd_vel" : "/teleop/cmd_vel"
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isDarkMode]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border p-4 sm:p-5 md:p-7 shadow-2xl z-10 transition-colors ${
            isDarkMode 
              ? "bg-[#03180f] border-emerald-900/60 text-slate-100 shadow-emerald-950/90" 
              : "bg-white border-slate-200 text-slate-900 shadow-2xl"
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-emerald-950/60">
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 mr-2">
              <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Bot size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="min-w-0">
                <h3 className={`text-sm sm:text-lg md:text-xl font-heading font-bold tracking-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Simulateur ROS2 & Physical AI Sandbox
                </h3>
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 flex items-center space-x-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="truncate">Nœud Actif : `/turtlebot_core_node` (ROS2 Humble)</span>
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-emerald-900/60 text-slate-400 hover:text-white hover:bg-emerald-900/30 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Grid: Canvas & Telemetry */}
          <div className="grid lg:grid-cols-12 gap-5 items-start">
            {/* Left: 2D Simulation Canvas */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500/50 shadow-inner w-full flex justify-center bg-black/40">
                <canvas
                  ref={canvasRef}
                  width={ARENA_WIDTH}
                  height={ARENA_HEIGHT}
                  className="max-w-full h-auto cursor-crosshair"
                />

                {/* HUD Overlay */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  LiDAR 360° • Raycasts: {LIDAR_BEAMS}
                </div>

                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur border border-emerald-500/30 text-[10px] font-mono text-slate-200">
                  {isAutonomous ? "🤖 Navigation Nav2 Active" : "🎮 Téléopération Manuelle"}
                </div>
              </div>

              {/* D-Pad & Control Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-between w-full gap-3 pt-3 border-t border-emerald-950/60">
                {/* On-screen Directional Buttons */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onMouseDown={() => setVelocity(undefined, -2.2)}
                    onMouseUp={() => setVelocity(undefined, 0)}
                    onTouchStart={() => setVelocity(undefined, -2.2)}
                    onTouchEnd={() => setVelocity(undefined, 0)}
                    className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-800 transition cursor-pointer"
                    title="Tourner à gauche (Q / ←)"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div className="flex flex-col space-y-1">
                    <button
                      onMouseDown={() => setVelocity(2.4, undefined)}
                      onMouseUp={() => setVelocity(0, undefined)}
                      onTouchStart={() => setVelocity(2.4, undefined)}
                      onTouchEnd={() => setVelocity(0, undefined)}
                      className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-800 transition cursor-pointer"
                      title="Avancer (Z / ↑)"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onMouseDown={() => setVelocity(-1.6, undefined)}
                      onMouseUp={() => setVelocity(0, undefined)}
                      onTouchStart={() => setVelocity(-1.6, undefined)}
                      onTouchEnd={() => setVelocity(0, undefined)}
                      className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-800 transition cursor-pointer"
                      title="Reculer (S / ↓)"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <button
                    onMouseDown={() => setVelocity(undefined, 2.2)}
                    onMouseUp={() => setVelocity(undefined, 0)}
                    onTouchStart={() => setVelocity(undefined, 2.2)}
                    onTouchEnd={() => setVelocity(undefined, 0)}
                    className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-800 transition cursor-pointer"
                    title="Tourner à droite (D / →)"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Autonomy and Reset buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsAutonomous(!isAutonomous);
                      playRobotSound("happy", false);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                      isAutonomous 
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" 
                        : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    }`}
                  >
                    {isAutonomous ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isAutonomous ? "Stop SLAM" : "Mode Autonome SLAM"}</span>
                  </button>

                  <button
                    onClick={resetRobot}
                    className="p-2 rounded-xl border border-emerald-900/60 text-slate-300 hover:text-white hover:bg-emerald-900/40 transition cursor-pointer"
                    title="Réinitialiser l'arène"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: ROS2 Real-Time Telemetry & Topics */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className={`p-4 rounded-xl border font-mono text-xs ${
                isDarkMode ? "bg-[#042013]/60 border-emerald-900/50" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-950/60 text-emerald-400 font-bold">
                  <span className="flex items-center space-x-1">
                    <Terminal size={14} />
                    <span>ROS2 TOPIC MONITOR</span>
                  </span>
                  <span className="text-[10px] text-emerald-500/70">50 Hz</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Topic: </span>
                    <span className="text-emerald-300 font-bold">{telemetry.activeTopic}</span>
                  </div>

                  <div className="p-2 rounded bg-black/40 border border-emerald-950 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">linear.x:</span>
                      <span className="text-emerald-400 font-bold">{telemetry.linearX} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">angular.z:</span>
                      <span className="text-emerald-400 font-bold">{telemetry.angularZ} rad/s</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-black/40 border border-emerald-950 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">/scan min_dist:</span>
                      <span className={`font-bold ${telemetry.minLaserDist < 1.2 ? "text-rose-400" : "text-emerald-400"}`}>
                        {telemetry.minLaserDist} m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">/odom (x, y):</span>
                      <span className="text-emerald-400 font-bold">({telemetry.odomX}, {telemetry.odomY})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ben's Expertise Box */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isDarkMode ? "bg-[#05281a]/50 border-emerald-800/40 text-slate-300" : "bg-emerald-50 border-emerald-200 text-slate-700"
              }`}>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold mb-1.5">
                  <Sparkles size={14} />
                  <span>Implémentation par Ben</span>
                </div>
                <p>
                  Ce simulateur illustre l'architecture de nœuds ROS2 déployée par Ben : souscription au topic <code className="text-emerald-300">/scan</code>, calcul de gradient de répulsion et publication des consignes vélocité sur <code className="text-emerald-300">/cmd_vel</code>.
                </p>
              </div>

              {/* Controls help */}
              <div className="text-[11px] text-slate-400 font-mono px-1">
                Touches clavier : <kbd className="px-1 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Z/↑</kbd> Avancer • <kbd className="px-1 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Q/D</kbd> Pivoter • <kbd className="px-1 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Espace</kbd> Stop
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RosSimulatorModal;
