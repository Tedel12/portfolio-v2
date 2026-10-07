import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  X, 
  Cpu, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap,
  Gauge
} from 'lucide-react'
import { useTheme } from '../context/useTheme'
import { playRobotSound } from '../utils/robotAudio'

const PRESETS = [
  { id: 'idle', label: 'Repos / Stable', freq: 1, noise: 0.1, anomaly: false },
  { id: 'walking', label: 'Mouvement Cyclique', freq: 4, noise: 0.35, anomaly: false },
  { id: 'anomaly', label: 'Vibration Anormale (Défaut)', freq: 14, noise: 0.8, anomaly: true },
  { id: 'shock', label: 'Impact / Choc Brutal', freq: 28, noise: 1.5, anomaly: true },
];

const TinyMlPlaygroundModal = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [inferenceResult, setInferenceResult] = useState({
    probabilities: { idle: 94, walking: 4, anomaly: 2 },
    predictedClass: 'Repos / Stable',
    confidence: 94,
    latencyMs: 2.6,
    isAlert: false
  });

  const canvasRef = useRef(null);
  const dataPointsRef = useRef([]);

  // Simulation signal generator
  useEffect(() => {
    if (!isOpen) return;

    let animId;
    let t = 0;

    const renderWave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      t += 0.08;
      const { freq, noise, anomaly, id } = selectedPreset;

      // Sample new sensor value (X, Y, Z accelerometer)
      const rawVal = Math.sin(t * freq) * (anomaly ? 45 : 25) + (Math.random() - 0.5) * noise * 35;
      dataPointsRef.current.push(rawVal);
      if (dataPointsRef.current.length > 120) {
        dataPointsRef.current.shift();
      }

      // Draw background
      ctx.fillStyle = isDarkMode ? "#03150d" : "#f1f7f4";
      ctx.fillRect(0, 0, w, h);

      // Draw grid
      ctx.strokeStyle = isDarkMode ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Draw live waveform
      ctx.strokeStyle = anomaly ? "#f43f5e" : "#10b981";
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const step = w / 120;
      dataPointsRef.current.forEach((val, i) => {
        const px = i * step;
        const py = h / 2 - val;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Soft glow on current head
      if (dataPointsRef.current.length > 0) {
        const lastVal = dataPointsRef.current[dataPointsRef.current.length - 1];
        const lastX = (dataPointsRef.current.length - 1) * step;
        const lastY = h / 2 - lastVal;
        ctx.fillStyle = anomaly ? "#f43f5e" : "#34d399";
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderWave);
    };

    animId = requestAnimationFrame(renderWave);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, selectedPreset, isDarkMode]);

  // Update classification predictions when preset changes
  useEffect(() => {
    if (!isOpen) return;

    if (selectedPreset.id === 'idle') {
      setInferenceResult({
        probabilities: { idle: 96, walking: 3, anomaly: 1 },
        predictedClass: 'Repos / Stable',
        confidence: 96,
        latencyMs: 2.4,
        isAlert: false
      });
    } else if (selectedPreset.id === 'walking') {
      setInferenceResult({
        probabilities: { idle: 4, walking: 92, anomaly: 4 },
        predictedClass: 'Mouvement Cyclique',
        confidence: 92,
        latencyMs: 2.8,
        isAlert: false
      });
    } else if (selectedPreset.id === 'anomaly') {
      setInferenceResult({
        probabilities: { idle: 2, walking: 7, anomaly: 91 },
        predictedClass: 'Vibration Anormale (Défaut)',
        confidence: 91,
        latencyMs: 3.1,
        isAlert: true
      });
    } else if (selectedPreset.id === 'shock') {
      setInferenceResult({
        probabilities: { idle: 1, walking: 2, anomaly: 97 },
        predictedClass: 'Impact Brutal (Choc)',
        confidence: 97,
        latencyMs: 3.2,
        isAlert: true
      });
    }
  }, [selectedPreset, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
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
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-emerald-950/60">
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 mr-2">
              <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Cpu size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="min-w-0">
                <h3 className={`text-sm sm:text-lg md:text-xl font-heading font-bold tracking-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Playground d'Inférence TinyML en Temps Réel
                </h3>
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 flex items-center space-x-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="truncate">Modèle Quantifié INT8 • Inférence Edge Locale</span>
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

          {/* Preset Buttons */}
          <div className="mb-4">
            <div className="text-xs font-mono text-emerald-400 mb-2">Sélectionnez un profil de signal capteur :</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((p) => {
                const isSelected = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPreset(p);
                      playRobotSound("pop", false);
                    }}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-medium transition cursor-pointer text-left ${
                      isSelected
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold"
                        : isDarkMode
                          ? "bg-[#042013]/60 border-emerald-950 text-slate-300 hover:border-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Grid: Waveform & Inférence */}
          <div className="grid lg:grid-cols-12 gap-5 items-start">
            {/* Waveform Canvas */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500/50 shadow-inner w-full flex justify-center bg-black/40">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={220}
                  className="w-full h-auto"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  IMU Capteur Accéléromètre 3-Axes (50 Hz)
                </div>
              </div>

              {/* Hardware Profile Specs */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                <div className={`p-2.5 rounded-lg border ${isDarkMode ? "bg-[#042013]/60 border-emerald-950" : "bg-slate-50 border-slate-200"}`}>
                  <div className="text-slate-400 text-[10px]">Latence Inférence</div>
                  <div className="text-emerald-400 font-bold text-sm">{inferenceResult.latencyMs} ms</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isDarkMode ? "bg-[#042013]/60 border-emerald-950" : "bg-slate-50 border-slate-200"}`}>
                  <div className="text-slate-400 text-[10px]">Empreinte RAM</div>
                  <div className="text-emerald-400 font-bold text-sm">11.4 Ko</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isDarkMode ? "bg-[#042013]/60 border-emerald-950" : "bg-slate-50 border-slate-200"}`}>
                  <div className="text-slate-400 text-[10px]">Flash Rom</div>
                  <div className="text-emerald-400 font-bold text-sm">42.8 Ko</div>
                </div>
              </div>
            </div>

            {/* Neural Net Classification Result */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className={`p-4 rounded-xl border font-mono text-xs ${
                isDarkMode ? "bg-[#042013]/60 border-emerald-900/50" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-950/60 text-emerald-400 font-bold">
                  <span className="flex items-center space-x-1.5">
                    <Activity size={14} />
                    <span>SORTIE DU RÉSEAU (SOFTMAX)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400/80">INT8</span>
                </div>

                {/* Status Badge */}
                <div className={`p-3 rounded-lg border flex items-center justify-between mb-3 ${
                  inferenceResult.isAlert
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                }`}>
                  <div className="flex items-center space-x-2">
                    {inferenceResult.isAlert ? <AlertTriangle size={18} className="text-rose-400" /> : <CheckCircle2 size={18} className="text-emerald-400" />}
                    <span className="font-bold text-sm">{inferenceResult.predictedClass}</span>
                  </div>
                  <span className="font-bold">{inferenceResult.confidence}%</span>
                </div>

                {/* Probabilities Bars */}
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Repos / Stable</span>
                      <span className="text-emerald-400">{inferenceResult.probabilities.idle}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-emerald-950 overflow-hidden">
                      <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${inferenceResult.probabilities.idle}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Mouvement Cyclique</span>
                      <span className="text-teal-400">{inferenceResult.probabilities.walking}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-emerald-950 overflow-hidden">
                      <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${inferenceResult.probabilities.walking}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Anomalie / Choc</span>
                      <span className={inferenceResult.probabilities.anomaly > 50 ? "text-rose-400 font-bold" : "text-slate-400"}>
                        {inferenceResult.probabilities.anomaly}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-emerald-950 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${inferenceResult.probabilities.anomaly > 50 ? "bg-rose-500" : "bg-emerald-400"}`} style={{ width: `${inferenceResult.probabilities.anomaly}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanation Note */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isDarkMode ? "bg-[#05281a]/50 border-emerald-800/40 text-slate-300" : "bg-emerald-50 border-emerald-200 text-slate-700"
              }`}>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold mb-1">
                  <Sparkles size={14} />
                  <span>Cas d'Usage Industriel</span>
                </div>
                <p>
                  Ce pipeline TinyML fonctionne 100% hors-ligne sur microcontrôleur Cortex-M4/ESP32, assurant la maintenance prédictive sans latence réseau et avec une batterie durant plusieurs années.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TinyMlPlaygroundModal;

