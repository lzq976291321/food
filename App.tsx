import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Sparkles, Zap, RotateCcw, BookOpen } from 'lucide-react';
import { FOOD_LIST, COMPLIMENTS } from './constants';
import { FoodItem } from './types';
import ExplosionCanvas from './components/ExplosionCanvas';
import Confetti from './components/Confetti';
import GlitchText from './components/GlitchText';
import RecipeModal from './components/RecipeModal';
import { initAudio, playClickSound, playTickSound, playWinSound } from './utils/audio';

const App: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem>(FOOD_LIST[0]);
  const [showResult, setShowResult] = useState(false);
  const [compliment, setCompliment] = useState("");
  const [history, setHistory] = useState<FoodItem[]>([]);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  const startRoll = useCallback(() => {
    if (isRolling) return;
    
    // Initialize audio context on first user gesture
    initAudio();
    playClickSound();
    
    setIsRolling(true);
    setShowResult(false);
    setIsRecipeOpen(false);
    
    // Initial speed
    let interval = 50;
    let counter = 0;
    
    const shuffle = () => {
      const randomIndex = Math.floor(Math.random() * FOOD_LIST.length);
      setSelectedFood(FOOD_LIST[randomIndex]);
      playTickSound();
      
      counter++;
      
      // Decelerate curve
      if (counter > 20) interval += 10;
      if (counter > 30) interval += 30;
      if (counter > 35) interval += 50;
      
      if (counter > 40) {
        // Stop
        finishRoll();
      } else {
        timerRef.current = setTimeout(shuffle, interval);
      }
    };
    
    shuffle();
  }, [isRolling]);

  const finishRoll = () => {
    // Determine final winner (ensure random actually feels random)
    const finalIndex = Math.floor(Math.random() * FOOD_LIST.length);
    const winner = FOOD_LIST[finalIndex];
    
    playWinSound();
    setSelectedFood(winner);
    setIsRolling(false);
    setShowResult(true);
    setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
    setHistory(prev => [winner, ...prev].slice(0, 5));
    
    // Clear timeout just in case
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-pink-500 selection:text-white">
      
      {/* 3D Background */}
      <ExplosionCanvas isRolling={isRolling} currentColor={selectedFood.color} />
      
      {/* Confetti Overlay */}
      <Confetti active={showResult} />

      {/* Recipe Modal */}
      <RecipeModal 
        isOpen={isRecipeOpen} 
        onClose={() => setIsRecipeOpen(false)} 
        foodItem={selectedFood}
      />

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 py-8">
        
        {/* Header / Title */}
        <header className="mb-8 text-center animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)] transform -skew-x-12">
            FOOD RUSH
          </h1>
          <p className="mt-2 text-cyan-400 text-lg font-bold tracking-widest uppercase opacity-80">
            Dopamine Generator 3000
          </p>
        </header>

        {/* Main Display Area */}
        <div className="relative group w-full max-w-md aspect-square flex items-center justify-center mb-8">
          
          {/* Dynamic Glow Ring */}
          <div 
            className={`absolute inset-0 rounded-full blur-3xl opacity-40 transition-all duration-300 ${isRolling ? 'scale-125 opacity-60' : 'scale-100'}`}
            style={{ backgroundColor: selectedFood.color }}
          ></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* The Emoji Display */}
            <div 
              className={`text-9xl md:text-[10rem] leading-none transition-transform duration-100 select-none filter drop-shadow-2xl
                ${isRolling ? 'animate-bounce scale-110 blur-[1px]' : 'scale-100'} 
                ${showResult ? 'animate-[bounce_1s_infinite] scale-125' : ''}
              `}
              style={{ textShadow: `0 0 50px ${selectedFood.color}` }}
            >
              {selectedFood.emoji}
            </div>
            
            {/* The Text Display */}
            <div className="mt-8 h-24 flex items-center justify-center">
               <GlitchText 
                 text={selectedFood.name} 
                 isActive={isRolling || showResult}
                 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase"
               />
            </div>
            
            {/* Description or Compliment */}
            <div className="h-12 mt-2">
              {showResult && (
                <p className="text-xl font-bold text-yellow-300 animate-pulse">
                  {compliment}
                </p>
              )}
              {isRolling && (
                <p className="text-lg font-mono text-cyan-400">
                  SEARCHING THE UNIVERSE...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <button
            onClick={startRoll}
            disabled={isRolling}
            className={`
              relative group px-12 py-6 rounded-2xl font-black text-2xl md:text-3xl tracking-widest uppercase transition-all duration-100
              transform hover:-translate-y-1 hover:scale-105 active:translate-y-2 active:scale-95 w-full md:w-auto
              ${isRolling 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-4 border-gray-700' 
                : 'bg-white text-black border-4 border-transparent hover:border-white shadow-[0_0_50px_rgba(255,255,255,0.5)]'
              }
            `}
          >
            {/* Gradient Border Trick */}
            {!isRolling && (
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-75 blur group-hover:opacity-100 transition duration-200 group-hover:duration-200 animate-tilt -z-10"></div>
            )}
            
            <span className="flex items-center justify-center gap-3 relative z-10">
              {isRolling ? (
                <>
                  <RotateCcw className="animate-spin" size={32} />
                  ROLLING...
                </>
              ) : (
                <>
                  <Zap className="fill-yellow-400 text-yellow-400" size={32} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    EXPLODE MEAL
                  </span>
                  <Zap className="fill-yellow-400 text-yellow-400" size={32} />
                </>
              )}
            </span>
          </button>

          {/* View Recipe Button - Only shows when result is available */}
          {showResult && !isRolling && (
             <button
              onClick={() => {
                playClickSound();
                setIsRecipeOpen(true);
              }}
              className="group relative px-8 py-6 rounded-2xl font-bold text-xl uppercase tracking-wider text-cyan-400 border-2 border-cyan-500/50 hover:bg-cyan-900/30 hover:border-cyan-400 hover:text-cyan-200 transition-all transform hover:-translate-y-1 active:scale-95 w-full md:w-auto overflow-hidden"
             >
               <span className="flex items-center justify-center gap-2 relative z-10">
                 <BookOpen size={24} />
                 View Recipe
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
             </button>
          )}
        </div>
        
        {/* History Bar */}
        {history.length > 0 && (
          <div className="mt-12 w-full max-w-2xl">
             <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
               <span className="h-[1px] bg-gray-700 flex-grow"></span>
               <span className="text-xs font-mono uppercase tracking-widest text-gray-500">History</span>
               <span className="h-[1px] bg-gray-700 flex-grow"></span>
             </div>
             
             <div className="flex justify-center gap-4 flex-wrap">
               {history.map((item, idx) => (
                 <div 
                   key={`${item.id}-${idx}`} 
                   className="flex flex-col items-center animate-fade-in-up"
                   style={{ animationDelay: `${idx * 100}ms` }}
                 >
                   <div 
                    className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xl shadow-lg relative group-hover:scale-110 transition-transform cursor-pointer" 
                    title={item.name}
                    onClick={() => {
                      setSelectedFood(item);
                      setShowResult(true);
                      setCompliment("Revisiting a classic!");
                    }}
                   >
                     {item.emoji}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </main>
      
      {/* Decorative footer elements */}
      <div className="fixed bottom-4 right-4 text-xs font-mono text-gray-800 pointer-events-none select-none">
        v1.1.0 // RECIPE_MODULE: ONLINE
      </div>
    </div>
  );
};

export default App;