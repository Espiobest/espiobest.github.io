import type { MDXComponents } from 'mdx/types';
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
    h1: ({ children, ...props }: MDXProps) => (
      <h1 className="text-2xl font-semibold text-[var(--text)] mt-10 mb-4" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: MDXProps) => (
      <h2 className="text-xl font-semibold text-[var(--text)] mt-8 mb-3 pb-2 border-b border-[var(--border)]" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: MDXProps) => (
      <h3 className="text-base font-semibold text-[var(--text)] mt-6 mb-2" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }: MDXProps) => (
      <p className="text-[#c8c8c8] mb-5 leading-[1.8]" {...props}>{children}</p>
    ),
    strong: ({ children, ...props }: MDXProps) => (
      <strong className="text-[var(--text)] font-semibold" {...props}>{children}</strong>
    ),
    em: ({ children, ...props }: MDXProps) => (
      <em className="text-[#bbb]" {...props}>{children}</em>
    ),
    a: ({ children, ...props }: MDXProps) => (
      <a
        className="text-[var(--accent)] underline underline-offset-2 decoration-[rgba(232,197,71,0.4)] hover:decoration-[var(--accent)] transition-colors"
        target="_blank" rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }: MDXProps) => (
      <ul className="list-disc pl-5 mb-5 space-y-1.5 text-[#c8c8c8]" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: MDXProps) => (
      <ol className="list-decimal pl-5 mb-5 space-y-1.5 text-[#c8c8c8]" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: MDXProps) => (
      <li className="leading-relaxed" {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: MDXProps) => (
      <blockquote className="border-l-2 border-[var(--accent)] bg-[var(--accent-dim)] pl-4 pr-3 py-2 my-5 rounded-r-lg italic text-[#bbb]" {...props}>
        {children}
      </blockquote>
    ),
    hr: (props: MDXProps) => <hr className="border-[var(--border)] my-8" {...props} />,
    table: ({ children, ...props }: MDXProps) => (
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-sm border-collapse" {...props}>{children}</table>
      </div>
    ),
    th: ({ children, ...props }: MDXProps) => (
      <th className="bg-[var(--surface-2)] text-[var(--text)] font-semibold px-3 py-2 border border-[var(--border)] text-left" {...props}>{children}</th>
    ),
    td: ({ children, ...props }: MDXProps) => (
      <td className="text-[#c8c8c8] px-3 py-2 border border-[var(--border)]" {...props}>{children}</td>
    ),
    code: ({ children, className, ...props }: MDXProps) => {
      if (!className) {
        return (
          <code
            className="mono bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[0.82em] text-[var(--text)]"
            {...props}
          >
            {children}
          </code>
        );
      }
      return <code className={className} {...props}>{children}</code>;
    },
    pre: ({ children, ...props }: MDXProps) => {
      const codeEl = children as { props?: { className?: string } };
      if (codeEl?.props?.className) {
        const lang = codeEl.props.className.replace(/language-/, '') || 'text';
        return (
          <div className="code-block-wrapper">
            <span className="code-language-label">{lang}</span>
            <pre className="hljs" style={{ paddingTop: '2.5rem' }} {...props}>{children}</pre>
          </div>
        );
      }
      return <pre className="hljs" {...props}>{children}</pre>;
    },
    InteractiveDemo,
    InteractiveCodeRunner,
    BufferOverflowDemo,
    ...components,
  };
}
