import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../game/store';
import { Button } from '../components/ui/Button';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { status, remainingTime, strikes, hintsUsed, resetGame } = useGameStore();

  const isWin = status === 'won';
  
  const baseScore = 1000;
  const timeBonus = isWin ? remainingTime * 2 : 0;
  const strikePenalty = strikes * 150;
  const hintPenalty = hintsUsed * 50;
  const completionBonus = isWin ? 500 : 0;
  
  const finalScore = Math.max(0, baseScore + timeBonus - strikePenalty - hintPenalty + completionBonus);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleReplay = () => {
    resetGame();
    navigate('/game');
  };

  const handleMenu = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-obsidian relative overflow-hidden">
      {/* Background glow based on result */}
      <div className={`absolute inset-0 opacity-10 pointer-events-none ${isWin ? 'bg-emerald' : 'bg-crimson'}`} />

      <h1 className={`text-5xl md:text-7xl font-display tracking-widest uppercase mb-2 ${isWin ? 'text-emerald drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'text-crimson drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]'}`}>
        {isWin ? 'Protocol Complete' : 'Protocol Failed'}
      </h1>
      
      <h2 className="text-xl font-mono text-gray-400 tracking-widest uppercase mb-12">
        {isWin ? 'Device Deactivated' : 'Device System Locked'}
      </h2>
      
      <div className="w-full max-w-md panel-border p-8 rounded-sm bg-obsidian/80 backdrop-blur-sm z-10 mb-12">
        <div className="space-y-4 font-mono text-gray-300">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span>TIME REMAINING</span>
            <span className={isWin ? 'text-emerald' : 'text-crimson'}>{formatTime(remainingTime)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span>STRIKES</span>
            <span className={strikes >= 3 ? 'text-crimson' : 'text-amber'}>{strikes} / 3</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span>HINTS USED</span>
            <span>{hintsUsed}</span>
          </div>
          
          <div className="pt-6 space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>BASE SCORE</span>
              <span>1000</span>
            </div>
            {timeBonus > 0 && (
              <div className="flex justify-between text-emerald">
                <span>TIME BONUS</span>
                <span>+{timeBonus}</span>
              </div>
            )}
            {strikePenalty > 0 && (
              <div className="flex justify-between text-crimson">
                <span>STRIKE PENALTY</span>
                <span>-{strikePenalty}</span>
              </div>
            )}
            {completionBonus > 0 && (
              <div className="flex justify-between text-emerald">
                <span>COMPLETION BONUS</span>
                <span>+{completionBonus}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-end pt-6 border-t border-gunmetal mt-4">
            <span className="text-xl">FINAL SCORE</span>
            <span className="text-3xl text-white">{finalScore}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 z-10">
        <Button size="lg" onClick={handleReplay}>Play Again</Button>
        <Button size="lg" variant="secondary" onClick={handleMenu}>Main Menu</Button>
      </div>
    </div>
  );
};
