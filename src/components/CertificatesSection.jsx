import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/useTheme';
import { CERTIFICATES } from '../utils/data';
import { Award, Sparkles, ShieldCheck, Calendar, Check, ExternalLink } from 'lucide-react';
import { playGlassShatterSound } from '../utils/robotAudio';
import CertificateDetailModal from './CertificateDetailModal';

// Animated Finger Tap / Pointer Icon
const AnimatedTapPointer = () => (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
        {/* Concentric pulsing rings on the finger target only */}
        <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-emerald-400/40 animate-ping" />
            <span className="absolute w-8 h-8 rounded-full bg-emerald-400/60 animate-pulse" />
            
            {/* Sleek Touch / Tap Indicator SVG */}
            <motion.div
                animate={{
                    scale: [1, 0.88, 1.05, 1],
                    y: [0, -3, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative z-10 w-9 h-9 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/50 border border-white/60"
            >
                {/* Finger tap icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-slate-950"
                >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-1 9" />
                    <path d="M18 11V7a2 2 0 0 0-2-2" />
                    <path d="M10 13l-4.5-4.5a2.121 2.121 0 0 0-3 3L7 16l3 3h8a3 3 0 0 0 3-3v-5a2 2 0 0 0-2-2h-5" />
                </svg>
            </motion.div>
        </div>

        {/* Action badge text - Static without pulse as requested */}
        <div className="mt-2.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider bg-slate-950/90 backdrop-blur-md text-emerald-300 border border-emerald-400/30 shadow-lg text-center max-w-[92%]">
            <span className="truncate block">Appuyez pour briser la vitre</span>
        </div>
    </div>
);

// Dynamic Glass Shards Particles Explosion on Break
const GlassShardsExplosion = ({ originX = 150, originY = 100 }) => {
    // 24 unique polygon shards with realistic physics
    const shards = Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * (2 * Math.PI) + (Math.random() * 0.3 - 0.15);
        const distance = 140 + Math.random() * 260;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        const rotateZ = (Math.random() - 0.5) * 800;
        const rotateX = (Math.random() - 0.5) * 450;
        const rotateY = (Math.random() - 0.5) * 450;
        const size = 18 + Math.random() * 45;

        // Random sharp shards polygon
        const p1 = `${Math.random() * 35}% ${Math.random() * 30}%`;
        const p2 = `${65 + Math.random() * 35}% ${Math.random() * 40}%`;
        const p3 = `${45 + Math.random() * 55}% ${65 + Math.random() * 35}%`;
        const p4 = `${Math.random() * 35}% ${65 + Math.random() * 35}%`;
        const clipPath = `polygon(${p1}, ${p2}, ${p3}, ${p4})`;

        return {
            id: i,
            targetX,
            targetY,
            rotateZ,
            rotateX,
            rotateY,
            size,
            clipPath,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" style={{ perspective: 1200 }}>
            {/* Instant crack lightning flash */}
            <motion.div
                initial={{ opacity: 0.9, scale: 0.98 }}
                animate={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 bg-white/50 backdrop-blur-xs"
            />

            {/* Spiderweb crack lines radiating from click */}
            <motion.svg
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: [1, 0.85, 0], scale: 1.15 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full stroke-white/80"
                style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
            >
                <circle cx={originX} cy={originY} r="18" fill="none" strokeWidth="2.5" />
                <circle cx={originX} cy={originY} r="38" fill="none" strokeWidth="1.8" strokeDasharray="6 4" />
                <circle cx={originX} cy={originY} r="65" fill="none" strokeWidth="1.2" strokeDasharray="4 6" />
                <line x1={originX} y1={originY} x2={originX - 160} y2={originY - 120} strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + 170} y2={originY - 110} strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX - 180} y2={originY + 130} strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX + 190} y2={originY + 125} strokeWidth="2" />
                <line x1={originX} y1={originY} x2={originX - 190} y2={originY + 10} strokeWidth="1.6" />
                <line x1={originX} y1={originY} x2={originX + 200} y2={originY - 20} strokeWidth="1.6" />
                <line x1={originX} y1={originY} x2={originX + 15} y2={originY - 150} strokeWidth="1.6" />
                <line x1={originX} y1={originY} x2={originX - 25} y2={originY + 160} strokeWidth="1.6" />
            </motion.svg>

            {/* Cinematic Slower Exploding Shards (1.25s duration) */}
            {shards.map((s) => (
                <motion.div
                    key={s.id}
                    initial={{
                        x: originX,
                        y: originY,
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        opacity: 1,
                    }}
                    animate={{
                        x: originX + s.targetX,
                        y: originY + s.targetY + 55, // subtle gravity
                        scale: [1, 1.25, 0.55],
                        rotateX: s.rotateX,
                        rotateY: s.rotateY,
                        rotateZ: s.rotateZ,
                        opacity: [1, 0.95, 0.7, 0],
                    }}
                    transition={{
                        duration: 1.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                        position: "absolute",
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        clipPath: s.clipPath,
                        backgroundColor: "rgba(255, 255, 255, 0.65)",
                        backdropFilter: "blur(5px)",
                        border: "1.5px solid rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 8px 30px rgba(16, 185, 129, 0.4)",
                    }}
                />
            ))}
        </div>
    );
};

const CertificatesSection = () => {
    const { isDarkMode } = useTheme();
    const [selectedCert, setSelectedCert] = useState(null);
    const [shatteringId, setShatteringId] = useState(null);
    const [clickCoords, setClickCoords] = useState({ x: 150, y: 100 });
    const [activeFilter, setActiveFilter] = useState("all");

    const categories = [
        { id: "all", label: "Tous les certificats", count: CERTIFICATES.length },
        { id: "hackathon", label: "Hackathons & Concours", count: 3 },
        { id: "ai", label: "IA & Machine Learning", count: 3 },
        { id: "data", label: "Data Science & Analyse", count: 2 },
    ];

    const filteredCertificates = CERTIFICATES.filter((cert) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "hackathon") return cert.category.toLowerCase().includes("hackathon");
        if (activeFilter === "ai") return cert.skills.some(s => s.toLowerCase().includes("ai") || s.toLowerCase().includes("intelligence") || s.toLowerCase().includes("machine learning"));
        if (activeFilter === "data") return cert.category.toLowerCase().includes("data") || cert.skills.some(s => s.toLowerCase().includes("data"));
        return true;
    });

    const handleCertificateClick = (cert, e) => {
        // Calculate relative click coordinates for realistic shard origin
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setClickCoords({ x, y });

        // 1. Play crystal clear Web Audio glass shatter sound
        playGlassShatterSound(false);

        // 2. Trigger shatter animation
        setShatteringId(cert.id);

        // 3. Open full HD certificate modal after letting the user fully enjoy the shatter animation (1.25s)
        setTimeout(() => {
            setSelectedCert(cert);
            setShatteringId(null);
        }, 1250);
    };

    return (
        <section
            id="certificats"
            className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
                isDarkMode 
                    ? "bg-[#021008] border-emerald-950/60 text-slate-100" 
                    : "bg-[#f5fbf7] border-slate-200 text-slate-900"
            }`}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-emerald-500" />
                <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full blur-[140px] opacity-10 bg-teal-500" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                        isDarkMode 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                            : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    }`}>
                        <Award size={14} />
                        <span>Preuves de Compétences & Distinctions</span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                    }`}>
                        Mes Certifications & Prix.
                    </h2>

                    <p className={`text-sm md:text-base max-w-2xl mx-auto ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Chaque attestation et prix officiel est scellé sous une baie vitrée protectrice. Cliquez ou touchez n'importe quel certificat pour <strong>briser le verre</strong> et explorer le document en 3D haute résolution.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
                    {categories.map((cat) => {
                        const isActive = activeFilter === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs md:text-sm font-subtitle font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                                        : isDarkMode
                                            ? "bg-[#052316]/70 border border-emerald-900/40 text-slate-300 hover:border-emerald-700/50 hover:text-white"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 shadow-xs"
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                    isActive 
                                        ? "bg-slate-950/20 text-slate-950 font-bold" 
                                        : isDarkMode 
                                            ? "bg-emerald-950/40 text-emerald-400" 
                                            : "bg-emerald-50 text-emerald-700 font-bold"
                                }`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Certificates Interactive Grid - Centered & Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch w-full">
                    {filteredCertificates.map((cert) => {
                        const isShattering = shatteringId === cert.id;

                        return (
                            <motion.div
                                key={cert.id}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between w-full relative group ${
                                    isDarkMode
                                        ? "bg-gradient-to-b from-[#052818]/90 to-[#03180f]/95 border-emerald-900/40 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/50"
                                        : "bg-white border-slate-200/90 hover:border-emerald-500/60 shadow-sm hover:shadow-lg"
                                }`}
                            >
                                <div>
                                    {/* Top Card Info Bar */}
                                    <div className="flex items-center justify-between mb-3.5 gap-2">
                                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border truncate max-w-[65%] ${cert.tagColor}`}>
                                            {cert.badge}
                                        </span>
                                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                            {cert.date}
                                        </span>
                                    </div>

                                    {/* INTERACTIVE FROSTED GLASS PANE & CERTIFICATE IMAGE */}
                                    <div
                                        onClick={(e) => handleCertificateClick(cert, e)}
                                        className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-950 border border-emerald-500/30 cursor-pointer shadow-md group/glass select-none mb-4"
                                        style={{ perspective: 1000 }}
                                    >
                                        {/* Certificate Image (Rotates 3D Horizontally on shatter) */}
                                        <motion.div
                                            animate={
                                                isShattering
                                                    ? {
                                                          rotateY: [0, 180, 360],
                                                          scale: [1, 0.92, 1.05],
                                                      }
                                                    : { rotateY: 0, scale: 1 }
                                            }
                                            transition={{
                                                duration: 0.95,
                                                ease: "easeInOut",
                                            }}
                                            className="w-full h-full relative"
                                        >
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className={`w-full h-full object-cover transition-all duration-300 ${
                                                    isShattering
                                                        ? "filter blur-none brightness-105"
                                                        : "filter blur-[4px] brightness-90 saturate-85 group-hover/glass:blur-[2px]"
                                                }`}
                                            />
                                        </motion.div>

                                        {/* Frosted Glass Panes Overlay with Bevel & Sheen */}
                                        {!isShattering && (
                                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-white/10 to-transparent backdrop-blur-[2.5px] transition-all group-hover/glass:bg-white/5 flex flex-col items-center justify-center p-4">
                                                {/* Diagonal light reflection glint */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/glass:translate-x-full transition-transform duration-1000 pointer-events-none" />

                                                {/* Animated Pointer / Tap Icon instructing the user */}
                                                <AnimatedTapPointer />
                                            </div>
                                        )}

                                        {/* Shards Explosion on Click */}
                                        {isShattering && (
                                            <GlassShardsExplosion
                                                originX={clickCoords.x}
                                                originY={clickCoords.y}
                                            />
                                        )}
                                    </div>

                                    {/* Certificate Title & Issuer */}
                                    <h3
                                        onClick={(e) => handleCertificateClick(cert, e)}
                                        className={`font-heading font-bold text-base leading-snug mb-2 cursor-pointer transition-colors line-clamp-2 ${
                                            isDarkMode
                                                ? "text-white group-hover:text-emerald-400"
                                                : "text-slate-900 group-hover:text-emerald-700"
                                        }`}
                                    >
                                        {cert.title}
                                    </h3>

                                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-3 font-mono">
                                        <Award size={13} className="text-emerald-500 shrink-0" />
                                        <span className="truncate">{cert.issuer}</span>
                                    </div>

                                    <p className={`text-xs leading-relaxed line-clamp-3 mb-4 font-sans ${
                                        isDarkMode ? "text-slate-300" : "text-slate-600"
                                    }`}>
                                        {cert.description}
                                    </p>
                                </div>

                                {/* Bottom Card Footer */}
                                <div className={`pt-3.5 border-t flex items-center justify-between text-xs gap-2 ${
                                    isDarkMode ? "border-emerald-950/80" : "border-slate-100"
                                }`}>
                                    <div className="flex items-center space-x-1 text-[11px] font-mono text-emerald-400 min-w-0">
                                        <Check size={13} className="shrink-0" />
                                        <span className="truncate">{cert.credentialId}</span>
                                    </div>

                                    <button
                                        onClick={(e) => handleCertificateClick(cert, e)}
                                        className="inline-flex items-center space-x-1 text-xs font-subtitle font-bold text-emerald-500 hover:text-emerald-400 cursor-pointer shrink-0"
                                    >
                                        <span>Examiner</span>
                                        <ExternalLink size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Full High-Res Detail Modal with 3D animation */}
            <CertificateDetailModal
                certificate={selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </section>
    );
};

export default CertificatesSection;
