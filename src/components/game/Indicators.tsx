import React from 'react';
import { useGameStore, type IndicatorState } from '../../game/store';
import { cn } from '../../utils/cn';

const IndicatorLight = ({ label, state }: { label: string, state: IndicatorState }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{label}</div>
    <div className={cn(
      "w-4 h-4 rounded-full border border-gunmetal shadow-inner transition-colors duration-300",
      state === 'off' && "bg-gray-800",
      state === 'green' && "bg-emerald glow-emerald",
      state === 'red' && "bg-crimson glow-crimson"
    )} />
  </div>
);

export const Indicators: React.FC = () => {
  const { serialNumber, indicators, strikes } = useGameStore();

  return (
    <div className="flex justify-between items-center bg-obsidian border border-gunmetal p-4 rounded-sm shadow-md">
      <div className="flex gap-6">
        <IndicatorLight label="PWR" state={indicators.power} />
        <IndicatorLight label="ARM" state={indicators.arm} />
        <IndicatorLight label="SYS" state={indicators.system} />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">STRIKES</div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn(
              "w-8 h-2 rounded-sm border border-gunmetal transition-colors",
              strikes >= i ? "bg-crimson glow-crimson" : "bg-gray-800"
            )} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end text-right">
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">SERIAL NO.</div>
        <div className="font-mono text-lg text-white tracking-widest bg-gray-900 px-2 py-0.5 rounded-sm border border-gray-700">
          {serialNumber}
        </div>
      </div>
    </div>
  );
};
