'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isLoading) return;

    const lastSubmit = localStorage.getItem('lastContactSubmit');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 180_000) {
      setStatus({ message: 'Please wait a few minutes before sending another message.', isError: true });
      return;
    }

    const template = {
      name: (formRef.current.elements.namedItem('name') as HTMLInputElement).value,
      email: (formRef.current.elements.namedItem('email') as HTMLInputElement).value,
      message: (formRef.current.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    setIsLoading(true);
    setStatus({ message: 'Sending...', isError: false });

    emailjs.send('service_tgyqckj', 'template_cqxleva', template, 'WCSPkyN9UqtcCZauc').then(
      () => {
        setStatus({ message: "Sent. I'll get back to you soon.", isError: false });
        setIsLoading(false);
        localStorage.setItem('lastContactSubmit', Date.now().toString());
        formRef.current?.reset();
      },
      () => {
        setStatus({ message: 'Failed to send. Try emailing me directly.', isError: true });
        setIsLoading(false);
      },
    );
  };

  const inputClass =
    'w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors resize-none';

  return (
    <section id="contact" className="section border-t border-[var(--border)]">
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-title">contact</p>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-light text-[var(--text)] mb-4">Let&apos;s connect.</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
              Whether it&apos;s a job opportunity, collaboration, or just a question — I&apos;m open to it.
            </p>
            <div className="space-y-4">
              {[
                { label: 'GitHub', href: 'https://github.com/Espiobest', display: 'Espiobest' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/ayush-ravichandran', display: 'ayush-ravichandran' },
              ].map((link) => (
                <div key={link.label} className="flex items-center gap-4">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest w-16 shrink-0">{link.label}</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.display} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <input className={inputClass} type="text" name="name" placeholder="Name" required />
            <input className={inputClass} type="email" name="email" placeholder="Email" required />
            <textarea className={inputClass} name="message" placeholder="Message" rows={5} required />
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--text)] hover:border-[var(--border-hover)] transition-all disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send message'}
              </button>
              {status && (
                <p className={`text-sm ${status.isError ? 'text-red-400' : 'text-[#86efac]'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <span>Ayush Ravi Chandran</span>
          <span>Built with Next.js + Tailwind</span>
        </div>
      </div>
    </section>
  );
}
