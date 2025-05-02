'use client';

import { Container, Typography, Button } from '@mui/material';
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
          <p className="sub-text">I am seeking internships for Summer and Fall 2025!</p>
        </div>
        <br></br>

        <div className="main-text">
          <Typography variant="body1">
            I am a junior at UMass Amherst majoring in Computer Science and Mathematics, with
            experience in full-stack development, app development, and machine learning.
          </Typography>
        </div>

        <br></br>

        <div className="main-text">
          <Typography variant="body1">
            I am currently a Research Assistant at UMass Amherst in the Data Science for Social Good
            program, where I analyze food insecurity using national datasets and apply machine
            learning and statistical models. I collaborate with faculty and students to generate
            data-driven insights for policy recommendations.
          </Typography>
        </div>

        <br></br>
        <div className="main-text">
          <Typography variant="body1">
            Additionally, I am the Head of Technical Operations at{' '}
            <span className="org-text">
              <a href="https://edu.instilt.com" target="_blank">
                Instilt Educate
              </a>
            </span>
            , where I lead a team of talented individuals in driving technological innovation and
            operational efficiency. My role focuses on optimizing workflows, improving system access
            control, and automating processes to enhance the user experience.
          </Typography>
        </div>

        <br></br>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', borderRadius: '10px' }}
          href="/projects"
        >
          Discover My Projects <StartIcon style={{ paddingLeft: '0.5rem' }} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', borderRadius: '10px', marginLeft: '1rem' }}
          href="/documents/Resume.pdf"
          target="_blank"
        >
          View My Resume
        </Button>
        <br></br>
      </Container>
    </div>
  );
};

export default Portfolio;
