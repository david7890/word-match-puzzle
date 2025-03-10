import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const Card = ({ content, isFlipped, isMatched, onClick }) => {
  return (
    <motion.div
      className="w-20 sm:w-24 h-20 sm:h-24 relative cursor-pointer"
      onClick={onClick}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-lg ${
          isMatched ? 'bg-green-200' : 'bg-gray-300'
        }`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        {!isFlipped && !isMatched && (
          <FontAwesomeIcon icon={faQuestion} className="text-xl sm:text-2xl text-gray-600" />
        )}
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary text-white"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <motion.span
          className="text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFlipped || isMatched ? 1 : 0 }}
          transition={{ duration: 0.1, delay: isFlipped || isMatched ? 0.15 : 0 }}
        >
          {content}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Card;