'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import TypewriterEffect from './TypewriterEffect';
import Picture from './Picture';

const Portfolio = () => {
  return (
    <div>
      {/* Introduction Section */}
      <Container style={{ marginTop: '0.2rem', textAlign: 'center' }}>
        <Picture></Picture>

        <Typography variant="h4" color="primary" gutterBottom>
          Ayush Ravi Chandran
        </Typography>

        <Typography
          variant="h6"
          style={{
            marginTop: '1rem',
            fontWeight: 600,
            opacity: 0,
            animation: 'fadeIn 1.5s ease-out forwards',
            animationDelay: '0.3s',
          }}
        >
          <TypewriterEffect></TypewriterEffect>
        </Typography>

        <br></br>

        <div>
          <p className="sub-text">I am seeking internships for Fall 2025!</p>
        </div>
        <br></br>

        <div className="main-text">
          <Typography variant="body1">
            I am a junior at UMass Amherst majoring in Computer Science and Mathematics, with
            experience in full-stack development, app development, and machine learning.
          </Typography>
        </div>

        <br></br>

        <div className="main-text mb-4">
          <Typography variant="body1" style={{ color: 'white' }}>
            Data Science Intern at{' '}
            <span className="highlight-text">
              <a href="https://www.mghpcc.org/" target="_blank">
                MGHPCC
              </a>
            </span>{' '}
            as part of the Data Science for the Common Good (
            <span className="highlight-text">
              <a href="https://ds.cs.umass.edu/programs/ds4cg/ds4cg-team" target="_blank">
                DS4CG
              </a>
            </span>
            ) program and Head of Technical Operations at{' '}
            <span className="highlight-text">
              <a href="https://edu.instilt.com" target="_blank">
                Instilt Educate
              </a>
            </span>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem', borderRadius: '10px' }}
              href="/experience"
            >
              Explore my experience &rarr;
            </Button>
          </Typography>
        </div>
        <br></br>
        <Box
          component="div"
          sx={{
            display: 'inline-flex',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            sx={{
              borderRadius: 2,
              borderColor: 'primary.main', // darker border
              color: 'primary.main', // darker text
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
                borderColor: 'primary.dark',
              },
            }}
            href="/projects"
            startIcon={<StartIcon />}
          >
            Discover My Projects
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="medium"
            sx={{
              borderRadius: 2,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
                borderColor: 'primary.dark',
              },
            }}
            href="/documents/Resume.pdf"
            target="_blank"
          >
            View My Resume
          </Button>
        </Box>
        <br></br>
      </Container>
    </div>
  );
};

export default Portfolio;
