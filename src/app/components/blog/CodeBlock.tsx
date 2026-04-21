'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export default function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lang = language || className?.replace(/language-/, '') || 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <span className="code-language-label">{lang}</span>
      <button onClick={handleCopy} className="code-copy-button">
        {copied ? 'copied!' : 'copy'}
      </button>
      <pre className="hljs" style={{ paddingTop: '2.5rem' }}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
