import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/useTheme'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X, FileDown, Search, ArrowRight, Bot, Smartphone, Cpu, LineChart, Award } from 'lucide-react'

const navItems = [
    { label: "Accueil", id: "accueil" },
    { label: "Services", id: "services" },
    { label: "Projets", id: "projets" },
    { label: "Contact", id: "contact" },
];

const QUICK_SEARCH_ITEMS = [
    { title: "Physical AI & ROS2", category: "Système & Robotique", target: "competences", icon: Bot },
    { title: "Applications Mobiles (Flutter / React Native)", category: "Services", target: "services", icon: Smartphone },
    { title: "Certifications & Prix (NASA, Cursor, DataCamp)", category: "Distinctions", target: "certificats", icon: Award },
    { title: "Machine Learning & Deep Learning", category: "Expertise IA", target: "competences", icon: Cpu },
    { title: "Visualisation de Données & BI", category: "Data Science", target: "services", icon: LineChart },
    { title: "Architecture SaaS & React 19", category: "Web Full-Stack", target: "services", icon: Cpu },
    { title: "Mon Process de travail (4 Étapes)", category: "Méthodologie", target: "process", icon: ArrowRight },
    { title: "Tableau de contributions GitHub", category: "Open Source", target: "github", icon: ArrowRight },
];

const Navbar = ({ onOpenCv, onOpenTerminal, onStartPitch }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredNavItem, setHoveredNavItem] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <nav className={`fixed top-0 w-full z-50 px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 transition-all duration-300 ${
                isScrolled
                    ? "bg-transparent border-transparent shadow-none"
                    : (isDarkMode 
                        ? "bg-[#03150d]/85 border-[#064e3b]/40 text-slate-100 backdrop-blur-md border-b" 
                        : "bg-white/90 border-slate-200 text-slate-900 backdrop-blur-md border-b")
            }`}>
                <div className='max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4'>
                    {/* Brand - HGT HolyGhost Tech Logo */}
                    <button
                        onClick={() => scrollToSection('accueil')}
                        className='flex items-center cursor-pointer group shrink-0'
                        aria-label="Accueil HolyGhost Tech"
                    >
                        <img 
                            src="/logo-hgt.png" 
                            alt="HolyGhost Tech" 
                            className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                        />
                    </button>

                    {/* Integrated Search Bar (Desktop - Unique searchbar on larger screens) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-xs mx-3">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                isDarkMode
                                    ? (isScrolled 
                                        ? "bg-[#042013]/90 border-emerald-800/60 text-slate-300 shadow-md hover:border-emerald-500" 
                                        : "bg-[#042013]/70 border-emerald-950 text-slate-400 hover:border-emerald-600/50 hover:text-slate-200")
                                    : (isScrolled 
                                        ? "bg-white/95 border-slate-300 text-slate-700 shadow-md hover:border-slate-400" 
                                        : "bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-300")
                            }`}
                        >
                            <span className="flex items-center space-x-2">
                                <Search size={14} className="text-emerald-500 shrink-0" />
                                <span className="truncate">Rechercher service, stack, IA...</span>
                            </span>
                            <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                                isDarkMode 
                                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40" 
                                    : "bg-slate-200 text-slate-700 border border-slate-300"
                            }`}>
                                ⌘K
                            </kbd>
                        </button>
                    </div>

                    {/* Desktop Navigation Links with Elastic Underline */}
                    <div 
                        onMouseLeave={() => setHoveredNavItem(null)}
                        className='hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-subtitle font-medium relative'
                    >
                        {navItems.map((item) => {
                            const isHovered = hoveredNavItem === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onMouseEnter={() => setHoveredNavItem(item.id)}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-3 py-2 transition-colors cursor-pointer rounded-lg ${
                                        isDarkMode 
                                            ? (isHovered ? "text-emerald-400" : (isScrolled ? "text-slate-200 hover:text-emerald-300 drop-shadow-sm" : "text-slate-300 hover:text-emerald-400")) 
                                            : (isHovered ? "text-emerald-700" : (isScrolled ? "text-slate-800 hover:text-emerald-700 drop-shadow-sm" : "text-slate-600 hover:text-emerald-600"))
                                    }`}
                                >
                                    <span className="relative z-10 font-medium tracking-wide">{item.label}</span>
                                    {isHovered && (
                                        <motion.div
                                            layoutId="navbar-elastic-underline"
                                            className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_2px_10px_rgba(52,211,153,0.7)]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 28,
                                                mass: 0.7,
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
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
                                        ? (isScrolled ? "border-emerald-800/70 bg-[#042013]/90 text-emerald-400 shadow-md" : "border-emerald-900/60 bg-emerald-950/40 text-emerald-400 hover:border-emerald-600 hover:bg-emerald-900/40") 
                                        : (isScrolled ? "border-slate-300 bg-white/90 text-slate-700 shadow-md" : "border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-400")
                                }`}
                            >
                                <span>$ CLI</span>
                            </button>
                        )}

                        {/* Search Icon Trigger ONLY on mobile/tablet (to ensure single search control) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Recherche"
                            className={`lg:hidden p-1.5 sm:p-2 rounded-lg border cursor-pointer ${
                                isDarkMode 
                                    ? (isScrolled ? "border-emerald-800/70 bg-[#042013]/90 text-emerald-400 shadow-md" : "border-emerald-900/40 bg-emerald-950/30 text-emerald-400") 
                                    : (isScrolled ? "border-slate-300 bg-white/90 text-slate-700 shadow-md" : "border-slate-200 bg-slate-100 text-slate-700")
                            }`}
                        >
                            <Search size={15} />
                        </button>

                        {/* Interactive CV Button - Embellished with magnetic glowing & shimmer animation */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onOpenCv}
                            className="relative overflow-hidden inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-subtitle font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 shadow-md shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 border border-white/60 cursor-pointer group transition-all"
                        >
                            {/* Sweeping light beam shine effect */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                            {/* Micro-animated icon */}
                            <motion.div
                                animate={{ y: [0, -1.5, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                className="shrink-0"
                            >
                                <FileDown size={14} className="text-slate-950 group-hover:rotate-6 transition-transform" />
                            </motion.div>

                            <span className="font-bold tracking-wide">Mon CV</span>
                        </motion.button>

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
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onOpenCv();
                                    }}
                                    className="flex items-center justify-center space-x-1.5 p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-subtitle font-bold"
                                >
                                    <FileDown size={14} />
                                    <span>Mon CV</span>
                                </button>
                                <a
                                    href="/mon-cv-off.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="CV_Ben_Ephraim_Agbannon.pdf"
                                    className="col-span-2 flex items-center justify-center space-x-2 p-2 rounded-xl border border-slate-800 text-slate-300 text-xs font-subtitle hover:border-emerald-600/50"
                                >
                                    <FileDown size={14} />
                                    <span>Télécharger le CV (PDF)</span>
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
