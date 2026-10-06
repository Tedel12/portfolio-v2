import React from 'react'
import { useTheme } from '../context/useTheme'
import { PROCESS_STEPS } from '../utils/data'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const ProcessSection = ({ onStartProjectClick }) => {
    const { isDarkMode } = useTheme();

    return (
        <section id="process" className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
            isDarkMode 
                ? "bg-[#021008] border-emerald-950/60 text-slate-100" 
                : "bg-[#f5fbf7] border-slate-200 text-slate-900"
        }`}>
            {/* Emerald ambient lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 bg-emerald-500" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                            ÉTAPE PAR ÉTAPE
                        </span>
                        {/* Process colorful pill dots from capture 3 */}
                        <div className="flex items-center space-x-1.5">
                            <span className="w-6 h-1.5 rounded-full bg-emerald-500" />
                            <span className="w-6 h-1.5 rounded-full bg-amber-500" />
                            <span className="w-6 h-1.5 rounded-full bg-blue-500" />
                            <span className="w-6 h-1.5 rounded-full bg-red-500" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
                        Mon process.
                    </h2>

                    <p className={`text-sm md:text-base max-w-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        De la première idée au lancement. Pas de surprise, que des résultats.
                    </p>
                </div>

                {/* Alternating Process Timeline (Fidèle à la Capture 3) */}
                <div className="relative py-8">
                    {/* Vertical Connecting Center Line */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-emerald-900/40" />

                    <div className="space-y-16">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            const StepIcon = step.icon;

                            return (
                                <div
                                    key={step.stepNumber}
                                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                                >
                                    {/* Left Card / Main Step Card */}
                                    <div className="w-full lg:w-[45%]">
                                        <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                                            isDarkMode
                                                ? "bg-gradient-to-br from-[#052818]/90 to-[#031910]/95 border-emerald-900/50 hover:border-emerald-500/50 shadow-xl"
                                                : "bg-white border-slate-200 shadow-md"
                                        }`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <StepIcon size={22} />
                                                </div>
                                                <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md border ${step.badgeBg}`}>
                                                    {step.meta}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
                                                {step.title}
                                            </h3>

                                            <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Ribbon / Step Indicator (Fidèle à la Capture 3) */}
                                    <div className="shrink-0 flex items-center justify-center z-10">
                                        <div className={`w-14 h-24 md:w-16 md:h-28 rounded-xl bg-gradient-to-b ${step.accentColor} flex flex-col items-center justify-center text-slate-950 font-bold shadow-lg shadow-black/50 border border-white/20`}>
                                            <span className="text-xl md:text-2xl font-heading font-extrabold leading-none">
                                                {step.stepNumber}
                                            </span>
                                            <span className="text-[9px] font-mono tracking-widest uppercase mt-1 opacity-90">
                                                {step.stepTag}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Note / Explanation Side Box */}
                                    <div className="w-full lg:w-[45%]">
                                        <div className={`p-6 rounded-2xl border ${
                                            isDarkMode
                                                ? "bg-[#03170e]/50 border-emerald-950/60"
                                                : "bg-emerald-50/50 border-emerald-100"
                                        }`}>
                                            <p className={`text-xs md:text-sm leading-relaxed font-sans ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                                                {step.sideNote}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Callout */}
                <div className="mt-16 text-center">
                    <button
                        onClick={onStartProjectClick}
                        className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-subtitle font-bold text-sm transition-all shadow-lg shadow-emerald-950/60 cursor-pointer"
                    >
                        <span>Démarrer un projet avec cette méthode</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection

