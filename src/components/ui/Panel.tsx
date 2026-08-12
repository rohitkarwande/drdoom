import React from 'react';
import { cn } from '../../utils/cn';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'alert' | 'success';
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative p-6 panel-border overflow-hidden rounded-sm',
          variant === 'alert' && 'border-amber/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
          variant === 'success' && 'border-emerald/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
          className
        )}
        {...props}
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-30" />
        
        {/* Scanline overlay for aesthetic */}
        <div className="pointer-events-none absolute inset-0 scanline opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Panel.displayName = 'Panel';
