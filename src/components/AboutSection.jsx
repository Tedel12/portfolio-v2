import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { containerVariants, itemVariants } from '../utils/helper'
import { JOURNEY_STEPS, PASSIONS } from '../utils/data'
import { useTheme } from '../context/ThemeContext'
import SIGNATURE from '../assets/images/signature.png'

const AboutSection = () => {
    const { isDarkMode } = useTheme()
    const sectionRef = useRef(null)
    const timelineRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const timelineInView = useInView(timelineRef, {
        once: true,
        margin: "-50px",
    });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start end', 'center start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };


    const stepVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

  return (
    <section id='about' ref={sectionRef} className={`py-20 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} relative overflow-hidden`}>

        {/* Background */}
        <motion.div style={{ y }} className='absolute inset-0 overflow-hidden'>
            <div className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
            <div className={` absolute bottom-20 left-1/3 w-96 h-96 rounded-full blur-xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
        </motion.div>

        <div className='max-w-6xl mx-auto relative z-10'>
            {/* Section Header */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className='text-center mb-20'>
                <motion.div variants={itemVariants} className={`font-semibold text-2xl uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                    Apprenez à me connaître
                </motion.div>

                <motion.h2 variants={itemVariants} className='text-2xl md:text-3xl mb-6 font-semibold'>A propos de 
                    <span className='text-blue-500 font-semibold'> moi</span>
                </motion.h2>

            </motion.div>

            <div className='grid lg:grid-cols-2 gap-16 items-start'>
                {/* PERSONAL STORY */}
                <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className='space-y-8'>

                    <motion.div variants={itemVariants} className={`p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"}`}>

                        <h3 className='text-2xl font-semibold mb-6'>Ma mission</h3>

                        <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Je crois que la technologie devrai être un pont qui connecte les gens entre eux et qui résout un problème réel. Ma passion est de créer des expériences numériques qui ne sont pas seulement fonctionnelles mais aussi charmantes et accessible à tous.
                        </p>

                        <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Quand je ne code pas, vous me trouverez en train d'explorer de nouveaux frameworks, de contribuer à des projets open source ou d'accompagner des développeurs. Je vis au rythme de l'évolution constante des technologies web et des possibilités infinies qu'elles offrent pour créer des expériences numériques enrichissantes.
                        </p>

                    </motion.div> 

                    {/* WHAT I LOVE BUILDING */}
                    <motion.div variants={itemVariants}  className='space-y-4'>
                        <h3 className='text-xl font-medium mb-6'>Ce que j'aime contruire</h3>
                        <div className='grid gap-4'>
                            {PASSIONS.map((passion, index) => (
                                <motion.div key={passion.title} variants={itemVariants} whileHover={{ x: 4 }} className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/10 backdrop-blur-sm" : "bg-gray-50/50 border border-gray-700/10 backdrop-blur-sm hover:bg-gray-100/50"} transition-all duration-300`}>
                                    <div className={`p-3 rounded-lg ${isDarkMode ? "text-gray-700" : "text-white"}`}>
                                        <passion.icon size={20} className='text-blue-500' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium mb-1'>{passion.title}</h4>
                                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                            {passion.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Digital Signature */}
                    <motion.div variants={itemVariants} className='text-center py-6'>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-50' : "text-gray-600"} mb-2`}>
                            Conçu avec passion par
                        </div>

                        {/* DigitalSignature */}
                        <div className='flex justify-between'>
                            <img src={SIGNATURE} alt="Ephraïm" className='w-28'/>
                        </div>

                        <div className='text-lg font-medium text-blue-500 mt-2'>
                            AGBANNON B. Ephraïm
                        </div>

                    </motion.div>
                </motion.div>


                {/* Developer Journey Timeline */}
                <motion.div
                    ref={timelineRef}
                    initial="hidden"
                    animate={timelineInView ? "visible" : "hidden"}
                    variants={timelineVariants}
                    className="relative pl-12" // <– espace propre pour la ligne
                >
                    <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">
                        Mon parcours de développeur
                    </h3>

                    {/* Vertical Timeline Line */}
                    <div
                        className={`absolute top-20 bottom-0 left-6 w-px ${isDarkMode ? "bg-gray-800" : "bg-gray-300"
                            }`}
                    ></div>

                    {/* Timeline Items */}
                    <div className="space-y-12">
                        {JOURNEY_STEPS.map((step, index) => (
                            <motion.div
                                key={step.year}
                                variants={stepVariants}
                                className="relative flex items-start -left-13 space-x-6 group"
                            >
                                {/* Circle Icon */}
                                <div
                                    className={`relative z-10 flex shrink-0 w-14 h-14 rounded-full ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <step.icon size={22} className="text-white" />
                                </div>

                                {/* Content Box */}
                                <div
                                    className={`flex grow p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm ${isDarkMode
                                            ? "bg-gray-800/50 border-gray-700 group-hover:bg-gray-800/70 group-hover:border-gray-600"
                                            : "bg-white/80 border-gray-200 group-hover:bg-white group-hover:border-gray-300"
                                        }`}
                                >
                                    <div className="w-full">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-medium">{step.title}</h4>
                                            <span
                                                className={`text-sm px-3 py-1 rounded-full ${isDarkMode
                                                        ? "bg-gray-700 text-gray-300"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {step.year}
                                            </span>
                                        </div>

                                        <div
                                            className={`text-sm font-medium ${isDarkMode
                                                    ? "text-blue-400"
                                                    : "text-blue-600"
                                                } mb-3`}
                                        >
                                            {step.company}
                                        </div>

                                        <p
                                            className={`text-sm leading-relaxed ${isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Call to Action */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className='text-center'>

                <motion.div variants={itemVariants} className='flex flex-col items-center space-y-6'>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : "text-gray-600"}`}>
                        Prêt pour amener une expérience numérique exceptionnelle à la vie ?
                    </p>

                    <motion.button whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.98 }} className='bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300'>
                        Travaillons ensemble
                    </motion.button>

                </motion.div>

            </motion.div>

        </div>

    </section>
  )
}

export default AboutSection
