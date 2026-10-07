import React from 'react'
import { useTheme } from '../context/useTheme'
import { motion } from 'motion/react'
import PROFILE_PIC from "../assets/images/profile-img.jpg"
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { Mail, FileDown, CheckCircle2, ArrowRight, Bot, Cpu, Smartphone, Layers } from 'lucide-react'
import { containerVariants, itemVariants } from '../utils/helper'

const HeroSection = () => {
    const { isDarkMode } = useTheme();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id='accueil'
            className={`min-h-screen flex items-center justify-center relative px-4 md:px-8 pt-28 pb-16 transition-colors ${
                isDarkMode ? "bg-[#03110a] text-slate-100" : "bg-[#f4f9f6] text-slate-900"
            }`}
        >
            {/* Ambient Dark Emerald lighting */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 bg-emerald-500" />
                <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 bg-teal-600" />
            </div>

            <div className="max-w-7xl mx-auto z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left Column */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="lg:col-span-7 flex flex-col justify-center text-left"
                    >
                        {/* Status Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
                            <span className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-subtitle font-semibold border ${
                                isDarkMode 
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                    : "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs"
                            }`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? "bg-emerald-400" : "bg-emerald-600"}`} />
                                <span>Disponible pour Projets & R&D (Freelance / CDI)</span>
                            </span>
                        </motion.div>

                        {/* Heading with font-sora */}
                        <motion.h1
                            variants={itemVariants}
                            className={`text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-5 leading-tight ${
                                isDarkMode ? "text-white" : "text-slate-900"
                            }`}
                        >
                            Ben Ephraïm Agbannon
                            <br />
                            <span className={`font-semibold text-2xl sm:text-3xl lg:text-4xl block mt-2 ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-600"
                            }`}>
                                Ingénieur Logiciel & IA
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className={`text-sm sm:text-base mb-8 leading-relaxed max-w-2xl font-sans ${
                                isDarkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                        >
                            Spécialiste <strong>Full-Stack, Mobile (Flutter / React Native)</strong> et <strong>Systèmes Intelligents</strong> : Machine Learning, Deep Learning, Embedded AI (TinyML), recherche vectorielle (embeddings), visualisation de données et robotique autonome sous <strong>ROS2 & Physical AI</strong>.
                        </motion.p>

                        {/* Interactive Pill-like badges for expertise */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-subtitle font-medium border ${
                                isDarkMode 
                                    ? "bg-[#052618] border-emerald-900/60 text-emerald-300" 
                                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                            }`}>
                                <Bot size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />
                                <span>Physical AI & ROS2</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-subtitle font-medium border ${
                                isDarkMode 
                                    ? "bg-[#052618] border-emerald-900/60 text-emerald-300" 
                                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                            }`}>
                                <Cpu size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />
                                <span>ML, DL & TinyML</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-subtitle font-medium border ${
                                isDarkMode 
                                    ? "bg-[#052618] border-emerald-900/60 text-emerald-300" 
                                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                            }`}>
                                <Smartphone size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />
                                <span>Mobile Cross-Platform</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-subtitle font-medium border ${
                                isDarkMode 
                                    ? "bg-[#052618] border-emerald-900/60 text-emerald-300" 
                                    : "bg-white border-slate-200 text-slate-800 shadow-xs"
                            }`}>
                                <Layers size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />
                                <span>Architectures SaaS Scalables</span>
                            </span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-3.5 mb-8"
                        >
                            <button
                                onClick={() => scrollToSection("services")}
                                className={`px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-subtitle font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                                    isDarkMode ? "shadow-lg shadow-emerald-950/60" : "shadow-md shadow-emerald-600/20"
                                }`}
                            >
                                <span>Découvrir mes services</span>
                                <ArrowRight size={15} />
                            </button>

                            <a
                                href="/mon-cv-off.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download="CV_Ben_Ephraim_Agbannon.pdf"
                                className={`inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-subtitle font-semibold text-xs uppercase tracking-wider border transition-all ${
                                    isDarkMode
                                        ? "bg-[#042013] border-emerald-900/60 hover:bg-[#07321e] text-slate-200"
                                        : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-xs"
                                }`}
                            >
                                <FileDown size={15} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />
                                <span>Télécharger mon CV</span>
                            </a>

                            <button
                                onClick={() => scrollToSection("contact")}
                                className={`px-5 py-3 rounded-xl font-subtitle font-medium text-xs border transition-colors cursor-pointer ${
                                    isDarkMode
                                        ? "border-emerald-950 hover:border-emerald-800 text-slate-400 hover:text-white"
                                        : "border-slate-300 hover:border-slate-400 text-slate-700 bg-white"
                                }`}
                            >
                                Me contacter
                            </button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center space-x-3 text-sm"
                        >
                            <span className={`text-[11px] font-mono uppercase tracking-wider ${
                                isDarkMode ? "text-slate-400" : "text-slate-600"
                            }`}>
                                Réseaux vérifiés :
                            </span>
                            <a
                                href="https://github.com/Tedel12"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className={`p-2.5 rounded-lg border transition-colors ${
                                    isDarkMode 
                                        ? "border-emerald-900/40 bg-[#041c12] text-slate-300 hover:text-emerald-400 hover:border-emerald-600" 
                                        : "border-slate-200 bg-white text-slate-700 hover:text-emerald-600 hover:border-emerald-400 shadow-xs"
                                }`}
                            >
                                <FiGithub size={16} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ben-ephra%C3%AFm-agbannon-948819311"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className={`p-2.5 rounded-lg border transition-colors ${
                                    isDarkMode 
                                        ? "border-emerald-900/40 bg-[#041c12] text-slate-300 hover:text-emerald-400 hover:border-emerald-600" 
                                        : "border-slate-200 bg-white text-slate-700 hover:text-emerald-600 hover:border-emerald-400 shadow-xs"
                                }`}
                            >
                                <FiLinkedin size={16} />
                            </a>
                            <a
                                href="mailto:benagbannon@gmail.com"
                                aria-label="Email"
                                className={`p-2.5 rounded-lg border transition-colors ${
                                    isDarkMode 
                                        ? "border-emerald-900/40 bg-[#041c12] text-slate-300 hover:text-emerald-400 hover:border-emerald-600" 
                                        : "border-slate-200 bg-white text-slate-700 hover:text-emerald-600 hover:border-emerald-400 shadow-xs"
                                }`}
                            >
                                <Mail size={16} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-5 flex justify-center"
                    >
                        <div className="relative w-full max-w-sm">
                            <div className={`rounded-2xl overflow-hidden border p-3.5 transition-all ${
                                isDarkMode 
                                    ? "bg-gradient-to-b from-[#052818] to-[#03180f] border-emerald-900/60 shadow-2xl shadow-emerald-950" 
                                    : "bg-white border-slate-200 shadow-xl"
                            }`}>
                                <img
                                    src={PROFILE_PIC}
                                    alt="Ben Ephraïm Agbannon"
                                    className="w-full h-80 object-cover rounded-xl"
                                />

                                <div className="mt-4 px-2 pb-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`font-heading font-bold text-sm ${
                                                isDarkMode ? "text-white" : "text-slate-900"
                                            }`}>
                                                Ben Ephraïm Agbannon
                                            </div>
                                            <div className={`text-xs ${
                                                isDarkMode ? "text-slate-400" : "text-slate-500"
                                            }`}>
                                                Abomey-Calavi, Atlantique, Bénin
                                            </div>
                                        </div>
                                        <div className={`flex items-center space-x-1 text-xs font-mono font-medium ${
                                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                        }`}>
                                            <CheckCircle2 size={13} />
                                            <span>Disponible</span>
                                        </div>
                                    </div>

                                    {/* Real credentials from CV */}
                                    <div className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                                        isDarkMode ? "border-emerald-950 text-emerald-400" : "border-slate-200 text-emerald-700 font-semibold"
                                    }`}>
                                        <span>Licence SIL (ISM Adonaï)</span>
                                        <span>BEST EXPERTS GROUP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection
