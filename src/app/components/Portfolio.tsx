'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
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
          <p className="sub-text">I am seeking New Grad opportunities for 2026!</p>
        </div>
        <br></br>

        <div className="main-text">
          <Typography variant="body1">
            I am a senior at UMass Amherst majoring in Computer Science and Mathematics, with
            experience in full-stack development, app development, and machine learning.
          </Typography>
        </div>

        <br></br>

        <div className="main-text mb-4">
          <Typography variant="body1" style={{ color: 'white' }}>
            Software Engineering Intern at{' '}
            <span className="highlight-text">
              <a href="https://ds.cs.umass.edu/" target="_blank">
                CDS-AI
              </a>
            </span>{' '}
            • Head of Technical Operations at{' '}
            <span className="highlight-text">
              <a href="https://edu.instilt.com" target="_blank">
                Instilt Educate
              </a>
            </span>{' '}
            • Former Intern at{' '}
            <span className="highlight-text">
              <a href="https://www.mghpcc.org/" target="_blank">
                MGHPCC
              </a>
            </span>{' '}
            and part of the{' '}
            <span className="highlight-text">
              <a href="https://ds.cs.umass.edu/programs/ds4cg/ds4cg-team" target="_blank">
                DS4CG
              </a>
            </span>{' '}
            program
            <br></br>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem', borderRadius: '10px' }}
              href="/experience"
            >
              Explore my experience{' '}
              <KeyboardReturnIcon style={{ transform: 'scaleX(-1)', paddingRight: '0.5rem' }} />
            </Button>
          </Typography>
        </div>
        <br></br>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
