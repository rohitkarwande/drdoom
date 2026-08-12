import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../game/store';
import { generateSymbolSequence, type SymbolConfig } from './engine';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

export const SymbolSequence: React.FC = () => {
  const { addStrike, setModuleStatus, modules } = useGameStore();
  const status = modules.symbol;

  const [config, setConfig] = useState<SymbolConfig | null>(null);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'active' && !config) {
      setConfig(generateSymbolSequence());
    }
  }, [status, config]);

  const handleSymbolClick = (sym: string) => {
    if (status !== 'active' || !config || selectedSymbols.includes(sym)) return;
    setSelectedSymbols(prev => [...prev, sym]);
  };

  const handleClear = () => {
    setSelectedSymbols([]);
  };

  const handleSubmit = () => {
    if (status !== 'active' || !config || selectedSymbols.length !== 4) return;

    const isCorrect = selectedSymbols.every((sym, index) => sym === config.solution[index]);

    if (isCorrect) {
      setModuleStatus('symbol', 'solved');
    } else {
      addStrike();
      setSelectedSymbols([]);
    }
  };

  if (!config) return <div className="text-gray-500 font-mono text-center">INITIALIZING...</div>;

  return (
    <div className={cn(
      "panel-border p-6 rounded-sm flex flex-col relative transition-colors duration-500",
      status === 'solved' && "border-emerald/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      status === 'unsolved' && "opacity-50 pointer-events-none"
    )}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display tracking-widest text-white uppercase">Symbols</h3>
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

        {/* 2x2 Grid of Symbols */}
        <div className="grid grid-cols-2 gap-4 w-full px-4">
          {config.symbols.map((sym, i) => {
            const isSelected = selectedSymbols.includes(sym);
            const selectionIndex = selectedSymbols.indexOf(sym);
            
            return (
              <button
                key={i}
                onClick={() => handleSymbolClick(sym)}
                disabled={status !== 'active' || isSelected}
                className={cn(
                  "relative h-16 flex items-center justify-center text-3xl text-gray-300 bg-gray-900 border border-gray-700 rounded-sm transition-all",
                  "hover:border-amber hover:text-white disabled:opacity-50 active:scale-95",
                  isSelected && "border-amber text-amber glow-amber bg-amber/10"
                )}
              >
                {sym}
                {isSelected && (
                  <div className="absolute top-1 left-1 text-[10px] font-mono text-amber">
                    {selectionIndex + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={handleClear} disabled={status !== 'active' || selectedSymbols.length === 0} className="w-1/3">
          CLR
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit} disabled={status !== 'active' || selectedSymbols.length !== 4} className="flex-1">
          CONFIRM
        </Button>
      </div>
    </div>
  );
};
