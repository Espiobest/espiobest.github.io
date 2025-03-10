import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
  return (
    <Box component="footer" className="p-4 text-center w-full text-gray-400">
      <Typography variant="body2" className="text-sm">
        Built with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        using Next.js and Material UI.
      </Typography>
    </Box>
  );
};

export default Footer;
