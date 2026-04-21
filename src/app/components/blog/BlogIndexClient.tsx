'use client';

import { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import { BlogPost } from '@/lib/blog';

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
  initialTags: string[];
}

export default function BlogIndexClient({ initialPosts, initialTags }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;
    if (selectedTags.length > 0)
      posts = posts.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.content?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return posts;
  }, [searchQuery, selectedTags, initialPosts]);

  return (
    <div className="max-w-[900px] mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="section-title">writing</p>
        <h1 className="text-3xl font-light text-[var(--text)]">Blog</h1>
        <p className="text-sm text-[var(--text-muted)] mt-2">
          A place to write about things I&apos;ve dug into.
        </p>
      </div>

      <BlogSearch
        allTags={initialTags}
        onSearchChange={setSearchQuery}
        onTagToggle={toggleTag}
        onClearTags={() => setSelectedTags([])}
        selectedTags={selectedTags}
      />

      {filteredPosts.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No posts match your search.</p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
