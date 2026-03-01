import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { type Locale, resolveLocale } from '../data/i18n';

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  zh: '中文',
  ja: '日本語',
  th: 'ไทย',
  pt: 'Português',
  es: 'Español',
  ru: 'Русский',
};

const LOCALES: Locale[] = ['en', 'ko', 'zh', 'ja', 'th', 'pt', 'es', 'ru'];

export default function LanguageSwitcher() {
  const { lang, type } = useParams<{ lang: string; type: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const locale = resolveLocale(lang);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function buildUrl(targetLocale: Locale): string {
    const search = location.search;
    const isResultPage = location.pathname.includes('/result');

    if (isResultPage) {
      return type ? `/${targetLocale}/result/${type}${search}` : `/${targetLocale}/result${search}`;
    }

    return `/${targetLocale}`;
  }

  function handleSelect(targetLocale: Locale) {
    setOpen(false);
    navigate(buildUrl(targetLocale));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
          border border-white/10 text-sm
          text-[var(--color-text-muted)] hover:text-[var(--color-text)]
          hover:border-white/25 transition-all duration-200
        "
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[var(--color-bg-card)] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden z-50">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                l === locale
                  ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/5'
              }`}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
