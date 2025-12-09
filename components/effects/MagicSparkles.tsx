'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface MagicSparklesProps {
  count?: number;
  className?: string;
}

export function MagicSparkles({ count = 20, className }: MagicSparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, [count]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <svg
            width={sparkle.size * 4}
            height={sparkle.size * 4}
            viewBox="0 0 24 24"
            fill="none"
            className="text-secondary"
          >
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
