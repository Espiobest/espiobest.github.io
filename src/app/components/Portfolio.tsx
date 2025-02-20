"use client";

import Image from 'next/image';
import { Container, Typography, Button} from '@mui/material';
import StartIcon from '@mui/icons-material/Start';

const Portfolio = () => {
    
  return (
        <div>
        {/* Introduction Section */}
        <Container style={{ marginTop: '2rem', textAlign: 'center' }}>

            <Image className={"profile-img"} src="/images/profile.jpg" alt="Profile Picture" width={200} height={200} />

            <Typography variant="h4" color="primary" gutterBottom>
                Ayush Ravi Chandran
            </Typography>

            <Typography
                variant="h6"
                style={{ marginTop: '1rem', fontWeight: 600, opacity: 0, animation: 'fadeIn 1.5s ease-out forwards', animationDelay: '0.3s' }}
            >
                <span style={{ color: '#4B9EA3' }}>Building</span> experiences,{' '}
                <span style={{ color: '#4B9EA3' }}>creating</span> solutions,{' '}
                <span style={{ color: '#4B9EA3' }}>driven</span> by excellence.
            </Typography>
            <br></br>
        
            <div className="main-text">
                <Typography variant="body1">
                    I am currently a junior at UMass Amherst majoring in Computer Science and Mathematics. With extensive experience in fullstack web and app development, I have a strong background in building scalable, intuitive, and dynamic web applications. I am seeking internships for Summer 2025.
                </Typography>
            </div>

            <br></br>

            <div className="main-text">
                <Typography variant="body1">
                    I currently work as the Head of Technical Operations at <span className="org-text"><a href="https://edu.instilt.com" target="_blank">Instilt Educate</a></span>, where I lead a team of talented individuals in driving technological innovation and operational efficiency. My role focuses on optimizing workflows, improving system access control, and automating processes to enhance the user experience. I’m passionate about leveraging my leadership skills to foster collaboration and ensure the smooth onboarding of new members. 
                </Typography>
            </div>

            <br></br>

            <Typography variant="body1">
                Contact me at ayushravicha[at]umass.edu
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '1rem', borderRadius: '10px'}} href="/projects">
                Discover My Projects <StartIcon style={{paddingLeft: '0.5rem'}}/>
            </Button>
            <Button variant="contained" color="primary" style={{ marginTop: '1rem', borderRadius: '10px', marginLeft: '1rem'}} href="/documents/Resume.pdf" target="_blank">
                View My Resume
            </Button>
            <br></br>
        </Container>
        </div>
  );
};

export default Portfolio;
