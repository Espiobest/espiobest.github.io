import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author?: string;
  coverImage?: string;
  readingTime: string;
  content?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }
  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

// Get blog post data by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
      author: data.author || 'Ayush Ravi Chandran',
      coverImage: data.coverImage,
      readingTime: readingTime(content).text,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts sorted by date (newest first)
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Get all unique tags from all posts
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

// Extract table of contents from MDX content
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();

    // Check if the next line contains the no-toc marker
    const nextLineStart = headingRegex.lastIndex;
    const nextLine = content.slice(nextLineStart, content.indexOf('\n', nextLineStart));
    if (nextLine.trim() === '{/* exclude_toc */}') {
      continue; // Skip this heading
    }

    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, title, level });
  }

  return headings;
}

// Search posts by query (title, description, content)
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.content?.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
