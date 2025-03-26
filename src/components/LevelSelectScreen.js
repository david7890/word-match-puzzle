import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import levels from '../data/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faCheck, faChevronDown, faChevronUp, faSkull } from '@fortawesome/free-solid-svg-icons';


const LevelSelectScreen = ({ onSelect, onHangmanSelect, completedLevels }) => {
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    basic: true,  // Sección básica abierta por defecto
    medium: true,
    advanced: false,
  });

  const formatLevelName = (level) => {
    const [category, number] = level.split('-');
    return number 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - ${number}` 
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Agrupar niveles por dificultad
  const groupedLevels = {
    basic: Object.keys(levels).filter(level => levels[level].difficulty === 'basic'),
    medium: Object.keys(levels).filter(level => levels[level].difficulty === 'medium'),
    advanced: Object.keys(levels).filter(level => levels[level].difficulty === 'advanced'),
  };

  const toggleSection = (difficulty) => {
    setOpenSections(prev => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }));
  };

  const handleHangmanSelect = (difficulty) => {
    const words = groupedLevels[difficulty].flatMap(level => levels[level].data.map(word => word.english));
    onHangmanSelect(difficulty, words);
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
      {/* Secciones de dificultad */}
      <div className="w-full max-w-lg">
        {['basic', 'medium', 'advanced'].map(difficulty => (
          <div key={difficulty} className="mb-4">
            <motion.button
              className={`w-full py-3 px-4 text-left text-lg font-semibold rounded-lg flex justify-between items-center ${
                difficulty === 'basic' ? 'bg-green-100 text-green-700' : 
                difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'
              }`}
              onClick={() => toggleSection(difficulty)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Levels</span>
              <FontAwesomeIcon icon={openSections[difficulty] ? faChevronUp : faChevronDown} />
            </motion.button>

            <AnimatePresence>
              {openSections[difficulty] && (
                <motion.ul
                  className="flex flex-col gap-3 mt-2 items-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Botón de Hangman como primer elemento */}
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                   <button
                      className="w-40 sm:w-48 h-10 sm:h-12 bg-indigo-600 text-white rounded-lg text-base sm:text-lg cursor-pointer hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2 px-3 sm:px-4"
                      onClick={() => handleHangmanSelect(difficulty)}
                    >
                      <FontAwesomeIcon icon={faSkull} />
                      <span>Play Hangman</span>
                    </button> 
                  </motion.li>
                  {groupedLevels[difficulty].map(level => (
                    <motion.li
                      key={level}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        className="w-40 sm:w-48 h-10 sm:h-12 bg-primary text-white rounded-lg text-base sm:text-lg cursor-pointer hover:bg-primary-hover transition duration-200 flex items-center justify-center gap-2 px-3 sm:px-4"
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
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

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