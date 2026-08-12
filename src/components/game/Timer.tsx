import React, { useEffect } from 'react';
import { useGameStore } from '../../game/store';
import { cn } from '../../utils/cn';

export const Timer: React.FC = () => {
  const { remainingTime, status, tickTimer } = useGameStore();

  useEffect(() => {
    if (status === 'playing') {
      const interval = setInterval(tickTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [status, tickTimer]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isWarning = remainingTime <= 300 && remainingTime > 180;
  const isCritical = remainingTime <= 180 && remainingTime > 60;
  const isEmergency = remainingTime <= 60;

  return (
    <div className={cn(
      "font-mono text-4xl md:text-5xl tracking-widest p-4 panel-border rounded-sm text-center w-64 mx-auto transition-colors duration-300",
      isEmergency ? "text-crimson glow-crimson animate-pulse" :
      isCritical ? "text-crimson" :
      isWarning ? "text-amber" :
      "text-emerald"
    )}>
      {timeString}
    </div>
  );
};
