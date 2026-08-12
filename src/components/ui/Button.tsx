import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          variant === 'primary' && 'bg-emerald/10 text-emerald border border-emerald hover:bg-emerald/20 hover:glow-emerald active:scale-95',
          variant === 'secondary' && 'bg-gunmetal text-gray-300 border border-gray-600 hover:text-white hover:border-gray-400 active:scale-95',
          variant === 'danger' && 'bg-crimson/10 text-crimson border border-crimson hover:bg-crimson/20 hover:glow-crimson active:scale-95',
          variant === 'ghost' && 'text-gray-400 hover:text-white hover:bg-gunmetal',
          // Sizes
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-6 py-3 text-base',
          size === 'lg' && 'px-8 py-4 text-lg font-bold',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
