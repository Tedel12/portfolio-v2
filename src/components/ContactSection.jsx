import { useState, useRef } from "react"
import {
    motion,
    useInView,
    useScroll,
    useTransform
} from "motion/react";
import { Send } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../utils/data";
import { containerVariants, itemVariants } from "../utils/helper";
import TextInput from "./Input/TextInput";
import SuccesModal from "./SuccesModal";


const ContactSection = () => {

    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'center start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = {
            access_key: "f422244f-b35c-4ac1-972c-d8f855a452c8",
            name: formData.name,
            email: formData.email,
            message: formData.message
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (result.success) {
                setShowSuccess(true);
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            alert("Erreur lors de l'envoi du message");
        }

        setIsSubmitting(false);
    };





  return (
    <section id="contact" ref={sectionRef} className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} relative overflow-hidden`}>
        {/* Background Elements */}
        <motion.div style={{ y }} className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className={`absolute top-40 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
            <div className={` absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
        </motion.div> 

        {/* Section Header */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="text-center mb-20">
            <motion.div variants={itemVariants} className={`font-semibold text-2xl uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                Prenons contact
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light mb-6">
                Me
                <span className="text-blue-500"> contacter</span>
            </motion.h2>

            <motion.p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} variants={itemVariants}>
                Prêt à démarrer votre prochain projet ? Parlons-en et voyons comment donner vie à vos idées.
            </motion.p>

        </motion.div>



        <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <motion.div variants={itemVariants} className={`p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"}`}>
                    <h3 className="text-2xl font-medium mb-8">Envoyez moi un message</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <TextInput isDarkMode={isDarkMode} value={formData.name} handleInputChange={(text) => handleInputChange("name", text)} label="Votre nom" />
                                <TextInput isDarkMode={isDarkMode} value={formData.email} handleInputChange={(text) => handleInputChange("email", text)} label="Votre email" />
                            </div>

                        
                            <TextInput isDarkMode={isDarkMode} value={formData.message} textarea handleInputChange={(text) => handleInputChange("message", text)} label="Votre message" />

                            <motion.button disabled={isSubmitting} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer" type="submit">
                                {isSubmitting ? (
                                    <>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear", }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                        <span>En cours d'envoie...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Envoyer</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>


                </motion.div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="space-y-6">
                {/* Contact Informations */}

                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
                    <div className="space-y-4">
                        {CONTACT_INFO.map((info, index) => (
                            <motion.div key={info.label} variants={itemVariants} whileHover={{ x: 4 }} className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30 hover:bg-gray-800/50" : "bg-gray-200/50 hover:bg-gray-100/50"} transition-all duration-300`}>
                                <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                                    <info.icon size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                                        {info.label}
                                    </div>
                                    <div className="font-medium">{info.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>


                {/* Social Links */}
                <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-medium mb-6">Suivez moi</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className={`
                                    flex items-center cursor-pointer space-x-3 p-4 rounded-xl border transition-all duration-300 ${isDarkMode ? "bg-gray-800/50 border-gray-700 hover:border-gray-600" : "bg-white/80 border-gray-300 hover:border-gray-300"} ${social.bgColor} ${social.color}
                                `}>
                                    <social.icon size={20} />
                                    <span className="font-medium">{social.name}</span>
                                </motion.a>
                            ))}
                        </div>
                </motion.div>


                {/* Availability status */}
                <motion.div variants={itemVariants} className={`p-6 rounded-xl border ${isDarkMode ? "bg-green-500/10 border-green-50/20" : "bg-green-100 border-green-200"}`}>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium text-green-500">Disponible pour travailler</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : "text-gray-600"}`}>
                        Je suis actuellement disponible pour des missions en freelance et pour des opportinutés à temps plein.
                    </p>
                </motion.div>
            </motion.div>

        </div>


        {/* Bottom CTA */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="text-center mt-20">
            <motion.div variants={itemVariants} className={`max-w-2xl mx-auto p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/30 border-gray-700" : "bg-gray-50/50 border-gray-200"}`}>
                <h3 className="text-3xl font-medium mb-4">Ou Vous préférez un appel direct ?</h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
                    Parfois, une conversation vaut bien mieux que milles messages. Ayez l'amabilité de programmer un appel pour discuter avec moi de votre projet.
                </p>
                <motion.button whileHover={{ y: -2, scale: 1.05}} whileTap={{ scale: 0.98 }} className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${isDarkMode ? "border-gray-600 hover:border-blue-500 hover:text-blue-400" : "border-gray-300 hover:border-blue-500 hover:text-blue-600"} cursor-pointer`}>
                    Planifier un appel
                </motion.button>
            </motion.div>
        </motion.div>
        
        <SuccesModal show={showSuccess} setShow={setShowSuccess} isDarkMode={isDarkMode} />

    </section>
  )
}

export default ContactSection