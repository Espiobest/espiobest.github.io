import { Container, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import GitHubIcon from '@mui/icons-material/GitHub';

const experiences = [
  {
    title: 'Software Engineering Intern',
    org: 'CDS-AI',
    period: 'Sep 2025 - Present',
    stack: ['React', 'TypeScript', 'Docker', 'Geospatial Data', 'GenAI'],
    work: [
      'Architected and deployed a map-based interview platform with React and geospatial data visualization, empowering Woodwell Climate Research Center to evaluate candidate expertise through interactive geographic interfaces',
      'Containerized full-stack applications using Docker, enabling reproducible deployments and streamlined integration across distributed research clusters',
      'Collaborating with the CDS-AI core team to design and implement scalable AI infrastructure supporting multi-institutional data science workflows',
    ],
    impact:
      'Accelerated research team onboarding and evaluation processes by 40% through interactive geospatial tools, while enabling seamless cross-cluster deployments for climate science research.',
    link: 'https://ds.cs.umass.edu/',
  },
  {
    title: 'Software Engineering Intern',
    org: 'MGHPCC (Unity HPC Cluster)',
    period: 'May 2025 - Aug 2025',
    stack: ['Python', 'SLURM', 'Pandas', 'Shell', 'HPC'],
    work: [
      'Analyzed 10.9M+ SLURM job records using clustering (DBSCAN) and time-series techniques to detect GPU underutilization on the Unity HPC cluster',
      'Built automated pipelines with Python, pandas, and NumPy for workload pattern detection, anomaly flagging, and resource optimization',
      'Automated analysis of 9+ months of telemetry data, saving 3,000+ GPU VRAM hours and guiding outreach to improve efficiency across 1,400+ high-performance GPU nodes',
    ],
    impact:
      'Delivered significant cost savings through GPU optimization analysis, directly contributing to more efficient resource allocation across a major HPC cluster serving the research community.',
    link: 'https://www.mghpcc.org/',
    github: 'https://github.com/UnityHPC/ds4cg-job-analytics',
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
    github: 'https://github.com/Instilt-Educate',
  },
];

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
      </Box>
    </Container>
  );
}
