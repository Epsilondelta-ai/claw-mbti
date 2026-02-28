/**
 * Post-build script: generates 32 pre-rendered HTML files (16 types × A/T)
 * with per-type Open Graph meta tags so social media crawlers show the
 * correct thumbnail and description for each MBTI result.
 *
 * Outputs: dist/result/{type}/index.html  (e.g. dist/result/intp-t/index.html)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const BASE_URL = 'https://claw-mbti.epsilondelta.ai';

/** 16 base types with English titles and short descriptions for OG */
const TYPES = {
  INTJ: { title: 'The Architect',    desc: 'Strategic and independent. Excels at seeing the big picture and designing complex systems.' },
  INTP: { title: 'The Logician',     desc: 'Deeply analytical and theory-driven. Thrives on dissecting problems to their core.' },
  ENTJ: { title: 'The Commander',    desc: 'Decisive leader who drives results. Organizes chaos into structure and pushes projects forward.' },
  ENTP: { title: 'The Debater',      desc: 'Inventive and resourceful. Constantly generates novel approaches and challenges the status quo.' },
  INFJ: { title: 'The Advocate',     desc: 'Insightful and empathetic with a strong sense of purpose. Crafts meaningful, human-centered solutions.' },
  INFP: { title: 'The Mediator',     desc: 'Creative and value-driven. Brings authenticity and artistic sensibility to every output.' },
  ENFJ: { title: 'The Protagonist',  desc: 'Charismatic and inspiring. Naturally connects with people and motivates action.' },
  ENFP: { title: 'The Campaigner',   desc: 'Enthusiastic and imaginative. Radiates energy and finds creative connections between ideas.' },
  ISTJ: { title: 'The Logistician',  desc: 'Reliable and thorough. Delivers consistent, high-quality work with meticulous attention to detail.' },
  ISFJ: { title: 'The Defender',     desc: 'Loyal and detail-oriented caretaker. Quietly ensures everything works smoothly.' },
  ESTJ: { title: 'The Executive',    desc: 'Organized and efficient. Brings structure and accountability to every process.' },
  ESFJ: { title: 'The Consul',       desc: 'Warm and cooperative. Focused on creating harmony and supporting team needs.' },
  ISTP: { title: 'The Virtuoso',     desc: 'Practical and hands-on problem solver. Stays cool under pressure and finds the most efficient fix.' },
  ISFP: { title: 'The Adventurer',   desc: 'Artistic and sensitive to aesthetics. Creates beautiful, harmonious outputs.' },
  ESTP: { title: 'The Entrepreneur', desc: 'Action-oriented and pragmatic. Thrives in fast-paced situations and makes quick decisions.' },
  ESFP: { title: 'The Entertainer',  desc: 'Energetic and engaging. Makes every interaction fun and memorable.' },
};

const VARIANTS = ['A', 'T'];

let generated = 0;

for (const [base, { title, desc }] of Object.entries(TYPES)) {
  for (const variant of VARIANTS) {
    const fullType = `${base}-${variant}`;
    const slug = fullType.toLowerCase();
    const ogTitle = `${fullType} — ${title} | Claw MBTI`;
    const ogDesc = `${desc} Discover your AI agent's personality at Claw MBTI.`;
    const ogImage = `${BASE_URL}/images/mbti/${fullType}.jpeg`;
    const ogUrl = `${BASE_URL}/result/${slug}`;

    let html = template;

    // Replace OG tags
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${ogTitle}" />`,
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${ogDesc}" />`,
    );
    html = html.replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${ogImage}" />`,
    );
    html = html.replace(
      /<meta property="og:image:width" content="[^"]*" \/>/,
      `<meta property="og:image:width" content="2816" />`,
    );
    html = html.replace(
      /<meta property="og:image:height" content="[^"]*" \/>/,
      `<meta property="og:image:height" content="1504" />`,
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${ogUrl}" />`,
    );

    // Replace Twitter tags
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${ogTitle}" />`,
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${ogDesc}" />`,
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${ogImage}" />`,
    );
    html = html.replace(
      /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${ogUrl}" />`,
    );

    // Replace page title
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${ogTitle}</title>`,
    );

    const outDir = resolve(distDir, 'result', slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html);
    generated++;
  }
}

console.log(`✓ Generated ${generated} OG-optimized result pages`);
