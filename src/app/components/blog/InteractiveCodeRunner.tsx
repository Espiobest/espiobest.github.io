'use client';

import { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('c', c);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

interface InteractiveCodeRunnerProps {
  title?: string;
  code: string;
  language?: string;
  initialVariables?: Record<string, string | number>;
  executeCode: (variables: Record<string, string | number>) => string;
  explanation?: string;
}

export default function InteractiveCodeRunner({
  title = 'Interactive Code Demo',
  code,
  language = 'c',
  initialVariables = {},
  executeCode,
  explanation,
}: InteractiveCodeRunnerProps) {
  const [variables, setVariables] = useState(initialVariables);
  const [output, setOutput] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) hljs.highlightElement(codeRef.current);
  }, [code]);

  const handleRun = () => {
    try {
      setOutput(executeCode(variables));
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    setHasRun(true);
  };

  const inputClass =
    'bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors mono min-w-[160px]';

  return (
    <div className="border border-[var(--border)] rounded-xl p-5 my-6 bg-[var(--surface)]">
      <h4 className="text-sm font-semibold text-[#93c5fd] mb-2">{title}</h4>
      {explanation && <p className="text-xs text-[#888] italic mb-4">{explanation}</p>}

      {/* Code */}
      <pre className="hljs rounded-lg mb-4 text-sm overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>{code}</code>
      </pre>

      {/* Variables */}
      {Object.keys(initialVariables).length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">Modify variables</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(initialVariables).map(([key, defaultVal]) => (
              <div key={key}>
                <label className="block text-xs text-[var(--text-muted)] mb-1 mono">{key}</label>
                <input
                  className={inputClass}
                  defaultValue={defaultVal}
                  onChange={(e) => setVariables((prev) => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Run */}
      <button
        onClick={handleRun}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--text)] hover:border-[var(--border-hover)] transition-all mb-4"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Run
      </button>

      {/* Output */}
      {hasRun && (
        <div>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">Output</p>
          <pre className="hljs rounded-lg text-sm overflow-x-auto">
            <code className={output.startsWith('Error') ? 'text-red-400' : 'text-[#86efac]'}>
              {output}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
