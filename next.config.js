const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.sanity.io', 'images.unsplash.com'],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        typedRoutes: true,
    },
};

module.exports = withNextIntl(nextConfig);
