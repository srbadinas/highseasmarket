/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'out',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;
