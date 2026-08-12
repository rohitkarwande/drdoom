import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../game/store';
import { generateDisplay, getMemoryExpectedLabel, type MemoryHistory } from './engine';
import { cn } from '../../utils/cn';

export const MemoryCore: React.FC = () => {
  const { addStrike, setModuleStatus, modules } = useGameStore();
  const status = modules.memory;

  const [round, setRound] = useState<number>(1);
  const [display, setDisplay] = useState<number | null>(null);
  const [history, setHistory] = useState<MemoryHistory[]>([]);

  // Initialize display on mount or round change
  useEffect(() => {
    if (status === 'active' && display === null) {
      setDisplay(generateDisplay());
    }
  }, [status, round, display]);

  const handlePress = (label: number) => {
    if (status !== 'active' || display === null) return;

    const expected = getMemoryExpectedLabel(round, display, history);

    if (label === expected) {
      // Correct
      const newHistory = [...history, { round, display, pressed: label }];
      setHistory(newHistory);

      if (round === 3) {
        setModuleStatus('memory', 'solved');
        setDisplay(null); // Clear display on success
      } else {
        setRound(round + 1);
        setDisplay(null); // Triggers next useEffect to generate new display
      }
    } else {
      // Incorrect
      addStrike();
      // Reset module to Round 1 as per typical manual rules for memory
      setRound(1);
      setHistory([]);
      setDisplay(null);
    }
  };

  return (
    <div className={cn(
      "panel-border p-6 rounded-sm flex flex-col relative transition-colors duration-500",
      status === 'solved' && "border-emerald/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      status === 'unsolved' && "opacity-50 pointer-events-none"
    )}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display tracking-widest text-white uppercase">Memory Core</h3>
        <div className={cn(
          "w-3 h-3 rounded-full shadow-inner",
          status === 'active' ? "bg-amber glow-amber" :
          status === 'solved' ? "bg-emerald glow-emerald" : "bg-gray-700"
        )} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
        {status === 'solved' && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none backdrop-blur-[2px]">
             <div className="text-4xl text-emerald drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">✓</div>
          </div>
        )}

        {/* Big Display Screen */}
        <div className="w-full h-16 bg-obsidian border-2 border-gunmetal flex items-center justify-center text-4xl font-mono text-white shadow-inner mb-2">
          {display !== null ? display : '-'}
        </div>

        {/* 4 Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 w-full px-8">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              disabled={status !== 'active'}
              className="h-12 flex items-center justify-center text-xl font-mono text-gray-300 bg-gray-900 border border-gray-700 rounded-sm hover:border-amber hover:text-white transition-all disabled:opacity-50 active:scale-95 active:bg-amber/20"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Stage Indicators */}
        <div className="absolute bottom-0 w-full flex justify-center gap-2">
          {[1, 2, 3].map((stage) => (
            <div key={stage} className={cn(
              "w-8 h-1 rounded-full",
              stage < round ? "bg-emerald glow-emerald" :
              stage === round && status === 'active' ? "bg-amber glow-amber animate-pulse" :
              status === 'solved' ? "bg-emerald glow-emerald" :
              "bg-gray-800"
            )} />
          ))}
        </div>
      </div>
    </div>
  );
};
