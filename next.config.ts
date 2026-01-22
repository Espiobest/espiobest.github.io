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

  webpack: (config) => {
    // Allow MDX files to be imported
    config.module.rules.push({
      test: /\.mdx$/,
      use: 'raw-loader',
    });

    return config;
  },
};

export default nextConfig;
