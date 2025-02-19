"use client";

import Image from 'next/image';
import { useState, useMemo } from 'react';

import { Container, Typography } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from './Navbar';

const Portfolio = () => {

  const [mode, setMode] = useState('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
            mode: mode === 'light' ? 'light' : 'dark',
        }
    }),
    [mode]
  );
    
  return (
    <ThemeProvider theme={theme}>
        <div>
        <Navbar mode={mode} setMode={setMode} />

        {/* Introduction Section */}
        <Container style={{ marginTop: '2rem', textAlign: 'center' }}>

            <Image className={"profile-img"} src="/images/profile.jpg" alt="Profile Picture" width={200} height={200} />

            <Typography variant="h4" color="primary" gutterBottom>
                Ayush Ravi Chandran
            </Typography>

            <Typography
            variant="h6"
            style={{ marginTop: '1rem', fontWeight: 600, opacity: 0, animation: 'fadeIn 1.5s ease-out forwards' }}
        >
            <span style={{ color: '#4B9EA3' }}>Building</span> experiences,{' '}
            <span style={{ color: '#4B9EA3' }}>creating</span> solutions,{' '}
            <span style={{ color: '#4B9EA3' }}>driven</span> by excellence.
        </Typography>
            <br></br>
        
            <div style={{ display: 'flex', maxWidth: '800px', justifyContent: 'center', 'alignItems': 'center', margin: 'auto' }}>
            <Typography variant="body1">
            I am currently a junior at UMass Amherst majoring in Computer Science and Mathematics. With extensive experience in fullstack web and app development, I have a strong background in building scalable, intuitive, and dynamic web applications. I am seeking internships for Summer 2025.
            </Typography>
            </div>
        </Container>

        
        </div>
    </ThemeProvider>
  );
};

export default Portfolio;
