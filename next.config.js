/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  eslint: {
    // Only lint specific directories during build, exclude legacy files
    dirs: ['src/app', 'src/components', 'src/hooks', 'src/lib'],
  },
};

module.exports = nextConfig;
