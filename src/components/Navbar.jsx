import React, { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { AnimatePresence, motion } from 'motion/react'
import { Code2, Menu, Moon, Sun, X, FileDown, Search, ArrowRight, Bot, Smartphone, Cpu, LineChart, Award } from 'lucide-react'

const navItems = [
    { label: "Accueil", id: "accueil" },
    { label: "Services", id: "services" },
    { label: "Stack Technique", id: "competences" },
    { label: "Process", id: "process" },
    { label: "Projets", id: "projets" },
    { label: "GitHub", id: "github" },
    { label: "Certificats", id: "certificats" },
    { label: "Contact", id: "contact" },
];

const QUICK_SEARCH_ITEMS = [
    { title: "Physical AI & ROS2", category: "Système & Robotique", target: "competences", icon: Bot },
    { title: "Applications Mobiles (Flutter / React Native)", category: "Services", target: "services", icon: Smartphone },
    { title: "Certifications & Prix (NASA, Cursor, DataCamp)", category: "Distinctions", target: "certificats", icon: Award },
    { title: "Machine Learning & Deep Learning", category: "Expertise IA", target: "competences", icon: Cpu },
    { title: "Visualisation de Données & BI", category: "Data Science", target: "services", icon: LineChart },
    { title: "Architecture SaaS & React 19", category: "Web Full-Stack", target: "services", icon: Code2 },
    { title: "Mon Process de travail (4 Étapes)", category: "Méthodologie", target: "process", icon: ArrowRight },
    { title: "Tableau de contributions GitHub", category: "Open Source", target: "github", icon: ArrowRight },
];

const Navbar = ({ onOpenCv, onOpenTerminal, onStartPitch }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const filteredSearch = QUICK_SEARCH_ITEMS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-colors ${
                isDarkMode 
                    ? "bg-[#03150d]/85 border-[#064e3b]/40 text-slate-100" 
                    : "bg-white/90 border-slate-200 text-slate-900"
            } backdrop-blur-md border-b`}>
                <div className='max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4'>
                    {/* Brand */}
                    <button
                        onClick={() => scrollToSection('accueil')}
                        className='flex items-center space-x-2 sm:space-x-2.5 text-left cursor-pointer group shrink min-w-0'
                    >
                        <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all shrink-0">
                            <Code2 size={17} className="sm:w-[19px] sm:h-[19px]" />
                        </div>
                        <div className="min-w-0">
                            <span className={`font-heading font-bold text-xs sm:text-base tracking-tight block truncate ${
                                isDarkMode ? "text-white" : "text-slate-900"
                            }`}>
                                Ben Agbannon
                            </span>
                            <span className="text-[9.5px] sm:text-[11px] text-emerald-500 font-mono tracking-wide truncate block">
                                Ingénieur Logiciel & IA
                            </span>
                        </div>
                    </button>

                    {/* Integrated Search Bar (Desktop) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-xs mx-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                isDarkMode
                                    ? "bg-[#042013]/70 border-emerald-950 text-slate-400 hover:border-emerald-600/50 hover:text-slate-200"
                                    : "bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-300"
                            }`}
                        >
                            <span className="flex items-center space-x-2">
                                <Search size={14} className="text-emerald-500" />
                                <span>Rechercher service, stack, IA...</span>
                            </span>
                            <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                isDarkMode 
                                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40" 
                                    : "bg-slate-200 text-slate-700 border border-slate-300"
                            }`}>
                                ⌘K
                            </kbd>
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:flex items-center space-x-4 lg:space-x-5 text-xs font-subtitle font-medium'>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`transition-colors cursor-pointer py-1 ${
                                    isDarkMode 
                                        ? "text-slate-300 hover:text-emerald-400" 
                                        : "text-slate-600 hover:text-emerald-600"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                        {/* Terminal CLI Button */}
                        {onOpenTerminal && (
                            <button
                                onClick={onOpenTerminal}
                                title="Ouvrir le terminal interactif (Ctrl+K)"
                                className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                                    isDarkMode 
                                        ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-400 hover:border-emerald-600 hover:bg-emerald-900/40" 
                                        : "border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-400"
                                }`}
                            >
                                <span>$ CLI</span>
                            </button>
                        )}

                        {/* Pitch Express 60s */}
                        {onStartPitch && (
                            <button
                                onClick={onStartPitch}
                                title="Démarrer le Pitch Express (60s chrono)"
                                className="hidden xl:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-mono font-medium transition cursor-pointer"
                            >
                                <span>⚡ Pitch 60s</span>
                            </button>
                        )}

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Recherche"
                            className={`p-1.5 sm:p-2 rounded-lg border cursor-pointer ${
                                isDarkMode 
                                    ? "border-emerald-900/40 bg-emerald-950/30 text-emerald-400" 
                                    : "border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                        >
                            <Search size={15} />
                        </button>

                        {/* Interactive CV Modal Trigger */}
                        <button
                            onClick={onOpenCv}
                            className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-subtitle font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-sm cursor-pointer"
                        >
                            <FileDown size={13} className="shrink-0" />
                            <span className="hidden sm:inline">Mon CV</span>
                            <span className="sm:hidden text-[11px]">CV</span>
                        </button>

                        <button
                            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                            aria-label="Basculer le thème"
                            className={`p-1.5 sm:p-2 rounded-lg border transition-colors cursor-pointer ${
                                isDarkMode
                                    ? "bg-[#042013] border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/40"
                                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                            }`}
                        >
                            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menu"
                            className={`md:hidden p-1.5 sm:p-2 rounded-lg border cursor-pointer ${
                                isDarkMode 
                                    ? "border-emerald-900/50 bg-[#042013] text-slate-200" 
                                    : "border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                        >
                            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`md:hidden mt-2.5 p-3.5 rounded-2xl border ${
                                isDarkMode ? "bg-[#041a10] border-emerald-900/60" : "bg-white border-slate-200"
                            } shadow-2xl space-y-3`}
                        >
                            <div className="grid grid-cols-2 gap-1.5">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-left px-3 py-2 rounded-xl text-xs font-subtitle font-medium transition-colors ${
                                            isDarkMode 
                                                ? "text-slate-300 hover:bg-emerald-900/30 hover:text-emerald-400" 
                                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile drawer quick interactive actions */}
                            <div className="pt-2.5 border-t border-emerald-950/60 grid grid-cols-2 gap-2">
                                {onOpenTerminal && (
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            onOpenTerminal();
                                        }}
                                        className="flex items-center justify-center space-x-1.5 p-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 text-xs font-mono"
                                    >
                                        <span>$ CLI Terminal</span>
                                    </button>
                                )}
                                {onStartPitch && (
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            onStartPitch();
                                        }}
                                        className="flex items-center justify-center space-x-1.5 p-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-mono font-medium"
                                    >
                                        <span>⚡ Pitch 60s</span>
                                    </button>
                                )}
                                <a
                                    href="/mon-cv-off.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="CV_Ben_Ephraim_Agbannon.pdf"
                                    className="col-span-2 flex items-center justify-center space-x-2 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-subtitle font-semibold"
                                >
                                    <FileDown size={14} />
                                    <span>Télécharger le CV PDF</span>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Command Palette */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden ${
                                isDarkMode 
                                    ? "border-emerald-800/50 bg-[#03180e] text-slate-100" 
                                    : "border-slate-200 bg-white text-slate-900"
                            }`}
                        >
                            <div className={`flex items-center px-4 py-3 border-b ${
                                isDarkMode ? "border-emerald-900/40" : "border-slate-200"
                            }`}>
                                <Search size={18} className="text-emerald-500 mr-3 shrink-0" />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Rechercher par technologie, IA, service, process..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full bg-transparent border-none outline-none text-base sm:text-sm font-sans ${
                                        isDarkMode ? "text-white placeholder-slate-500" : "text-slate-900 placeholder-slate-400"
                                    }`}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-1 rounded-md text-slate-400 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
                                {filteredSearch.length > 0 ? (
                                    filteredSearch.map((item, idx) => {
                                        const ItemIcon = item.icon;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => scrollToSection(item.target)}
                                                className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer text-left ${
                                                    isDarkMode 
                                                        ? "hover:bg-emerald-950/60 border-transparent hover:border-emerald-800/40" 
                                                        : "hover:bg-emerald-50 border-transparent hover:border-emerald-200"
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                                        <ItemIcon size={16} />
                                                    </div>
                                                    <div>
                                                        <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                                            {item.title}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400">
                                                            {item.category}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-mono text-emerald-500 flex items-center space-x-1">
                                                    <span>Aller</span>
                                                    <ArrowRight size={11} />
                                                </span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="p-6 text-center text-xs text-slate-500">
                                        Aucun résultat pour "{searchQuery}".
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar
