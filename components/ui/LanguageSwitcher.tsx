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
        'flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg transition-all duration-300',
        'hover:bg-muted/60',
        'group',
        className
      )}
      aria-label="Switch language"
      title="Switch language"
    >
      <Globe className="w-4 h-4 text-secondary transition-transform group-hover:rotate-12" />
      <span className="text-sm font-medium">
        {currentLocale === 'en' ? 'العربية' : 'EN'}
      </span>
    </button>
  );
}
