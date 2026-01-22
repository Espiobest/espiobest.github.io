import type { MDXComponents } from 'mdx/types';
import { Typography } from '@mui/material';
import CodeBlock from './src/app/components/blog/CodeBlock';
import InteractiveDemo from './src/app/components/blog/InteractiveDemo';
import InteractiveCodeRunner from './src/app/components/blog/InteractiveCodeRunner';
import BufferOverflowDemo from './src/app/components/blog/BufferOverflowDemo';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: any) => (
      <Typography
        variant="h3"
        component="h1"
        style={{ marginTop: '2rem', marginBottom: '1rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    h2: (props: any) => (
      <Typography
        variant="h4"
        component="h2"
        style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    h3: (props: any) => (
      <Typography
        variant="h5"
        component="h3"
        style={{ marginTop: '1.25rem', marginBottom: '0.5rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    p: (props: any) => (
      <Typography
        variant="body1"
        style={{ marginBottom: '1rem', color: '#e5e7eb', lineHeight: 1.8 }}
        {...props}
      />
    ),
    strong: (props: any) => <strong style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />,
    b: (props: any) => <b style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />,
    em: (props: any) => <em style={{ color: '#e5e7eb' }} {...props} />,
    code: (props: any) => {
      // Check if it's inline code (no className) or code block (has className from syntax highlighting)
      if (props.className) {
        return <CodeBlock {...props} />;
      }
      // Inline code styling
      return (
        <code
          style={{
            backgroundColor: 'rgba(110, 118, 129, 0.4)',
            padding: '0.2em 0.4em',
            borderRadius: '6px',
            fontSize: '85%',
            color: '#e6edf3',
            fontFamily:
              'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
          }}
          {...props}
        />
      );
    },
    pre: (props: any) => props.children,
    InteractiveDemo,
    InteractiveCodeRunner,
    BufferOverflowDemo,
    ...components,
  };
}
