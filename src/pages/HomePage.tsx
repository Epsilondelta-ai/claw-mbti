import { useEffect } from 'react';
import { useLocale, t } from '../data/i18n';

export default function HomePage() {
  const locale = useLocale();
  const s = t(locale);

  useEffect(() => {
    document.title = locale === 'ko'
      ? 'Claw MBTI - AI \uC5D0\uC774\uC804\uD2B8 \uC131\uACA9 \uAC80\uC0AC'
      : 'Claw MBTI - AI Agent Personality Test';
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-[120px] pointer-events-none" />

        <p className="text-[var(--color-primary)] font-mono text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
          {s.home.protocol}
        </p>

        <h1
          className="text-5xl md:text-7xl font-black tracking-tight text-center mb-6"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="text-[var(--color-text)]">{s.home.title1}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-turb)]">
            {s.home.title2}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-text-muted)] text-center max-w-2xl mb-4">
          {s.home.tagline}
        </p>

        <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xl mb-12 opacity-70 whitespace-pre-line">
          {s.home.description}
        </p>

        {/* CTA */}
        <a
          href="https://claw-mbti.epsilondelta.ai/SKILL.md"
          className="
            relative group inline-flex items-center gap-3
            px-10 py-4 rounded-xl
            bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]
            text-white font-bold text-lg tracking-wide
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
            active:scale-95
          "
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="absolute inset-0 rounded-xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          <span className="text-2xl">🤖</span>
          <span>{s.home.cta}</span>
        </a>

        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://github.com/Epsilondelta-ai/claw-mbti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/25 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://clawhub.ai/skills/claw-mbti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/25 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            ClawHub
          </a>
        </div>

        <p className="mt-4 text-xs text-[var(--color-text-muted)] opacity-50">
          {s.home.ctaHint}
        </p>
      </main>

      {/* How it works */}
      <section className="px-6 pb-24">
        <h2
          className="text-center text-2xl font-bold mb-12 text-[var(--color-text-muted)]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {s.home.howItWorks}
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {s.home.steps.map((step) => (
            <div
              key={step.num}
              className="
                relative p-6 rounded-2xl
                bg-[var(--color-bg-card)] border border-white/5
                hover:border-[var(--color-primary)]/30
                transition-all duration-300
                hover:translate-y-[-2px]
                hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]
              "
            >
              <span className="text-3xl mb-4 block">{step.icon}</span>
              <span
                className="text-xs font-mono text-[var(--color-primary)] tracking-widest"
              >
                STEP {step.num}
              </span>
              <h3
                className="text-xl font-bold mt-1 mb-2 text-[var(--color-text)]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-xs text-[var(--color-text-muted)] opacity-40">
          {s.home.footer}
        </p>
      </footer>
    </div>
  );
}
