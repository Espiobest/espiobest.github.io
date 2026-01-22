'use client';

import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, language }) => {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const lang = language || className?.replace(/language-/, '') || 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper" style={{ position: 'relative' }}>
      <div className="code-language-label">{lang}</div>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          onClick={handleCopy}
          className="code-copy-button"
          size="small"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            color: 'white',
            zIndex: 10,
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <pre className="hljs" style={{ position: 'relative', paddingTop: '2.5rem' }}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
