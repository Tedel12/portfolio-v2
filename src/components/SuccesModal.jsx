import React from 'react'
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X } from "lucide-react";

const SuccesModal = ({ show, setShow, isDarkMode }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className={`relative p-8 rounded-xl border max-w-sm w-full text-center ${
              isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"
            } shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setShow(false)}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="mx-auto w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={28} />
            </div>

            <h2 className="text-xl font-bold mb-2">
              Message envoyé
            </h2>

            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
              Merci pour votre prise de contact. Je vous répondrai dans un délai de 24 heures.
            </p>

            <button
              onClick={() => setShow(false)}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccesModal;
