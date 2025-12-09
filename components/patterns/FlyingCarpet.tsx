import { cn } from '@/lib/utils';
import React from 'react';

interface FlyingCarpetProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'large' | 'decorative';
  animate?: boolean;
}

export function FlyingCarpet({ 
  children, 
  className,
  variant = 'default',
  animate = true 
}: FlyingCarpetProps) {
  const variants = {
    default: 'p-6 max-w-sm',
    large: 'p-8 max-w-2xl',
    decorative: 'p-4 max-w-md',
  };

  return (
    <div 
      className={cn(
        'relative rounded-lg overflow-hidden',
        animate && 'animate-float',
        variants[variant],
        className
      )}
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(200, 166, 82, 0.2)',
      }}
    >
      {/* Carpet Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="text-white">
          <defs>
            <pattern id="carpet-weave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="20" height="20" fill="currentColor" opacity="0.1"/>
              <rect x="20" y="20" width="20" height="20" fill="currentColor" opacity="0.1"/>
              <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2"/>
              <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.2"/>
              <path d="M 0 0 L 20 20 M 20 0 L 40 20 M 0 20 L 20 40 M 20 20 L 40 40" 
                    stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#carpet-weave)"/>
        </svg>
      </div>

      {/* Decorative Tassels - Top */}
      <div className="absolute -top-4 left-0 right-0 flex justify-around px-8">
        {[...Array(5)].map((_, i) => (
          <div key={`top-${i}`} className="w-1 h-4 bg-secondary/60 rounded-full" 
               style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Decorative Tassels - Bottom */}
      <div className="absolute -bottom-4 left-0 right-0 flex justify-around px-8">
        {[...Array(5)].map((_, i) => (
          <div key={`bottom-${i}`} className="w-1 h-4 bg-secondary/60 rounded-full animate-gentle-pulse" 
               style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Ornate Border */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>

      {/* Magical Glow */}
      {animate && (
        <div className="absolute inset-0 bg-gradient-radial from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </div>
  );
}
