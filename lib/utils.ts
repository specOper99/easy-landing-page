import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price with optional currency symbol
 * @param price - The price to format
 * @param locale - The locale for formatting ('en' or 'ar')
 * @param options - Optional settings for currency display
 */
export function formatPrice(
    price: number,
    locale: string = 'en',
    options?: {
        currency?: string;
        showCurrency?: boolean;
    }
): string {
    const { currency = 'IQD', showCurrency = true } = options || {};

    if (!showCurrency) {
        // Format number only without currency
        return new Intl.NumberFormat(locale === 'ar' ? 'ar-IQ' : 'en-IQ', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    }

    return new Intl.NumberFormat(locale === 'ar' ? 'ar-IQ' : 'en-IQ', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, locale: string = 'en'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(dateObj);
}

/**
 * Generate rating stars
 */
export function getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
}

/**
 * Sleep utility for async delays
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
