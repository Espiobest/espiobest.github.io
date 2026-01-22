import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',

  /**
   * Set base path. Leave empty for user/org GitHub Pages sites (username.github.io).
   * Only set this for project sites (username.github.io/project-name).
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: '',
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

  webpack: (config) => {
    // Optimize bundle size
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

    return config;
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-anchor'],
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
