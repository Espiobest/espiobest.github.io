import { Container, Typography, Box, Chip, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const experiences = [
  {
    title: 'Data Science Intern',
    org: 'MGHPCC (Unity HPC Cluster)',
    period: 'May 2025 - Present',
    stack: ['Python', 'SLURM', 'Pandas', 'Shell', 'HPC'],
    work: [
      'Analyzing GPU workload efficiency and identifying underutilization of high-performance GPU nodes',
      'Developing automated pipelines for workload analysis and resource optimization',
      'Automating the analysis of 9+ months of SLURM records to detect underutilization patterns, enabling targeted user outreach and maximizing the impact of 1400+ GPU nodes for the research community',
    ],
    link: 'https://www.mghpcc.org/',
  },
  {
    title: 'Head of Technical Operations',
    org: 'Instilt Educate',
    period: 'June 2021 - Present',
    stack: ['JavaScript', 'Node.js', 'Automation', 'Cloud', 'Leadership'],
    work: [
      'Leading a team of 10+ engineers, driving weekly sprint meetings',
      'Managing technical operations and system access control for 300+ users',
      'Building automated data pipelines and onboarding tools',
      'Led backend re-architecture for scalable, high-performance systems, emphasizing developer velocity',
      'Created scheduling automation with Google Calendar and Zoom APIs, saving 10+ hours per week',
    ],
    impact:
      'Streamlined onboarding, improved developer velocity, and saved significant manual hours through automation and scalable systems.',
    link: 'https://edu.instilt.com',
  },
];

export default function ExperiencePage() {
  return (
    <Container maxWidth="md" className="py-10">
      <Typography variant="h4" className="mb-6 text-center" color="primary">
        My Experience
      </Typography>
      {experiences.map((exp, idx) => (
        <Box key={idx} className="experience-card">
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
      </Box>
    </Container>
  );
}
