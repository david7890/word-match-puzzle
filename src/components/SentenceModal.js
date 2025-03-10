import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SentenceModal = ({ pair, onClose }) => {
  const sentenceWords = pair.sentenceEn.split(' ');
  const [shuffledWords] = useState(() => 
    [...sentenceWords].sort(() => Math.random() - 0.5)
  );
  const [formedSentence, setFormedSentence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleWordClick = (word) => {
    if (word === sentenceWords[currentStep]) {
      setFormedSentence([...formedSentence, word]);
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 === sentenceWords.length) {
        setTimeout(onClose, 1500);
      }
    }
  };

  const shakeAnimation = {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col gap-3 sm:gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <p className="text-base sm:text-lg text-gray-700 mb-1">Start clicking the words below!</p>
          <p className="text-xs sm:text-sm text-gray-500">¡Empieza haciendo clic en las palabras de abajo!</p>
        </div>
        <div className="min-h-10 sm:min-h-12 p-2 bg-gray-100 rounded-md flex items-center justify-center text-base sm:text-lg">
          {formedSentence.length > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formedSentence.join(' ')}
            </motion.span>
          )}
        </div>
        <p className="italic text-sm sm:text-base text-gray-600 text-center">{pair.sentenceEs}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {shuffledWords.map((word, index) => (
            <motion.button
              key={index}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-white text-sm sm:text-base ${
                formedSentence.includes(word) ? 'bg-green-500' : 'bg-primary'
              } ${formedSentence.includes(word) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-primary-hover'}`}
              onClick={() => handleWordClick(word)}
              disabled={formedSentence.includes(word)}
              whileHover={{ scale: formedSentence.includes(word) ? 1 : 1.05 }}
              whileTap={
                formedSentence.includes(word)
                  ? { scale: 0.95 }
                  : word !== sentenceWords[currentStep]
                  ? shakeAnimation
                  : { scale: 0.95 }
              }
              transition={{ duration: 0.2 }}
            >
              {word}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="w-20 sm:w-24 h-10 bg-red-500 text-white rounded-lg mx-auto text-sm sm:text-base"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SentenceModal;