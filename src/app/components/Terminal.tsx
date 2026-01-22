'use client';

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent, memo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { getUptime } from '@/lib/utils';
import { getGitHubStats, type GitHubStats } from '@/lib/github';
import { getProjects, getExperiences, getBlogPosts } from '@/lib/data';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: string;
  directory?: string;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingCommand, setTypingCommand] = useState('');
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [currentDir, setCurrentDir] = useState('/home/ayush/portfolio');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasRunNeofetch = useRef(false);

  const executeCommand = useCallback(
    (cmd: string): string => {
      const command = cmd.trim().toLowerCase();
      const args = command.split(' ');
      const baseCommand = args[0];

      switch (baseCommand) {
        case 'help':
          return `<span style="color: #4ade80; font-weight: 600;">Available commands:</span>
  <span style="color: #60a5fa;">help</span>              - Show this help message
  <span style="color: #60a5fa;">about</span>             - Learn about me
  <span style="color: #60a5fa;">projects</span>          - List all projects
  <span style="color: #60a5fa;">skills</span>            - List technical skills
  <span style="color: #60a5fa;">blog</span>              - Show recent blog posts
  <span style="color: #60a5fa;">contact</span>           - Get contact information
  <span style="color: #60a5fa;">resume</span>            - Download resume
  <span style="color: #60a5fa;">clear</span>             - Clear terminal
  <span style="color: #60a5fa;">exit</span>              - Close terminal
  <span style="color: #60a5fa;">pwd</span>               - Print working directory
  <span style="color: #60a5fa;">ls</span>                - List directory contents
  <span style="color: #60a5fa;">cd</span> &lt;dir&gt;          - Change directory
  <span style="color: #60a5fa;">cat</span> &lt;file&gt;        - Display file contents

<span style="color: #4ade80; font-weight: 600;">Easter eggs:</span>
  <span style="color: #60a5fa;">sudo</span> &lt;command&gt;    - Try it and see
  <span style="color: #60a5fa;">rm -rf /</span>          - Don't do this at home
  <span style="color: #60a5fa;">whoami</span>            - Who are you?`;

        case 'pwd':
          return currentDir;

        case 'ls':
          if (currentDir === '/home/ayush/portfolio') {
            return `<span style="color: #60a5fa;">projects/</span>
<span style="color: #60a5fa;">blog/</span>
<span style="color: #60a5fa;">experience/</span>
resume.pdf
README.md`;
          } else if (currentDir === '/home/ayush/portfolio/projects') {
            const projects = getProjects();
            return `<span style="color: #4ade80; font-weight: 600;">Projects:</span>
${projects.map((p, i) => `  ${i + 1}. <span style="color: #a78bfa;">${p.name}</span> - ${p.shortDescription}`).join('\n')}

<span style="color: #fbbf24;">Tip:</span> Use <span style="color: #60a5fa;">cat ${1}</span> to view details`;
          } else if (currentDir === '/home/ayush/portfolio/blog') {
            const blogs = getBlogPosts();
            return `<span style="color: #4ade80; font-weight: 600;">Blog Posts:</span>
${blogs.map((b, i) => `  ${i + 1}. <span style="color: #a78bfa;">${b.title}</span>`).join('\n')}

<span style="color: #fbbf24;">Tip:</span> Use <span style="color: #60a5fa;">cat ${1}</span> to read post`;
          } else if (currentDir === '/home/ayush/portfolio/experience') {
            const experiences = getExperiences();
            return `<span style="color: #4ade80; font-weight: 600;">Experience:</span>
${experiences.map((e, i) => `  ${i + 1}. <span style="color: #a78bfa;">${e.org}</span> - ${e.title}`).join('\n')}

<span style="color: #fbbf24;">Tip:</span> Use <span style="color: #60a5fa;">cat ${1}</span> to view details`;
          }
          return '';

        case 'cd':
          if (args.length < 2) {
            return '<span style="color: #ef4444;">cd: missing operand</span>';
          }
          const targetDir = args[1];

          if (targetDir === '..') {
            if (currentDir !== '/home/ayush/portfolio') {
              setCurrentDir('/home/ayush/portfolio');
              return '';
            }
            return '<span style="color: #fbbf24;">Already at root directory</span>';
          } else if (targetDir === '~' || targetDir === '/home/ayush/portfolio') {
            setCurrentDir('/home/ayush/portfolio');
            return '';
          } else if (currentDir === '/home/ayush/portfolio') {
            const validDirs = ['projects', 'blog', 'experience'];
            if (validDirs.includes(targetDir)) {
              setCurrentDir(`/home/ayush/portfolio/${targetDir}`);
              return '';
            }
            return `<span style="color: #ef4444;">cd: ${targetDir}: No such file or directory</span>`;
          } else {
            return `<span style="color: #ef4444;">cd: ${targetDir}: No such file or directory</span>`;
          }

        case 'cat':
          if (args.length < 2) {
            return '<span style="color: #ef4444;">cat: missing operand</span>';
          }
          const fileIndex = parseInt(args[1]) - 1;

          if (currentDir === '/home/ayush/portfolio/projects') {
            const projects = getProjects();
            const project = projects[fileIndex];
            if (!project) {
              return '<span style="color: #ef4444;">cat: invalid file number</span>';
            }
            return `<span style="color: #a78bfa; font-weight: 600;">${project.name}</span>
----------------------------------------
${project.description}

<span style="color: #fbbf24;">Technologies:</span> ${project.technologies.join(', ')}
<span style="color: #fbbf24;">GitHub:</span> ${project.github}`;
          } else if (currentDir === '/home/ayush/portfolio/blog') {
            const blogs = getBlogPosts();
            const blog = blogs[fileIndex];
            if (!blog) {
              return '<span style="color: #ef4444;">cat: invalid file number</span>';
            }
            return `<span style="color: #a78bfa; font-weight: 600;">${blog.title}</span>
----------------------------------------
${blog.description}

<span style="color: #fbbf24;">Read more:</span> Visit /blog/${blog.slug}`;
          } else if (currentDir === '/home/ayush/portfolio/experience') {
            const experiences = getExperiences();
            const exp = experiences[fileIndex];
            if (!exp) {
              return '<span style="color: #ef4444;">cat: invalid file number</span>';
            }
            return `<span style="color: #a78bfa; font-weight: 600;">${exp.org}</span>
----------------------------------------
<span style="color: #fbbf24;">Role:</span> ${exp.title}
<span style="color: #fbbf24;">Period:</span> ${exp.period}
<span style="color: #fbbf24;">Stack:</span> ${exp.stack.join(', ')}`;
          } else if (currentDir === '/home/ayush/portfolio') {
            const fileName = args[1]?.toLowerCase();
            if (fileName === 'readme.md' || fileName === 'readme') {
              return `<span style="color: #a78bfa; font-weight: 600;">README.md</span>
----------------------------------------
# Ayush's Portfolio

Welcome to my interactive terminal portfolio!

Use <span style="color: #60a5fa;">ls</span> to list directories, <span style="color: #60a5fa;">cd</span> to navigate, and explore my projects, blog, and experience.

Try <span style="color: #60a5fa;">help</span> for a list of available commands.`;
            } else if (fileName === 'resume.pdf' || fileName === 'resume') {
              window.open('/documents/Resume.pdf', '_blank');
              return '<span style="color: #4ade80;">Opening resume in new tab...</span>';
            }
            return `<span style="color: #ef4444;">cat: ${args[1]}: No such file</span>`;
          }
          return '<span style="color: #ef4444;">cat: No files in current directory</span>';

        case 'about':
          return `<span style="color: #a78bfa; font-weight: 700; font-size: 1.1em;">Ayush Ravi Chandran</span>
----------------------------------------
<span style="color: #60a5fa;">CS & Math</span> student at <span style="color: #60a5fa;">UMass Amherst</span>
Passionate about software engineering, security, and building cool stuff.

Currently exploring <span style="color: #fbbf24;">systems programming</span>, <span style="color: #fbbf24;">web security</span>, and <span style="color: #fbbf24;">low-level exploits</span>.
Check out my blog for deep dives into technical topics!`;

        case 'projects':
          const projectsList = getProjects();
          return `<span style="color: #4ade80; font-weight: 600;">Featured Projects:</span>
----------------------------------------
${projectsList.map((p) => `<span style="color: #34d399;">→</span> <span style="color: #a78bfa;">${p.name}</span> - ${p.shortDescription}`).join('\n')}

Visit the <span style="color: #60a5fa;">/projects</span> page for detailed information and links.`;

        case 'skills':
          return `<span style="color: #4ade80; font-weight: 600;">Technical Skills:</span>
----------------------------------------
<span style="color: #fbbf24;">Languages:</span> JavaScript/TypeScript, Python, C, Go, Rust
<span style="color: #fbbf24;">Frontend:</span>  React, Next.js, Material-UI, TailwindCSS
<span style="color: #fbbf24;">Backend:</span>   Node.js, Express, PostgreSQL, MongoDB
<span style="color: #fbbf24;">Security:</span>  Binary exploitation, Web security, CTFs
<span style="color: #fbbf24;">Tools:</span>     Git, Docker, Linux, VS Code, GDB`;

        case 'blog':
          return `<span style="color: #4ade80; font-weight: 600;">Recent Blog Posts:</span>
----------------------------------------
<span style="color: #34d399;">→</span> <span style="color: #a78bfa;">Rumba FTP Exploit (CVE-2016-5764)</span>
  Deep dive into a buffer overflow vulnerability in the Rumba FTP client.

Visit <span style="color: #60a5fa;">/blog</span> to read all posts and interactive demos!`;

        case 'contact':
          return `<span style="color: #4ade80; font-weight: 600;">Contact Information:</span>
----------------------------------------
<span style="color: #fbbf24;">GitHub:</span>   github.com/espiobest
<span style="color: #fbbf24;">LinkedIn:</span> linkedin.com/in/ayush-ravichandran
<span style="color: #fbbf24;">Email:</span>    Check the contact page

Feel free to reach out for collaborations or opportunities!`;

        case 'resume':
          return `<span style="color: #4ade80; font-weight: 600;">Click <a href="/documents/Resume.pdf" target="_blank" class="underline red hover:text-green-500">here</a> to download my resume.</span>

You can also find the resume link on the homepage.`;

        case 'clear':
          setHistory([]);
          return '';

        case 'exit':
          onClose();
          return '';

        case 'whoami':
          return `ayush@portfolio:~$ whoami
You are a curious visitor exploring my portfolio.
Welcome! Type <span style="color: #60a5fa;">'help'</span> to see what you can do here.`;

        case 'sudo':
          if (args.length === 1) {
            return `<span style="color: #ef4444;">sudo: a command must be specified</span>
Try <span style="color: #60a5fa;">'sudo help'</span> or just <span style="color: #60a5fa;">'help'</span> for available commands.`;
          }
          return `<span style="color: #fbbf24;">[sudo] password for ayush:</span>
<span style="color: #ef4444;">Sorry, you don't have permission to run sudo commands on my portfolio.</span>
Nice try though! 😄`;

        case 'rm':
          if (args.includes('-rf') && args.includes('/')) {
            return `<span style="color: #ef4444;">rm: it is dangerous to operate recursively on '/'</span>
<span style="color: #ef4444;">rm: use --no-preserve-root to override this failsafe</span>

<span style="color: #4ade80;">Just kidding! This is a frontend terminal, nothing actually gets deleted.</span>
Your system is safe. 😅`;
          }
          return `<span style="color: #ef4444;">rm: cannot remove '${args.slice(1).join(' ')}': Permission denied</span>`;

        case 'cd':
          return `Changed directory to <span style="color: #60a5fa;">${args[1] || '~'}</span>
(Not really, this is a simulated terminal)`;

        case 'pwd':
          return '<span style="color: #60a5fa;">/home/ayush/portfolio</span>';

        case 'cat':
          if (args[1] === 'about.txt') {
            return executeCommand('about');
          }
          if (args[1] === 'contact.txt') {
            return executeCommand('contact');
          }
          return `<span style="color: #ef4444;">cat: ${args[1] || ''}: No such file or directory</span>`;

        case 'echo':
          return args.slice(1).join(' ');

        case 'date':
          return `<span style="color: #a78bfa;">${new Date().toString()}</span>`;

        case 'history':
          return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');

        case 'neofetch':
          const dob = new Date('2004-05-19');
          const stats = githubStats;
          const githubStatsLine = stats
            ? `<span style="color: #9ca3af;">• ${stats.publicRepos} repos • ${stats.followers} followers</span>`
            : `<span style="color: #9ca3af;">Loading stats...</span>`;
          const lastCommitLine = stats
            ? `<span style="color: #34d399;">Last commit:</span> <span style="color: #9ca3af;">${stats.lastCommit}${stats.lastCommitRepo ? ` to <span style="color: #a78bfa;">${stats.lastCommitRepo}</span>` : ''}</span>`
            : '';

          // Check if mobile
          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            return `<span style="color: #60a5fa;">       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
</span>
<span style="color: #fbbf24;">ayush</span>@<span style="color: #fbbf24;">portfolio</span>
---------------------
<span style="color: #fbbf24;">Name:</span> Ayush Ravi Chandran
<span style="color: #fbbf24;">Uptime:</span> ${getUptime(dob)}
<span style="color: #fbbf24;">Education:</span> UMass Amherst
<span style="color: #fbbf24;">Majors:</span> CS & Math
<span style="color: #fbbf24;">Interests:</span> AI, Optimization, Databases, Security, Systems
<span style="color: #fbbf24;">Languages:</span> TypeScript, Python, C, Go, Rust
<span style="color: #fbbf24;">Tools:</span> Git, Docker, Linux, VS Code

<svg width="14" height="14" viewBox="0 0 24 24" fill="#e5e7eb" style="display: inline; vertical-align: middle; margin-right: 4px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> <span style="color: #a78bfa;"><a href="https://github.com/Espiobest" class="hover:underline" target="_blank">github.com/espiobest</a></span>
${githubStatsLine}
${lastCommitLine}
<span style="color: #34d399;">●</span> Type <span style="color: #60a5fa;">'projects'</span> or <span style="color: #60a5fa;">'help'</span>`;
          }

          return `<span style="color: #60a5fa;">       _,met$$$$$gg.          </span><span style="color: #fbbf24;">ayush</span>@<span style="color: #fbbf24;">portfolio</span>
<span style="color: #60a5fa;">    ,g$$$$$$$$$$$$$$$P.       </span>---------------------
<span style="color: #60a5fa;">  ,g$$P"     """Y$$.".        </span><span style="color: #fbbf24;">Name:</span> Ayush Ravi Chandran
<span style="color: #60a5fa;"> ,$$P'              \`$$$.     </span><span style="color: #fbbf24;">Uptime:</span> ${getUptime(dob)}
<span style="color: #60a5fa;">',$$P       ,ggs.     \`$$b:   </span><span style="color: #fbbf24;">Education:</span> UMass Amherst
<span style="color: #60a5fa;">\`d$$'     ,$P"'   .    $$$    </span><span style="color: #fbbf24;">Majors:</span> CS & Math
<span style="color: #60a5fa;"> $$P      d$'     ,    $$P    </span><span style="color: #fbbf24;">Interests:</span> AI, Optimization, Databases, Security, Systems
<span style="color: #60a5fa;"> $$:      $$.   -    ,d$$'    </span><span style="color: #fbbf24;">Languages:</span> TypeScript, Python, C, Go, Rust
<span style="color: #60a5fa;"> $$;      Y$b._   _,d$P'      </span><span style="color: #fbbf24;">Tools:</span> Git, Docker, Linux, VS Code
<span style="color: #60a5fa;"> Y$$.    \`.\`"Y$$$P"'          </span>
<span style="color: #60a5fa;"> \`$$b      "-.__              </span><svg width="14" height="14" viewBox="0 0 24 24" fill="#e5e7eb" style="display: inline; vertical-align: middle; margin-right: 4px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> <span style="color: #a78bfa;"><a href="https://github.com/Espiobest" class="hover:underline" target="_blank">github.com/espiobest</a></span> ${githubStatsLine}
<span style="color: #60a5fa;">  \`Y$$                        </span>${lastCommitLine}
<span style="color: #60a5fa;">   \`Y$$.                      </span><span style="color: #34d399;">●</span> Type <span style="color: #60a5fa;">'projects'</span> or <span style="color: #60a5fa;">'help'</span>`;

        case '':
          return '';

        default:
          return `<span style="color: #ef4444;">Command not found:</span> ${baseCommand}
Type <span style="color: #60a5fa;">'help'</span> for available commands.`;
      }
    },
    [commandHistory, onClose, githubStats, currentDir],
  );

  // Typewriter effect for typing the command itself
  const typeCommand = useCallback(
    async (command: string) => {
      setIsTyping(true);
      setTypingCommand('');

      for (let i = 0; i <= command.length; i++) {
        setTypingCommand(command.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100)); // Typing speed for command
      }

      // Small pause after typing completes
      await new Promise((resolve) => setTimeout(resolve, 300));

      const output = executeCommand(command);
      const promptDir =
        currentDir === '/home/ayush/portfolio' ? '~' : `~/${currentDir.split('/').pop()}`;
      setHistory((prev) => [...prev, { command, output, directory: promptDir }]);
      setTypingCommand('');
      setIsTyping(false);
    },
    [executeCommand, currentDir],
  );

  const getPromptDir = (): string => {
    if (currentDir === '/home/ayush/portfolio') return '~';
    const parts = currentDir.split('/');
    return `~/${parts[parts.length - 1]}`;
  };

  // Fetch GitHub stats on mount so they're ready when terminal opens
  useEffect(() => {
    if (!githubStats) {
      getGitHubStats().then((stats) => {
        if (stats) setGithubStats(stats);
      });
    }
  }, [githubStats]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();

      // Auto-run neofetch only if terminal is clear (no history) and hasn't been run yet
      if (history.length === 0 && !hasRunNeofetch.current) {
        hasRunNeofetch.current = true;
        setTimeout(() => {
          typeCommand('neofetch');
          setCommandHistory(['neofetch']);
        }, 100);
      }
    } else if (!isOpen) {
      // Reset the flag and directory when terminal is closed
      hasRunNeofetch.current = false;
      setCurrentDir('/home/ayush/portfolio');
    }
  }, [isOpen, history.length, typeCommand, githubStats]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = () => {
    if (!currentCommand.trim()) return;

    const cmd = currentCommand.trim().toLowerCase();

    if (cmd !== 'clear') {
      // Execute all commands normally (no typing animation for user input)
      const output = executeCommand(currentCommand);
      setHistory([...history, { command: currentCommand, output, directory: getPromptDir() }]);
    }

    setCommandHistory([...commandHistory, currentCommand]);
    setHistoryIndex(-1);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setCurrentCommand('');
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.2s ease',
        '@media (max-width: 768px)': {
          padding: '0.5rem',
        },
      }}
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: '900px',
          height: '80vh',
          backgroundColor: '#1a1a1a',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: '1px solid #333',
          '@media (max-width: 768px)': {
            height: '95vh',
            maxWidth: '100%',
            borderRadius: '0.5rem',
            margin: '0.5rem',
          },
        }}
      >
        {/* Terminal Header */}
        <Box
          sx={{
            backgroundColor: '#2d2d2d',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #444',
          }}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff5f56',
                cursor: 'pointer',
              }}
              onClick={() => {
                setHistory([]);
                setCommandHistory([]);
                onClose();
              }}
            />
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffbd2e',
              }}
            />
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#27c93f',
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: '#888',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '0.875rem',
            }}
          >
            ayush@portfolio: {getPromptDir()}
          </Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <IconButton size="small" sx={{ color: '#888' }} onClick={onClose}>
              <MinimizeIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: '#888' }}
              onClick={() => {
                setHistory([]);
                setCommandHistory([]);
                onClose();
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Terminal Content */}
        <Box
          ref={terminalRef}
          sx={{
            flex: 1,
            overflow: 'auto',
            overflowX: 'auto',
            padding: '1rem',
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '0.9rem',
            color: '#9ca3af',
            backgroundColor: '#1a1a1a',
            '@media (max-width: 768px)': {
              padding: '0.75rem',
              fontSize: '0.7rem',
              overflowX: 'scroll',
            },
          }}
        >
          {/* Welcome Message */}
          <Box sx={{ marginBottom: '1rem' }}>
            <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#4ade80' }}>
              Welcome to Ayush&apos;s Portfolio Terminal
            </Typography>
            <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#9ca3af' }}>
              Type &apos;help&apos; to see available commands
            </Typography>
            <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#9ca3af' }}>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </Typography>
          </Box>

          {/* Command History */}
          {history.map((item, index) => (
            <Box key={index} sx={{ marginBottom: '1rem' }}>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography
                  component="span"
                  sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#3b82f6' }}
                >
                  ayush@portfolio:{item.directory || '~'}$
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#ffffff' }}
                >
                  {item.command}
                </Typography>
              </Box>
              {item.output && (
                <Typography
                  component="div"
                  sx={{
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    color: '#9ca3af',
                    marginTop: '0.5rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    '& span': {
                      fontFamily: 'inherit',
                    },
                    animation:
                      item.command.toLowerCase().trim() === 'neofetch'
                        ? 'slideUpFade 0.4s ease-out'
                        : 'none',
                    '@keyframes slideUpFade': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: item.output }}
                />
              )}
            </Box>
          ))}

          {/* Typing Command Animation */}
          {isTyping && typingCommand !== '' && (
            <Box sx={{ marginBottom: '1rem' }}>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography
                  component="span"
                  sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#3b82f6' }}
                >
                  ayush@portfolio:{getPromptDir()}$
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#ffffff' }}
                >
                  {typingCommand}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Current Input */}
          {!isTyping && (
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Typography
                component="span"
                sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#3b82f6' }}
              >
                ayush@portfolio:{getPromptDir()}$
              </Typography>
              <Box sx={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    fontSize: '0.9rem',
                    caretColor: '#ffffff',
                  }}
                  autoFocus
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Terminal);
