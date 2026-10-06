import React from 'react'
import { X, Phone, MessageSquare, Mail, Calendar } from 'lucide-react'

const ScheduleCallModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-lg rounded-xl border p-6 md:p-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
      } shadow-2xl`}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold">Planifier un échange</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
          Choisissez le canal le plus pratique pour échanger sur vos objectifs, la faisabilité technique et les délais de votre projet :
        </p>

        <div className="space-y-3">
          <a
            href="https://wa.me/2290155699825?text=Bonjour%20Ben,%20je%20souhaite%20discuter%20d'un%20projet%20web"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800/60 border-gray-700 hover:border-emerald-500 hover:bg-gray-800'
                : 'bg-gray-50 border-gray-200 hover:border-emerald-500 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <MessageSquare size={20} />
              </div>
              <div>
                <div className="font-medium text-sm">WhatsApp Direct</div>
                <div className="text-xs text-gray-500">Discussion rapide ou appel vocal</div>
              </div>
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
              Recommandé
            </span>
          </a>

          <a
            href="tel:+2290155699825"
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800/60 border-gray-700 hover:border-blue-500 hover:bg-gray-800'
                : 'bg-gray-50 border-gray-200 hover:border-blue-500 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-medium text-sm">Appel téléphonique</div>
                <div className="text-xs text-gray-500">+229 01 55 69 98 25</div>
              </div>
            </div>
            <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">
              Direct
            </span>
          </a>

          <a
            href="mailto:benagbannon@gmail.com?subject=Prise%20de%20contact%20-%20Projet%20Web"
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800/60 border-gray-700 hover:border-sky-500 hover:bg-gray-800'
                : 'bg-gray-50 border-gray-200 hover:border-sky-500 hover:bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-500">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-medium text-sm">Email professionnel</div>
                <div className="text-xs text-gray-500">benagbannon@gmail.com</div>
              </div>
            </div>
            <span className="text-xs font-medium text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-md">
              Asynchrone
            </span>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScheduleCallModal

