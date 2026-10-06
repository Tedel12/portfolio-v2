import React from 'react'
import { ExternalLink, Layers } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'

const ProjectCard = ({ project, isDarkMode, onSelectProject }) => {
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
      isDarkMode
        ? "bg-gradient-to-b from-[#052618]/90 to-[#031910]/95 border-emerald-900/50 hover:border-emerald-500/60 shadow-lg hover:shadow-emerald-950/40"
        : "bg-white border-slate-200 hover:border-emerald-500/60 shadow-md hover:shadow-lg"
    }`}>
      {/* Top section: Image & Badges */}
      <div>
        <div className='relative overflow-hidden group aspect-video bg-gray-950'>
          <img
            src={project.image}
            alt={project.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {/* Category Badge */}
          <div className='absolute top-3 right-3'>
            <span className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${
              isDarkMode
                ? "bg-[#03140c]/90 text-emerald-300 border-emerald-900/60"
                : "bg-white/95 text-slate-800 border-slate-200"
            } backdrop-blur-sm`}>
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className='absolute top-3 left-3'>
              <span className='bg-emerald-500 text-slate-950 text-[11px] font-subtitle font-bold px-2.5 py-1 rounded-md tracking-wide shadow-sm'>
                Projet Phare
              </span>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className='p-6'>
          <h3 className={`text-lg font-heading font-bold mb-2.5 transition-colors line-clamp-1 ${
            isDarkMode ? "text-white hover:text-emerald-400" : "text-slate-900 hover:text-emerald-600"
          }`}>
            {project.title}
          </h3>

          <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}>
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className='flex flex-wrap gap-1.5 mb-2'>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-medium ${
                  isDarkMode
                    ? "bg-[#041c12]/80 border-emerald-900/60 text-slate-300"
                    : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`px-6 pb-6 pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
        isDarkMode ? "border-emerald-950/80" : "border-slate-100"
      }`}>
        <button
          onClick={() => onSelectProject(project)}
          className={`inline-flex items-center space-x-1.5 text-xs font-subtitle font-semibold py-2 px-3 rounded-xl border transition-colors cursor-pointer ${
            isDarkMode
              ? "border-emerald-900/60 hover:bg-[#07321e] text-slate-200"
              : "border-slate-200 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <Layers size={14} className="text-emerald-400" />
          <span>Étude de cas</span>
        </button>

        <div className="flex items-center space-x-2">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Code source GitHub"
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? "border-emerald-900/60 hover:bg-[#07321e] text-slate-300 hover:text-emerald-400"
                  : "border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <FiGithub size={15} />
            </a>
          )}

          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-subtitle font-bold transition-all shadow-sm"
            >
              <span>Démo</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard