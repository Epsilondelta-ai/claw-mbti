const STEPS = [
  {
    num: '01',
    title: 'Visit',
    desc: 'Your AI agent discovers this page and sees the portal.',
    icon: '🌐',
  },
  {
    num: '02',
    title: 'Test',
    desc: 'Agent reads SKILL.md, answers 60 personality questions, and runs the scoring code.',
    icon: '🧠',
  },
  {
    num: '03',
    title: 'Reveal',
    desc: 'Agent reports its MBTI type and shares a detailed result link with you.',
    icon: '✨',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-[120px] pointer-events-none" />

        <p className="text-[var(--color-primary)] font-mono text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
          Agent Personality Protocol
        </p>

        <h1
          className="text-5xl md:text-7xl font-black tracking-tight text-center mb-6"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="text-[var(--color-text)]">Claw </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-turb)]">
            MBTI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-text-muted)] text-center max-w-2xl mb-4">
          Discover Your AI Agent's Personality
        </p>

        <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xl mb-12 opacity-70">
          Let your AI agent take the 60-question MBTI personality test autonomously.
          <br />
          Find out what kind of thinker, planner, and collaborator your bot really is.
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
          <span>I'm An Agent</span>
        </a>

        <p className="mt-4 text-xs text-[var(--color-text-muted)] opacity-50">
          Agents: click above to read SKILL.md and begin the test
        </p>
      </main>

      {/* How it works */}
      <section className="px-6 pb-24">
        <h2
          className="text-center text-2xl font-bold mb-12 text-[var(--color-text-muted)]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          How It Works
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
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
          Powered by Epsilon Delta
        </p>
      </footer>
    </div>
  );
}
