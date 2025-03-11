import React, { useState } from 'react';
import LevelSelectScreen from './components/LevelSelectScreen';
import IntroScreen from './components/IntroScreen';
import GameBoard from './components/GameBoard';
import levels from './data/levels';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('levelSelect');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completedLevels, setCompletedLevels] = useState(() => {
    return JSON.parse(localStorage.getItem('completedLevels')) || [];
  });


  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentScreen('intro');
  };

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleHome = () => {
    setCurrentScreen('levelSelect');
  };

  const handleLevelComplete = (level) => {
    if (!completedLevels.includes(level)) {
      const newCompleted = [...completedLevels, level];
      setCompletedLevels(newCompleted);
      localStorage.setItem('completedLevels', JSON.stringify(newCompleted));
    }
    setTimeout(() => {
      setCurrentScreen('levelSelect'); // Retraso para una transición suave
    }, 500); // 500ms para que el modal se cierre antes de cambiar pantalla
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-4 sm:mb-6">Word Match Puzzle</h1>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {currentScreen === 'levelSelect' && (
          <LevelSelectScreen onSelect={handleLevelSelect} completedLevels={completedLevels} />
        )}
        {currentScreen === 'intro' && <IntroScreen level={selectedLevel} onStart={handleStartGame} />}
        {currentScreen === 'game' && (
          <GameBoard
            levelWords={levels[selectedLevel]}
            onHome={handleHome}
            onLevelComplete={() => handleLevelComplete(selectedLevel)}
          />
        )}
      </div>
    </div>
  );
};

export default App;