'use client';

import Image from 'next/image';
import { Container, Typography, Card, CardContent, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Crown/Award icon
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Setup from '../components/Setup';
import Tooltip from '@mui/material/Tooltip';
import { getProjects } from '@/lib/data';

const Projects = () => {
  const projects = getProjects();

  return (
    <div>
      <Container>
        <Setup></Setup>

        <Typography variant="h5" className="p-2 text-center" gutterBottom>
          Discover My Projects
        </Typography>

        <div className="projects-grid flex flex-wrap justify-center gap-4">
          {projects.map((project, index) => (
            <Card key={index} className="project-card w-full sm:w-[48%]">
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={200}
                  height={150}
                  className="project-image"
                />
                {project.awards && (
                  <Tooltip
                    title={project.awards}
                    arrow
                    className="absolute left-1 top-0 sm:left-10"
                    enterTouchDelay={0}
                    leaveTouchDelay={2000}
                  >
                    <div className="tilt-shaking">
                      <EmojiEventsIcon style={{ color: '#FFD700', fontSize: 32 }} />
                    </div>
                  </Tooltip>
                )}
              </div>

              <CardContent>
                <Typography variant="h6" color="white" style={{ textAlign: 'center' }} gutterBottom>
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="white"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  {project.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="#0070f3"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  {project.technologies.join(', ')}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {project.github && (
                    <IconButton href={project.github} target="_blank">
                      <GitHubIcon className={'project-link'} sx={{ fontSize: 40 }} />
                    </IconButton>
                  )}
                  {project.link && (
                    <IconButton href={project.link} target="_blank">
                      <ArrowOutwardIcon className={'project-link'} sx={{ fontSize: 40 }} />
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
      <Box className="text-center">
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', borderRadius: '10px' }}
          href="/experience"
        >
          <KeyboardReturnIcon style={{ paddingRight: '0.5rem' }} /> Back to Experiences
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', marginLeft: '1rem', borderRadius: '10px' }}
          href="/blog"
        >
          Read my blog{' '}
          <KeyboardReturnIcon style={{ transform: 'scaleX(-1)', paddingRight: '0.5rem' }} />
        </Button>
      </Box>
    </div>
  );
};

export default Projects;
