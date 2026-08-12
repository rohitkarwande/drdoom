import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ManualContent } from '../components/manual/ManualContent';

export const Manual: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 h-screen flex flex-col">
      <div className="mb-4 flex justify-between items-center flex-shrink-0">
        <h1 className="text-4xl font-display uppercase tracking-widest text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          Defusal Manual
        </h1>
        <Button variant="ghost" onClick={() => navigate('/')}>Return to Menu</Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ManualContent />
      </div>
    </div>
  );
};
