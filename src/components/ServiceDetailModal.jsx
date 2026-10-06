import React from 'react'
import { X, Clock, Banknote, CheckCircle2, ArrowRight } from 'lucide-react'

const ServiceDetailModal = ({ service, onClose, onContactClick }) => {
    if (!service) return null;

    const ServiceIcon = service.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-800/50 bg-[#03180e] text-slate-100 shadow-2xl p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-emerald-900/50 mb-6">
                    <div className="flex items-center space-x-3.5">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <ServiceIcon size={24} />
                        </div>
                        <div>
                            <span className="text-[11px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
                                {service.subCategory}
                            </span>
                            <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                                {service.title}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg border border-emerald-900/50 text-slate-400 hover:text-white hover:bg-emerald-900/30 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 text-sm">
                    <div>
                        <h3 className="font-subtitle font-bold text-white mb-2 text-xs uppercase tracking-wider text-emerald-400">
                            Périmètre & Description
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-sans">
                            {service.description}
                        </p>
                    </div>

                    {/* Features Detailed */}
                    <div>
                        <h3 className="font-subtitle font-bold text-white mb-3 text-xs uppercase tracking-wider text-emerald-400">
                            Ce qui est inclus dans la prestation
                        </h3>
                        <div className="space-y-2.5">
                            {service.features.map((feat, idx) => (
                                <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-xl bg-[#041d12]/70 border border-emerald-950">
                                    <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                                        <CheckCircle2 size={13} />
                                    </div>
                                    <span className="text-xs text-slate-200">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deliverables */}
                    <div className="p-4 rounded-xl bg-[#052618]/70 border border-emerald-900/50">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
                            Livrables concrets garantis
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                            {service.deliverables.map((del, dIdx) => (
                                <li key={dIdx} className="flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>{del}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Timeline & Price */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#03150d] border border-emerald-950">
                        <div>
                            <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
                                <Clock size={13} className="text-emerald-400" />
                                <span>Délai estimé</span>
                            </div>
                            <div className="font-subtitle font-semibold text-xs text-white">
                                {service.timeline}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
                                <Banknote size={13} className="text-emerald-400" />
                                <span>Tarif & Modalités</span>
                            </div>
                            <div className="font-mono font-bold text-xs text-emerald-400">
                                {service.price}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 pt-4 border-t border-emerald-900/50 flex items-center justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="py-2.5 px-4 rounded-xl border border-emerald-900 text-xs font-subtitle font-semibold text-slate-300 hover:bg-emerald-950 transition-colors cursor-pointer"
                    >
                        Fermer
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            onContactClick(service.title);
                        }}
                        className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all shadow-md shadow-emerald-950 flex items-center space-x-2 cursor-pointer"
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
