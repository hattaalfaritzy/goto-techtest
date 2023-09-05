/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  })


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

module.exports = withPWA(nextConfig)
