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
