import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',

  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: isProd ? '/espiobest.github.io' : '',

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },

  /**
   * Add MDX support
   */
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  /**
   * Performance optimizations
   */
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },

  webpack: (config, { isServer }) => {
    // Allow MDX files to be imported
    config.module.rules.push({
      test: /\.mdx$/,
      use: 'raw-loader',
    });

    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for MUI
            mui: {
              name: 'mui',
              test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            // Commons chunk for shared code
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
