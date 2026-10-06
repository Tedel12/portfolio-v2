import React, { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useTheme } from '../context/useTheme'
import { PROJECTS } from '../utils/data'
import ProjectCard from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'
import { containerVariants, itemVariants } from '../utils/helper'
import { Sparkles } from 'lucide-react'

const categories = ["Tous", "Full-Stack", "Frontend"];

const ProjectsSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const [activeCategory, setActiveCategory] = useState("Tous");
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = activeCategory === "Tous"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeCategory);

    return (
        <section
            id='projets'
            ref={sectionRef}
            className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
                isDarkMode 
                    ? "bg-[#03110a] border-emerald-950/60 text-slate-100" 
                    : "bg-[#f4f9f6] border-slate-200 text-slate-900"
            }`}
        >
            {/* Emerald ambient background glow - No purple! */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-10 ${
                    isDarkMode ? "bg-emerald-500" : "bg-emerald-300"
                }`} />
                <div className={`absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-[160px] opacity-10 ${
                    isDarkMode ? "bg-teal-600" : "bg-teal-200"
                }`} />
            </div>

            <div className='max-w-7xl mx-auto relative z-10'>
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className='text-center mb-12'
                >
                    <motion.div
                        variants={itemVariants}
                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                            isDarkMode 
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        }`}
                    >
                        <Sparkles size={13} />
                        <span>Réalisations & Livrables</span>
                    </motion.div>

                    <motion.h2 
                        variants={itemVariants} 
                        className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
                            isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                    >
                        Projets Sélectionnés.
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-sm md:text-base ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                        } max-w-2xl mx-auto`}
                    >
                        Applications web et mobiles fonctionnelles conçues avec rigueur : code source auditable, interfaces soignées et problématiques concrètes.
                    </motion.p>
                </motion.div>

                {/* Category Filter Tabs - Pure Emerald / Slate theme */}
                <div className="flex justify-center mb-12">
                    <div className={`inline-flex p-1 rounded-xl border ${
                        isDarkMode 
                            ? "bg-[#052618]/80 border-emerald-900/50" 
                            : "bg-white border-slate-200 shadow-sm"
                    }`}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-lg text-xs md:text-sm font-subtitle font-bold transition-all cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40"
                                        : isDarkMode
                                            ? "text-slate-400 hover:text-white"
                                            : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isDarkMode={isDarkMode}
                            onSelectProject={(p) => setSelectedProject(p)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Case Study Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                isDarkMode={isDarkMode}
            />
        </section>
    );
};

export default ProjectsSection
