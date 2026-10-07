import React from 'react'
import { X, ExternalLink } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'

const ProjectDetailModal = ({ project, onClose, isDarkMode }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md">
      <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border p-4 sm:p-6 md:p-8 transition-colors ${
        isDarkMode 
          ? 'bg-[#03180e] border-emerald-800/50 text-slate-100 shadow-2xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b mb-5 sm:mb-6 ${
          isDarkMode ? 'border-emerald-950/70' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0 mr-2">
            <span className={`text-[10px] sm:text-[11px] font-mono font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border shrink-0 ${
              isDarkMode 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {project.category}
            </span>
            <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold truncate">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isDarkMode ? 'hover:bg-emerald-900/40 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Project Image */}
        <div className={`rounded-xl overflow-hidden border mb-6 max-h-64 ${
          isDarkMode ? 'border-emerald-950 bg-black' : 'border-slate-200 bg-slate-100'
        }`}>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Case Study Details */}
        <div className="space-y-5 text-sm">
          <div>
            <h3 className={`font-subtitle font-bold mb-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Aperçu du projet
            </h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {project.description}
            </p>
          </div>

          {project.problem && (
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-[#042013]/70 border-emerald-950 text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <h3 className="font-subtitle font-bold text-xs uppercase tracking-wider text-emerald-400 mb-1">
                Problématique & Besoin
              </h3>
              <p className="leading-relaxed text-xs">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-[#052818]/80 border-emerald-900/50 text-slate-200' 
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            }`}>
              <h3 className="font-subtitle font-bold text-xs uppercase tracking-wider text-emerald-400 mb-1">
                Architecture & Solution technique
              </h3>
              <p className="leading-relaxed text-xs">
                {project.solution}
              </p>
            </div>
          )}

          <div>
            <h3 className={`font-subtitle font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Technologies clés
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className={`text-xs px-2.5 py-1 rounded-md border font-mono ${
                  isDarkMode 
                    ? 'bg-[#041c12] text-slate-300 border-emerald-950' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-4 border-t flex flex-wrap gap-3 justify-end ${
          isDarkMode ? 'border-emerald-950/70' : 'border-slate-100'
        }`}>
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-subtitle font-semibold transition-colors ${
                isDarkMode 
                  ? 'border-emerald-900/60 hover:bg-[#07321e] text-slate-200' 
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <FiGithub size={16} />
              <span>Voir le code</span>
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all shadow-md shadow-emerald-950"
            >
              <ExternalLink size={15} />
              <span>Consulter la démo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailModal
