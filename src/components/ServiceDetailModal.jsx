import React from 'react'
import { X, Clock, Banknote, CheckCircle2, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/useTheme'

const ServiceDetailModal = ({ service, onClose, onContactClick }) => {
    const { isDarkMode } = useTheme();
    if (!service) return null;

    const ServiceIcon = service.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md">
            <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border transition-colors shadow-2xl p-4 sm:p-6 md:p-8 ${
                isDarkMode 
                    ? "border-emerald-800/50 bg-[#03180e] text-slate-100" 
                    : "border-slate-200 bg-white text-slate-900"
            }`}>
                {/* Header */}
                <div className={`flex items-start justify-between pb-3 sm:pb-4 border-b mb-5 sm:mb-6 ${
                    isDarkMode ? "border-emerald-900/50" : "border-slate-200"
                }`}>
                    <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 mr-2">
                        <div className={`p-2 sm:p-3 rounded-xl border shrink-0 ${
                            isDarkMode 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                            <ServiceIcon size={20} className="sm:w-[24px] sm:h-[24px]" />
                        </div>
                        <div className="min-w-0">
                            <span className={`text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider block truncate ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-700"
                            }`}>
                                {service.subCategory}
                            </span>
                            <h2 className={`text-sm sm:text-xl md:text-2xl font-heading font-bold truncate ${
                                isDarkMode ? "text-white" : "text-slate-900"
                            }`}>
                                {service.title}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDarkMode 
                                ? "border-emerald-900/50 text-slate-400 hover:text-white hover:bg-emerald-900/30" 
                                : "border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 text-sm">
                    <div>
                        <h3 className={`font-subtitle font-bold mb-2 text-xs uppercase tracking-wider ${
                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                        }`}>
                            Périmètre & Description
                        </h3>
                        <p className={`leading-relaxed font-sans ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                            {service.description}
                        </p>
                    </div>

                    {/* Features Detailed */}
                    <div>
                        <h3 className={`font-subtitle font-bold mb-3 text-xs uppercase tracking-wider ${
                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                        }`}>
                            Ce qui est inclus dans la prestation
                        </h3>
                        <div className="space-y-2.5">
                            {service.features.map((feat, idx) => (
                                <div key={idx} className={`flex items-start space-x-3 p-2.5 rounded-xl border ${
                                    isDarkMode 
                                        ? "bg-[#041d12]/70 border-emerald-950" 
                                        : "bg-slate-50 border-slate-200"
                                }`}>
                                    <div className={`p-1 rounded-full mt-0.5 shrink-0 ${
                                        isDarkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                                    }`}>
                                        <CheckCircle2 size={13} />
                                    </div>
                                    <span className={`text-xs ${isDarkMode ? "text-slate-200" : "text-slate-700 font-medium"}`}>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deliverables */}
                    <div className={`p-4 rounded-xl border ${
                        isDarkMode 
                            ? "bg-[#052618]/70 border-emerald-900/50" 
                            : "bg-emerald-50/60 border-emerald-200"
                    }`}>
                        <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                            isDarkMode ? "text-emerald-400" : "text-emerald-800"
                        }`}>
                            Livrables concrets garantis
                        </h4>
                        <ul className={`space-y-1.5 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                            {service.deliverables.map((del, dIdx) => (
                                <li key={dIdx} className="flex items-center space-x-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? "bg-emerald-400" : "bg-emerald-600"}`} />
                                    <span>{del}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Timeline & Price */}
                    <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${
                        isDarkMode ? "bg-[#03150d] border-emerald-950" : "bg-slate-50 border-slate-200"
                    }`}>
                        <div>
                            <div className={`flex items-center space-x-1.5 text-xs mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                <Clock size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-700"} />
                                <span>Délai estimé</span>
                            </div>
                            <div className={`font-subtitle font-semibold text-xs ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                {service.timeline}
                            </div>
                        </div>

                        <div>
                            <div className={`flex items-center space-x-1.5 text-xs mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                <Banknote size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-700"} />
                                <span>Tarif & Modalités</span>
                            </div>
                            <div className={`font-mono font-bold text-xs ${isDarkMode ? "text-emerald-400" : "text-emerald-700 font-bold"}`}>
                                {service.price}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className={`mt-8 pt-4 border-t flex items-center justify-end space-x-3 ${
                    isDarkMode ? "border-emerald-900/50" : "border-slate-200"
                }`}>
                    <button
                        onClick={onClose}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-subtitle font-semibold transition-colors cursor-pointer ${
                            isDarkMode 
                                ? "border-emerald-900 text-slate-300 hover:bg-emerald-950" 
                                : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800"
                        }`}
                    >
                        Fermer
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            onContactClick(service.title);
                        }}
                        className={`py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                            isDarkMode ? "shadow-md shadow-emerald-950" : "shadow-sm shadow-emerald-600/20"
                        }`}
                    >
                        <span>Commander ce service</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal
