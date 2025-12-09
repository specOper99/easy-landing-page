const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    // Typed routes for better type safety
    typedRoutes: true,
    // Vercel deployment optimizations
    poweredByHeader: false,
    compress: true,
};

module.exports = withNextIntl(nextConfig);
