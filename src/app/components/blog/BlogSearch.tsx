'use client';

import { useState } from 'react';

interface BlogSearchProps {
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  selectedTags: string[];
}

export default function BlogSearch({ allTags, onSearchChange, onTagToggle, onClearTags, selectedTags }: BlogSearchProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search posts..."
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors mono"
        />
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onClearTags}
            className={`tag cursor-pointer transition-colors ${
              selectedTags.length === 0
                ? 'bg-[var(--accent-dim)] border-[rgba(232,197,71,0.25)] text-[var(--accent)]'
                : 'hover:border-[var(--border-hover)]'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`tag cursor-pointer transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-[var(--accent-dim)] border-[rgba(232,197,71,0.25)] text-[var(--accent)]'
                  : 'hover:border-[var(--border-hover)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
