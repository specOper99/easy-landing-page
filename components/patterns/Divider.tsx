import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  variant?: 'simple' | 'ornate' | 'double';
}

export function Divider({ className, variant = 'ornate' }: DividerProps) {
  const variants = {
    simple: (
      <div className={cn('flex items-center gap-4 my-8', className)}>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      </div>
    ),
    ornate: (
      <div className={cn('flex items-center gap-4 my-12', className)}>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border to-border" />
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-border">
            <polygon points="8,2 10,6 14,6 11,9 12,14 8,11 4,14 5,9 2,6 6,6" fill="currentColor" opacity="0.6"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-secondary">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
            <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.5"/>
            <path d="M 12 4 L 12 20 M 4 12 L 20 12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16" className="text-border">
            <polygon points="8,2 10,6 14,6 11,9 12,14 8,11 4,14 5,9 2,6 6,6" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    ),
    double: (
      <div className={cn('flex flex-col gap-2 my-10', className)}>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>
    ),
  };

  return variants[variant];
}
