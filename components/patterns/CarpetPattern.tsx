import { cn } from '@/lib/utils';

interface CarpetPatternProps {
  variant?: 'medallion' | 'diamond' | 'border' | 'geometric';
  className?: string;
  size?: number;
}

export function CarpetPattern({ 
  variant = 'medallion', 
  className,
  size = 200 
}: CarpetPatternProps) {
  const patterns = {
    medallion: (
      <svg viewBox="0 0 200 200" className={cn('w-full h-full', className)}>
        <defs>
          <pattern id="medallion-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <path d="M 50 20 L 50 80 M 20 50 L 80 50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <path d="M 30 30 L 70 70 M 70 30 L 30 70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#medallion-pattern)"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <path d="M 100 40 L 100 160 M 40 100 L 160 100" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 200 200" className={cn('w-full h-full', className)}>
        <defs>
          <pattern id="diamond-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <path d="M 20 10 L 30 20 L 20 30 L 10 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#diamond-pattern)"/>
        <path d="M 100 20 L 180 100 L 100 180 L 20 100 Z" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
        <path d="M 100 50 L 150 100 L 100 150 L 50 100 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    ),
    border: (
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={cn('w-full h-full', className)}>
        <defs>
          <pattern id="border-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="200" height="20" fill="url(#border-pattern)"/>
        <line x1="0" y1="0" x2="200" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      </svg>
    ),
    geometric: (
      <svg viewBox="0 0 200 200" className={cn('w-full h-full', className)}>
        <defs>
          <pattern id="geo-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <polygon points="25,5 45,25 25,45 5,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
            <line x1="25" y1="0" x2="25" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            <line x1="0" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#geo-pattern)"/>
      </svg>
    ),
  };

  return (
    <div 
      className={cn('text-border', className)} 
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {patterns[variant]}
    </div>
  );
}
