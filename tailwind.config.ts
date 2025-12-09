import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light Mode - Desert Carpet Palette
                desert: {
                    red: '#8B1E1E',
                    gold: '#C8A652',
                    beige: '#E9D7B1',
                    brown: '#5B3A29',
                    emerald: '#0F6B4F',
                },
                // Dark Mode - Midnight Carpet Palette
                midnight: {
                    blue: '#0C1B33',
                    burgundy: '#4A0E23',
                    gold: '#A89038',
                    brown: '#36231A',
                },
                // Semantic colors
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                border: 'var(--color-border)',
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-foreground)',
                },
            },
            fontFamily: {
                amiri: ['var(--font-amiri)', 'serif'],
                cairo: ['var(--font-cairo)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                naskh: ['var(--font-naskh)', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'shimmer': 'shimmer 2.5s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-200% 0',
                    },
                    '100%': {
                        backgroundPosition: '200% 0',
                    },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
                magicFloat: {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg)',
                    },
                    '25%': {
                        transform: 'translateY(-8px) rotate(1deg)',
                    },
                    '50%': {
                        transform: 'translateY(-15px) rotate(0deg)',
                    },
                    '75%': {
                        transform: 'translateY(-8px) rotate(-1deg)',
                    },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                'magic-carpet': 'linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-accent))',
            },
        },
    },
    plugins: [],
};

export default config;
