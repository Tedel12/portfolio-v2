import React, { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { ArrowUp, Code2, Mail, Shield, FileText, Bot, Heart } from 'lucide-react'
import PrivacyModal from './PrivacyModal'
import TermsModal from './TermsModal'

const Footer = () => {
    const { isDarkMode } = useTheme();
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const socialLinks = [
        {
            name: "GitHub",
            icon: FiGithub,
            url: "https://github.com/Tedel12",
        },
        {
            name: "LinkedIn",
            icon: FiLinkedin,
            url: "https://www.linkedin.com/in/ben-ephra%C3%AFm-agbannon-948819311",
        },
        {
            name: "Email",
            icon: Mail,
            url: "mailto:benagbannon@gmail.com",
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className={`relative transition-colors border-t ${
            isDarkMode ? "bg-[#020d06] text-slate-100 border-emerald-950/80" : "bg-white text-slate-900 border-slate-200"
        } overflow-hidden`}>
            {/* Emerald glow separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            <div className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
                <div className={`flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b ${
                    isDarkMode ? "border-emerald-950/60" : "border-slate-200"
                }`}>
                    {/* Brand Info */}
                    <div className='text-center md:text-left space-y-2'>
                        <div className={`inline-flex items-center space-x-2.5 text-lg font-heading font-bold ${
                            isDarkMode ? "text-white" : "text-slate-900"
                        }`}>
                            <div className={`p-1.5 rounded-lg border ${
                                isDarkMode 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                                <Code2 size={20} />
                            </div>
                            <span>Ben Ephraïm Agbannon</span>
                        </div>
                        <p className={`text-xs max-w-md font-sans ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                            Ingénieur Logiciel & IA. Spécialiste Full-Stack, Mobile (Flutter / React Native), Machine Learning, Embedded AI & Physical AI (ROS2).
                        </p>
                    </div>

                    {/* Social networks & back to top */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className='flex items-center space-x-2'>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={social.name}
                                    className={`p-2.5 rounded-xl border transition-all shadow-xs ${
                                        isDarkMode 
                                            ? "border-emerald-900/40 bg-[#041c12] text-slate-300 hover:text-emerald-400 hover:border-emerald-500" 
                                            : "border-slate-200 bg-slate-50 text-slate-700 hover:text-emerald-700 hover:border-emerald-400"
                                    }`}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className={`inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-subtitle font-semibold border transition-all cursor-pointer ${
                                isDarkMode 
                                    ? "border-emerald-900/40 bg-[#042013] hover:bg-[#07321e] text-slate-300" 
                                    : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-xs"
                            }`}
                        >
                            <ArrowUp size={14} />
                            <span>Haut de page</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Legal Links & Copyright */}
                <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}>
                    <div className="font-sans">
                        © {new Date().getFullYear()} Ben Ephraïm Agbannon. Tous droits réservés.
                    </div>

                    <div className="flex items-center space-x-5 font-subtitle">
                        <button
                            onClick={() => setShowPrivacy(true)}
                            className={`inline-flex items-center space-x-1.5 transition-colors cursor-pointer ${
                                isDarkMode ? "hover:text-emerald-400" : "hover:text-emerald-700"
                            }`}
                        >
                            <Shield size={13} />
                            <span>Politique de confidentialité</span>
                        </button>

                        <button
                            onClick={() => setShowTerms(true)}
                            className={`inline-flex items-center space-x-1.5 transition-colors cursor-pointer ${
                                isDarkMode ? "hover:text-emerald-400" : "hover:text-emerald-700"
                            }`}
                        >
                            <FileText size={13} />
                            <span>Conditions d'utilisation</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Legal Modals */}
            <PrivacyModal
                isOpen={showPrivacy}
                onClose={() => setShowPrivacy(false)}
                isDarkMode={isDarkMode}
            />

            <TermsModal
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
                isDarkMode={isDarkMode}
            />
        </footer>
    );
};

export default Footer