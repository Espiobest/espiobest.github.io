import type { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogIndexClient from '../components/blog/BlogIndexClient';

export const metadata: Metadata = {
  title: 'Blog | Ayush Ravi Chandran',
  description: 'A place to write about things I\'ve dug into.',
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  return <BlogIndexClient initialPosts={allPosts} initialTags={allTags} />;
}
