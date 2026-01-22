import React from 'react';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import BlogIndexClient from '../components/blog/BlogIndexClient';

export const metadata = {
  title: 'Blog | Ayush Portfolio',
  description: 'A place for me to yap about tech, programming, and more.',
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <>
      <BlogIndexClient initialPosts={allPosts} initialTags={allTags} />
      <Box className="text-center">
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', borderRadius: '10px' }}
          href="/projects"
        >
          <KeyboardReturnIcon style={{ paddingRight: '0.5rem' }} /> Back to Projects
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', marginLeft: '1rem', borderRadius: '10px' }}
          href="/contact"
        >
          Contact me{' '}
          <KeyboardReturnIcon style={{ transform: 'scaleX(-1)', paddingRight: '0.5rem' }} />
        </Button>
      </Box>
    </>
  );
}
