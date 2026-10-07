import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Calendar, ShieldCheck, CheckCircle2, Download, ExternalLink, Sparkles } from 'lucide-react';
import { useTheme } from '../context/useTheme';

const CertificateDetailModal = ({ certificate, onClose }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (certificate) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [certificate, onClose]);

    if (!certificate) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
                {/* Backdrop Blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container with 3D horizontal reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    style={{ perspective: 1200 }}
                    className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border transition-colors shadow-2xl z-10 p-5 sm:p-7 md:p-8 ${
                        isDarkMode
                            ? "bg-[#03170e]/95 border-emerald-800/60 text-slate-100 shadow-emerald-950/90"
                            : "bg-white border-slate-200 text-slate-900 shadow-2xl"
                    }`}
                >
                    {/* Header */}
                    <div className={`flex items-start justify-between pb-4 border-b mb-6 ${
                        isDarkMode ? "border-emerald-950/80" : "border-slate-200"
                    }`}>
                        <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-2xl border ${
                                isDarkMode 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                                <Award size={26} />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                    }`}>
                                        {certificate.issuer}
                                    </span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-[11px] font-mono text-slate-400">
                                        {certificate.category}
                                    </span>
                                </div>
                                <h2 className={`text-lg sm:text-2xl font-heading font-bold mt-0.5 leading-snug ${
                                    isDarkMode ? "text-white" : "text-slate-900"
                                }`}>
                                    {certificate.title}
                                </h2>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            aria-label="Fermer"
                            className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ml-2 ${
                                isDarkMode
                                    ? "border-emerald-900/60 text-slate-400 hover:text-white hover:bg-emerald-900/40"
                                    : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Certificate HD Display with subtle shine and perspective */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden border border-emerald-500/30 group bg-slate-950 shadow-xl">
                        <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-auto max-h-[480px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        {/* Top-Right Badge on image */}
                        <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 shadow-lg">
                                <ShieldCheck size={13} className="text-emerald-400" />
                                <span>Authentifié</span>
                            </span>
                        </div>
                    </div>

                    {/* Metadata Details Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {/* Left 2 Cols: Description & Signatories */}
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <h3 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                                    isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                }`}>
                                    Description & Contexte de l'obtention
                                </h3>
                                <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                    isDarkMode ? "text-slate-300" : "text-slate-700"
                                }`}>
                                    {certificate.description}
                                </p>
                            </div>

                            {certificate.partners && (
                                <div className={`p-3 rounded-xl border text-xs font-sans ${
                                    isDarkMode 
                                        ? "bg-[#042014]/60 border-emerald-950 text-slate-300" 
                                        : "bg-emerald-50/60 border-emerald-200 text-slate-700"
                                }`}>
                                    <span className="font-semibold">{certificate.partners}</span>
                                </div>
                            )}

                            {/* Skills acquired */}
                            <div>
                                <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                                    isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                }`}>
                                    Compétences Validées
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {certificate.skills.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                                                isDarkMode 
                                                    ? "bg-[#042013] border-emerald-900/60 text-emerald-300" 
                                                    : "bg-slate-100 border-slate-200 text-slate-800"
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Col: Details Card */}
                        <div className={`p-4 rounded-2xl border space-y-3.5 text-xs font-sans ${
                            isDarkMode ? "bg-[#041d11]/80 border-emerald-950" : "bg-slate-50 border-slate-200"
                        }`}>
                            <div>
                                <div className="text-[11px] text-slate-400 font-mono">Date d'attribution</div>
                                <div className={`font-semibold mt-0.5 flex items-center space-x-1.5 ${
                                    isDarkMode ? "text-white" : "text-slate-900"
                                }`}>
                                    <Calendar size={13} className="text-emerald-500" />
                                    <span>{certificate.date}</span>
                                </div>
                            </div>

                            {certificate.credentialId && (
                                <div>
                                    <div className="text-[11px] text-slate-400 font-mono">Identifiant / ID Vérification</div>
                                    <div className={`font-mono font-bold mt-0.5 text-xs ${
                                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                    }`}>
                                        {certificate.credentialId}
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="text-[11px] text-slate-400 font-mono">Signataire officiel</div>
                                <div className={`font-medium mt-0.5 text-xs ${
                                    isDarkMode ? "text-slate-200" : "text-slate-800"
                                }`}>
                                    {certificate.signatory}
                                </div>
                            </div>

                            {certificate.badge && (
                                <div className="pt-2 border-t border-emerald-950/40">
                                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                        <Sparkles size={11} />
                                        <span>{certificate.badge}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                        isDarkMode ? "border-emerald-950/80" : "border-slate-200"
                    }`}>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            <span>Vérifié pour le profil d'ingénieur de Ben</span>
                        </div>

                        <div className="flex items-center space-x-2.5">
                            <a
                                href={certificate.image}
                                download={`${certificate.id}.png`}
                                className="inline-flex items-center space-x-1.5 py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all shadow-md cursor-pointer"
                            >
                                <Download size={13} />
                                <span>Télécharger l'image</span>
                            </a>

                            <button
                                onClick={onClose}
                                className={`py-2 px-4 rounded-xl border text-xs font-subtitle font-semibold transition-colors cursor-pointer ${
                                    isDarkMode 
                                        ? "border-emerald-900/60 text-slate-300 hover:bg-emerald-950" 
                                        : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800"
                                }`}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CertificateDetailModal;
