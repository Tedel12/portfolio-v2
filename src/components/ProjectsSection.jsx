import React from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, Code2, Globe, Zap, Users } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { PORJECTS } from '../utils/data'
import ProjectCard from '../components/ProjectCard';
import { containerVariants, itemVariants } from '../utils/helper';

const ProjectsSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px"});
  return (
    <section className={`py-20 px-6 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} relative overflow-hidden`} id='work' ref={sectionRef}>

        {/* Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
            <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
            <div className={`absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
        </div>

        <div className='max-w-7xl mx-auto relative z-10'>
            {/* Section Header */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className='text-center mb-20'>
                <motion.div variants={itemVariants} className={`text-2xl uppercase tracking-widest font-semibold ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                    Projets phares
                </motion.div>

                <motion.h2 variants={itemVariants} className='text-2xl md:text-2xl font-light mb-4'>
                    Récents
                    <span className='text-blue-500 font-medium'> projets</span>
                </motion.h2>

                <motion.p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto font-light`}>
                    Une collection de projets qui mettent en valeur mon expertise dans la création d'application web modernes et la résolution de problèmes complexes.
                </motion.p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {PORJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} isDarkMode={isDarkMode} />
                ))}
            </motion.div>

        </div>

    </section>
  )
}

export default ProjectsSection
