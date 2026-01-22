'use client';

import React, { useState, useMemo } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import { BlogPost } from '@/lib/blog';

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
  initialTags: string[];
}

const BlogIndexClient: React.FC<BlogIndexClientProps> = ({ initialPosts, initialTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    // Filter by tag
    if (selectedTag) {
      posts = posts.filter((post) => post.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.content?.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return posts;
  }, [searchQuery, selectedTag, initialPosts]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Typography
        variant="h3"
        style={{
          color: 'white',
          fontWeight: 700,
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Blog
      </Typography>

      <Typography
        variant="h6"
        style={{
          color: '#bdbdbd',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        A place for me to yap about stuff.
      </Typography>

      <BlogSearch
        allTags={initialTags}
        onSearchChange={setSearchQuery}
        onTagFilter={setSelectedTag}
        selectedTag={selectedTag}
      />

      {filteredPosts.length === 0 ? (
        <Box style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Typography variant="h6" style={{ color: '#bdbdbd' }}>
            No posts found matching your criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} key={post.slug}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogIndexClient;
