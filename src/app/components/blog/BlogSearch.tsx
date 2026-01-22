'use client';

import React, { useState } from 'react';
import { TextField, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface BlogSearchProps {
  allTags: string[];
  onSearchChange: (query: string) => void;
  onTagFilter: (tag: string | null) => void;
  selectedTag: string | null;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  allTags,
  onSearchChange,
  onTagFilter,
  selectedTag,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <Box style={{ marginBottom: '2rem' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon style={{ marginRight: '0.5rem', color: '#bdbdbd' }} />,
          style: {
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0070f3',
            },
          },
        }}
      />

      {allTags.length > 0 && (
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          <Chip
            label="All"
            onClick={() => onTagFilter(null)}
            className="blog-tag"
            variant={selectedTag === null ? 'filled' : 'outlined'}
          />
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => onTagFilter(tag)}
              className="blog-tag"
              variant={selectedTag === tag ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BlogSearch;
