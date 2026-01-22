import type { MDXComponents } from 'mdx/types';
import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import InteractiveDemo from './app/components/blog/InteractiveDemo';
import InteractiveCodeRunner from './app/components/blog/InteractiveCodeRunner';
import BufferOverflowDemo from './app/components/blog/BufferOverflowDemo';

interface MDXProps {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: MDXProps) => (
      <Typography
        variant="h3"
        component="h1"
        style={{ marginTop: '2rem', marginBottom: '1rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    h2: (props: MDXProps) => (
      <Typography
        variant="h4"
        component="h2"
        style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    h3: (props: MDXProps) => (
      <Typography
        variant="h5"
        component="h3"
        style={{ marginTop: '1.25rem', marginBottom: '0.5rem', color: '#60a5fa', fontWeight: 600 }}
        {...props}
      />
    ),
    p: (props: MDXProps) => (
      <Typography
        variant="body1"
        style={{ marginBottom: '1rem', color: '#e5e7eb', lineHeight: 1.8 }}
        {...props}
      />
    ),
    strong: (props: MDXProps) => (
      <strong style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />
    ),
    b: (props: MDXProps) => <b style={{ color: '#f3f4f6', fontWeight: 700 }} {...props} />,
    em: (props: MDXProps) => <em style={{ color: '#e5e7eb' }} {...props} />,
    code: (props: MDXProps) => {
      // Inline code (no className means it's not in a code block)
      if (!props.className) {
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
      }
      // Code blocks - preserve the syntax-highlighted HTML from rehype-highlight
      return <code {...props} />;
    },
    pre: (props: MDXProps) => {
      // Wrap code blocks in a styled container with copy button
      const codeElement = props.children;

      // Check if this is a code block (has a code child with className)
      if (
        codeElement &&
        typeof codeElement === 'object' &&
        'props' in codeElement &&
        typeof codeElement.props === 'object' &&
        codeElement.props !== null &&
        'className' in codeElement.props
      ) {
        const className = (codeElement.props as { className?: string }).className;
        const lang = className?.replace(/language-/, '') || 'text';

        return (
          <div
            className="code-block-wrapper"
            style={{ position: 'relative', marginBottom: '1.5rem' }}
          >
            <div className="code-language-label">{lang}</div>
            <pre className="hljs" style={{ position: 'relative', paddingTop: '2.5rem' }}>
              {props.children}
            </pre>
          </div>
        );
      }

      // Regular pre element
      return <pre {...props} />;
    },
    InteractiveDemo,
    InteractiveCodeRunner,
    BufferOverflowDemo,
    ...components,
  };
}
