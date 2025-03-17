import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const SentenceModal = ({ pair, onClose, onComplete, totalPairs, matchedPairs }) => {
  const sentenceWords = pair.sentenceEn.split(' ');
  const [shuffledWords] = useState(() => 
    [...sentenceWords].sort(() => Math.random() - 0.5)
  );
  const [formedSentence, setFormedSentence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWordClick = (word) => {
    if (formedSentence.includes(word)) return;

    if (word === sentenceWords[currentStep]) {
      const newFormedSentence = [...formedSentence, word];
      setFormedSentence(newFormedSentence);
      setCurrentStep(currentStep + 1);

      if (currentStep + 1 === sentenceWords.length) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          if (matchedPairs === totalPairs) {
            onComplete();
          }
        }, 3000); // 2 segundos para mostrar confeti y éxito
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
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col gap-3 sm:gap-4 relative min-h-[300px] sm:min-h-[350px]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Instrucciones */}
        <div className="text-center">
          <p className="text-base sm:text-lg font-semibold text-indigo-700">Tap the words in order!</p>
          <p className="text-xs sm:text-sm text-gray-500">¡Toca las palabras en orden!</p>
        </div>

        {/* Frase formada */}
        <div className="min-h-10 sm:min-h-12 p-2 bg-gray-100 rounded-md flex items-center justify-center text-base sm:text-lg">
          {formedSentence.length > 0 ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formedSentence.join(' ')}
            </motion.span>
          ) : (
            <span className="text-gray-400 italic">Start here...</span>
          )}
        </div>

        {/* Traducción */}
        <p className="italic text-sm sm:text-base text-gray-600 text-center">{pair.sentenceEs}</p>

        {/* Palabras clicables */}
        <div className="flex flex-wrap gap-2 justify-center">
          {shuffledWords.map((word, index) => (
            <motion.button
              key={index}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-white text-sm sm:text-base ${
                formedSentence.includes(word) ? 'bg-green-500' : 'bg-indigo-600'
              } ${formedSentence.includes(word) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-indigo-700'}`}
              onClick={() => handleWordClick(word)}
              disabled={formedSentence.includes(word)}
              whileHover={{ scale: formedSentence.includes(word) ? 1 : 1.05 }}
              whileTap={
                formedSentence.includes(word)
                  ? { scale: 0.95 }
                  : word !== sentenceWords[currentStep]
                  ? shakeAnimation
                  : { scale: 0.95, rotate: 5 }
              }
              transition={{ duration: 0.2 }}
            >
              {word}
            </motion.button>
          ))}
        </div>

        {/* Espacio reservado para el botón Close */}
        <div className="h-10 sm:h-12 flex items-center justify-center">
          {formedSentence.length === 0 && (
            <motion.button
              className="w-20 sm:w-24 h-10 bg-red-500 text-white rounded-lg text-sm sm:text-base"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Close
            </motion.button>
          )}
        </div>

        {/* Celebración con confeti y mensaje */}
        {showSuccess && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={450} />
            <motion.div
              className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl font-bold text-green-600">Great Job!</p>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SentenceModal;