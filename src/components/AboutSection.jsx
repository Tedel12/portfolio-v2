import React, { useRef } from 'react'
import { JOURNEY_STEPS } from '../utils/data'
import { useTheme } from '../context/useTheme'
import SIGNATURE from '../assets/images/signature.png'
import { Award, FileText } from 'lucide-react'

const AboutSection = ({ onOpenCv }) => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);

    return (
        <section
            id='a-propos'
            ref={sectionRef}
            className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
                isDarkMode ? "bg-[#03110a] border-emerald-950/60 text-slate-100" : "bg-white border-slate-200 text-slate-900"
            }`}
        >
            <div className='max-w-6xl mx-auto relative z-10'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                        isDarkMode 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                            : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    }`}>
                        <Award size={13} />
                        <span>Carrière & Évolution</span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                    }`}>
                        Mon parcours professionnel.
                    </h2>

                    <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Une progression constante alliant solide socle universitaire en génie logiciel et missions professionnelles en entreprise.
                    </p>
                </div>

                <div className='grid lg:grid-cols-12 gap-12 items-start'>
                    {/* Left: Bio & Highlights */}
                    <div className='lg:col-span-5 space-y-6'>
                        <div className={`p-7 rounded-2xl border ${
                            isDarkMode ? "bg-gradient-to-b from-[#052818]/90 to-[#03180f]/95 border-emerald-900/50" : "bg-slate-50 border-slate-200"
                        }`}>
                            <h3 className={`text-lg font-heading font-bold mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                Profil de l'ingénieur
                            </h3>
                            <p className={`text-xs md:text-sm leading-relaxed mb-4 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                                Développeur Web Full-Stack et passionné d'Intelligence Artificielle. Mon objectif est d'apporter des solutions logicielles et algorithmiques concrètes aux défis réels d'entreprises.
                            </p>
                            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                Rigoureux dans la conception de modèles de données, l'architecture logicielle et la recherche appliquée en robotique (ROS2) et vision artificielle.
                            </p>

                            <div className="mt-6 pt-5 border-t border-emerald-950/60 flex items-center justify-between">
                                <button
                                    onClick={onOpenCv}
                                    className="inline-flex items-center space-x-2 text-xs font-subtitle font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                                >
                                    <FileText size={14} />
                                    <span>Consulter mon CV complet</span>
                                </button>
                                <img src={SIGNATURE} alt="Signature" className='w-20 opacity-80 filter brightness-125' />
                            </div>
                        </div>

                        {/* Languages & Highlights */}
                        <div className={`p-6 rounded-2xl border ${
                            isDarkMode ? "bg-[#041c12]/60 border-emerald-950" : "bg-white border-slate-200"
                        }`}>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                                Langues & Soft Skills
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className={`p-2.5 rounded-xl border ${
                                    isDarkMode ? "bg-[#03140c] border-emerald-950" : "bg-slate-100 border-slate-200"
                                }`}>
                                    <div className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Français</div>
                                    <div className="text-[11px] text-emerald-500 font-mono">Bilingue / Très bien</div>
                                </div>
                                <div className={`p-2.5 rounded-xl border ${
                                    isDarkMode ? "bg-[#03140c] border-emerald-950" : "bg-slate-100 border-slate-200"
                                }`}>
                                    <div className={`font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Anglais</div>
                                    <div className="text-[11px] text-slate-500 font-mono">Professionnel</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Timeline from CV */}
                    <div className='lg:col-span-7'>
                        <div className="relative border-l border-emerald-900/40 ml-4 space-y-6 pl-6">
                            {JOURNEY_STEPS.map((step, idx) => (
                                <div key={idx} className="relative group">
                                    <div className={`absolute -left-[35px] top-1.5 w-7 h-7 rounded-lg ${step.color} flex items-center justify-center text-white shadow-md shadow-emerald-950`}>
                                        <step.icon size={14} />
                                    </div>

                                    <div className={`p-5 rounded-2xl border transition-all ${
                                        isDarkMode
                                            ? "bg-[#042013]/70 border-emerald-900/40 hover:border-emerald-700/60"
                                            : "bg-white border-slate-200 hover:border-emerald-300"
                                    }`}>
                                        <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                                            <h4 className={`text-sm font-heading font-bold ${
                                                isDarkMode ? "text-white" : "text-slate-900"
                                            }`}>{step.title}</h4>
                                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                                                isDarkMode 
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}>
                                                {step.year}
                                            </span>
                                        </div>

                                        <div className="text-xs font-medium text-emerald-500 font-sans mb-2">
                                            {step.company}
                                        </div>

                                        <p className={`text-xs leading-relaxed font-sans ${
                                            isDarkMode ? "text-slate-300" : "text-slate-600"
                                        }`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection
