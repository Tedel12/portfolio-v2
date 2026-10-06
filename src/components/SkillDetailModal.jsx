import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ExternalLink, Sparkles, CheckCircle2, Bookmark, Code2 } from 'lucide-react'
import { useTheme } from '../context/useTheme'

const SkillDetailModal = ({ tech, onClose }) => {
  const { isDarkMode } = useTheme();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (tech) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tech, onClose]);

  if (!tech) return null;

  const IconComponent = tech.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`relative w-full max-w-2xl rounded-2xl border p-6 md:p-8 shadow-2xl z-10 my-8 transition-colors ${
            isDarkMode
              ? "bg-[#03180f] border-emerald-900/60 text-slate-100 shadow-emerald-950/80"
              : "bg-white border-slate-200 text-slate-900 shadow-xl"
          }`}
        >
          {/* Top Bar: Icon, Name, Category & Close Button */}
          <div className="flex items-start justify-between pb-5 border-b border-emerald-950/60 mb-6">
            <div className="flex items-center space-x-4">
              {/* Raw brand icon without container or background */}
              <div className="shrink-0 flex items-center justify-center w-12 h-12">
                {IconComponent && (
                  <IconComponent 
                    size={38} 
                    style={{ color: tech.iconColor || "#10b981" }} 
                  />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2.5 mb-1">
                  <h3 className={`text-2xl font-heading font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {tech.name}
                  </h3>
                </div>
                {tech.category && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium ${
                    isDarkMode 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {tech.category}
                  </span>
                )}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? "border-emerald-900/60 text-slate-400 hover:text-white hover:bg-emerald-900/30"
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Fermer la modale"
            >
              <X size={18} />
            </button>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center space-x-1.5 ${
              isDarkMode ? "text-emerald-400" : "text-emerald-700"
            }`}>
              <Bookmark size={13} />
              <span>Présentation & Rôle Technique</span>
            </h4>
            <p className={`text-sm md:text-base leading-relaxed ${
              isDarkMode ? "text-slate-200" : "text-slate-700"
            }`}>
              {tech.description}
            </p>
          </div>

          {/* Concrete Implementation by Ben */}
          <div className={`p-5 rounded-xl border mb-6 ${
            isDarkMode 
              ? "bg-[#05281a]/70 border-emerald-800/60" 
              : "bg-emerald-50/70 border-emerald-200"
          }`}>
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-2 ${
              isDarkMode ? "text-emerald-300" : "text-emerald-800"
            }`}>
              <Sparkles size={14} className="text-emerald-400" />
              <span>Comment Ben l'utilise dans ses projets</span>
            </h4>
            <p className={`text-xs md:text-sm leading-relaxed ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}>
              {tech.benUsage || "Intégré dans les architectures de production avec respect des meilleures pratiques, couverture de tests et performances optimales."}
            </p>
          </div>

          {/* Key Highlights / Points forts */}
          {tech.keyHighlights && tech.keyHighlights.length > 0 && (
            <div className="mb-6">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5 ${
                isDarkMode ? "text-emerald-400" : "text-emerald-700"
              }`}>
                <CheckCircle2 size={13} />
                <span>Points Clés & Spécifications</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {tech.keyHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className={`flex items-start space-x-2.5 p-2.5 rounded-lg border text-xs ${
                      isDarkMode
                        ? "bg-[#041d13]/50 border-emerald-950/70 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions: Official Documentation Link */}
          <div className="pt-4 border-t border-emerald-950/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
              <Code2 size={14} />
              <span>Stack vérifiée en production</span>
            </div>

            {tech.officialDocUrl && (
              <a
                href={tech.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-subtitle font-bold text-xs transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer"
              >
                <span>Documentation officielle</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SkillDetailModal;

