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

  const handleHeaderClick = () => {
    if (currentScreen !== 'game') { // Solo cambia si no estás en GameBoard
      setCurrentScreen('levelSelect');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-5">
      <header className="mb-6 sm:mb-8 cursor-pointer" onClick={handleHeaderClick}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex items-center gap-1">
          <span className="bg-indigo-600 text-white px-2 py-1 rounded-md">W</span>
          ord
          <span className="bg-indigo-600 text-white px-2 py-1 rounded-md">M</span>
          atch
        </h1>
      </header>
      
      <div className="w-full max-w-2xl flex flex-col items-center">
        {currentScreen === 'levelSelect' && (
          <LevelSelectScreen onSelect={handleLevelSelect} completedLevels={completedLevels} />
        )}
        {currentScreen === 'intro' && (
          <IntroScreen level={levels[selectedLevel].data} onStart={handleStartGame} />
        )}
        {currentScreen === 'game' && (
          <GameBoard
            levelWords={levels[selectedLevel].data}
            onHome={handleHome}
            onLevelComplete={() => handleLevelComplete(selectedLevel)}
          />
        )}
      </div>
    </div>
  );
};

export default App;