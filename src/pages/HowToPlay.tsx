import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';

export const HowToPlay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-display uppercase tracking-widest text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          Training Protocol
        </h1>
        <Button variant="ghost" onClick={() => navigate('/')}>Return to Menu</Button>
      </div>

      <div className="space-y-8 flex-1">
        <Panel>
          <h2 className="text-xl font-display text-white mb-4 border-b border-gunmetal pb-2">1. Your Objective</h2>
          <p className="text-gray-300 mb-4">
            Disable all four modules on the security device before the countdown reaches zero.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-display text-white mb-4 border-b border-gunmetal pb-2">2. Read Carefully</h2>
          <p className="text-gray-300 mb-4">
            Every module follows rules detailed in the Defusal Manual. Do not guess.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-display text-white mb-4 border-b border-gunmetal pb-2">3. Mistakes Matter</h2>
          <p className="text-gray-300 mb-4">
            Incorrect actions create strikes. Three strikes result in immediate protocol failure.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-display text-white mb-4 border-b border-gunmetal pb-2">4. Final Step</h2>
          <p className="text-gray-300 mb-4">
            After all modules are disabled, activate the Master Shutdown switch.
          </p>
        </Panel>
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={() => navigate('/game')}>Start Training (Play)</Button>
      </div>
    </div>
  );
};
