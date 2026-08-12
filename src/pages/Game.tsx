import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../game/store';
import { Button } from '../components/ui/Button';
import { Timer } from '../components/game/Timer';
import { Indicators } from '../components/game/Indicators';
import { WireGrid } from '../modules/wire/WireGrid';
import { LogicPanel } from '../modules/logic/LogicPanel';
import { SymbolSequence } from '../modules/symbol/SymbolSequence';
import { MemoryCore } from '../modules/memory/MemoryCore';
import { MasterShutdown } from '../components/game/MasterShutdown';

import { ManualContent } from '../components/manual/ManualContent';

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { status, startGame } = useGameStore();
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      startGame();
    }
    
    if (status === 'won' || status === 'lost') {
      navigate('/results');
    }
  }, [status, startGame, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setShowManual(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (status === 'idle') {
    return <div className="min-h-screen bg-obsidian flex items-center justify-center text-white">Initializing...</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col bg-obsidian max-w-[1280px] mx-auto relative">
      {/* Manual Overlay */}
      {showManual && (
        <div className="absolute inset-4 md:inset-8 z-[100] flex flex-col bg-obsidian border-2 border-emerald shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="flex justify-between items-center p-4 border-b border-emerald bg-emerald/10">
            <h2 className="text-xl font-display text-emerald tracking-widest uppercase">Emergency Manual Overlay</h2>
            <div className="flex items-center gap-4">
              <div className="transform scale-75 origin-right">
                <Timer />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowManual(false)}>Close (TAB)</Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <ManualContent />
          </div>
        </div>
      )}

      {/* Top Bar: Indicators and Timer */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div className="flex-1">
          <Indicators />
        </div>
        <div className="flex-shrink-0">
          <Timer />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <WireGrid />
        <LogicPanel />
        <SymbolSequence />
        <MemoryCore />
        
        {/* Master Shutdown (Center) */}
        <MasterShutdown />
      </div>

      {/* Floating Manual Button */}
      {!showManual && (
        <button
          onClick={() => setShowManual(true)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-gunmetal border-2 border-emerald text-emerald flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:bg-emerald hover:text-obsidian hover:scale-110 active:scale-95 transition-all z-40"
          title="Open Manual (TAB)"
        >
          <span className="font-mono text-sm font-bold">MANUAL</span>
        </button>
      )}

      {/* Bottom Bar: Manual and Settings */}
      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => setShowManual(true)}>Open Manual (TAB)</Button>
        <Button variant="danger" onClick={() => useGameStore.getState().endGame(false)}>Abandon Mission</Button>
      </div>
    </div>
  );
};
