import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
    Volume2, 
    VolumeX, 
    Mic, 
    MicOff, 
    X, 
    Play, 
    Pause, 
    MessageCircle, 
    FileText, 
    Compass, 
    ChevronRight,
    Sparkles,
    Zap,
    Clock,
    Terminal,
    Bot,
    CheckCircle2
} from 'lucide-react'
import { playRobotSound } from '../utils/robotAudio'
import { speakFrench, stopSpeaking } from '../utils/speechVoice'

// Standard Tour Steps
const STANDARD_STEPS = [
    {
        targetId: "accueil",
        question: "Qui est Ben Ephraïm Agbannon ?",
        answer: "Ben est un Ingénieur Logiciel & IA passionné. Spécialiste Full-Stack, Mobile (Flutter & React Native) et Systèmes Intelligents (ROS2, TinyML & Data Science).",
        highlightTitle: "Bienvenue sur mon Portfolio",
    },
    {
        targetId: "services",
        question: "Que peut-il construire pour vous ?",
        answer: "Des applications mobiles cross-platform iOS & Android, des architectures SaaS React 19 scalables, des robots autonomes sous ROS2 et des modèles d'IA sur mesure.",
        highlightTitle: "Offres & Services Clés en main",
    },
    {
        targetId: "competences",
        question: "Quelles sont ses technologies de prédilection ?",
        answer: "Regardez sa stack : Python, TypeScript, ROS2 (Physical AI), PyTorch, React, Flutter, Laravel, Docker et PostgreSQL. Cliquez sur n'importe quelle compétence pour inspecter sa fiche !",
        highlightTitle: "Stack Technique Maîtrisée",
    },
    {
        targetId: "process",
        question: "Comment se déroule la collaboration ?",
        answer: "Un process transparent en 4 étapes : Découverte gratuite de 30 minutes, proposition ferme en 48 heures, sprints hebdos, puis déploiement et transmission intégrale du code.",
        highlightTitle: "Méthodologie Étape par Étape",
    },
    {
        targetId: "github",
        question: "Son code est-il vérifiable ?",
        answer: "Absolument ! Plus de 30 dépôts publics et 450 contributions annuelles sur GitHub sous le pseudo Tedel12. Une discipline quotidienne en open source.",
        highlightTitle: "Activité Open Source Vérifiée",
    },
    {
        targetId: "contact",
        question: "Comment le contacter directement ?",
        answer: "Vous pouvez lui envoyer un message ici, réserver un appel téléphonique direct ou lui écrire sur WhatsApp au +229 01 55 69 98 25 !",
        highlightTitle: "Prise de Contact Directe",
    },
];

// Pitch Express 60s Steps (Fast track for recruiters)
const PITCH_60S_STEPS = [
    {
        targetId: "accueil",
        durationSec: 15,
        question: "Pitch Express • Étape 1 : Le Profil",
        answer: "Ben Ephraïm Agbannon est Ingénieur Logiciel & IA diplômé en SIL. Il combine développement web & mobile moderne avec l'intelligence artificielle physique.",
        highlightTitle: "Profil & Vision Globale",
    },
    {
        targetId: "competences",
        durationSec: 15,
        question: "Pitch Express • Étape 2 : L'Expertise Clé",
        answer: "Sa force : la robotique autonome sous ROS2, l'inférence temps réel TinyML, les applications SaaS React 19 et la visualisation de données volumineuses.",
        highlightTitle: "Stack IA & Systèmes Physiques",
    },
    {
        targetId: "github",
        durationSec: 15,
        question: "Pitch Express • Étape 3 : Preuves & Projets",
        answer: "Une production vérifiable : plus de 450 contributions GitHub annuelles, plateformes éducatives LMS et architectures backend résilientes.",
        highlightTitle: "Code Source & Réalisations",
    },
    {
        targetId: "contact",
        durationSec: 15,
        question: "Pitch Express • Étape 4 : Disponibilité Immédiate",
        answer: "Ben est immédiatement disponible pour vos missions techniques ou recrutements. Contactez-le directement par téléphone ou email.",
        highlightTitle: "Contact Direct",
    },
];

// Robotic Cyber-Dog Mascot Vector
const CyberDogMascot = ({ isWalking = false, isTalking = false, isBeaming = true }) => {
    return (
        <div className="relative select-none pointer-events-none">
            {/* Projector Light Beam */}
            {isBeaming && (
                <div className="absolute top-8 left-16 md:left-20 w-72 md:w-96 h-44 pointer-events-none z-0 transform -translate-y-1/2 rotate-12 origin-left opacity-90">
                    <svg viewBox="0 0 200 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]">
                        <defs>
                            <linearGradient id="beamGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                                <stop offset="35%" stopColor="#10b981" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polygon points="0,50 200,5 200,95" fill="url(#beamGradient)" />
                        <circle cx="3" cy="50" r="8" fill="#34d399" className="animate-ping" />
                    </svg>
                </div>
            )}

            {/* Cyber-Dog SVG Vector */}
            <svg 
                viewBox="0 0 120 100" 
                className={`w-20 h-16 md:w-24 md:h-20 drop-shadow-2xl relative z-10 transition-transform duration-300 ${
                    isWalking ? "animate-bounce" : ""
                }`} 
                fill="none"
            >
                {/* Wagging Tail Antenna */}
                <g>
                    <path 
                        d="M25 55 Q12 42 16 30" 
                        stroke="#10b981" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 25 55; 20 25 55; -15 25 55; 0 25 55"
                            dur="0.6s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <circle cx="16" cy="30" r="4.5" fill="#34d399" className="animate-pulse" />
                </g>

                {/* Back Left Leg */}
                <path 
                    d="M32 68 L28 88 L22 88" 
                    stroke="#059669" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isWalking && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="25 32 68; -25 32 68; 25 32 68"
                            dur="0.35s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>

                {/* Back Right Leg */}
                <path 
                    d="M42 68 L38 88 L32 88" 
                    stroke="#10b981" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isWalking && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="-25 42 68; 25 42 68; -25 42 68"
                            dur="0.35s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>

                {/* Cyber-Dog Body Chassis */}
                <rect 
                    x="24" 
                    y="45" 
                    width="48" 
                    height="28" 
                    rx="12" 
                    fill="#042013" 
                    stroke="#10b981" 
                    strokeWidth="3.5" 
                />
                
                {/* Neon battery / reactor core */}
                <rect x="36" y="54" width="22" height="10" rx="4" fill="#03110a" stroke="#065f46" strokeWidth="1.5" />
                <circle cx="43" cy="59" r="2.5" fill="#34d399" className="animate-pulse" />
                <circle cx="51" cy="59" r="2.5" fill="#34d399" />

                {/* Front Left Leg */}
                <path 
                    d="M60 68 L64 88 L70 88" 
                    stroke="#059669" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isWalking && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="-30 60 68; 30 60 68; -30 60 68"
                            dur="0.35s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>

                {/* Front Right Leg */}
                <path 
                    d="M68 68 L72 88 L78 88" 
                    stroke="#10b981" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isWalking && (
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="30 68 68; -30 68 68; 30 68 68"
                            dur="0.35s"
                            repeatCount="indefinite"
                        />
                    )}
                </path>

                {/* Neck & Projector Collar */}
                <path d="M68 52 L78 40" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                <circle cx="78" cy="40" r="5" fill="#34d399" className="animate-pulse" />

                {/* Cyber-Dog Head */}
                <rect 
                    x="72" 
                    y="22" 
                    width="36" 
                    height="28" 
                    rx="9" 
                    fill="#042013" 
                    stroke="#10b981" 
                    strokeWidth="3.5" 
                />

                {/* Cute Perky Ears */}
                <path d="M78 22 L72 10 L84 18" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M96 22 L102 10 L92 18" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />

                {/* High-Tech Visor & LED Eye */}
                <rect x="80" y="28" width="24" height="12" rx="4" fill="#03110a" stroke="#059669" strokeWidth="1.5" />
                <circle cx="92" cy="34" r="3" fill="#34d399">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Snout & Mouth */}
                <rect x="100" y="36" width="7" height="6" rx="2" fill="#10b981" />
                {isTalking ? (
                    <path d="M84 44 Q92 48 100 44" stroke="#34d399" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="d" values="M84 44 Q92 48 100 44; M84 46 Q92 42 100 46; M84 44 Q92 48 100 44" dur="0.3s" repeatCount="indefinite" />
                    </path>
                ) : (
                    <path d="M86 44 Q92 47 98 44" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                )}
            </svg>
        </div>
    );
};

const MascotGuide = ({ 
    onOpenCv, 
    onOpenContact, 
    onOpenRos, 
    onOpenTinyMl, 
    onOpenTerminal,
    pitchTrigger = 0 
}) => {
    const [isActive, setIsActive] = useState(false);
    const [tourMode, setTourMode] = useState("standard"); // "standard" or "pitch60s"
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Audio & Permissions
    const [audioPermissionAsked, setAudioPermissionAsked] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [showVolumeToast, setShowVolumeToast] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWalking, setIsWalking] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isWidgetMenuOpen, setIsWidgetMenuOpen] = useState(false);
    const [mascotCoords, setMascotCoords] = useState({ top: 120, left: 40 });

    // Synchronization refs to avoid stale closures in speech callbacks
    const isPlayingRef = useRef(false);
    isPlayingRef.current = isPlaying;
    const isActiveRef = useRef(false);
    isActiveRef.current = isActive;
    const tourModeRef = useRef(tourMode);
    tourModeRef.current = tourMode;
    const isMutedRef = useRef(isMuted);
    isMutedRef.current = isMuted;

    // 60s countdown timer state
    const [pitchSecondsLeft, setPitchSecondsLeft] = useState(60);

    const walkTimerRef = useRef(null);
    const autoAdvanceTimerRef = useRef(null);
    const activeSteps = tourMode === "pitch60s" ? PITCH_60S_STEPS : STANDARD_STEPS;
    const currentStep = activeSteps[currentStepIndex];

    // Remove spotlight halo
    const removeSpotlight = useCallback(() => {
        document.querySelectorAll('.mascot-focused-section').forEach(el => {
            el.classList.remove('mascot-focused-section');
        });
    }, []);

    // Apply spotlight halo to active element
    const applySpotlight = useCallback((el) => {
        removeSpotlight();
        el.classList.add('mascot-focused-section');
    }, [removeSpotlight]);

    // Forward declaration of stopTour so auto-advance can call it cleanly
    const stopTour = useCallback(() => {
        setIsActive(false);
        isActiveRef.current = false;
        setIsPlaying(false);
        isPlayingRef.current = false;
        setIsWalking(false);
        setIsTalking(false);
        stopSpeaking();
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        playRobotSound("pop", isMutedRef.current);
        removeSpotlight();
    }, [removeSpotlight]);

    // Position and walk mascot to target section (under navbar without being hidden)
    const navigateMascotToSection = useCallback((stepIdx, stepsList = activeSteps) => {
        const step = stepsList[stepIdx];
        if (!step) return;

        const targetEl = document.getElementById(step.targetId);
        if (targetEl) {
            setIsWalking(true);
            playRobotSound("chirp", isMutedRef.current);

            // Compute target position and scroll with safe offset for 80px fixed navbar
            const rect = targetEl.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetAbsTop = scrollTop + rect.top;

            // Scroll with 90px header clearance
            window.scrollTo({
                top: Math.max(0, targetAbsTop - 90),
                behavior: 'smooth'
            });

            applySpotlight(targetEl);

            // Place mascot right below navbar on top of section header
            const newTop = targetAbsTop + 45;
            const isMobile = window.innerWidth < 768;
            const newLeft = isMobile ? 16 : Math.max(24, rect.left + 24);

            setMascotCoords({ top: newTop, left: newLeft });

            // Stop walking trot after arrival (~750ms)
            if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
            walkTimerRef.current = setTimeout(() => {
                setIsWalking(false);

                // Start female French speech
                if (isVoiceEnabled && !isMutedRef.current) {
                    setIsTalking(true);
                    const speechText = `${step.question}. ${step.answer}`;
                    
                    speakFrench(speechText, {
                        onStart: () => setIsTalking(true),
                        onEnd: () => {
                            setIsTalking(false);
                            // As soon as reading finishes: advance immediately without user needing to click Next!
                            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                            const transitionDelay = tourModeRef.current === "pitch60s" ? 300 : 700;
                            autoAdvanceTimerRef.current = setTimeout(() => {
                                if (stepIdx < stepsList.length - 1) {
                                    const nextIdx = stepIdx + 1;
                                    setCurrentStepIndex(nextIdx);
                                    navigateMascotToSection(nextIdx, stepsList);
                                } else {
                                    stopTour();
                                    playRobotSound("happy", isMutedRef.current);
                                }
                            }, transitionDelay);
                        },
                        onError: () => {
                            setIsTalking(false);
                            // On error or skip, advance after a short reading buffer
                            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                            autoAdvanceTimerRef.current = setTimeout(() => {
                                if (stepIdx < stepsList.length - 1) {
                                    const nextIdx = stepIdx + 1;
                                    setCurrentStepIndex(nextIdx);
                                    navigateMascotToSection(nextIdx, stepsList);
                                } else {
                                    stopTour();
                                }
                            }, 4000);
                        }
                    });
                } else {
                    // Voice disabled: wait reading buffer then advance automatically
                    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                    autoAdvanceTimerRef.current = setTimeout(() => {
                        if (stepIdx < stepsList.length - 1) {
                            const nextIdx = stepIdx + 1;
                            setCurrentStepIndex(nextIdx);
                            navigateMascotToSection(nextIdx, stepsList);
                        } else {
                            stopTour();
                            playRobotSound("happy", isMutedRef.current);
                        }
                    }, 6500);
                }
            }, 800);
        }
    }, [activeSteps, applySpotlight, isVoiceEnabled, stopTour]);

    // Next tour step (manual override)
    const nextStep = useCallback(() => {
        stopSpeaking();
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

        if (currentStepIndex < activeSteps.length - 1) {
            const nextIdx = currentStepIndex + 1;
            setCurrentStepIndex(nextIdx);
            navigateMascotToSection(nextIdx);
        } else {
            stopTour();
            playRobotSound("happy", isMutedRef.current);
        }
    }, [activeSteps.length, currentStepIndex, navigateMascotToSection, stopTour]);

    // Previous tour step
    const prevStep = useCallback(() => {
        stopSpeaking();
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

        if (currentStepIndex > 0) {
            const prevIdx = currentStepIndex - 1;
            setCurrentStepIndex(prevIdx);
            navigateMascotToSection(prevIdx);
        }
    }, [currentStepIndex, navigateMascotToSection]);

    // Start tour workflow with audio permission prompt
    const launchTourWorkflow = useCallback((mode = "standard") => {
        setTourMode(mode);
        setIsWidgetMenuOpen(false);

        if (!audioPermissionAsked) {
            setShowPermissionModal(true);
        } else {
            setIsActive(true);
            setCurrentStepIndex(0);
            setIsPlaying(true);
            const steps = mode === "pitch60s" ? PITCH_60S_STEPS : STANDARD_STEPS;
            navigateMascotToSection(0, steps);
        }
    }, [audioPermissionAsked, navigateMascotToSection]);

    // Handle user answering the permission prompt
    const handleAudioPermission = (allowAudio) => {
        setAudioPermissionAsked(true);
        setShowPermissionModal(false);

        if (allowAudio) {
            setIsVoiceEnabled(true);
            setIsMuted(false);
            playRobotSound("happy", false);
            // Show volume notification
            setShowVolumeToast(true);
            setTimeout(() => setShowVolumeToast(false), 5500);
        } else {
            setIsVoiceEnabled(false);
            setIsMuted(true);
        }

        setIsActive(true);
        setCurrentStepIndex(0);
        setIsPlaying(true);
        const steps = tourMode === "pitch60s" ? PITCH_60S_STEPS : STANDARD_STEPS;
        navigateMascotToSection(0, steps);
    };

    // External pitch trigger prop
    useEffect(() => {
        if (pitchTrigger > 0) {
            launchTourWorkflow("pitch60s");
        }
    }, [pitchTrigger, launchTourWorkflow]);

    // 60s pitch timer countdown
    useEffect(() => {
        if (!isActive || tourMode !== "pitch60s" || !isPlaying) return;
        const interval = setInterval(() => {
            setPitchSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    stopTour();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive, tourMode, isPlaying, stopTour]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopSpeaking();
            removeSpotlight();
            if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
            if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        };
    }, [removeSpotlight]);

    return (
        <>
            {/* CSS styles for spotlight focus and flutter / blur effect */}
            <style>{`
                .mascot-focused-section {
                    position: relative;
                    z-index: 35 !important;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 0 90px 30px rgba(16, 185, 129, 0.35) !important;
                    outline: 2px solid rgba(52, 211, 153, 0.9) !important;
                    outline-offset: 6px;
                    border-radius: 1.25rem;
                }
            `}</style>

            {/* FLUTTER / BACKDROP BLUR OVERLAY (Defocus all other page elements) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-20 pointer-events-none bg-black/60 backdrop-blur-md"
                    />
                )}
            </AnimatePresence>

            {/* INITIAL AUDIO PERMISSION MODAL */}
            <AnimatePresence>
                {showPermissionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                            onClick={() => handleAudioPermission(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 15 }}
                            className="relative z-10 w-full max-w-md rounded-2xl border-2 border-emerald-500 bg-[#031b11] p-6 shadow-2xl text-slate-100 shadow-emerald-950"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                    <Mic size={24} />
                                </div>
                                <div>
                                    <h4 className="text-base font-heading font-bold text-white">Activer le Guide Vocal ?</h4>
                                    <p className="text-xs text-emerald-400 font-mono">Voix féminine française & effets robotiques</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed mb-5">
                                La mascotte de Ben peut lire à haute voix chaque section en français naturel pour une visite immersive sans effort de lecture.
                            </p>

                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => handleAudioPermission(false)}
                                    className="px-3.5 py-2 rounded-xl border border-emerald-900/60 text-slate-300 hover:bg-emerald-950/60 text-xs font-mono transition"
                                >
                                    Mode Silencieux
                                </button>
                                <button
                                    onClick={() => handleAudioPermission(true)}
                                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition cursor-pointer"
                                >
                                    <Volume2 size={15} />
                                    <span>Activer la Voix (Recommandé)</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* VOLUME HELPER TOAST */}
            <AnimatePresence>
                {showVolumeToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border border-emerald-500/50 bg-[#031d12]/95 backdrop-blur-md text-slate-100 shadow-xl flex items-center space-x-3 text-xs font-mono"
                    >
                        <Volume2 size={16} className="text-emerald-400 shrink-0 animate-pulse" />
                        <span>🔊 Astuce : Vérifiez que le volume de vos haut-parleurs est allumé.</span>
                        <button
                            onClick={() => playRobotSound("happy", false)}
                            className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-[10px]"
                        >
                            Tester le son
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TRAVELING MASCOT & SPEECH POPUP */}
            <AnimatePresence>
                {isActive && currentStep && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            top: mascotCoords.top,
                            left: mascotCoords.left,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                            type: "spring", 
                            damping: 24, 
                            stiffness: 110,
                            mass: 0.9
                        }}
                        className="absolute z-40 w-[92%] max-w-lg md:max-w-xl transition-all"
                    >
                        {/* Mascot & Spotlight beam */}
                        <div className="flex items-start space-x-3 md:space-x-4 mb-2">
                            <div className="shrink-0 -mt-2">
                                <CyberDogMascot 
                                    isWalking={isWalking} 
                                    isTalking={isTalking} 
                                    isBeaming={!isWalking} 
                                />
                            </div>

                            {/* Walking badge when moving */}
                            {isWalking && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold animate-pulse mt-3"
                                >
                                    <span>🐾 En route vers {currentStep.highlightTitle}...</span>
                                </motion.div>
                            )}

                            {/* Pitch 60s countdown badge */}
                            {tourMode === "pitch60s" && !isWalking && (
                                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold mt-3">
                                    <Clock size={13} />
                                    <span>Pitch Express : {pitchSecondsLeft}s restantes</span>
                                </div>
                            )}
                        </div>

                        {/* Interactive Speech Glassmorphism Box */}
                        <div className="relative rounded-2xl border-2 border-emerald-500/90 bg-[#031a10]/95 text-slate-100 p-5 md:p-6 shadow-2xl shadow-emerald-950/95 backdrop-blur-xl">
                            {/* Control Bar */}
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-900/60">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                        {tourMode === "pitch60s" ? "PITCH EXPRESS 60S" : "GUIDE VIRTUEL"} • ÉTAPE {currentStepIndex + 1}/{activeSteps.length}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1.5 md:space-x-2">
                                    {/* Female Voice toggle */}
                                    <button
                                        onClick={() => {
                                            if (isVoiceEnabled) {
                                                stopSpeaking();
                                                setIsVoiceEnabled(false);
                                                setIsTalking(false);
                                            } else {
                                                setIsVoiceEnabled(true);
                                                const speechText = `${currentStep.question} ... ${currentStep.answer}`;
                                                speakFrench(speechText, {
                                                    onStart: () => setIsTalking(true),
                                                    onEnd: () => setIsTalking(false)
                                                });
                                            }
                                            playRobotSound("pop", isMuted);
                                        }}
                                        title={isVoiceEnabled ? "Désactiver la voix féminine" : "Activer la voix féminine"}
                                        className={`p-1.5 rounded-lg border transition-colors flex items-center space-x-1 ${
                                            isVoiceEnabled 
                                                ? "border-emerald-500 bg-emerald-950/60 text-emerald-300" 
                                                : "border-emerald-900 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {isVoiceEnabled ? <Mic size={14} className="text-emerald-400" /> : <MicOff size={14} />}
                                        <span className="text-[10px] font-mono hidden sm:inline">Voix</span>
                                    </button>

                                    {/* Beeps sound toggle */}
                                    <button
                                        onClick={() => {
                                            setIsMuted(!isMuted);
                                            playRobotSound("pop", false);
                                        }}
                                        title={isMuted ? "Activer les bips robot" : "Désactiver les bips"}
                                        className="p-1.5 rounded-lg border border-emerald-900 text-slate-300 hover:text-white hover:bg-emerald-900/40 transition-colors"
                                    >
                                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-emerald-400" />}
                                    </button>

                                    {/* Play / Pause toggle */}
                                    <button
                                        onClick={() => {
                                            if (isPlaying) {
                                                setIsPlaying(false);
                                                stopSpeaking();
                                            } else {
                                                setIsPlaying(true);
                                            }
                                        }}
                                        title={isPlaying ? "Mettre en pause" : "Reprendre la visite"}
                                        className="p-1.5 rounded-lg border border-emerald-900 text-slate-300 hover:text-white hover:bg-emerald-900/40 transition-colors"
                                    >
                                        {isPlaying ? <Pause size={14} /> : <Play size={14} className="text-emerald-400" />}
                                    </button>

                                    {/* Close Tour button */}
                                    <button
                                        onClick={stopTour}
                                        title="Arrêter la visite"
                                        className="p-1.5 rounded-lg border border-emerald-900 text-slate-400 hover:text-white hover:bg-emerald-900/40 transition-colors"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Dialogue content */}
                            <div className="space-y-2">
                                <div className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                                    <Sparkles size={13} className="shrink-0" />
                                    <span>"{currentStep.question}"</span>
                                </div>

                                <p className="text-xs md:text-sm leading-relaxed text-slate-200 font-sans">
                                    {currentStep.answer}
                                </p>
                            </div>

                            {/* Bottom Navigation */}
                            <div className="mt-4 pt-3 border-t border-emerald-950 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {currentStepIndex > 0 && (
                                        <button
                                            onClick={prevStep}
                                            className="px-3 py-1.5 rounded-lg border border-emerald-900 text-[11px] font-subtitle font-semibold text-slate-300 hover:bg-emerald-900/30 transition-colors cursor-pointer"
                                        >
                                            Précédent
                                        </button>
                                    )}

                                    <button
                                        onClick={nextStep}
                                        className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-subtitle font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                                    >
                                        <span>{currentStepIndex === activeSteps.length - 1 ? "Terminer" : "Suivant"}</span>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>

                                {/* Step Dots */}
                                <div className="flex items-center space-x-1.5">
                                    {activeSteps.map((_, dotIdx) => (
                                        <div
                                            key={dotIdx}
                                            onClick={() => {
                                                stopSpeaking();
                                                setCurrentStepIndex(dotIdx);
                                                navigateMascotToSection(dotIdx);
                                            }}
                                            title={`Étape ${dotIdx + 1}`}
                                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                                currentStepIndex === dotIdx
                                                    ? "w-5 bg-emerald-400"
                                                    : "w-1.5 bg-emerald-950 hover:bg-emerald-700"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MINIMIZED ASSISTANCE WIDGET */}
            <div className="fixed bottom-6 right-6 z-40">
                <AnimatePresence>
                    {isWidgetMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute bottom-16 right-0 w-64 rounded-2xl border border-emerald-800/60 bg-[#031a10]/95 backdrop-blur-xl p-4 shadow-2xl text-slate-100 mb-2"
                        >
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-950">
                                <span className="text-xs font-mono font-bold text-emerald-400">
                                    Compagnon Robot Ben
                                </span>
                                <button
                                    onClick={() => setIsWidgetMenuOpen(false)}
                                    className="p-1 rounded text-slate-400 hover:text-white"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                                Bonjour ! Que souhaitez-vous explorer ?
                            </p>

                            <div className="space-y-1.5">
                                {/* Pitch 60s Button */}
                                <button
                                    onClick={() => launchTourWorkflow("pitch60s")}
                                    className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center space-x-2 text-emerald-300 cursor-pointer"
                                >
                                    <Clock size={14} className="text-emerald-400" />
                                    <span>Pitch Express (60s)</span>
                                </button>

                                <button
                                    onClick={() => launchTourWorkflow("standard")}
                                    className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-medium hover:bg-emerald-950/60 border border-transparent hover:border-emerald-800/50 flex items-center space-x-2 text-slate-200 cursor-pointer"
                                >
                                    <Compass size={14} className="text-emerald-400" />
                                    <span>Visite Guidée Complète</span>
                                </button>

                                {onOpenRos && (
                                    <button
                                        onClick={() => {
                                            setIsWidgetMenuOpen(false);
                                            onOpenRos();
                                        }}
                                        className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-medium hover:bg-emerald-950/60 border border-transparent hover:border-emerald-800/50 flex items-center space-x-2 text-slate-200 cursor-pointer"
                                    >
                                        <Bot size={14} className="text-emerald-400" />
                                        <span>Simulateur ROS2</span>
                                    </button>
                                )}

                                {onOpenTinyMl && (
                                    <button
                                        onClick={() => {
                                            setIsWidgetMenuOpen(false);
                                            onOpenTinyMl();
                                        }}
                                        className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-medium hover:bg-emerald-950/60 border border-transparent hover:border-emerald-800/50 flex items-center space-x-2 text-slate-200 cursor-pointer"
                                    >
                                        <Zap size={14} className="text-emerald-400" />
                                        <span>Playground TinyML</span>
                                    </button>
                                )}

                                {onOpenTerminal && (
                                    <button
                                        onClick={() => {
                                            setIsWidgetMenuOpen(false);
                                            onOpenTerminal();
                                        }}
                                        className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-medium hover:bg-emerald-950/60 border border-transparent hover:border-emerald-800/50 flex items-center space-x-2 text-slate-200 cursor-pointer"
                                    >
                                        <Terminal size={14} className="text-emerald-400" />
                                        <span>Terminal CLI (Ctrl+K)</span>
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        setIsWidgetMenuOpen(false);
                                        onOpenCv();
                                    }}
                                    className="w-full text-left p-2 rounded-xl text-xs font-subtitle font-medium hover:bg-emerald-950/60 border border-transparent hover:border-emerald-800/50 flex items-center space-x-2 text-slate-200 cursor-pointer"
                                >
                                    <FileText size={14} className="text-emerald-400" />
                                    <span>Consulter le CV officiel</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Mascot Trigger Button */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setIsWidgetMenuOpen(!isWidgetMenuOpen);
                        playRobotSound("pop", isMuted);
                    }}
                    title="Compagnon Robot Ben"
                    className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06321f] to-[#03150d] border-2 border-emerald-500 shadow-xl shadow-emerald-950/70 cursor-pointer overflow-hidden group"
                >
                    <div className="scale-90 group-hover:scale-100 transition-transform">
                        <CyberDogMascot isWalking={false} isTalking={false} isBeaming={false} />
                    </div>

                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </motion.button>
            </div>
        </>
    );
};

export default MascotGuide;
