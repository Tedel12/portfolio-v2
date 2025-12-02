import React from 'react'
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X, Sparkles } from "lucide-react";

const SuccesModal = ({ show, setShow, isDarkMode }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className={`relative p-8 rounded-2xl border max-w-sm w-full text-center ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton X */}
            <button
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setShow(false)}
            >
              <X size={18} className='cursor-pointer' />
            </button>

            {/* Icône */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle size={32} className="text-white" />
            </motion.div>

            {/* Texte */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl font-semibold mb-2"
            >
              Message envoyé avec succès !
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
            >
              Merci de m'avoir contacté. Je vous répondrai dès que possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Sparkles
                size={28}
                className={`${isDarkMode ? "text-yellow-400" : "text-yellow-500"} mx-auto`}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccesModal;
