import React, { useState } from 'react';
import { motion } from 'framer-motion';
import levels from '../data/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const IntroScreen = ({ level, onStart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWords = levels[level];
  const currentWord = currentWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)]">
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md text-center"
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl sm:text-4xl text-gray-800 mb-2">{currentWord.english}</h2>
        <p className="italic text-sm sm:text-base text-gray-600 mb-2">{currentWord.spanish}</p>
        <p className="text-sm sm:text-base text-gray-700 mb-2">{currentWord.sentenceEn}</p>
        <p className="italic text-xs sm:text-sm text-gray-600">{currentWord.sentenceEs}</p>
      </motion.div>
      <div className="mt-4 sm:mt-6">
        {currentIndex < currentWords.length - 1 ? (
          <motion.button
            className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-lg text-lg sm:text-xl cursor-pointer flex items-center justify-center"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
        ) : (
          <motion.button
            className="w-24 sm:w-32 h-10 sm:h-12 bg-primary text-white rounded-lg text-base sm:text-lg cursor-pointer"
            onClick={onStart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Start Game
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;