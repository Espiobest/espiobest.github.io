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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;
    if (selectedTag) posts = posts.filter((p) => p.tags.includes(selectedTag));
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
  }, [searchQuery, selectedTag, initialPosts]);

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
        onTagFilter={setSelectedTag}
        selectedTag={selectedTag}
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
