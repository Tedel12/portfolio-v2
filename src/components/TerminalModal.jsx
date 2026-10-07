import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react'
import { useTheme } from '../context/useTheme'
import { playRobotSound } from '../utils/robotAudio'

const HELP_TEXT = `Commandes disponibles :
  ben --help              Affiche cette liste d'aide
  ben skills              Liste la stack technique complète
  ben certs               Affiche les certifications officielles et hackathons
  ben projects [--filter] Liste les projets (ex: ben projects --filter ai)
  ben services            Détaille les offres et tarifs
  ben contact             Affiche les coordonnées directes de Ben
  ben cv                  Ouvre le CV officiel en lecteur direct
  ben ros                 Lance le simulateur robotique ROS2
  ben tinyml              Lance le playground d'inférence TinyML
  ben pitch               Démarre le Pitch Express en 60s
  whoami                  Informations sur l'utilisateur
  clear                   Efface l'écran du terminal
  exit                    Ferme le terminal`;

const TerminalModal = ({ 
  isOpen, 
  onClose, 
  onOpenCv, 
  onOpenRos, 
  onOpenTinyMl, 
  onStartPitch,
  onOpenContact 
}) => {
  const { isDarkMode } = useTheme();
  const [history, setHistory] = useState([
    { type: 'system', text: "Ben Ephraïm CLI v2.4.0 — Environnement interactif initialisé." },
    { type: 'system', text: "Tapez 'ben --help' pour voir les commandes disponibles." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Scroll to bottom on new lines
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add command to history
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'input', text: cmd }];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'exit') {
      onClose();
      return;
    }

    if (lower === 'ben --help' || lower === 'help') {
      newHistory.push({ type: 'output', text: HELP_TEXT });
    } else if (lower === 'ben skills') {
      newHistory.push({ 
        type: 'output', 
        text: `STACK TECHNIQUE DE BEN :
• Langages : Python, TypeScript, JavaScript, C++ (Arduino), PHP, Dart, HTML5/CSS3
• IA & Systèmes : ROS2 (rclpy/rclcpp), PyTorch, TinyML / Edge Impulse, React 19, Flutter
• Backend & Data : Laravel, Node.js, Pandas, Seaborn, PostgreSQL, MongoDB, Docker, Linux` 
      });
    } else if (lower.startsWith('ben projects')) {
      if (lower.includes('ai') || lower.includes('ia')) {
        newHistory.push({
          type: 'output',
          text: `PROJETS IA & SYSTÈMES :
1. Robot Mobile Autonome Gazebo/ROS2 (Cartographie SLAM & Nav2)
2. AgencyAI (Audit & Intégration API de Streaming IA)
3. Modèles TinyML de classification sensorielle temps réel`
        });
      } else {
        newHistory.push({
          type: 'output',
          text: `PROJETS CLÉS :
1. LMS (MERN Stack, vidéos & évaluations automatiques)
2. QuickMovie (App cinéma RESTful fluide)
3. TaskFlow (Gestion de projet agile & Kanban)
4. BeninPlantes (E-commerce réactif & design moderne)`
        });
      }
    } else if (lower === 'ben certs' || lower === 'ben certificates') {
      newHistory.push({
        type: 'output',
        text: `CERTIFICATIONS OFFICIELLES & HACKATHONS :
1. Galactic Problem Solver — NASA International Space Apps Challenge 2025
2. Attestation d'Excellence — Cursor Hackathon UAC 2026 (Ambassade Cursor Bénin)
3. Understanding Artificial Intelligence — DataCamp (ID: #46,453,133)
4. Certificat de Formation (25 000 XP) — MIABE Hackathon 2026 (15 Pays)
5. Introduction to Data — DataCamp (ID: #47,875,099)
Astuce: Consultez la section 'Certificats' sur la page pour briser la baie vitrée en 3D !`
      });
      const certSection = document.getElementById('certificats');
      if (certSection) certSection.scrollIntoView({ behavior: 'smooth' });
    } else if (lower === 'ben services') {
      newHistory.push({
        type: 'output',
        text: `SERVICES CLÉS EN MAIN :
1. Applications Mobiles Cross-Platform (Flutter / React Native)
2. Architectures SaaS Scalables (React 19 / TypeScript / Next.js)
3. Physical AI & Robotique ROS2 (Nœuds, Gazebo, SLAM)
4. Machine Learning & Embedding IA (Pipelines RAG, PyTorch)
5. Visualisation de Données & Tableaux de bord décisionnels`
      });
    } else if (lower === 'ben contact') {
      newHistory.push({
        type: 'output',
        text: `COORDONNÉES DE BEN EPHRAÏM :
• Email : benagbannon@gmail.com
• Téléphone / WhatsApp : +229 01 55 69 98 25
• Localisation : Abomey-Calavi, Bénin
• GitHub : https://github.com/Tedel12
• LinkedIn : ben-ephraïm-agbannon-948819311`
      });
      if (onOpenContact) onOpenContact();
    } else if (lower === 'ben cv' || lower === 'ben download-cv') {
      newHistory.push({ type: 'output', text: "Ouverture du lecteur interactif de CV en cours..." });
      if (onOpenCv) onOpenCv();
    } else if (lower === 'ben ros') {
      newHistory.push({ type: 'output', text: "Lancement du simulateur robotique ROS2..." });
      if (onOpenRos) onOpenRos();
    } else if (lower === 'ben tinyml') {
      newHistory.push({ type: 'output', text: "Lancement du playground TinyML..." });
      if (onOpenTinyMl) onOpenTinyMl();
    } else if (lower === 'ben pitch') {
      newHistory.push({ type: 'output', text: "Démarrage du Pitch Express 60s..." });
      if (onStartPitch) onStartPitch();
    } else if (lower === 'whoami') {
      newHistory.push({
        type: 'output',
        text: "Recruteur, partenaire ou visionnaire explorant le portfolio d'un ingénieur passionné."
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `Commande non reconnue: '${cmd}'. Tapez 'ben --help' pour la liste des commandes.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
    playRobotSound("pop", false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(cmdHistory[nextIndex] || '');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = ['ben --help', 'ben skills', 'ben projects', 'ben services', 'ben contact', 'ben cv', 'ben ros', 'ben tinyml', 'ben pitch', 'clear'];
      const match = suggestions.find(s => s.startsWith(inputVal.trim()));
      if (match) setInputVal(match);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-2xl border border-emerald-500/60 bg-[#02130a]/95 text-slate-200 shadow-2xl shadow-emerald-950/90 z-10 font-mono text-xs overflow-hidden flex flex-col h-[520px] max-h-[85vh]"
        >
          {/* Top Bar macOS style */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#031c10] border-b border-emerald-900/60">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-[11px] text-emerald-400 font-bold flex items-center space-x-1.5">
                <TerminalIcon size={13} />
                <span>ben@portfolio:~ (zsh)</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-emerald-500/70 hidden sm:inline">Raccourci: Ctrl+K / Cmd+K</span>
              <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text">
            {history.map((item, idx) => {
              if (item.type === 'system') {
                return (
                  <div key={idx} className="text-emerald-500/80 text-[11px]">
                    # {item.text}
                  </div>
                );
              }
              if (item.type === 'input') {
                return (
                  <div key={idx} className="flex items-center space-x-2 text-emerald-300">
                    <span className="text-emerald-500 font-bold">ben@portfolio:~$</span>
                    <span>{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={idx} className="text-rose-400 pl-4 border-l-2 border-rose-500/50">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-300 pl-4 border-l-2 border-emerald-500/40 whitespace-pre-wrap leading-relaxed">
                  {item.text}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Input Line */}
          <div className="p-3 bg-[#031c10]/80 border-t border-emerald-950/80 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">ben@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tapez 'ben --help' ou 'ben ros'..."
              className="flex-1 bg-transparent text-emerald-200 outline-none font-mono text-xs placeholder:text-emerald-900"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
            >
              <CornerDownLeft size={13} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TerminalModal;

