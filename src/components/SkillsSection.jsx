import React, { useState } from 'react'
import { useTheme } from '../context/useTheme'
import { TECH_COLUMNS } from '../utils/data'
import { Cpu, Bot, Eye, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react'
import SkillDetailModal from './SkillDetailModal'

const SkillsSection = ({ onOpenRos, onOpenTinyMl }) => {
  const { isDarkMode } = useTheme();
  const [modalTech, setModalTech] = useState(null);

  return (
    <section id='competences' className={`py-24 px-4 md:px-8 relative overflow-hidden transition-colors border-t ${
      isDarkMode 
        ? "bg-[#03150d] border-emerald-950/60 text-slate-100" 
        : "bg-white border-slate-200 text-slate-900"
    }`}>
      {/* Background glow emerald */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 bg-emerald-500" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-10 bg-teal-600" />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-subtitle font-semibold mb-3 ${
            isDarkMode 
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
              : "bg-emerald-50 border border-emerald-200 text-emerald-700"
          }`}>
            <Cpu size={13} />
            <span>Architecture & Écosystème</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}>
            Stack technique.
          </h2>

          <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Cliquez sur n'importe quelle compétence pour découvrir en détail ses spécifications techniques, son application concrète dans les projets de Ben et accéder à sa documentation officielle.
          </p>
        </div>

        {/* 3 Large Columns Layout avec logos officiels sans contour */}
        <div className='grid lg:grid-cols-3 gap-6 items-stretch'>
          {TECH_COLUMNS.map((column, colIdx) => (
            <div
              key={colIdx}
              className={`rounded-2xl p-6 md:p-7 border flex flex-col justify-between transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-b from-[#052618]/90 to-[#03180f]/95 border-emerald-900/40 shadow-xl"
                  : "bg-slate-50 border-slate-200 shadow-md"
              }`}
            >
              <div>
                {/* Column Title */}
                <div className="flex items-center space-x-2.5 pb-4 mb-6 border-b border-emerald-950/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className={`text-lg font-heading font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {column.title}
                  </h3>
                </div>

                {/* List of Skills Items */}
                <div className='space-y-3.5'>
                  {column.items.map((item, itemIdx) => {
                    const IconComponent = item.icon;

                    return (
                      <div
                        key={itemIdx}
                        onClick={() => setModalTech(item)}
                        className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isDarkMode
                            ? "bg-[#041c12]/60 border-emerald-950/70 hover:border-emerald-500/70 hover:bg-[#072a1b]/80 hover:shadow-lg hover:shadow-emerald-950/50"
                            : "bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start space-x-3.5">
                          {/* Logo officiel de la marque SANS contour ni bordure ni fond */}
                          <div className="shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-115 flex items-center justify-center w-7 h-7">
                            <IconComponent 
                              size={24} 
                              style={{ color: item.iconColor }} 
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-subtitle font-bold tracking-tight group-hover:text-emerald-400 transition-colors ${
                                isDarkMode ? "text-white" : "text-slate-900"
                              }`}>
                                {item.name}
                              </h4>
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 text-[10px] font-mono flex items-center space-x-0.5">
                                <span>Détails</span>
                                <ExternalLink size={10} />
                              </span>
                            </div>

                            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column Footer */}
              <div className="pt-6 mt-6 border-t border-emerald-950/60 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                <span>{column.items.length} technologies actives</span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 size={12} />
                  <span>Production Ready</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Interactive Banner: ROS2, Embedded AI & Data Science */}
        <div className={`mt-12 p-6 md:p-8 rounded-2xl border transition-all ${
          isDarkMode
            ? "bg-gradient-to-r from-[#042114] via-[#052b1b] to-[#042114] border-emerald-800/40"
            : "bg-emerald-50 border-emerald-200"
        }`}>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="p-3 rounded-xl hover:bg-emerald-900/20 transition-all border border-transparent hover:border-emerald-800/50">
              <div 
                onClick={() => {
                  const rosItem = TECH_COLUMNS[1].items.find(i => i.name.includes("ROS2"));
                  if (rosItem) setModalTech(rosItem);
                }}
                className="flex items-center space-x-4 cursor-pointer mb-2.5"
              >
                <div className="text-emerald-400 shrink-0">
                  <Bot size={32} />
                </div>
                <div>
                  <h4 className={`font-heading font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>Physical AI & ROS2</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>Nœuds robotiques, simulation Gazebo & navigation SLAM.</p>
                </div>
              </div>
              {onOpenRos && (
                <button
                  onClick={onOpenRos}
                  className="w-full py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                >
                  <Bot size={13} />
                  <span>Lancer le Simulateur 2D en Direct</span>
                </button>
              )}
            </div>

            <div className="p-3 rounded-xl hover:bg-emerald-900/20 transition-all border border-transparent hover:border-emerald-800/50">
              <div 
                onClick={() => {
                  const tinyItem = TECH_COLUMNS[1].items.find(i => i.name.includes("Embedded"));
                  if (tinyItem) setModalTech(tinyItem);
                }}
                className="flex items-center space-x-4 cursor-pointer mb-2.5"
              >
                <div className="text-teal-400 shrink-0">
                  <Cpu size={32} />
                </div>
                <div>
                  <h4 className={`font-heading font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>Embedded AI (TinyML)</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>Edge Impulse, inférence microcontrôleurs & capteurs.</p>
                </div>
              </div>
              {onOpenTinyMl && (
                <button
                  onClick={onOpenTinyMl}
                  className="w-full py-1.5 px-3 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 font-mono text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                >
                  <Cpu size={13} />
                  <span>Tester le Playground TinyML (INT8)</span>
                </button>
              )}
            </div>

            <div 
              onClick={() => {
                const dataItem = TECH_COLUMNS[1].items.find(i => i.name.includes("Data"));
                if (dataItem) setModalTech(dataItem);
              }}
              className="p-3 rounded-xl hover:bg-emerald-900/20 transition-all border border-transparent hover:border-emerald-800/50 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="text-cyan-400 shrink-0">
                  <Eye size={32} />
                </div>
                <div>
                  <h4 className={`font-heading font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>Visualisation & Embeddings</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>Pandas, Seaborn, recherche vectorielle et RAG.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected Tech */}
      <SkillDetailModal
        tech={modalTech}
        onClose={() => setModalTech(null)}
      />
    </section>
  );
};

export default SkillsSection