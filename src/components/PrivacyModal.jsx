import React from 'react'
import { X, Shield } from 'lucide-react'

const PrivacyModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border p-6 md:p-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-800 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
      } shadow-2xl`}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold">Politique de Confidentialité</h2>
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
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. Collecte des données</h3>
            <p>
              Les seules données collectées sur ce portfolio sont celles transmises volontairement via le formulaire de contact (nom, adresse email et contenu du message).
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. Finalité du traitement</h3>
            <p>
              Ces informations sont exclusivement utilisées pour répondre à vos demandes de renseignement ou propositions de collaboration professionnelle. Aucune donnée n'est commercialisée ni transmise à des tiers.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">3. Hébergement & Sécurité</h3>
            <p>
              Le site est hébergé sur une infrastructure sécurisée (Vercel). Les transmissions via le formulaire sont chiffrées en HTTPS.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">4. Vos droits</h3>
            <p>
              Conformément à la réglementation applicable sur la protection des données, vous pouvez à tout moment demander la modification ou la suppression de vos coordonnées en écrivant à : <span className="text-blue-500 font-medium">benagbannon@gmail.com</span>.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Compris
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal

