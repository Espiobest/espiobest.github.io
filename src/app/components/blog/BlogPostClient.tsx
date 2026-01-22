'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { type BlogPostWithSource, type TableOfContentsItem } from '@/lib/blog';
import BlogPostLayout from './BlogPostLayout';
import MDXComponents from './MDXComponents';
import 'highlight.js/styles/github-dark.css';

interface BlogPostClientProps {
  postData: BlogPostWithSource;
  tocItems: TableOfContentsItem[];
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ postData, tocItems }) => {
  return (
    <BlogPostLayout post={postData} tocItems={tocItems}>
      <MDXRemote {...postData.mdxSource} components={MDXComponents} />
    </BlogPostLayout>
  );
};

export default BlogPostClient;
