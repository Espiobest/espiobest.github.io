import React from 'react';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogIndexClient from '../components/blog/BlogIndexClient';

export const metadata = {
  title: 'Blog | Ayush Portfolio',
  description: 'A place for me to yap about tech, programming, and more.',
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return <BlogIndexClient initialPosts={allPosts} initialTags={allTags} />;
}
