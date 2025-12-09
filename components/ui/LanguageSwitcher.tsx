'use client';

import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    // Remove current locale from pathname and add new one
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname as any);
  };

  return (
    <button
      onClick={switchLocale}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300',
        'bg-muted hover:bg-muted/80',
        'border-2 border-border/30 hover:border-border',
        'group',
        className
      )}
      aria-label="Switch language"
      title="Switch language"
    >
      <Globe className="w-5 h-5 text-secondary transition-transform group-hover:rotate-12" />
      <span className="text-sm font-semibold uppercase">
        {currentLocale === 'en' ? 'العربية' : 'EN'}
      </span>
    </button>
  );
}
