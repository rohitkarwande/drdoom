import React, { useState } from 'react';
import { useGameStore } from '../../game/store';
import { cn } from '../../utils/cn';

const VALID_CODES = ['ALPHA-7', 'DOOM-99', 'OMEGA-1', 'NEXUS-5', 'ZERO-0'];

export const MasterShutdown: React.FC = () => {
  const { modules, endGame, status, addStrike } = useGameStore();
  const [code, setCode] = useState('');

  const allSolved = Object.values(modules).every(m => m === 'solved');
  const isActive = allSolved && status === 'playing';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActive) return;

    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      endGame(true); // Player wins!
    } else {
      addStrike();
      setCode(''); // Clear on strike
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div
        className={cn(
          "w-48 p-4 rounded-sm border-2 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 relative",
          isActive ? "bg-obsidian border-amber" : "bg-obsidian border-gunmetal opacity-80 pointer-events-none"
        )}
      >
        <span className={cn(
          "text-xs font-mono text-center leading-relaxed mb-3 transition-colors",
          isActive ? "text-amber drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" : "text-gray-600"
        )}>
          MASTER<br/>OVERRIDE
        </span>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            disabled={!isActive}
            placeholder="CODE"
            className={cn(
              "w-full bg-[#111318] border text-center font-mono text-lg py-1 outline-none transition-colors",
              isActive ? "border-amber text-white focus:border-emerald focus:shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "border-gray-700 text-gray-600"
            )}
          />
          <button 
            type="submit"
            disabled={!isActive || code.length === 0}
            className={cn(
              "w-full text-xs font-mono py-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
              isActive ? "bg-amber text-obsidian hover:bg-emerald hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] font-bold tracking-widest" : "bg-gray-800 text-gray-500"
            )}
          >
            EXECUTE
          </button>
        </form>

        {/* Label above */}
        {isActive && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-amber tracking-widest uppercase whitespace-nowrap animate-pulse">
            AWAITING OVERRIDE CODE
          </div>
        )}
      </div>
    </div>
  );
};
