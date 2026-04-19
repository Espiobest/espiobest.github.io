'use client';

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent, memo } from 'react';
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
          return `<span style="color:#86efac;font-weight:600">Available commands:</span>
  <span style="color:#93c5fd">help</span>           — Show this message
  <span style="color:#93c5fd">about</span>          — Learn about me
  <span style="color:#93c5fd">projects</span>       — List all projects
  <span style="color:#93c5fd">skills</span>         — Technical skills
  <span style="color:#93c5fd">blog</span>           — Recent blog posts
  <span style="color:#93c5fd">contact</span>        — Contact info
  <span style="color:#93c5fd">resume</span>         — Download resume
  <span style="color:#93c5fd">neofetch</span>       — System info
  <span style="color:#93c5fd">clear</span>          — Clear terminal
  <span style="color:#93c5fd">exit</span>           — Close terminal
  <span style="color:#93c5fd">ls / cd / cat</span>  — File navigation`;

        case 'pwd':
          return currentDir;

        case 'ls':
          if (currentDir === '/home/ayush/portfolio') {
            return `<span style="color:#93c5fd">projects/</span>  <span style="color:#93c5fd">blog/</span>  <span style="color:#93c5fd">experience/</span>  resume.pdf  README.md`;
          } else if (currentDir === '/home/ayush/portfolio/projects') {
            const projects = getProjects();
            return `<span style="color:#86efac;font-weight:600">Projects:</span>\n${projects.map((p, i) => `  ${i + 1}. <span style="color:#a78bfa">${p.name}</span> — ${p.shortDescription}`).join('\n')}`;
          } else if (currentDir === '/home/ayush/portfolio/blog') {
            const blogs = getBlogPosts();
            return `<span style="color:#86efac;font-weight:600">Posts:</span>\n${blogs.map((b, i) => `  ${i + 1}. <span style="color:#a78bfa">${b.title}</span>`).join('\n')}`;
          } else if (currentDir === '/home/ayush/portfolio/experience') {
            const experiences = getExperiences();
            return `<span style="color:#86efac;font-weight:600">Experience:</span>\n${experiences.map((e, i) => `  ${i + 1}. <span style="color:#a78bfa">${e.org}</span> — ${e.title}`).join('\n')}`;
          }
          return '';

        case 'cd': {
          const target = args[1];
          if (!target) return '<span style="color:#f87171">cd: missing operand</span>';
          if (target === '..' || target === '~') {
            setCurrentDir('/home/ayush/portfolio');
            return '';
          }
          if (currentDir === '/home/ayush/portfolio') {
            if (['projects', 'blog', 'experience'].includes(target)) {
              setCurrentDir(`/home/ayush/portfolio/${target}`);
              return '';
            }
          }
          return `<span style="color:#f87171">cd: ${target}: No such file or directory</span>`;
        }

        case 'cat': {
          const fileArg = args[1];
          if (!fileArg) return '<span style="color:#f87171">cat: missing operand</span>';
          const fileIndex = parseInt(fileArg) - 1;

          if (currentDir === '/home/ayush/portfolio/projects') {
            const p = getProjects()[fileIndex];
            if (!p) return '<span style="color:#f87171">cat: invalid file number</span>';
            return `<span style="color:#a78bfa;font-weight:600">${p.name}</span>\n${'─'.repeat(40)}\n${p.description}\n\n<span style="color:var(--accent)">Stack:</span> ${p.technologies.join(', ')}\n<span style="color:var(--accent)">GitHub:</span> ${p.github}`;
          }
          if (currentDir === '/home/ayush/portfolio/blog') {
            const b = getBlogPosts()[fileIndex];
            if (!b) return '<span style="color:#f87171">cat: invalid file number</span>';
            return `<span style="color:#a78bfa;font-weight:600">${b.title}</span>\n${'─'.repeat(40)}\n${b.description}\n\n<span style="color:var(--accent)">Read at:</span> /blog/${b.slug}`;
          }
          if (currentDir === '/home/ayush/portfolio/experience') {
            const e = getExperiences()[fileIndex];
            if (!e) return '<span style="color:#f87171">cat: invalid file number</span>';
            return `<span style="color:#a78bfa;font-weight:600">${e.org}</span>\n${'─'.repeat(40)}\n<span style="color:var(--accent)">Role:</span> ${e.title}\n<span style="color:var(--accent)">Period:</span> ${e.period}\n<span style="color:var(--accent)">Stack:</span> ${e.stack.join(', ')}`;
          }
          if (currentDir === '/home/ayush/portfolio') {
            if (fileArg.toLowerCase() === 'readme.md') {
              return `<span style="color:#a78bfa;font-weight:600">README.md</span>\n${'─'.repeat(40)}\n# Ayush's Portfolio\n\nWelcome to my interactive terminal.\nUse <span style="color:#93c5fd">ls</span> to browse, <span style="color:#93c5fd">cd</span> to navigate, <span style="color:#93c5fd">help</span> for commands.`;
            }
            if (fileArg === 'resume.pdf') {
              window.open('/documents/Resume.pdf', '_blank');
              return '<span style="color:#86efac">Opening resume...</span>';
            }
          }
          return `<span style="color:#f87171">cat: ${fileArg}: No such file</span>`;
        }

        case 'about':
          return `<span style="color:#a78bfa;font-weight:700">Ayush Ravi Chandran</span>
${'─'.repeat(40)}
<span style="color:#93c5fd">CS & Math</span> @ UMass Amherst
Building software, doing research, writing occasionally.

Interested in <span style="color:var(--accent)">systems</span>, <span style="color:var(--accent)">ML</span>, <span style="color:var(--accent)">databases</span>, and <span style="color:var(--accent)">security</span>.`;

        case 'projects': {
          const list = getProjects();
          return `<span style="color:#86efac;font-weight:600">Projects:</span>\n${'─'.repeat(40)}\n${list.map((p) => `<span style="color:#86efac">→</span> <span style="color:#a78bfa">${p.name}</span> — ${p.shortDescription}`).join('\n')}`;
        }

        case 'skills':
          return `<span style="color:#86efac;font-weight:600">Skills:</span>
${'─'.repeat(40)}
<span style="color:var(--accent)">Languages:</span>  TypeScript, Python, C, Go, Rust
<span style="color:var(--accent)">Frontend:</span>   React, Next.js, Tailwind
<span style="color:var(--accent)">Backend:</span>    Node.js, PostgreSQL, Docker
<span style="color:var(--accent)">ML/Data:</span>    PyTorch, NumPy, SLURM, HPC
<span style="color:var(--accent)">Security:</span>   Binary exploitation, CTFs`;

        case 'blog':
          return `<span style="color:#86efac;font-weight:600">Writing:</span>
${'─'.repeat(40)}
<span style="color:#86efac">→</span> <span style="color:#a78bfa">Rumba FTP Exploit (CVE-2016-5764)</span>
  Buffer overflow deep dive

Visit <span style="color:#93c5fd">/#writing</span> or <span style="color:#93c5fd">/blog</span>`;

        case 'contact':
          return `<span style="color:#86efac;font-weight:600">Contact:</span>
${'─'.repeat(40)}
<span style="color:var(--accent)">GitHub:</span>   github.com/espiobest
<span style="color:var(--accent)">LinkedIn:</span> linkedin.com/in/ayush-ravichandran`;

        case 'resume':
          window.open('/documents/Resume.pdf', '_blank');
          return '<span style="color:#86efac">Opening resume in new tab...</span>';

        case 'clear':
          setHistory([]);
          return '';

        case 'exit':
          onClose();
          return '';

        case 'whoami':
          return 'ayush — curious builder, occasional writer.';

        case 'sudo':
          return `<span style="color:var(--accent)">[sudo] password for ayush:</span>\n<span style="color:#f87171">Permission denied. Nice try.</span>`;

        case 'rm':
          if (args.includes('-rf') && args.includes('/')) {
            return `<span style="color:#f87171">rm: dangerous operation blocked.</span>\n<span style="color:#86efac">Just kidding — this is a frontend terminal. Nothing actually deletes.</span>`;
          }
          return `<span style="color:#f87171">rm: ${args.slice(1).join(' ')}: Permission denied</span>`;

        case 'echo':
          return args.slice(1).join(' ');

        case 'date':
          return `<span style="color:#a78bfa">${new Date().toString()}</span>`;

        case 'history':
          return commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');

        case 'neofetch': {
          const dob = new Date('2004-05-19');
          const stats = githubStats;
          const statsLine = stats
            ? `<span style="color:#6b7280">${stats.publicRepos} repos · ${stats.followers} followers</span>`
            : `<span style="color:#6b7280">loading stats...</span>`;
          const commitLine = stats
            ? `<span style="color:#86efac">Last commit:</span> <span style="color:#6b7280">${stats.lastCommit}${stats.lastCommitRepo ? ` to <span style="color:#a78bfa">${stats.lastCommitRepo}</span>` : ''}</span>`
            : '';
          const isMobile = window.innerWidth < 768;

          const info = `<span style="color:var(--accent)">ayush</span>@<span style="color:var(--accent)">portfolio</span>
${'─'.repeat(22)}
<span style="color:var(--accent)">Name:</span>      Ayush Ravi Chandran
<span style="color:var(--accent)">Uptime:</span>    ${getUptime(dob)}
<span style="color:var(--accent)">School:</span>    UMass Amherst
<span style="color:var(--accent)">Majors:</span>    CS & Math
<span style="color:var(--accent)">Interests:</span> AI · Systems · Databases · Security
<span style="color:var(--accent)">Languages:</span> TypeScript, Python, C, Go, Rust
<span style="color:var(--accent)">GitHub:</span>    <a href="https://github.com/Espiobest" target="_blank" style="color:#a78bfa;text-decoration:underline">github.com/espiobest</a>
${statsLine}
${commitLine}`;

          if (isMobile) return info;

          return `<span style="color:#93c5fd">       _,met$$$$$gg.          </span>${info.split('\n')[0]}
<span style="color:#93c5fd">    ,g$$$$$$$$$$$$$$$P.       </span>${info.split('\n')[1]}
<span style="color:#93c5fd">  ,g$$P"     """Y$$.".        </span>${info.split('\n')[2]}
<span style="color:#93c5fd"> ,$$P'              \`$$$.     </span>${info.split('\n')[3]}
<span style="color:#93c5fd">',$$P       ,ggs.     \`$$b:   </span>${info.split('\n')[4]}
<span style="color:#93c5fd">\`d$$'     ,$P"'   .    $$$    </span>${info.split('\n')[5]}
<span style="color:#93c5fd"> $$P      d$'     ,    $$P    </span>${info.split('\n')[6]}
<span style="color:#93c5fd"> $$:      $$.   -    ,d$$'    </span>${info.split('\n')[7]}
<span style="color:#93c5fd"> $$;      Y$b._   _,d$P'      </span>${info.split('\n')[8]}
<span style="color:#93c5fd"> Y$$.    \`.\`"Y$$$P"'          </span>${info.split('\n')[9]}
<span style="color:#93c5fd"> \`$$b      "-.__              </span>${info.split('\n')[10]}
<span style="color:#93c5fd">  \`Y$$                        </span>${info.split('\n')[11] ?? ''}
<span style="color:#93c5fd">   \`Y$$.                      </span>`;
        }

        case '':
          return '';

        default:
          return `<span style="color:#f87171">command not found:</span> ${baseCommand} — try <span style="color:#93c5fd">help</span>`;
      }
    },
    [commandHistory, onClose, githubStats, currentDir],
  );

  const typeCommand = useCallback(
    async (command: string) => {
      setIsTyping(true);
      setTypingCommand('');
      for (let i = 0; i <= command.length; i++) {
        setTypingCommand(command.slice(0, i));
        await new Promise((r) => setTimeout(r, 80));
      }
      await new Promise((r) => setTimeout(r, 200));
      const output = executeCommand(command);
      const dir = currentDir === '/home/ayush/portfolio' ? '~' : `~/${currentDir.split('/').pop()}`;
      setHistory((prev) => [...prev, { command, output, directory: dir }]);
      setTypingCommand('');
      setIsTyping(false);
    },
    [executeCommand, currentDir],
  );

  const getPromptDir = () =>
    currentDir === '/home/ayush/portfolio' ? '~' : `~/${currentDir.split('/').pop()}`;

  useEffect(() => {
    if (!githubStats) getGitHubStats().then((s) => s && setGithubStats(s));
  }, [githubStats]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      if (history.length === 0 && !hasRunNeofetch.current) {
        hasRunNeofetch.current = true;
        setTimeout(() => {
          typeCommand('neofetch');
          setCommandHistory(['neofetch']);
        }, 100);
      }
    } else if (!isOpen) {
      hasRunNeofetch.current = false;
      setCurrentDir('/home/ayush/portfolio');
    }
  }, [isOpen, history.length, typeCommand]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  const handleCommand = () => {
    if (!currentCommand.trim()) return;
    if (currentCommand.trim().toLowerCase() !== 'clear') {
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
        const idx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(idx);
        setCurrentCommand(commandHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const idx = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (idx === commandHistory.length - 1 && historyIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(idx);
          setCurrentCommand(commandHistory[idx]);
        }
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setCurrentCommand('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[80vh] md:h-[75vh] flex flex-col rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl"
        style={{ background: '#0e0e0e' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)]"
          style={{ background: '#141414' }}
        >
          <div className="flex items-center gap-1.5">
            <button
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity"
              onClick={() => { setHistory([]); setCommandHistory([]); onClose(); }}
              aria-label="Close"
            />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="mono text-xs text-[var(--text-muted)]">
            ayush@portfolio: {getPromptDir()}
          </span>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            aria-label="Close terminal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Output area */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 mono text-sm text-[#9ca3af] leading-relaxed"
          style={{ fontSize: '0.82rem' }}
          onClick={() => inputRef.current?.focus()}
        >
          <p className="text-[#86efac] mb-0.5">Welcome to Ayush&apos;s terminal</p>
          <p className="text-[var(--text-muted)] mb-4">Type &apos;help&apos; for available commands</p>

          {history.map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex gap-2">
                <span className="text-[#93c5fd] shrink-0">
                  ayush@portfolio:{item.directory ?? '~'}$
                </span>
                <span className="text-white">{item.command}</span>
              </div>
              {item.output && (
                <div
                  className="mt-1 whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: item.output }}
                />
              )}
            </div>
          ))}

          {isTyping && typingCommand !== '' && (
            <div className="mb-3 flex gap-2">
              <span className="text-[#93c5fd] shrink-0">
                ayush@portfolio:{getPromptDir()}$
              </span>
              <span className="text-white">{typingCommand}</span>
            </div>
          )}

          {!isTyping && (
            <div className="flex gap-2 items-center">
              <span className="text-[#93c5fd] shrink-0">
                ayush@portfolio:{getPromptDir()}$
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white mono"
                  style={{ fontSize: 'inherit', caretColor: 'var(--accent)' }}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Terminal);
