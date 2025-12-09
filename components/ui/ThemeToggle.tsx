'use client';

import { useTheme } from '@/lib/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg transition-all duration-300',
        'bg-muted hover:bg-muted/80',
        'border-2 border-border/30 hover:border-border',
        'group',
        className
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={cn(
            'absolute inset-0 w-6 h-6 text-secondary transition-all duration-300',
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
        <Moon 
          className={cn(
            'absolute inset-0 w-6 h-6 text-accent transition-all duration-300',
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
    </button>
  );
}
