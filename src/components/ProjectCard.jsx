import React from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react';
import { FiGithub } from 'react-icons/fi';


const ProjectCard = ({ project, index, isDarkMode }) => {
  const cardVariants = {
    hidden: { y: 20, opactiy: 0 },
    visible: { 
      y: 0,
      opactiy: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };


  return (
    <motion.div id='Projets' variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut"}}} className=''>
      <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isDarkMode ? "bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10" : "bg-white/80 border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-blue-500/10"} backdrop-blur-sm`}>

        {/* Project Image */}
        <div className='relative overflow-hidden'>
          <img src={project.image} alt={project.title} className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer' />

          {/* Featured Badge */}
          {project.featured && (
            <div className='absolute top-4 left-4'>
              <span className='bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium'>
                Phare
              </span>
            </div>
          )}

            {/* Category Badge */}
            <div className='absolute top-4 right-4'>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${isDarkMode ? "bg-gray-800/80 text-gray-300" : "bg-white/80 text-gray-700"} backdrop-blur-sm`}>
                {project.category}
              </span>
            </div>

            {/* Hover Overlay with CTA Buttons */}
            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-4'>
              <motion.a href={project.liveUrl} initial={{ opacity: 0.5 }} whileHover={{ opacity: 1, scale: 1.05 }} transition={{ duration: 0.3, delay: 0.1}} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-colors' target="_blank">
                <ExternalLink size={16} />
                <span>Démo</span>
              </motion.a>

              <motion.a href={project.githubUrl} initial={{ opacity: 0.5 }} whileHover={{ opacity: 1, scale: 1.05 }} transition={{ duration: 0.3, delay: 0.2}} className={`border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all`} target="_blank">
                <FiGithub size={16} />
                <span>Code</span>
              </motion.a>
            </motion.div>

        </div>


        {/* Project Details */}
        <div className='p-6'>
          <h3 className='text-xl font-medium mb-3 group-hover:text-blue-500 transition-colors cursor-pointer'>
            {project.title}
          </h3>

          <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {project.description}
          </p>


          {/* Tech Stack Tags */}
          <div className='flex flex-wrap gap-2'>
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default ProjectCard