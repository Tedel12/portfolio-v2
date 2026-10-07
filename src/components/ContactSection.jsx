import React, { useState, useRef } from "react"
import { Send, PhoneCall, CheckCircle2, AlertCircle, MessageSquare, Mail, Phone } from "lucide-react"
import { useTheme } from "../context/useTheme"
import { CONTACT_INFO, SOCIAL_LINKS } from "../utils/data"
import TextInput from "./Input/TextInput"
import SuccesModal from "./SuccesModal"
import ScheduleCallModal from "./ScheduleCallModal"

const ContactSection = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const sectionRef = useRef(null);

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "f422244f-b35c-4ac1-972c-d8f855a452c8";

        const form = {
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Contact projet depuis portfolio - ${formData.name}`,
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
            } else {
                setErrorMessage(result.message || "Une erreur est survenue lors de l'envoi.");
            }
        } catch {
            setErrorMessage("Impossible de joindre le serveur. Contactez-moi directement via WhatsApp ou email.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
                isDarkMode ? "bg-[#021008] border-emerald-950/60 text-slate-100" : "bg-white border-slate-200 text-slate-900"
            }`}
        >
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                        isDarkMode 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    }`}>
                        <MessageSquare size={13} />
                        <span>Discutons de vos projets</span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                    }`}>
                        Prendre contact.
                    </h2>

                    <p className={`text-sm md:text-base max-w-2xl mx-auto ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                        Que ce soit pour une application web/mobile, un projet de Machine Learning ou une architecture robotique ROS2, parlons-en directement.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Form */}
                    <div className={`p-6 md:p-8 rounded-2xl border ${
                        isDarkMode 
                            ? "bg-gradient-to-b from-[#052618]/90 to-[#031910]/95 border-emerald-900/50 shadow-xl" 
                            : "bg-white border-slate-200/90 shadow-sm"
                    }`}>
                        <h3 className={`text-lg font-heading font-bold mb-6 ${
                            isDarkMode ? "text-white" : "text-slate-900"
                        }`}>
                            Envoyez-moi un message direct
                        </h3>

                        {errorMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
                                <AlertCircle size={16} className="shrink-0" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.name}
                                    handleInputChange={(text) => handleInputChange("name", text)}
                                    label="Votre nom"
                                    required
                                />
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.email}
                                    handleInputChange={(text) => handleInputChange("email", text)}
                                    label="Votre email"
                                    type="email"
                                    required
                                />
                            </div>

                            <TextInput
                                isDarkMode={isDarkMode}
                                value={formData.message}
                                textarea
                                handleInputChange={(text) => handleInputChange("message", text)}
                                label="Description de votre projet ou besoin"
                                required
                            />

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className={`w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-slate-950 py-3.5 px-6 rounded-xl text-xs font-subtitle font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                                    isDarkMode ? "shadow-lg shadow-emerald-950" : "shadow-md shadow-emerald-600/20"
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Coordinates & Call Modal */}
                    <div className="space-y-6">
                        {/* Coordonnées */}
                        <div className={`p-6 rounded-2xl border ${
                            isDarkMode ? "bg-[#042013]/60 border-emerald-950" : "bg-white border-slate-200/90 shadow-xs"
                        }`}>
                            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-4 ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-700"
                            }`}>
                                Coordonnées directes
                            </h4>
                            <div className="space-y-3">
                                {CONTACT_INFO.map((info) => (
                                    <div
                                        key={info.label}
                                        className={`flex items-center space-x-3.5 p-3 rounded-xl border ${
                                            isDarkMode ? "bg-[#03150d] border-emerald-950" : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg border ${
                                            isDarkMode 
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        }`}>
                                            <info.icon size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-400 font-mono">{info.label}</div>
                                            <div className={`font-subtitle font-semibold text-xs ${
                                                isDarkMode ? "text-white" : "text-slate-900"
                                            }`}>{info.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WhatsApp / Call action */}
                        <div className={`p-6 rounded-2xl border ${
                            isDarkMode 
                                ? "bg-gradient-to-r from-[#052818] to-[#041c12] border-emerald-800/40" 
                                : "bg-emerald-50/70 border-emerald-200 shadow-xs"
                        }`}>
                            <div className={`flex items-center space-x-2 font-subtitle font-bold text-sm mb-2 ${
                                isDarkMode ? "text-emerald-400" : "text-emerald-800"
                            }`}>
                                <PhoneCall size={18} />
                                <span>Échange rapide par téléphone ou WhatsApp</span>
                            </div>
                            <p className={`text-xs leading-relaxed mb-4 ${
                                isDarkMode ? "text-slate-300" : "text-slate-700"
                            }`}>
                                Vous préférez discuter directement de vos délais et budget ? Conconvenons d'un créneau vocal.
                            </p>
                            <button
                                onClick={() => setShowScheduleModal(true)}
                                className={`w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-subtitle font-bold text-xs transition-all cursor-pointer ${
                                    isDarkMode ? "shadow-md shadow-emerald-950" : "shadow-sm shadow-emerald-600/20"
                                }`}
                            >
                                Planifier un appel direct
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SuccesModal show={showSuccess} setShow={setShowSuccess} isDarkMode={isDarkMode} />
            <ScheduleCallModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                isDarkMode={isDarkMode}
            />
        </section>
    );
};

export default ContactSection