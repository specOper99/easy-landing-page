import { cn } from '@/lib/utils';

interface CarpetCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}

export function CarpetCorner({ 
  position = 'top-left', 
  size = 80,
  className 
}: CarpetCornerProps) {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <div 
      className={cn('absolute pointer-events-none', positions[position], className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-secondary opacity-60">
        {/* Ornate corner design */}
        <path
          d="M 0 0 L 100 0 C 80 10, 60 20, 50 30 C 40 40, 30 60, 20 80 C 10 90, 0 95, 0 100 Z"
          fill="currentColor"
          opacity="0.15"
        />
        
        {/* Border lines */}
        <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        
        {/* Decorative curves */}
        <path
          d="M 0 0 Q 30 10, 50 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M 0 0 Q 10 30, 30 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        
        {/* Small ornamental details */}
        <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.6"/>
        <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.6"/>
        <circle cx="35" cy="15" r="2" fill="currentColor" opacity="0.6"/>
        <circle cx="15" cy="35" r="2" fill="currentColor" opacity="0.6"/>
        
        {/* Tassel effect */}
        <g opacity="0.4">
          <line x1="20" y1="5" x2="20" y2="15" stroke="currentColor" strokeWidth="1"/>
          <line x1="40" y1="5" x2="40" y2="12" stroke="currentColor" strokeWidth="1"/>
          <line x1="60" y1="5" x2="60" y2="10" stroke="currentColor" strokeWidth="1"/>
          <line x1="80" y1="5" x2="80" y2="8" stroke="currentColor" strokeWidth="1"/>
        </g>
      </svg>
    </div>
  );
}
