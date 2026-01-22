import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': '#0070f3',
            '--tw-prose-code': theme('colors.blue[400]'),
            '--tw-prose-pre-bg': 'rgb(28 28 34)',
            '--tw-prose-quotes': theme('colors.gray[300]'),
            maxWidth: 'none',
            color: theme('colors.gray[300]'),
            a: {
              color: '#0070f3',
              '&:hover': {
                color: '#52b5e6',
              },
            },
            code: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(28 28 34)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
