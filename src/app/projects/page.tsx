import Image from 'next/image';
import { Container, Typography, Card, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Crown/Award icon
import Tooltip from '@mui/material/Tooltip';

const Projects = () => {
  const projects = [
    {
      title: 'RouteAble',
      description:
        'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
      github: 'https://github.com/RouteAble/',
      link: 'https://docs.google.com/presentation/d/145E9zU8xtpnWF9hRp2KIpmkV4GY5TStbv_fuzdng2to/edit#slide=id.g4dfce81f19_0_45',
      image: './images/projects/routeable.png',
      technologies: ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
      awards:
        'Won the "Most Impactful Award" & $2,000 at UChicago Tech Showcase \'24 and "Best use of Github" at HackUMass',
    },
    {
      title: 'Spotify Stats',
      description: 'A comprehensive dashboard that visualizes Spotify listening history and habits',
      github: 'https://github.com/Espiobest/Spotify-Stats-Viewer',
      link: 'https://stats-viewer.vercel.app/',
      image: './images/projects/spotify.png',
      technologies: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Spotify API'],
    },
    {
      title: 'Instilt Educate Website',
      description:
        'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
      github: 'https://github.com/Instilt-Educate/instilt-educate.github.io',
      link: 'https://edu.instilt.com',
      image: './images/projects/instilt2.png',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Google Analytics'],
    },
    {
      title: 'Discord Bot',
      description:
        'A moderation bot for a Discord community of 30,000+, enhancing community safety and engagement',
      github: 'https://github.com/Espiobest/Discord-Bot/',
      image: './images/projects/discord-mark-blue.png',
      technologies: ['Python', 'PostgreSQL', 'Discord.py', 'Heroku'],
    },
  ];

  return (
    <div>
      <Container>
        <Typography variant="h5" className="p-2 text-center" gutterBottom>
          Discover My Projects
        </Typography>

        <div className="projects-grid grid grid-cols-1 place-items-center sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="project-card">
              <div style={{ position: 'relative' }}>
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
                  <IconButton
                    className={'project-link'}
                    color="inherit"
                    href={project.github}
                    target="_blank"
                  >
                    <GitHubIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                  {project.link && (
                    <IconButton
                      className={'project-link'}
                      color="inherit"
                      href={project.link}
                      target="_blank"
                    >
                      <ArrowOutwardIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Projects;