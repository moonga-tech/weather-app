/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
    },
    env: {
        API_KEY_OWM: process.env.API_KEY_OWM,
        API_KEY_A: process.env.API_KEY_A,
    },
};

export default nextConfig;
