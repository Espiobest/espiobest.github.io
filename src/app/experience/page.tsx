import { Container, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getExperiences } from '@/lib/data';

const experiences = getExperiences();

export default function ExperiencePage() {
  return (
    <Container maxWidth="md" className="py-10">
      <Typography variant="h4" className="mb-6 text-center" color="primary">
        My Experience
      </Typography>
      {experiences.map((exp, idx) => (
        <Box key={idx} className="experience-card" style={{ position: 'relative' }}>
          {exp.github && (
            <IconButton
              href={exp.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: 'white',
                '&:hover': { color: '#0070f3' },
              }}
              aria-label="View GitHub repository"
            >
              <GitHubIcon />
            </IconButton>
          )}
          <Typography variant="h6" className="experience-title">
            {exp.title}{' '}
            <span className="experience-org">
              @{' '}
              <a className="link-text" href={exp.link} target="_blank" rel="noopener noreferrer">
                {exp.org}
              </a>
            </span>
          </Typography>
          <Typography variant="body2" className="experience-period mb-2">
            {exp.period}
          </Typography>
          <div className="mb-2 flex flex-wrap gap-2">
            {exp.stack.map((tech) => (
              <Chip key={tech} label={tech} size="small" className="experience-chip" />
            ))}
          </div>
          <ul className="experience-list">
            {exp.work.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          {exp.impact && (
            <Typography variant="subtitle2" className="experience-impact-label">
              Impact:
            </Typography>
          )}
          {exp.impact && (
            <Typography variant="body2" className="experience-impact">
              {exp.impact}
            </Typography>
          )}
        </Box>
      ))}
      <Box className="text-center">
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', borderRadius: '10px' }}
          href="/"
        >
          <KeyboardReturnIcon style={{ paddingRight: '0.5rem' }} /> Back to Home
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', marginLeft: '1rem', borderRadius: '10px' }}
          href="/projects"
        >
          Explore my Projects{' '}
          <KeyboardReturnIcon style={{ transform: 'scaleX(-1)', paddingRight: '0.5rem' }} />
        </Button>
      </Box>
    </Container>
  );
}
