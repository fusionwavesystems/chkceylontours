/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─────────────────────────────────────────────
    // Image Optimization
    // ─────────────────────────────────────────────
    images: {
        // Serve modern WebP / AVIF formats automatically
        formats: ['image/avif', 'image/webp'],

        // Cache optimized images for 30 days
        minimumCacheTTL: 2592000,

        // Responsive breakpoints for srcSet generation
        deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

        // Allow Supabase storage images + local images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/storage/v1/object/**',
            },
            {
                protocol: 'https',
                hostname: '**.supabase.in',
                pathname: '/storage/v1/object/**',
            },
        ],
    },

    // ─────────────────────────────────────────────
    // Performance: compress responses
    // ─────────────────────────────────────────────
    compress: true,

    // ─────────────────────────────────────────────
    // Performance: Aggressive HTTP caching headers
    // ─────────────────────────────────────────────
    async headers() {
        return [
            {
                // Cache all static assets (images, fonts, js, css) for 1 year
                source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|woff|woff2|ttf|otf|ico|js|css)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // HTML pages: revalidate every hour
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // ─────────────────────────────────────────────
    // Cloudflare Pages compatibility
    // ─────────────────────────────────────────────
    // output: 'export', // uncomment only if doing full static export for CF Pages
};

module.exports = nextConfig;
