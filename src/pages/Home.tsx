import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useGameStore } from '../game/store';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { resetGame } = useGameStore();

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative">
      {/* Background ambient effects could go here */}
      
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-4 uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          Zero Hour
        </h1>
        <h2 className="text-2xl md:text-3xl font-mono text-emerald tracking-widest uppercase glow-emerald">
          The Doom Protocol
        </h2>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-sm relative z-10">
        <Button size="lg" onClick={() => navigate('/game')} className="w-full">
          Initiate Protocol
        </Button>
        <Button size="md" variant="secondary" onClick={() => navigate('/how-to-play')} className="w-full">
          How to Play
        </Button>
        <Button size="md" variant="secondary" onClick={() => navigate('/manual')} className="w-full">
          Manual
        </Button>
        <Button size="md" variant="ghost" onClick={() => alert('Settings coming soon')} className="w-full">
          Settings
        </Button>
      </div>
      
      <div className="absolute bottom-8 font-mono text-xs text-gray-600 tracking-widest uppercase">
        System Version 1.0.0
      </div>
    </div>
  );
};
