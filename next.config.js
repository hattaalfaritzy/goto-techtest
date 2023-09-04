/** @type {import('next').NextConfig} */

const nextConfig = {
    compress: true,
    reactStrictMode: true,
    output: 'standalone',
    async redirects() {
        return [
            {
            source: '/',
            destination: '/contact',
            permanent: true,
            },
        ]
    },
    httpAgentOptions: {
        keepAlive: false,
    },
    experimental: {
        serverActions: true,
    },
    trailingSlash: false,
}

module.exports = nextConfig
