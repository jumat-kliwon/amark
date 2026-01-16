/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // React Compiler: Enable automatic memoization and render optimization
  reactCompiler: true,
  
  // Cache Components: Enable Partial Pre-Rendering (PPR) for better performance
  // Note: Disabled for now due to compatibility with client components using hooks
  // cacheComponents: true,
  
  images: {
    // Use remotePatterns instead of domains for better security
    remotePatterns: [],
    // Default minimumCacheTTL changed to 4 hours (14400 seconds) in Next.js 16
    minimumCacheTTL: 14400,
    // Default imageSizes in Next.js 16 (16 removed from default)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
};

module.exports = nextConfig;
