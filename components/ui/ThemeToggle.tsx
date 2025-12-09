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
        'relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
        'hover:bg-muted/60',
        'group',
        className
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={cn(
            'absolute inset-0 w-5 h-5 text-secondary transition-all duration-300',
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
        <Moon 
          className={cn(
            'absolute inset-0 w-5 h-5 text-accent transition-all duration-300',
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
    </button>
  );
}
