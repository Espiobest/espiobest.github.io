import { Container, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import GitHubIcon from '@mui/icons-material/GitHub';

const experiences = [
  {
    title: 'Software Engineering Intern',
    org: 'CDS-AI',
    period: 'Sep 2025 - Present',
    stack: ['React', 'TypeScript', 'Docker', 'PostgreSQL', 'S3', 'Computer Vision', 'Geospatial Data'],
    work: [
      'Built backend data pipelines (PostgreSQL, S3) to ingest, standardize, and store multi-organization salt marsh data for a Massachusetts DEP-funded initiative, supporting 100+ researchers across 20+ organizations',
      'Implemented reliable synchronization of multi-organization datasets to NAS storage, handling heterogeneous formats with schema mapping, incremental updates, and fault-tolerant batch processing',
      'Developed a multi-tenant web portal with role-based access control to manage 1,000+ weekly field records, improving data integrity and usability',
      'Prototyped a computer vision pipeline to digitize handwritten field forms, reducing manual transcription effort',
      'Built containerized React tools with interactive geospatial visualizations for reproducible deployment at Woodwell Climate Research Center, supporting external research partners',
    ],
    impact:
      'Enabled efficient management and standardization of salt marsh data across Massachusetts, supporting critical environmental research through scalable data infrastructure and automated workflows.',
    link: 'https://ds.cs.umass.edu/',
  },
  {
    title: 'Software Engineering Intern',
    org: 'MGHPCC (Unity HPC Cluster)',
    period: 'May 2025 - Aug 2025',
    stack: ['Python', 'SLURM', 'SQL', 'Linux', 'CI/CD', 'GitHub Actions', 'DBSCAN', 'HPC'],
    work: [
      'Engineered low-latency telemetry pipelines in a Linux-based HPC environment to process 12+ months of cluster activity, enabling real-time monitoring and faster incident response',
      'Optimized SQL queries and data indexing strategies to accelerate SLURM log analysis by 80%, enabling faster anomaly detection across 10.9M+ job records',
      'Applied unsupervised clustering (DBSCAN) to identify 63,000+ underutilized A100 GPU hours, uncovering $120K+ in wasted compute resources',
      'Collaborated in Agile sprints to build CI/CD pipelines with GitHub Actions and pytest, conducting code reviews and automating testing for monitoring services',
    ],
    impact:
      'Uncovered $120K+ in wasted compute resources through GPU optimization analysis and accelerated log analysis by 80%, directly improving resource allocation and incident response across a major HPC cluster serving the research community.',
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
