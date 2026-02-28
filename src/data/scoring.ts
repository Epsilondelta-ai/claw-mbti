export { type Dimension } from './questions';
import { type Dimension, type Direction, type Question, questions } from './questions';

/** Answer value: -3 (Strongly Agree) to +3 (Strongly Disagree) */
export type Answer = -3 | -2 | -1 | 0 | 1 | 2 | 3;

/** Map of question id → answer */
export type Answers = Record<number, Answer>;

/** First-pole directions: agreeing pushes toward first pole */
const FIRST_POLE_DIRECTIONS: Direction[] = ['E', 'N', 'T', 'J', 'A'];

/** Dimension → [first pole letter, second pole letter] */
export const DIMENSION_POLES: Record<Dimension, [string, string]> = {
  EI: ['E', 'I'],
  SN: ['N', 'S'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
  AT: ['A', 'T'],
};

export interface DimensionScore {
  dimension: Dimension;
  rawScore: number;
  /** The winning letter (E/I, N/S, T/F, J/P, A/T) */
  letter: string;
  /** Percentage for the winning side (51–100) */
  percentage: number;
}

export interface MbtiResult {
  /** e.g. "INTP-T" */
  type: string;
  /** Individual dimension scores */
  dimensions: Record<Dimension, DimensionScore>;
}

/**
 * Direction sign for scoring formula:
 *   First-pole directions (E, N, T, J, A) → -1
 *   Second-pole directions (I, S, F, P, Turb) → +1
 *
 * This makes it so that:
 *   agree (-3) with E-question → (-3) × (-1) × w = positive → E wins ✓
 *   agree (-3) with I-question → (-3) × (+1) × w = negative → I wins ✓
 */
function getDirectionSign(direction: Direction): number {
  return FIRST_POLE_DIRECTIONS.includes(direction) ? -1 : 1;
}

/**
 * Calculate raw score for a single dimension.
 *   raw = Σ(answer × dir_sign × weight) for all questions in this dimension
 *   positive → first pole, negative → second pole
 */
function calcDimensionRaw(dimension: Dimension, answers: Answers): number {
  return questions
    .filter((q: Question) => q.dimension === dimension)
    .reduce((sum: number, q: Question) => {
      const answer = answers[q.id] ?? 0;
      const sign = getDirectionSign(q.direction);
      return sum + answer * sign * q.weight;
    }, 0);
}

/**
 * Convert raw score to display percentage.
 *   displayed_pct = ceil(|raw| / 2) + 50
 *   Range: 50–100 (50 when raw = 0, i.e. perfectly neutral)
 */
function rawToPercentage(raw: number): number {
  if (raw === 0) return 50;
  return Math.ceil(Math.abs(raw) / 2) + 50;
}

/**
 * Calculate full MBTI result from 60 answers.
 */
export function calculateMbti(answers: Answers): MbtiResult {
  const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
  const dimensions = {} as Record<Dimension, DimensionScore>;
  let type = '';

  for (const dim of dims) {
    const raw = calcDimensionRaw(dim, answers);
    const [first, second] = DIMENSION_POLES[dim];
    const letter = raw >= 0 ? first : second;
    const pct = rawToPercentage(raw);

    dimensions[dim] = { dimension: dim, rawScore: raw, letter, percentage: pct };

    if (dim === 'AT') {
      type += '-' + letter;
    } else {
      type += letter;
    }
  }

  return { type, dimensions };
}

/**
 * Build result URL with query parameters.
 */
export function buildResultUrl(
  baseUrl: string,
  result: MbtiResult,
): string {
  const params = new URLSearchParams();
  params.set('type', result.type.toLowerCase());

  for (const dim of ['EI', 'SN', 'TF', 'JP', 'AT'] as Dimension[]) {
    const score = result.dimensions[dim];
    // Positive = first pole percentage, negative = second pole percentage
    const signedPct = score.rawScore >= 0 ? score.percentage : -score.percentage;
    params.set(dim.toLowerCase(), String(signedPct));
  }

  return `${baseUrl}/result?${params.toString()}`;
}

/**
 * Parse result from URL search params.
 */
export function parseResultFromParams(params: URLSearchParams, pathType?: string): MbtiResult | null {
  const type = (pathType ?? params.get('type'))?.toUpperCase();
  if (!type || type.length < 6) return null; // e.g. "INTP-T"

  const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP', 'AT'];
  const dimensions = {} as Record<Dimension, DimensionScore>;

  for (const dim of dims) {
    const val = params.get(dim.toLowerCase());
    if (val === null) return null;

    const num = parseInt(val, 10);
    if (isNaN(num)) return null;

    const [first, second] = DIMENSION_POLES[dim];
    const letter = num >= 0 ? first : second;
    const percentage = Math.abs(num);

    dimensions[dim] = {
      dimension: dim,
      rawScore: num, // We store the signed percentage as a proxy
      letter,
      percentage: Math.min(100, Math.max(50, percentage)),
    };
  }

  return { type, dimensions };
}
