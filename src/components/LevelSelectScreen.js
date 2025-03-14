import React, { useState } from 'react';
import { motion } from 'framer-motion';
import levels from '../data/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faCheck } from '@fortawesome/free-solid-svg-icons';

const LevelSelectScreen = ({ onSelect, completedLevels }) => {
  const levelNames = Object.keys(levels);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const formatLevelName = (level) => {
    const [category, number] = level.split('-');
    return number 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - ${number}` 
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.button
        className="w-8 h-8 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center text-base sm:text-lg cursor-pointer mb-2 sm:mb-4"
        onClick={() => setInstructionsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </motion.button>
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose a Level
      </motion.h1>
      <ul className="flex flex-col gap-3 sm:gap-4">
        {levelNames.map(level => (
          <motion.li
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: levelNames.indexOf(level) * 0.1 }}
          >
            <button
              className="w-40 sm:w-48 h-10 sm:h-12 bg-primary text-white rounded-lg text-base sm:text-lg cursor-pointer hover:bg-primary-hover transition duration-200 flex items-center justify-center gap-2"
              onClick={() => onSelect(level)}
            >
              <span>{formatLevelName(level)}</span>
              {completedLevels.includes(level) && (
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                </span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Modal de instrucciones */}
      {instructionsOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setInstructionsOpen(false)}
        >
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col gap-3 sm:gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl text-gray-800 text-center">Instrucciones</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center">
              Bienvenido a Word Match Puzzle:
              <br />
              1. Selecciona un nivel.
              <br />
              2. Lee las palabras y sus traducciones.
              <br />
              3. Empareja las cartas en inglés y español.
              <br />
              4. Forma la oración en inglés clicando las palabras en orden.
            </p>
            <motion.button
              className="w-20 sm:w-24 h-10 bg-red-500 text-white rounded-lg mx-auto text-sm sm:text-base"
              onClick={() => setInstructionsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Cerrar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LevelSelectScreen;