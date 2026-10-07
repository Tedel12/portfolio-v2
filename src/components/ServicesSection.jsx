import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useTheme } from '../context/useTheme'
import { SERVICE_CATEGORIES, SERVICE_TAGS, SERVICES } from '../utils/data'
import { Check, ArrowRight, Clock, Banknote, Sparkles } from 'lucide-react'

const ServicesSection = ({ onContactClick, onSelectService }) => {
    const { isDarkMode } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredServices = selectedCategory === "all"
        ? SERVICES
        : SERVICES.filter(s => s.category === selectedCategory);

    return (
        <section id="services" className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors ${
            isDarkMode ? "bg-[#03110a] text-slate-100" : "bg-[#f4f9f6] text-slate-900"
        }`}>
            {/* Ambient emerald subtle glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 bg-emerald-500" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 bg-teal-600" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
                        isDarkMode 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                            : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    }`}>
                        <Sparkles size={13} />
                        <span>Offres & Prestations</span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                    }`}>
                        Mes Services.
                    </h2>

                    <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Du développement d'applications mobiles et architectures SaaS jusqu'aux systèmes embarqués, modèles de Machine Learning et robotique ROS2.
                    </p>
                </div>

                {/* Categories Bar (Identique à la capture 1) */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
                    {SERVICE_CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-subtitle font-semibold transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                                        : isDarkMode
                                            ? "bg-[#052316]/70 border border-emerald-900/40 text-slate-300 hover:border-emerald-700/50 hover:text-white"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 shadow-xs"
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                    isActive 
                                        ? "bg-slate-950/20 text-slate-950 font-bold" 
                                        : isDarkMode 
                                            ? "bg-emerald-950/40 text-emerald-400" 
                                            : "bg-emerald-50 text-emerald-700 font-bold"
                                }`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Spécialités Tags Bar (Identique à la capture 1) */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-16 text-xs">
                    <span className={`font-subtitle font-bold uppercase tracking-wider text-[11px] mr-1 ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                    }`}>
                        SPÉCIALITÉS :
                    </span>
                    {SERVICE_TAGS.map((tag) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 rounded-lg border text-[11px] font-subtitle font-medium ${
                                isDarkMode
                                    ? "bg-[#041c11]/80 border-emerald-900/40 text-slate-300"
                                    : "bg-white border-slate-200 text-slate-700 shadow-xs"
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 3-Column Glassmorphism Cards Grid (Identique à la Capture 1) */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {filteredServices.map((service) => {
                        const ServiceIcon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 border ${
                                    isDarkMode
                                        ? "bg-gradient-to-b from-[#062819]/80 to-[#041a10]/90 border-emerald-900/40 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/40"
                                        : "bg-white border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-lg"
                                }`}
                            >
                                <div>
                                    {/* Icon & Subcategory Badge */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className={`p-3 rounded-xl border ${
                                            isDarkMode 
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        }`}>
                                            <ServiceIcon size={24} />
                                        </div>
                                        <span className={`text-[11px] font-mono font-semibold tracking-wide text-right max-w-[190px] truncate ${
                                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                        }`}>
                                            {service.subCategory}
                                        </span>
                                    </div>

                                    {/* Service Title */}
                                    <h3 className={`text-xl font-heading font-bold mb-3 tracking-tight ${
                                        isDarkMode ? "text-white" : "text-slate-900"
                                    }`}>
                                        {service.title}
                                    </h3>

                                    {/* Service Description */}
                                    <p className={`text-xs leading-relaxed mb-6 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                        {service.description}
                                    </p>

                                    {/* Feature Checklist */}
                                    <div className="space-y-2.5 mb-6">
                                        {service.features.map((feat, idx) => (
                                            <div key={idx} className={`flex items-start space-x-2.5 text-xs ${
                                                isDarkMode ? "text-slate-300" : "text-slate-700 font-medium"
                                            }`}>
                                                <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                                                    isDarkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                                                }`}>
                                                    <Check size={12} />
                                                </div>
                                                <span className="leading-snug">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Livrables clés section */}
                                    <div className={`p-3.5 rounded-xl border mb-6 ${
                                        isDarkMode ? "bg-[#03160e]/70 border-emerald-950" : "bg-slate-50 border-slate-200"
                                    }`}>
                                        <div className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-2 ${
                                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                        }`}>
                                            {service.deliverablesTitle}
                                        </div>
                                        <ul className={`space-y-1 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                                            {service.deliverables.map((del, dIdx) => (
                                                <li key={dIdx} className="flex items-center space-x-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? "bg-emerald-400" : "bg-emerald-600"}`} />
                                                    <span>{del}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Bottom Pricing, Timeline & Action Buttons */}
                                <div>
                                    <div className={`pt-4 border-t mb-5 space-y-1.5 text-xs ${
                                        isDarkMode ? "border-emerald-950/80" : "border-slate-200"
                                    }`}>
                                        <div className={`flex items-center space-x-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                            <Clock size={13} className={isDarkMode ? "text-emerald-400" : "text-emerald-700"} />
                                            <span>{service.timeline}</span>
                                        </div>
                                        <div className={`flex items-center space-x-2 font-mono font-bold ${
                                            isDarkMode ? "text-emerald-400" : "text-emerald-700"
                                        }`}>
                                            <Banknote size={14} />
                                            <span>{service.price}</span>
                                        </div>
                                    </div>

                                    {/* Bottom Buttons: Voir le détail complet & Contacter */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => onSelectService(service)}
                                            className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl border text-xs font-subtitle font-semibold transition-all cursor-pointer ${
                                                isDarkMode
                                                    ? "bg-[#042013] border-emerald-900/60 hover:bg-[#07321e] text-slate-200"
                                                    : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 shadow-xs"
                                            }`}
                                        >
                                            <span>Voir le détail</span>
                                            <ArrowRight size={13} />
                                        </button>

                                        <button
                                            onClick={() => onContactClick(service.title)}
                                            className={`flex items-center justify-center py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all cursor-pointer ${
                                                isDarkMode ? "shadow-md shadow-emerald-950" : "shadow-sm shadow-emerald-600/20"
                                            }`}
                                        >
                                            Contacter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection
