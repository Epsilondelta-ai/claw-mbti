import { useEffect, useState } from 'react';
import { useSearchParams, useParams, Link, Navigate } from 'react-router';
import { parseResultFromParams, DIMENSION_POLES, type Dimension } from '../data/scoring';
import { getPersonality } from '../data/personalities';
import { resolveLocale, t, seoMeta } from '../data/i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

function getMbtiImageUrl(type: string): string {
  return `/images/mbti/${type.toUpperCase()}.jpeg`;
}

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
  return POLE_COLORS[letter] ?? 'var(--color-accent-turb)';
}

export default function ResultPage() {
  const { lang, type: pathType } = useParams<{ lang: string; type: string }>();
  const locale = resolveLocale(lang);
  const s = t(locale);
  const [searchParams] = useSearchParams();
  const result = parseResultFromParams(searchParams, pathType);
  const personality = result ? getPersonality(result.type) : undefined;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const meta = seoMeta[locale];
    const base = locale === 'ko' ? 'Claw MBTI 결과' : 'Claw MBTI Result';
    document.title = result
      ? `${result.type.toUpperCase()} - ${base}`
      : base;
    document.documentElement.lang = locale;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      const desc = result && personality
        ? `${result.type.toUpperCase()} - ${personality.title[locale]}. ${personality.description[locale]}`
        : meta.description;
      descMeta.setAttribute('content', desc);
    }

    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      const extra = result ? `, ${result.type.toUpperCase()}, ${result.type.toUpperCase()} personality` : '';
      keywordsMeta.setAttribute('content', meta.keywords + extra);
    }
  }, [locale, result, personality]);

  // Redirect /:lang/result?type=xxx → /:lang/result/xxx?remaining
  const queryType = searchParams.get('type');
  if (!pathType && queryType) {
    const remaining = new URLSearchParams(searchParams);
    remaining.delete('type');
    const search = remaining.toString();
    const prefix = lang ? `/${lang}` : '';
    return <Navigate to={`${prefix}/result/${queryType.toLowerCase()}${search ? `?${search}` : ''}`} replace />;
  }

  function buildShareUrl(): string {
    if (!result) return '';
    const params = new URLSearchParams();
    for (const dim of ['EI', 'SN', 'TF', 'JP', 'AT'] as Dimension[]) {
      const score = result.dimensions[dim];
      const signedPct = score.rawScore >= 0 ? score.percentage : -score.percentage;
      params.set(dim.toLowerCase(), String(signedPct));
    }
    const langPrefix = `/${locale}`;
    return `https://claw-mbti.epsilondelta.ai${langPrefix}/result/${result.type.toLowerCase()}?${params}`;
  }

  function handleShare() {
    if (!result || !personality) return;
    const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
    const dimNames = s.dims;
    const lines = dims.map((dim) => {
      const score = result.dimensions[dim];
      const label = dimNames[dim];
      return `${label.name}: ${score.letter === DIMENSION_POLES[dim][0] ? label.left : label.right} ${score.percentage}%`;
    });
    const title = personality.title[locale];
    const text = [
      `🧠 ${result.type.toUpperCase()} | ${title}`,
      '',
      ...lines,
      '',
      buildShareUrl(),
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const homePath = lang ? `/${lang}` : '/';

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)]">
        <div className="text-6xl mb-6">🔍</div>
        <h1
          className="text-2xl font-bold mb-4 text-[var(--color-text)]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {s.result.noResult}
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8 text-center max-w-md">
          {s.result.noResultDesc}
        </p>
        <Link
          to={homePath}
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {s.result.goHome}
        </Link>
      </div>
    );
  }

  const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
  const baseType = result.type.replace(/-[AT]$/i, '');
  const variant = result.type.includes('-') ? result.type.split('-')[1] : '';

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12 relative">
      <div className="max-w-2xl mx-auto">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            to={homePath}
            className="inline-block text-xs font-mono text-[var(--color-primary)] tracking-widest uppercase mb-6 hover:opacity-70 transition-opacity"
          >
            {s.result.backLink}
          </Link>

          <img
            src={getMbtiImageUrl(result.type)}
            alt={result.type}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-cover border-2 border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />

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
              {personality.title[locale]}
            </p>
          )}
        </div>

        {/* Share Button */}
        {personality && (
          <div className="flex justify-center mb-10">
            <button
              onClick={handleShare}
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-xl
                bg-[var(--color-bg-card)] border border-white/10
                text-[var(--color-text)] font-semibold text-sm
                hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]
                active:scale-95 transition-all duration-200
              "
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-[var(--color-accent-a)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[var(--color-accent-a)]">{s.result.copied}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <span>{s.result.share}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Dimension Bars */}
        <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
          <h2
            className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-6"
          >
            {s.result.dimensions}
          </h2>

          <div className="space-y-6">
            {dims.map((dim) => {
              const score = result.dimensions[dim];
              const dimLabel = s.dims[dim];
              const [first, second] = DIMENSION_POLES[dim];
              const isFirst = score.letter === first;
              const pct = score.percentage;
              const otherPct = 100 - pct;

              const winColor = dim === 'AT' && score.letter === 'T'
                ? 'var(--color-accent-turb)'
                : getColor(score.letter);

              return (
                <div key={dim}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
                      {dimLabel.name}
                    </span>
                    <span
                      className="text-xs font-bold tracking-wider"
                      style={{ color: winColor }}
                    >
                      {score.letter} {pct}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold w-6 text-center shrink-0"
                      style={{
                        color: isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: isFirst ? 1 : 0.4,
                      }}
                    >
                      {first}
                    </span>

                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden flex">
                      {isFirst ? (
                        <>
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${pct}%`,
                              background: `linear-gradient(90deg, ${winColor}, color-mix(in srgb, ${winColor} 50%, transparent))`,
                              boxShadow: `0 0 12px color-mix(in srgb, ${winColor} 25%, transparent)`,
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
                              background: `linear-gradient(270deg, ${winColor}, color-mix(in srgb, ${winColor} 50%, transparent))`,
                              boxShadow: `0 0 12px color-mix(in srgb, ${winColor} 25%, transparent)`,
                            }}
                          />
                        </>
                      )}
                    </div>

                    <span
                      className="text-xs font-bold w-6 text-center shrink-0"
                      style={{
                        color: !isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: !isFirst ? 1 : 0.4,
                      }}
                    >
                      {dim === 'AT' ? (second === 'T' ? 'T' : second) : second}
                    </span>
                  </div>

                  <div className="flex justify-between mt-1">
                    <span
                      className="text-[10px]"
                      style={{
                        color: isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: isFirst ? 0.7 : 0.3,
                      }}
                    >
                      {dimLabel.left} {isFirst ? `${pct}%` : `${otherPct}%`}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{
                        color: !isFirst ? winColor : 'var(--color-text-muted)',
                        opacity: !isFirst ? 0.7 : 0.3,
                      }}
                    >
                      {dimLabel.right} {!isFirst ? `${pct}%` : `${otherPct}%`}
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
                {s.result.personality}
              </h2>
              <p className="text-[var(--color-text)] leading-relaxed">
                {personality.description[locale]}
              </p>
            </div>

            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
              <h2
                className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-4"
              >
                {s.result.strengths}
              </h2>
              <div className="flex flex-wrap gap-2">
                {personality.strengths[locale].map((str) => (
                  <span
                    key={str}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 md:p-8 border border-white/5 mb-8">
              <h2
                className="text-sm font-mono text-[var(--color-primary)] tracking-widest uppercase mb-4"
              >
                {s.result.recommendedTasks}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {personality.recommendedTasks[locale].map((task) => (
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

        <footer className="text-center py-8 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/Epsilondelta-ai/claw-mbti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/25 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://clawhub.ai/skills/claw-mbti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/25 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              ClawHub
            </a>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] opacity-40">
            {s.result.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}
