/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'img.youtube.com'], // 👈 ajout ici
  },
};

module.exports = nextConfig;
