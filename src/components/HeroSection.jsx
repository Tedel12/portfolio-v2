import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useScroll, useTransform } from 'motion/react';
import { motion } from 'motion/react'; 
import PROFILE_PIC from "../assets/images/profile-img.jpg"
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { ArrowDown, Mail } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/helper';

const HeroSection = () => {

    const { isDarkMode } = useTheme();

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView( {behavior: 'smooth' });
        }
    };




    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };


    const imageVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration:  1,
                ease: "easeOut",
                delay: 0.5,
            },
        },
    };

  return (
    <div
        className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900" } `}
    >
      {/* Hero Section */}
      <motion.section id='home' style={{ y: heroY }} className='min-h-screen flex items-center justify-center relative px-6 pt-10'>
        <div className='absolute inset-0 overflow-hidden'>
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360],}} transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
            }} className={`
                absolute top-20 right-20 w-64 h-64 rounded-full blur-2xl opacity-10 ${isDarkMode ? "bg-blue-500" : "bg-blue-400" 

            }`}/>

            <motion.div animate={{scale: [1.1, 1, 1.1], rotate: [360, 180, 0], }} transition={{ duration: 25, repeat: Infinity, ease: "linear",}} className={`absolute bottom-20 mt-10 left-1 w-48 h-48 rounded-full blur-3xl ${isDarkMode ? "bg-purple-500" : 'bg-purple-400/50' }`} />

            <div className="max-w-7xl mx-auto z-10 mt-20">
                {/* Mobile Layout - Centered */}
                <div className='block lg:hidden'>
                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className='text-center'>
                        {/* Profile Image - Mobile */}
                        <motion.div variants={imageVariants} className='mb-8'>
                            <div className='w-32 h-32 mx-auto relative'>
                            <motion.div whileHover={{ scale: 1.05 }} className={`w-full rounded-full overflow-hidden border-4 ${isDarkMode ? "border-gray-800" : "border-gray-400" } shadow-2xl `} >
                                <img src={PROFILE_PIC} alt="Profile" className='w-full h-full  object-cover' />
                            </motion.div>

                            {/* Decorative ring */}
                            <motion.div 
                                animate={{ rotate: 360}} 
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }} 
                                className='absolute -inset-2 rounded-2xl border border-blue-500/40'
                            />
                            <motion.div 
                                animate={{ rotate: -360}} 
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }} 
                                className='absolute -inset-4 rounded-3xl border border-purple-500/30'
                            />
                            </div>
                        </motion.div>

                        {/* Content - Mobile */}
                        <motion.div variants={textVariants} className={`text-sm uppercase font-semibold tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-800" } mb-4`}>
                            Développeur Full-Stack
                        </motion.div>

                        <motion.h1 variants={itemVariants} className='text-3xl font-semibold md:text-5xl mb-6 leading-tight'>
                            <span className={`${isDarkMode ? "text-white" : "text-gray-900" }`}>Créer des expériences</span>
                            <span className='text-blue-500 font-semibold ml-2'>numériques</span>
                            <br />
                            <span className={isDarkMode ? "text-white" : "text-gray-900" }>qui comptent</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className={`text-base md:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4 max-w-xl mx-auto font-light leading-relaxed`}>
                            Je conçois des applications web esthétiques et fonctionnelles, utilisant des technologies modernes et offrant une expérience utilisateur soignée.
                        </motion.p>

                        {/* CTA ButtOns - Mobile */}
                        <motion.div variants={itemVariants} className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-4'>
                            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => scrollToSection('work')}  className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer'>
                                Voir mon travail
                            </motion.button>
                            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => scrollToSection("contact")} className={`border ${isDarkMode ? "border-gray-700 hover:bg-gray-600 text-gray-300" : "border-gray-300 hover:bg-gray-400 text-gray-700" } px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium cursor-pointer`} >
                                Prendre Contact
                            </motion.button>
                        </motion.div>

                        {/* Social Links - Mobile */}
                        <motion.div variants={itemVariants} className='flex justify-center space-x-6 mb-2'>
                            {[
                                { icon: FiGithub, href: "https://github.com/Tedel12" },
                                { icon: FiLinkedin, href: "#" },
                                { icon: Mail, href: "#" },
                            ].map((social, index) => (
                                <motion.a key={index} href={social.href} whileHover={{ y: -3, scale: 1.1 }}  className={`p-3 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200" }`}>
                                    <social.icon size={20} />
                                </motion.a>
                            ))} 
                        </motion.div>

                        {/* Tech stack - Mobile */}
                        <motion.div variants={itemVariants} className='flex justify-center items-center space-x-3 text-xs uppercase tracking-widest flex-wrap'>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>React.js</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>Node.js</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>TypeScript</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>MongoDB</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Desktop Layout - Split */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center py-10 px-10 xl:px-20">

                    {/* Left Content - Desktop */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col max-w-xl"
                    >
                        {/* Subtitle */}
                        <motion.div
                            variants={textVariants}
                            className={`text-xl uppercase font-sm tracking-wider mb-4 
                            ${isDarkMode ? "text-gray-500" : "text-gray-800"}`}
                        >
                            Développeur Full-Stack
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl xl:text-6xl font-semibold mb-3"
                        >
                            <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                Créer des expériences
                            </span> 
                            <span className="text-blue-500 font-semibold ml-4">
                                numériques
                            </span>
                        
                            <br />
                            <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                                qui comptent
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className={`text-sm md:text-base mb-4 leading-relaxed 
                        ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Je conçois des applications web esthétiques et fonctionnelles,
                        en utilisant des technologies modernes pour offrir une expérience
                        utilisateur soignée.
                    </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex space-x-4 mb-6"
                        >
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollToSection("work")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full 
                                text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer"
                            >
                                Voir mon travail
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollToSection("contact")}
                                className={`border px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer
                                ${isDarkMode ? "border-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "border-gray-300 hover:bg-gray-400 text-gray-700"}`}
                            >
                                Prendre Contact
                            </motion.button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex space-x-4 mb-6"
                        >
                            {[
                                { icon: FiGithub, href: "https://github.com/Tedel12" },
                                { icon: FiLinkedin, href: "#" },
                                { icon: Mail, href: "#" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className={`p-3 rounded-full transition-colors
                                    ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-3 text-xs uppercase tracking-widest"
                        >
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>React.js</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>Node.js</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>TypeScript</span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                            <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>MongoDB</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Image - Desktop */}
                    <motion.div
                        initial="hidden" animate="visible" variants={imageVariants} className='flex justify-center lg:justify-end mt-10 lg:mt-0'>
                        <div className='w-72 h-72 lg:w-96 lg:h-96 relative'>
                            {/* Tech Stack */}
                            <motion.div
                                variants={itemVariants}
                                className="flex mb-6 flex-wrap gap-3 text-xs uppercase tracking-widest"
                            >
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>Compétences</span>
                                <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>DISCIPLINE</span>
                                <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>|</span>
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-500"}>RESILIENCE</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className={`w-80 rounded-3xl overflow-hidden border-2 ${isDarkMode ? "border-gray-800" : "border-gray-400" } shadow-2xl `} >
                                <img src={PROFILE_PIC} alt="Profile" className='w-80 h-80  object-cover' />
                            </motion.div>
                            {/* Decorative ring */}
                            <motion.div 
                                animate={{ rotate: 360}} 
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }} 
                                className='absolute -inset-2 rounded-3xl border border-purple-500/30'
                            />
                            <motion.div 
                                animate={{ rotate: -360}} 
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }} 
                                className='absolute -inset-8 rounded-3xl border border-purple-500/30'
                            />
                        </div>

                    </motion.div>

                </div>

            </div>
            {/* Scroll Indicator */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity}} className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
                <ArrowDown size={20} className={isDarkMode ? "text-gray-600" : "text-gray-400" } />
            </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default HeroSection
