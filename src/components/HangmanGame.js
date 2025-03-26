import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const HangmanGame = ({ words, onHome }) => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);

  const qwertyKeyboard = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    'zxcvbnm'.split(''),
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    setWord(selectedWord);

    const letters = selectedWord.split('');
    const hintCount = Math.floor(letters.length / 2);
    const randomIndexes = [];

    while (randomIndexes.length < hintCount && letters.length > 0) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    const initialGuesses = randomIndexes.map(index => letters[index]);
    setGuessedLetters(initialGuesses);
  }, [words]);

  const displayWord = word
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && attemptsLeft > 0) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setAttemptsLeft(attemptsLeft - 1);
      }
    }
  };

  const hasWon = word && word.split('').every(letter => guessedLetters.includes(letter));
  const hasLost = attemptsLeft === 0;

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-80px)] sm:h-[calc(100vh-96px)] overflow-hidden bg-gray-50">
      {/* Header interno (botón Home) */}
      <div className="w-full max-w-md flex justify-center pt-4 sm:pt-5">
        <motion.button
          className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center"
          onClick={onHome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </motion.button>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center flex-grow w-full max-w-md px-4 sm:px-5 pb-4 sm:pb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 mt-4 sm:mt-6 mb-4 sm:mb-6">Guess the Word!</h2>
        <p className="text-xl sm:text-2xl font-mono mb-4 sm:mb-6 break-words">{displayWord}</p>
        <p className="text-base sm:text-lg mb-4 sm:mb-6">Attempts left: {attemptsLeft}</p>
        {hasWon && (
          <p className="text-lg sm:text-xl text-green-600 font-semibold mb-4 sm:mb-6">You won! The word was "{word}".</p>
        )}
        {hasLost && (
          <p className="text-lg sm:text-xl text-red-600 font-semibold mb-4 sm:mb-6">Game over! The word was "{word}".</p>
        )}
        <div className="flex flex-col gap-2 w-full">
          {qwertyKeyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5">
              {row.map(letter => (
                <motion.button
                  key={letter}
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 text-gray-800 rounded-lg text-base sm:text-lg font-medium flex items-center justify-center ${
                    guessedLetters.includes(letter) ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-300'
                  }`}
                  onClick={() => handleGuess(letter)}
                  disabled={guessedLetters.includes(letter) || hasWon || hasLost}
                  whileHover={{ scale: guessedLetters.includes(letter) ? 1 : 1.05 }}
                  whileTap={{ scale: guessedLetters.includes(letter) ? 1 : 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  {letter.toUpperCase()}
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;