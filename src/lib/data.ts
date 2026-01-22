export const getProjects = () => [
  {
    name: 'RouteAble',
    title: 'RouteAble',
    shortDescription: 'Map-based accessibility app (🏆 UChicago & HackUMass Winner)',
    description:
      'A map-based application that uses crowd-sourced data to help disabled people determine accessible areas',
    technologies: ['React Native', 'PostgreSQL', 'PyTorch', 'NestJS'],
    github: 'https://github.com/RouteAble/',
    link: 'https://docs.google.com/presentation/d/145E9zU8xtpnWF9hRp2KIpmkV4GY5TStbv_fuzdng2to/edit#slide=id.g4dfce81f19_0_45',
    image: './images/projects/routeable.png',
    awards:
      'Won the "Most Impactful Award" & $2,000 at UChicago Tech Showcase \'24 and "Best Use of Github" at HackUMass',
  },
  {
    name: 'Poker Bot',
    title: 'Poker Bot',
    shortDescription: "DQN agent for Texas Hold'em",
    description:
      "Built a Deep Q-Network (DQN) agent to play Heads-Up Limit Texas Hold'em using reinforcement learning; ranked 4th out of 23 in tournament evaluation",
    technologies: ['PyTorch', 'NumPy', 'Tensorboard', 'Reinforcement Learning'],
    github: 'https://github.com/Espiobest/poker-gui',
    link: 'https://poker-gui.vercel.app/',
    image: './images/projects/poker.png',
  },
  {
    name: 'Travy',
    title: 'Travy',
    shortDescription: 'Full-stack travel planning app',
    description:
      'A full-stack app that centralizes travel planning by aggregating flights, transit, and rideshare data.',
    technologies: ['React', 'Express.js', 'Docker', 'PostgreSQL', 'Leaflet'],
    github: 'https://github.com/tanushsavadi/Travy',
    image: './images/projects/travy-logo.png',
  },
  {
    name: 'Spotify Stats',
    title: 'Spotify Stats',
    shortDescription: 'Listening history dashboard',
    description: 'A comprehensive dashboard that visualizes Spotify listening history and habits',
    technologies: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Spotify API'],
    github: 'https://github.com/Espiobest/Spotify-Stats-Viewer',
    link: 'https://stats-viewer.vercel.app/',
    image: './images/projects/spotify-stats.png',
  },
  {
    name: 'Instilt Educate',
    title: 'Instilt Educate Website',
    shortDescription: 'Educational platform website',
    description:
      'Built to connect students and organizations globally, featuring a redesigned, user-friendly interface',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Google Analytics'],
    github: 'https://github.com/Instilt-Educate/instilt-educate.github.io',
    link: 'https://edu.instilt.com',
    image: './images/projects/instilt-educate.png',
  },
  {
    name: 'Discord Bot',
    title: 'Discord Bot',
    shortDescription: 'Moderation bot for 30,000+ community',
    description:
      'A moderation bot for a Discord community of 30,000+, enhancing community safety and engagement',
    technologies: ['Python', 'PostgreSQL', 'Discord.py', 'Heroku'],
    github: 'https://github.com/Espiobest/Discord-Bot/',
    image: './images/projects/discord-mark-blue.png',
  },
];

export const getExperiences = () => [
  {
    title: 'Software Engineering Intern',
    org: 'CDS-AI',
    period: 'Sep 2025 - Present',
    stack: [
      'React',
      'TypeScript',
      'Docker',
      'PostgreSQL',
      'S3',
      'Computer Vision',
      'Geospatial Data',
    ],
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
    period: 'June 2021 - May 2025',
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

export const getBlogPosts = () => [
  {
    slug: 'rumba-ftp-exploit-cve-2016-5764',
    title: 'Rumba FTP Exploit (CVE-2016-5764)',
    description: 'Deep dive into buffer overflow vulnerabilities',
  },
];
