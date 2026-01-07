
import React, { useState, useEffect, useCallback } from 'react';
import { CHARACTERS, LEVELS } from './constants';
import { Character, GameState, Level } from './types';
import { getStoryNarration } from './geminiService';

// --- Sub-components ---

// Added key to props type definition to fix the assignment error.
const CharacterCard = ({ char, onSelect, key }: { char: Character, onSelect: (c: Character) => void, key?: React.Key }) => (
  <button
    onClick={() => onSelect(char)}
    className={`p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 border-4 border-transparent hover:border-white ${char.color} text-white flex flex-col items-center gap-2`}
  >
    <span className="text-5xl mb-2">{char.icon}</span>
    <h3 className="text-xl font-bold">{char.name}</h3>
    <p className="text-sm opacity-90">{char.role}</p>
    <div className="mt-4 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
      Skill: {char.skill}
    </div>
  </button>
);

const PuzzleView = ({ level, onSolve }: { level: Level, onSolve: () => void }) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const puzzle = level.puzzles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setFeedback('Correct! 🎉');
      setTimeout(onSolve, 1500);
    } else {
      setFeedback('Not quite right. Try again!');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{level.title}</h3>
      <p className="text-gray-600 mb-6 italic">"{level.description}"</p>
      
      <div className="mb-8 p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200">
        <p className="text-lg font-medium text-blue-900">{puzzle.question}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {puzzle.options ? (
          <div className="grid grid-cols-2 gap-4">
            {puzzle.options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setUserInput(opt)}
                className={`p-4 rounded-xl border-2 transition-all ${userInput === opt ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer..."
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
          />
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Submit Answer
        </button>
      </form>

      <div className="mt-6 flex justify-between items-center">
        <button 
          onClick={() => setShowHint(!showHint)}
          className="text-blue-500 text-sm font-semibold hover:underline"
        >
          {showHint ? 'Hide Hint' : 'Need a Hint?'}
        </button>
        {feedback && (
          <p className={`font-bold ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
            {feedback}
          </p>
        )}
      </div>
      {showHint && (
        <p className="mt-3 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
           💡 {puzzle.hint}
        </p>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevelIndex: -1, // -1 means start screen
    selectedCharacter: null,
    completedLevels: [],
    inventory: [],
    badges: []
  });

  const [narration, setNarration] = useState('');
  const [isNarrationLoading, setIsNarrationLoading] = useState(false);

  const startGame = (char: Character) => {
    setGameState(prev => ({
      ...prev,
      selectedCharacter: char,
      currentLevelIndex: 0
    }));
  };

  const nextLevel = () => {
    setGameState(prev => ({
      ...prev,
      currentLevelIndex: prev.currentLevelIndex + 1,
      completedLevels: [...prev.completedLevels, prev.currentLevelIndex]
    }));
  };

  const restartGame = () => {
    setGameState({
      currentLevelIndex: -1,
      selectedCharacter: null,
      completedLevels: [],
      inventory: [],
      badges: []
    });
    setNarration('');
  };

  // Fetch AI narration when level changes
  useEffect(() => {
    if (gameState.currentLevelIndex >= 0 && gameState.currentLevelIndex < LEVELS.length && gameState.selectedCharacter) {
      const level = LEVELS[gameState.currentLevelIndex];
      setIsNarrationLoading(true);
      getStoryNarration(level.title, gameState.selectedCharacter.name).then(text => {
        setNarration(text || '');
        setIsNarrationLoading(false);
      });
    }
  }, [gameState.currentLevelIndex, gameState.selectedCharacter]);

  // --- UI Screens ---

  // Start Screen
  if (gameState.currentLevelIndex === -1) {
    return (
      <div className="min-h-screen adventure-bg flex flex-col items-center justify-center p-6 text-white text-center">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg float-animation">
          Lost City Explorers
        </h1>
        <p className="text-xl mb-12 max-w-2xl opacity-90">
          खोए हुए शहर का रहस्य खोजने की तैयारी करो। अपनी टीम का सदस्य चुनें और रोमांचक यात्रा पर निकलें।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {CHARACTERS.map(char => (
            <CharacterCard key={char.id} char={char} onSelect={startGame} />
          ))}
        </div>
        <footer className="mt-16 text-sm opacity-60">
          Made with ❤️ for Explorers | No Violence Adventure
        </footer>
      </div>
    );
  }

  // Final Victory Screen
  if (gameState.currentLevelIndex >= LEVELS.length) {
    return (
      <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-2xl">
          <span className="text-8xl mb-6 block">🏆</span>
          <h2 className="text-5xl font-black text-yellow-600 mb-4">CITY REDISCOVERED!</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            बधाई हो, <strong>{gameState.selectedCharacter?.name}</strong>! आपने अपनी बुद्धिमानी से खोए हुए शहर के सभी रहस्य सुलझा लिए हैं।
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="bg-green-100 px-6 py-3 rounded-full text-green-700 font-bold border-2 border-green-200">
              Explorer Badge 🏅
            </div>
            <div className="bg-blue-100 px-6 py-3 rounded-full text-blue-700 font-bold border-2 border-blue-200">
              Puzzle Master 🧠
            </div>
          </div>
          <button
            onClick={restartGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all shadow-lg hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Active Gameplay Screen
  const currentLevel = LEVELS[gameState.currentLevelIndex];

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center pb-12">
      {/* Header Bar */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{gameState.selectedCharacter?.icon}</span>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Playing As</p>
            <p className="font-bold text-gray-800">{gameState.selectedCharacter?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Progress</p>
            <p className="font-bold text-emerald-600">Level {currentLevel.id} of {LEVELS.length}</p>
          </div>
          <div className="h-10 w-10 rounded-full border-4 border-emerald-200 flex items-center justify-center font-bold text-emerald-600">
            {currentLevel.id}
          </div>
        </div>
      </header>

      {/* Level Visual */}
      <div className="w-full max-w-4xl mt-8 px-4">
        <div className="relative h-64 md:h-96 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src={currentLevel.image} 
            alt={currentLevel.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <h2 className="text-white text-4xl font-black">{currentLevel.title}</h2>
          </div>
        </div>
      </div>

      {/* AI Narration Bubble */}
      <div className="max-w-4xl w-full px-4 mt-8">
        <div className="bg-blue-600 text-white p-6 rounded-3xl rounded-tl-none shadow-lg relative">
          <div className="absolute -top-3 left-0 w-6 h-6 bg-blue-600 rotate-45"></div>
          {isNarrationLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-pulse bg-white/20 h-4 w-4 rounded-full"></div>
              <div className="animate-pulse bg-white/20 h-4 w-4 rounded-full"></div>
              <div className="animate-pulse bg-white/20 h-4 w-4 rounded-full"></div>
            </div>
          ) : (
            <p className="text-lg italic font-medium leading-relaxed">
              {narration || "The path is mysterious. Look for clues around you."}
            </p>
          )}
        </div>
      </div>

      {/* Puzzle Section */}
      <main className="mt-12 px-4 flex justify-center w-full">
        <PuzzleView level={currentLevel} onSolve={nextLevel} />
      </main>

      {/* Footer Instructions */}
      <footer className="mt-12 text-gray-400 text-sm max-w-lg text-center px-4">
        Tip: Remember {gameState.selectedCharacter?.name}'s skill is <strong>{gameState.selectedCharacter?.skill}</strong>. It might help you understand the clues better!
      </footer>
    </div>
  );
}
