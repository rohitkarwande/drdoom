import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../game/store';
import { generateWireGrid, type WireGridConfig, type WireColor } from './engine';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const wireColorMap: Record<WireColor, string> = {
  RED: 'bg-red-600',
  BLUE: 'bg-blue-600',
  WHITE: 'bg-gray-200',
  BLACK: 'bg-gray-900',
  YELLOW: 'bg-yellow-400'
};

export const WireGrid: React.FC = () => {
  const { serialNumber, indicators, addStrike, setModuleStatus, modules } = useGameStore();
  const status = modules.wire;

  const [config, setConfig] = useState<WireGridConfig | null>(null);
  const [selectedWire, setSelectedWire] = useState<number | null>(null);
  const [severedWires, setSeveredWires] = useState<number[]>([]);

  // Generate puzzle on mount
  useEffect(() => {
    if (status === 'active' && !config) {
      setConfig(generateWireGrid(serialNumber, indicators.arm, indicators.power));
    }
  }, [status, config, serialNumber, indicators]);

  const handleCut = () => {
    if (selectedWire === null || status !== 'active' || !config) return;

    setSeveredWires(prev => [...prev, selectedWire]);

    if (selectedWire === config.solutionIndex) {
      setModuleStatus('wire', 'solved');
      setSelectedWire(null);
    } else {
      addStrike();
      setSelectedWire(null);
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
        <h3 className="font-display tracking-widest text-white uppercase">Wire Grid</h3>
        <div className={cn(
          "w-3 h-3 rounded-full shadow-inner",
          status === 'active' ? "bg-amber glow-amber" :
          status === 'solved' ? "bg-emerald glow-emerald" : "bg-gray-700"
        )} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 px-8 relative">
        {status === 'solved' && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
             <div className="text-4xl text-emerald drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">✓</div>
          </div>
        )}

        {config.wires.map((color, i) => {
          const isSevered = severedWires.includes(i);
          const isSelected = selectedWire === i;
          
          return (
            <div 
              key={i} 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => {
                if (!isSevered && status === 'active') setSelectedWire(i);
              }}
            >
              <div className="text-gray-500 font-mono text-xs w-6">{i + 1}</div>
              <div className="relative flex-1 h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                {/* The Wire */}
                <div className={cn(
                  "absolute inset-y-0 left-0 transition-all duration-300",
                  wireColorMap[color],
                  isSevered ? "w-1/3" : "w-full",
                  isSelected && "brightness-150 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                )} />
                {isSevered && (
                  <div className={cn(
                    "absolute inset-y-0 right-0 w-1/3 transition-all duration-300",
                    wireColorMap[color]
                  )} />
                )}
                {/* Visual texture */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center h-12">
        {selectedWire !== null && status === 'active' && (
          <Button variant="primary" size="sm" onClick={handleCut} className="w-full max-w-[200px]">
            CUT WIRE
          </Button>
        )}
      </div>
    </div>
  );
};
