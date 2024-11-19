/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
