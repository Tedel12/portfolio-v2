import React from 'react'
import { X, FileDown, ExternalLink } from 'lucide-react'

const CvViewerModal = ({ isOpen, onClose, isDarkMode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md">
            <div className={`relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border transition-all shadow-2xl overflow-hidden ${
                isDarkMode 
                    ? "bg-[#03150d] border-emerald-800/60 text-slate-100" 
                    : "bg-white border-slate-200 text-slate-900"
            }`}>
                {/* Modal Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
                    isDarkMode ? "border-emerald-950/80 bg-[#041c12]/80" : "border-slate-200 bg-slate-50"
                }`}>
                    <div>
                        <h2 className="text-base md:text-lg font-heading font-bold text-white">
                            Curriculum Vitae Officiel
                        </h2>
                        <p className="text-xs text-emerald-400 font-mono">
                            Ben Ephraïm Agbannon • Ingénieur Logiciel & IA
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Download button */}
                        <a
                            href="/mon-cv-off.pdf"
                            download="CV_Ben_Ephraim_Agbannon.pdf"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all shadow-sm"
                        >
                            <FileDown size={14} />
                            <span>Télécharger</span>
                        </a>

                        {/* Open external tab */}
                        <a
                            href="/mon-cv-off.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ouvrir dans un nouvel onglet"
                            className={`p-1.5 rounded-lg border transition-colors ${
                                isDarkMode 
                                    ? "border-emerald-900/60 hover:bg-emerald-900/40 text-slate-300" 
                                    : "border-slate-200 hover:bg-slate-100 text-slate-700"
                            }`}
                        >
                            <ExternalLink size={15} />
                        </a>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            aria-label="Fermer"
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                isDarkMode 
                                    ? "border-emerald-900/60 hover:bg-emerald-900/40 text-slate-300 hover:text-white" 
                                    : "border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                            }`}
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer Frame */}
                <div className="flex-1 w-full h-full bg-slate-900 relative">
                    <iframe
                        src="/mon-cv-off.pdf#view=FitH"
                        title="CV Officiel Ben Ephraïm Agbannon"
                        className="w-full h-full border-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default CvViewerModal

