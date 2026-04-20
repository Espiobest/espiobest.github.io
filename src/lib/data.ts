export const getProjects = () => [
  {
    name: 'RouteAble',
    title: 'RouteAble',
    shortDescription: 'Map-based accessibility app (🏆 UChicago & HackUMass Winner)',
    description:
      'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas.',
    technologies: ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
    github: 'https://github.com/RouteAble/',
    link: 'https://docs.google.com/presentation/d/145E9zU8xtpnWF9hRp2KIpmkV4GY5TStbv_fuzdng2to/edit#slide=id.g4dfce81f19_0_45',
    awards: 'Most Impactful Award & $2,000 at UChicago Tech Showcase \'24 · Best Use of Github at HackUMass',
    image: './images/projects/routeable.png',
  },
  {
    name: 'Poker Bot',
    title: 'Poker Bot',
    shortDescription: "DQN agent for Texas Hold'em",
    description:
      "Deep Q-Network agent for Heads-Up Limit Texas Hold'em using reinforcement learning. Ranked 4th out of 23 in tournament evaluation.",
    technologies: ['PyTorch', 'NumPy', 'TensorBoard', 'Reinforcement Learning'],
    github: 'https://github.com/Espiobest/poker-gui',
    link: 'https://poker-gui.vercel.app/',
    image: './images/projects/poker.png',
  },
  {
    name: 'Travy',
    title: 'Travy',
    shortDescription: 'Full-stack travel planning app',
    description:
      'Centralizes travel planning by aggregating flights, transit, and rideshare data in one place.',
    technologies: ['React', 'Express.js', 'Docker', 'PostgreSQL', 'Leaflet'],
    github: 'https://github.com/tanushsavadi/Travy',
    image: './images/projects/travy-logo.png',
  },
  {
    name: 'Spotify Stats',
    title: 'Spotify Stats',
    shortDescription: 'Listening history dashboard',
    description: 'Dashboard that visualizes Spotify listening history, top artists, and habits over time.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Spotify API'],
    github: 'https://github.com/Espiobest/Spotify-Stats-Viewer',
    link: 'https://stats-viewer.vercel.app/',
    image: './images/projects/spotify-stats.png',
  },
  {
    name: 'Instilt Educate',
    title: 'Instilt Educate Website',
    shortDescription: 'Educational platform website',
    description:
      'Connects students and organizations globally with a redesigned, user-friendly interface.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/Instilt-Educate/instilt-educate.github.io',
    link: 'https://edu.instilt.com',
    image: './images/projects/instilt-educate.png',
  },
  {
    name: 'Discord Bot',
    title: 'Discord Bot',
    shortDescription: 'Moderation bot for 30,000+ community',
    description:
      'Moderation bot for a Discord community of 30,000+ members. Enhances community safety and engagement.',
    technologies: ['Python', 'PostgreSQL', 'Discord.py'],
    github: 'https://github.com/Espiobest/Discord-Bot/',
    image: './images/projects/discord-mark-blue.png',
  },
];

export const getExperiences = () => [
  {
    title: 'Software Engineering Intern',
    org: 'CDS-AI',
    period: 'Sep 2025 - Present',
    stack: ['React', 'TypeScript', 'FastAPI', 'Flutter', 'PostgreSQL', 'S3', 'Docker', 'Geospatial Data'],
    work: [
      'Built backend data pipelines (PostgreSQL, S3) to ingest, standardize, and store multi-organization salt marsh data for a Massachusetts DEP-funded initiative, supporting 100+ researchers across 20+ organizations',
      'Implemented fault-tolerant NAS synchronization across heterogeneous formats with schema mapping and incremental batch processing',
      'Developed a multi-tenant web portal (React, FastAPI) with role-based access control and containerized deployment, managing 1,000+ weekly field records',
      'Built a Flutter mobile app for field data collection replacing third-party tooling — GPS capture, RTK location matching, multi-plot surveys, and a QC pipeline for pre-ingestion validation',
      'Built containerized React tools with interactive geospatial visualizations for Woodwell Climate Research Center',
    ],
    impact:
      'Replaced third-party tooling and manual workflows with a full-stack data platform serving 100+ researchers across Massachusetts DEP-funded salt marsh research.',
    link: 'https://ds.cs.umass.edu/',
  },
  {
    title: 'Software Engineering Intern',
    org: 'MGHPCC (Unity HPC Cluster)',
    period: 'May 2025 - Aug 2025',
    stack: ['Python', 'SLURM', 'SQL', 'Linux', 'CI/CD', 'GitHub Actions', 'DBSCAN', 'HPC'],
    work: [
      'Engineered low-latency telemetry pipelines in a Linux HPC environment to process 12+ months of cluster activity',
      'Optimized SQL queries and indexing strategies to accelerate SLURM log analysis by 80% across 10.9M+ job records',
      'Applied DBSCAN clustering to identify 63,000+ underutilized A100 GPU hours, uncovering $120K+ in wasted compute',
      'Built CI/CD pipelines with GitHub Actions and pytest for monitoring services',
    ],
    impact:
      'Found $120K+ in wasted GPU resources and cut log analysis time by 80%, directly improving resource allocation across a major HPC cluster.',
    link: 'https://www.mghpcc.org/',
    github: 'https://github.com/UnityHPC/ds4cg-job-analytics',
  },
  {
    title: 'Head of Technical Operations',
    org: 'Instilt Educate',
    period: 'Jun 2021 - May 2025',
    stack: ['JavaScript', 'Node.js', 'Automation', 'Cloud', 'Leadership'],
    work: [
      'Led a team of 10+ engineers across weekly sprint meetings',
      'Managed technical operations and system access control for 300+ users',
      'Built automated onboarding pipelines and scheduling automation with Google Calendar and Zoom APIs, saving 10+ hours/week',
      'Led backend re-architecture for scalable, high-performance systems',
    ],
    impact:
      'Streamlined onboarding, improved developer velocity, and saved 10+ hours/week through automation and re-architected backend systems.',
    link: 'https://edu.instilt.com',
    github: 'https://github.com/Instilt-Educate',
  },
];


export const getResearch = () => [
  {
    type: 'Poster',
    title: 'Salt Marsh Data Infrastructure for Massachusetts DEP',
    venue: 'CDS-AI Summer Research',
    date: 'Summer 2025',
    description:
      'Presented work on building scalable data pipelines and a multi-tenant web portal to manage salt marsh field data across 20+ organizations for a Massachusetts DEP-funded initiative.',
    link: undefined as string | undefined,
  },
  {
    type: 'Paper',
    title: 'TODO: Add your independent study title',
    venue: 'UMass Amherst — Independent Study',
    date: 'Spring 2025',
    description: 'TODO: Short description of your independent study project and key findings.',
    link: undefined as string | undefined,
  },
  {
    type: 'Paper',
    title: 'TODO: Add your class project title',
    venue: 'UMass Amherst',
    date: 'Spring 2025',
    description: 'TODO: Short description of the class project and what problem it addressed.',
    link: undefined as string | undefined,
  },
];


export const getBlogPosts = () => [
  {
    slug: 'rumba-ftp-exploit-cve-2016-5764',
    title: 'Rumba FTP Exploit (CVE-2016-5764)',
    description: 'Deep dive into a buffer overflow vulnerability in the Rumba FTP client.',
  },
];
