import React, { useState } from 'react';
import Card from './Card';
import SentenceModal from './SentenceModal';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const GameBoard = ({ levelWords, onHome, onLevelComplete }) => {
  const createCards = () => {
    const cardPairs = levelWords.flatMap(word => [
      { id: `${word.id}-en`, content: word.english, matchId: word.id },
      { id: `${word.id}-es`, content: word.spanish, matchId: word.id },
    ]);
    return cardPairs.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPair, setCurrentPair] = useState(null);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card) || matchedCards.includes(card.id)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (first.matchId === second.matchId) {
        const newMatched = [...matchedCards, first.id, second.id];
        setMatchedCards(newMatched);
        setCurrentPair(levelWords.find(word => word.id === first.matchId));
        setFlippedCards([]);
        setTimeout(() => {
          setModalOpen(true);
        }, 1000);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentPair(null);
  };

  return (
    <div className="text-center p-4 sm:p-5 max-w-full sm:max-w-2xl mx-auto">
      <div className="flex justify-center mb-4 sm:mb-5">
        <motion.button
          className="w-10 h-10 text-lg sm:text-xl bg-primary text-white rounded-lg cursor-pointer flex items-center justify-center"
          onClick={onHome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </motion.button>
      </div>
      <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-5">Match the Words!</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 justify-center">
        {cards.map(card => (
          <Card
            key={card.id}
            content={card.content}
            isFlipped={flippedCards.some(c => c.id === card.id)}
            isMatched={matchedCards.includes(card.id)}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      <motion.button
        className="w-20 sm:w-24 h-10 mt-4 sm:mt-5 text-sm sm:text-base bg-primary text-white rounded-lg cursor-pointer"
        onClick={resetGame}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Reset Game
      </motion.button>
      {modalOpen && (
        <SentenceModal
          pair={currentPair}
          onClose={closeModal}
          onComplete={onLevelComplete}
          totalPairs={levelWords.length}
          matchedPairs={matchedCards.length / 2}
        />
      )}
    </div>
  );
};

export default GameBoard;