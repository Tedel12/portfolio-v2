import React from 'react'
import { X, FileText } from 'lucide-react'

const TermsModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border p-6 md:p-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
      } shadow-2xl`}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold">Conditions Générales d'Utilisation (CGU)</h2>
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

        <div className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. Objet du site</h3>
            <p>
              Le présent site constitue le portfolio professionnel de Ben Ephraïm Agbannon, destiné à présenter ses réalisations, son parcours technique et ses prestations de développement web.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. Propriété intellectuelle</h3>
            <p>
              L'ensemble des contenus, marques, logos et éléments graphiques propres à ce portfolio sont protégés par le droit d'auteur. Les codes sources des projets libres sont distribués sous leurs licences open source respectives (MIT / Apache).
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">3. Liens externes</h3>
            <p>
              Ce site contient des liens vers des services tiers (GitHub, Vercel, LinkedIn). Ben Ephraïm Agbannon ne saurait être tenu responsable du contenu ou des pratiques de confidentialité de ces plateformes externes.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">4. Contact & Mentions légales</h3>
            <p>
              Éditeur du site : Ben Ephraïm Agbannon, Développeur Indépendant.<br />
              Email : <span className="text-blue-500 font-medium">benagbannon@gmail.com</span><br />
              Hébergement : Vercel Inc.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsModal

