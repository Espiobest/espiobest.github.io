import Image from 'next/image';
import CodeBlock from './CodeBlock';
import InteractiveDemo from './InteractiveDemo';
import InteractiveCodeRunner from './InteractiveCodeRunner';
import BufferOverflowDemo from './BufferOverflowDemo';

/* eslint-disable @typescript-eslint/no-explicit-any */
const MDXComponents = {
  h1: (props: any) => <h1 className="text-2xl font-semibold text-[var(--text)] mt-10 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-semibold text-[var(--text)] mt-8 mb-3 pb-2 border-b border-[var(--border)]" {...props} />,
  h3: (props: any) => <h3 className="text-base font-semibold text-[var(--text)] mt-6 mb-2" {...props} />,
  p: (props: any) => <p className="text-[#c8c8c8] mb-5 leading-[1.8]" {...props} />,
  a: (props: any) => (
    <a
      className="text-[var(--accent)] underline underline-offset-2 decoration-[rgba(232,197,71,0.4)] hover:decoration-[var(--accent)] transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: any) => <ul className="list-disc pl-5 mb-5 space-y-1.5 text-[#c8c8c8]" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-5 space-y-1.5 text-[#c8c8c8]" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="text-[var(--text)] font-semibold" {...props} />,
  b: (props: any) => <b className="text-[var(--text)] font-semibold" {...props} />,
  em: (props: any) => <em className="text-[#bbb]" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-[var(--accent)] bg-[var(--accent-dim)] pl-4 pr-3 py-2 my-5 rounded-r-lg italic text-[#bbb]" {...props} />
  ),
  hr: (props: any) => <hr className="border-[var(--border)] my-8" {...props} />,
  code: (props: any) => {
    if (!props.className) {
      return (
        <code className="mono bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[0.82em] text-[var(--text)]" {...props} />
      );
    }
    return <CodeBlock {...props} />;
  },
  pre: (props: any) => <div className="code-block-wrapper">{props.children}</div>,
  img: (props: any) => {
    if (props.src?.endsWith('.gif')) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...props}
          className="rounded-lg my-6 max-w-full h-auto"
          alt={props.alt ?? ''}
        />
      );
    }
    return (
      <Image
        {...props}
        width={800}
        height={450}
        className="rounded-lg my-6"
        alt={props.alt ?? ''}
        unoptimized
      />
    );
  },
  InteractiveDemo,
  InteractiveCodeRunner,
  BufferOverflowDemo,
};

export default MDXComponents;
