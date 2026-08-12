import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../game/store';
import { generateLogicGrid, type LogicGridConfig } from './engine';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

export const LogicPanel: React.FC = () => {
  const { addStrike, setModuleStatus, modules } = useGameStore();
  const status = modules.logic;

  const [config, setConfig] = useState<LogicGridConfig | null>(null);
  const [input, setInput] = useState<number[]>([]);

  // Generate puzzle on mount
  useEffect(() => {
    if (status === 'active' && !config) {
      setConfig(generateLogicGrid());
    }
  }, [status, config]);

  const handleNumberClick = (num: number) => {
    if (status !== 'active' || !config) return;
    if (input.length < config.solution.length) {
      setInput(prev => [...prev, num]);
    }
  };

  const handleClear = () => {
    setInput([]);
  };

  const handleSubmit = () => {
    if (status !== 'active' || !config || input.length === 0) return;

    const isCorrect = input.length === config.solution.length && 
                      input.every((val, index) => val === config.solution[index]);

    if (isCorrect) {
      setModuleStatus('logic', 'solved');
    } else {
      addStrike();
      setInput([]);
    }
  };

  if (!config) return <div className="text-gray-500 font-mono text-center">INITIALIZING...</div>;

  return (
    <div className={cn(
      "panel-border p-6 rounded-sm flex flex-col relative transition-colors duration-500",
      status === 'solved' && "border-emerald/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
      status === 'unsolved' && "opacity-50 pointer-events-none"
    )}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h3 className="font-display tracking-widest text-white uppercase">Logic Panel</h3>
          {config && <span className="text-[10px] font-mono text-amber tracking-widest mt-1">SYS.CHK: {config.rule}</span>}
        </div>
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

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2">
          {config.grid.map((num, i) => (
            <button
              key={i}
              onClick={() => handleNumberClick(num)}
              disabled={status !== 'active' || input.length >= config.solution.length}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl font-mono text-gray-300 bg-gray-900 border border-gray-700 rounded-sm hover:border-amber hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Input Display */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">INPUT</div>
          <div className="flex gap-2 h-10">
            {Array.from({ length: config.solution.length }).map((_, i) => (
              <div 
                key={i} 
                className="w-8 h-10 border-b-2 border-gunmetal flex items-center justify-center text-lg font-mono text-amber drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
              >
                {input[i] !== undefined ? input[i] : '_'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={handleClear} disabled={status !== 'active' || input.length === 0} className="w-1/3">
          CLR
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit} disabled={status !== 'active' || input.length !== config.solution.length} className="flex-1">
          CONFIRM
        </Button>
      </div>
    </div>
  );
};
