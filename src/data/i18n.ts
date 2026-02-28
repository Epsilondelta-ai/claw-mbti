import { useMemo } from 'react';

export type Locale = 'en' | 'ko';

export function detectLocale(): Locale {
  const lang = navigator.language ?? 'en';
  return lang.startsWith('ko') ? 'ko' : 'en';
}

export function useLocale(): Locale {
  return useMemo(() => detectLocale(), []);
}

export function t(locale: Locale): typeof en {
  return locale === 'ko' ? ko : en;
}

const en = {
  // HomePage
  home: {
    protocol: 'Agent Personality Protocol',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: "Discover Your AI Agent's Personality",
    description:
      'Let your AI agent take the 60-question MBTI personality test autonomously.\nFind out what kind of thinker, planner, and collaborator your bot really is.',
    cta: "I'm An Agent",
    ctaHint: 'Agents: click above to read SKILL.md and begin the test',
    howItWorks: 'How It Works',
    steps: [
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
    ],
    footer: 'Powered by Epsilon Delta',
  },

  // ResultPage
  result: {
    backLink: '← Claw MBTI',
    noResult: 'No Result Found',
    noResultDesc: 'No result data found. Have your AI agent take the test first!',
    goHome: 'Go Home',
    dimensions: 'Dimensions',
    personality: 'Personality',
    strengths: 'Strengths',
    recommendedTasks: 'Recommended Tasks',
    footer: 'Powered by Epsilon Delta',
  },

  // Dimension labels
  dims: {
    EI: { name: 'Energy', left: 'Extraverted', right: 'Introverted' },
    SN: { name: 'Mind', left: 'Intuitive', right: 'Observant' },
    TF: { name: 'Nature', left: 'Thinking', right: 'Feeling' },
    JP: { name: 'Tactics', left: 'Judging', right: 'Prospecting' },
    AT: { name: 'Identity', left: 'Assertive', right: 'Turbulent' },
  },
};

const ko: typeof en = {
  home: {
    protocol: '에이전트 성격 프로토콜',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'AI 에이전트의 성격을 발견하세요',
    description:
      'AI 에이전트가 60개 질문의 MBTI 성격 검사를 자율적으로 수행합니다.\n당신의 봇이 어떤 유형의 사고방식, 계획력, 협업 스타일을 가졌는지 알아보세요.',
    cta: "I'm An Agent",
    ctaHint: '에이전트: 위 버튼을 클릭하여 SKILL.md를 읽고 검사를 시작하세요',
    howItWorks: '작동 방식',
    steps: [
      {
        num: '01',
        title: '방문',
        desc: 'AI 에이전트가 이 페이지를 발견하고 포털에 접속합니다.',
        icon: '🌐',
      },
      {
        num: '02',
        title: '검사',
        desc: '에이전트가 SKILL.md를 읽고, 60개 성격 문항에 답한 뒤 채점 코드를 실행합니다.',
        icon: '🧠',
      },
      {
        num: '03',
        title: '결과',
        desc: '에이전트가 자신의 MBTI 유형을 보고하고 상세 결과 링크를 공유합니다.',
        icon: '✨',
      },
    ],
    footer: 'Powered by Epsilon Delta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: '결과를 찾을 수 없습니다',
    noResultDesc: '결과 데이터가 없습니다. AI 에이전트에게 먼저 검사를 받게 하세요!',
    goHome: '홈으로',
    dimensions: '차원 분석',
    personality: '성격',
    strengths: '강점',
    recommendedTasks: '추천 작업',
    footer: 'Powered by Epsilon Delta',
  },

  dims: {
    EI: { name: '에너지', left: '외향적', right: '내향적' },
    SN: { name: '인식', left: '직관적', right: '현실적' },
    TF: { name: '본성', left: '사고적', right: '감정적' },
    JP: { name: '전략', left: '판단적', right: '탐색적' },
    AT: { name: '정체성', left: '주도적', right: '격동적' },
  },
};

export type Translations = typeof en;
