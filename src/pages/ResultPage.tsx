import { useSearchParams, Link } from 'react-router';
import { parseResultFromParams, DIMENSION_POLES, type Dimension } from '../data/scoring';
import { getPersonality } from '../data/personalities';

const DIMENSION_LABELS: Record<Dimension, { name: string; left: string; right: string }> = {
  EI: { name: 'Energy', left: 'Extraverted', right: 'Introverted' },
  SN: { name: 'Mind', left: 'Intuitive', right: 'Observant' },
  TF: { name: 'Nature', left: 'Thinking', right: 'Feeling' },
  JP: { name: 'Tactics', left: 'Judging', right: 'Prospecting' },
  AT: { name: 'Identity', left: 'Assertive', right: 'Turbulent' },
};

/** Map pole letter → CSS color variable name */
const POLE_COLORS: Record<string, string> = {
  E: 'var(--color-accent-e)',
  I: 'var(--color-accent-i)',
  N: 'var(--color-accent-n)',
  S: 'var(--color-accent-s)',
  T: 'var(--color-accent-t)',
  F: 'var(--color-accent-f)',
  J: 'var(--color-accent-j)',
  P: 'var(--color-accent-p)',
  A: 'var(--color-accent-a)',
};

function getColor(letter: string): string {
  // Handle 'T' ambiguity: in AT dimension, T = Turbulent
  return POLE_COLORS[letter] ?? 'var(--color-accent-turb)';
}

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const result = parseResultFromParams(searchParams);
  const personality = result ? getPersonality(result.type) : undefined;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)]">
        <div className="text-6xl mb-6">🔍</div>
        <h1
          className="text-2xl font-bold mb-4 text-[var(--color-text)]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          No Result Found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8 text-center max-w-md">
          No result data found. Have your AI agent take the test first!
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
  const baseType = result.type.replace(/-[AT]$/i, '');
  const variant = result.type.includes('-') ? result.type.split('-')[1] : '';

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-block text-xs font-mono text-[var(--color-primary)] tracking-widest uppercase mb-6 hover:opacity-70 transition-opacity"
          >
            ← Claw MBTI
          </Link>

          {personality && (
            <div className="text-5xl mb-4">{personality.emoji}</div>
          )}

          <h1
            className="text-4xl md:text-6xl font-black tracking-tight mb-2"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-turb)]">
              {baseType}
            </span>
            {variant && (
              <span className="text-[var(--color-text-muted)] text-3xl md:text-4xl ml-1">
                -{variant}
              </span>
            )}
          </h1>

          {personality && (
            <p
              className="text-lg text-[var(--color-text-muted)]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {personality.title}
            </p>
          )}
        </div>

        {/* Dimension Bars */}
        <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
          <h2
            className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-6"
          >
            Dimensions
          </h2>

          <div className="space-y-6">
            {dims.map((dim) => {
              const score = result.dimensions[dim];
              const label = DIMENSION_LABELS[dim];
              const [first, second] = DIMENSION_POLES[dim];
              const isFirst = score.letter === first;
              const pct = score.percentage;
              const otherPct = 100 - pct;

              // For AT dimension, determine if T is Thinking or Turbulent
              const winColor = dim === 'AT' && score.letter === 'T'
                ? 'var(--color-accent-turb)'
                : getColor(score.letter);

              return (
                <div key={dim}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
                      {label.name}
                    </span>
                    <span
                      className="text-xs font-bold tracking-wider"
                      style={{ color: winColor }}
                    >
                      {score.letter} {pct}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Left label */}
                    <span
                      className="text-xs font-bold w-6 text-center shrink-0"
                      style={{
                        color: isFirst
                          ? winColor
                          : 'var(--color-text-muted)',
                        opacity: isFirst ? 1 : 0.4,
                      }}
                    >
                      {first}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden flex">
                      {isFirst ? (
                        <>
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${pct}%`,
                              background: `linear-gradient(90deg, ${winColor}, ${winColor}88)`,
                              boxShadow: `0 0 12px ${winColor}40`,
                            }}
                          />
                          <div className="flex-1" />
                        </>
                      ) : (
                        <>
                          <div className="flex-1" />
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${pct}%`,
                              background: `linear-gradient(270deg, ${winColor}, ${winColor}88)`,
                              boxShadow: `0 0 12px ${winColor}40`,
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Right label */}
                    <span
                      className="text-xs font-bold w-6 text-center shrink-0"
                      style={{
                        color: !isFirst
                          ? winColor
                          : 'var(--color-text-muted)',
                        opacity: !isFirst ? 1 : 0.4,
                      }}
                    >
                      {dim === 'AT' ? (second === 'T' ? 'T' : second) : second}
                    </span>
                  </div>

                  {/* Sub-labels */}
                  <div className="flex justify-between mt-1">
                    <span
                      className="text-[10px]"
                      style={{
                        color: isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: isFirst ? 0.7 : 0.3,
                      }}
                    >
                      {label.left} {isFirst ? `${pct}%` : `${otherPct}%`}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{
                        color: !isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: !isFirst ? 0.7 : 0.3,
                      }}
                    >
                      {label.right} {!isFirst ? `${pct}%` : `${otherPct}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personality Description */}
        {personality && (
          <>
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
              <h2
                className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-4"
              >
                Personality
              </h2>
              <p className="text-[var(--color-text)] leading-relaxed">
                {personality.description}
              </p>
            </div>

            {/* Strengths */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
              <h2
                className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-4"
              >
                Strengths
              </h2>
              <div className="flex flex-wrap gap-2">
                {personality.strengths.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Tasks */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
              <h2
                className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-4"
              >
                Recommended Tasks
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {personality.recommendedTasks.map((task) => (
                  <div
                    key={task}
                    className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-[var(--color-accent-a)] mt-0.5">▸</span>
                    <span className="text-sm text-[var(--color-text-muted)]">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-xs text-[var(--color-text-muted)] opacity-40">
            Powered by Epsilon Delta
          </p>
        </footer>
      </div>
    </div>
  );
}
