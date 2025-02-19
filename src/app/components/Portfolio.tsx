import { Container, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// const projects = [
 
// ];

const Portfolio = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
     
          <IconButton color="inherit" href="https://github.com/espiobest" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.linkedin.com/in/ayush-ravichandran/" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Introduction Section */}
      <Container style={{ marginTop: '2rem', textAlign: 'center' }}>

        <Image src="/images/profile.jpg" alt="Profile Picture" width={200} height={200} style={{ borderRadius: '50%', display: 'block', margin: 'auto' }} />


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
        <Typography variant="body1">
          I am currently a junior at UMass Amherst majoring in Computer Science and Mathematics. With extensive experience in fullstack web and app development, I have a strong background in building scalable, intuitive, and dynamic web applications. I am seeking internships for Summer 2025.
        </Typography>
      </Container>

      
    </div>
  );
};

export default Portfolio;
