/** @type {import('next').NextConfig} */

const nextConfig = {
    compress: true,
    reactStrictMode: true,
    output: 'standalone',
    httpAgentOptions: {
        keepAlive: false,
    },
    experimental: {
        serverActions: true,
    },
    trailingSlash: false,
}

module.exports = nextConfig
