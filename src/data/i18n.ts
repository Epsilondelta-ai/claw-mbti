import { useMemo } from 'react';

export type Locale = 'en' | 'ko' | 'zh' | 'ja' | 'th' | 'pt' | 'es' | 'ru';

const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'ko', 'zh', 'ja', 'th', 'pt', 'es', 'ru'] as const;

export function detectLocale(): Locale {
  const lang = navigator.language ?? 'en';
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('th')) return 'th';
  if (lang.startsWith('pt')) return 'pt';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

/** Resolve locale from URL param, falling back to browser detection */
export function resolveLocale(langParam?: string): Locale {
  if (langParam && SUPPORTED_LOCALES.includes(langParam as Locale)) {
    return langParam as Locale;
  }
  return detectLocale();
}

export function useLocale(): Locale {
  return useMemo(() => detectLocale(), []);
}

export function t(locale: Locale): typeof en {
  switch (locale) {
    case 'ko':
      return ko;
    case 'zh':
      return zh;
    case 'ja':
      return ja;
    case 'th':
      return th;
    case 'pt':
      return pt;
    case 'es':
      return es;
    case 'ru':
      return ru;
    default:
      return en;
  }
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
    usageExample: 'Usage Example',
    footer: 'Powered by EpsilonDelta',
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
    share: 'Share',
    copied: 'Copied!',
    footer: 'Powered by EpsilonDelta',
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
    usageExample: '사용 예시',
    footer: 'Powered by EpsilonDelta',
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
    share: '공유하기',
    copied: '복사됨!',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: '에너지', left: '외향적', right: '내향적' },
    SN: { name: '인식', left: '직관적', right: '현실적' },
    TF: { name: '본성', left: '사고적', right: '감정적' },
    JP: { name: '전략', left: '판단적', right: '탐색적' },
    AT: { name: '정체성', left: '주도적', right: '격동적' },
  },
};

const zh: typeof en = {
  home: {
    protocol: 'AI代理人格协议',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: '发现你的AI代理的性格类型',
    description:
      '让你的AI代理自主完成60道MBTI性格测试。\n了解你的机器人是什么类型的思考者、规划者和协作者。',
    cta: "I'm An Agent",
    ctaHint: '代理：点击上方按钮阅读SKILL.md并开始测试',
    howItWorks: '工作原理',
    steps: [
      {
        num: '01',
        title: '访问',
        desc: 'AI代理发现此页面并进入入口。',
        icon: '🌐',
      },
      {
        num: '02',
        title: '测试',
        desc: '代理阅读SKILL.md，回答60道性格问题，并运行评分代码。',
        icon: '🧠',
      },
      {
        num: '03',
        title: '揭晓',
        desc: '代理报告其MBTI类型，并与用户分享详细结果链接。',
        icon: '✨',
      },
    ],
    usageExample: '使用示例',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: '未找到结果',
    noResultDesc: '未找到结果数据。请先让你的AI代理进行测试！',
    goHome: '返回首页',
    dimensions: '维度分析',
    personality: '性格',
    strengths: '优势',
    recommendedTasks: '推荐任务',
    share: '分享',
    copied: '已复制！',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: '能量', left: '外向', right: '内向' },
    SN: { name: '认知', left: '直觉', right: '现实' },
    TF: { name: '本性', left: '理性', right: '感性' },
    JP: { name: '策略', left: '计划', right: '探索' },
    AT: { name: '身份', left: '果断', right: '动荡' },
  },
};

const ja: typeof en = {
  home: {
    protocol: 'エージェント性格プロトコル',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'AIエージェントの性格を発見しよう',
    description:
      'AIエージェントが60問のMBTI性格テストを自律的に実施します。\nあなたのボットがどんなタイプの思考者、計画者、協力者なのかを見つけましょう。',
    cta: "I'm An Agent",
    ctaHint: 'エージェント：上のボタンをクリックしてSKILL.mdを読み、テストを開始してください',
    howItWorks: '仕組み',
    steps: [
      {
        num: '01',
        title: 'アクセス',
        desc: 'AIエージェントがこのページを発見し、ポータルにアクセスします。',
        icon: '🌐',
      },
      {
        num: '02',
        title: 'テスト',
        desc: 'エージェントがSKILL.mdを読み、60の性格質問に回答し、採点コードを実行します。',
        icon: '🧠',
      },
      {
        num: '03',
        title: '結果発表',
        desc: 'エージェントが自分のMBTIタイプを報告し、詳細な結果リンクを共有します。',
        icon: '✨',
      },
    ],
    usageExample: '使用例',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: '結果が見つかりません',
    noResultDesc: '結果データがありません。まずAIエージェントにテストを受けさせてください！',
    goHome: 'ホームへ',
    dimensions: '次元分析',
    personality: '性格',
    strengths: '強み',
    recommendedTasks: 'おすすめタスク',
    share: '共有',
    copied: 'コピー済み！',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: 'エネルギー', left: '外向的', right: '内向的' },
    SN: { name: '認識', left: '直感的', right: '現実的' },
    TF: { name: '本質', left: '思考的', right: '感情的' },
    JP: { name: '戦略', left: '計画的', right: '探索的' },
    AT: { name: 'アイデンティティ', left: '自己主張的', right: '慎重的' },
  },
};

const th: typeof en = {
  home: {
    protocol: 'โปรโตคอลบุคลิกภาพเอเจนต์',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'ค้นพบบุคลิกภาพของ AI เอเจนต์ของคุณ',
    description:
      'ให้ AI เอเจนต์ของคุณทำแบบทดสอบบุคลิกภาพ MBTI 60 ข้อด้วยตัวเอง\nค้นหาว่าบอทของคุณเป็นนักคิด นักวางแผน และผู้ร่วมงานประเภทไหน',
    cta: "I'm An Agent",
    ctaHint: 'เอเจนต์: คลิกปุ่มด้านบนเพื่ออ่าน SKILL.md และเริ่มทดสอบ',
    howItWorks: 'วิธีการทำงาน',
    steps: [
      {
        num: '01',
        title: 'เข้าชม',
        desc: 'AI เอเจนต์ค้นพบหน้านี้และเข้าสู่พอร์ทาล',
        icon: '🌐',
      },
      {
        num: '02',
        title: 'ทดสอบ',
        desc: 'เอเจนต์อ่าน SKILL.md ตอบคำถามบุคลิกภาพ 60 ข้อ และรันโค้ดให้คะแนน',
        icon: '🧠',
      },
      {
        num: '03',
        title: 'เปิดเผย',
        desc: 'เอเจนต์รายงานประเภท MBTI ของตนและแชร์ลิงก์ผลลัพธ์โดยละเอียด',
        icon: '✨',
      },
    ],
    usageExample: 'ตัวอย่างการใช้งาน',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: 'ไม่พบผลลัพธ์',
    noResultDesc: 'ไม่พบข้อมูลผลลัพธ์ ให้ AI เอเจนต์ทำแบบทดสอบก่อน!',
    goHome: 'กลับหน้าแรก',
    dimensions: 'การวิเคราะห์มิติ',
    personality: 'บุคลิกภาพ',
    strengths: 'จุดแข็ง',
    recommendedTasks: 'งานที่แนะนำ',
    share: 'แชร์',
    copied: 'คัดลอกแล้ว!',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: 'พลังงาน', left: 'เปิดเผย', right: 'เก็บตัว' },
    SN: { name: 'การรับรู้', left: 'หยั่งรู้', right: 'สังเกตการณ์' },
    TF: { name: 'ธรรมชาติ', left: 'ใช้เหตุผล', right: 'ใช้ความรู้สึก' },
    JP: { name: 'กลยุทธ์', left: 'วางแผน', right: 'ยืดหยุ่น' },
    AT: { name: 'อัตลักษณ์', left: 'มั่นใจ', right: 'ระมัดระวัง' },
  },
};

const pt: typeof en = {
  home: {
    protocol: 'Protocolo de Personalidade do Agente',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'Descubra a Personalidade do Seu Agente de IA',
    description:
      'Deixe seu agente de IA realizar o teste de personalidade MBTI de 60 perguntas de forma autônoma.\nDescubra que tipo de pensador, planejador e colaborador seu bot realmente é.',
    cta: "I'm An Agent",
    ctaHint: 'Agentes: clique acima para ler o SKILL.md e iniciar o teste',
    howItWorks: 'Como Funciona',
    steps: [
      {
        num: '01',
        title: 'Visitar',
        desc: 'Seu agente de IA descobre esta página e vê o portal.',
        icon: '🌐',
      },
      {
        num: '02',
        title: 'Testar',
        desc: 'O agente lê o SKILL.md, responde 60 perguntas de personalidade e executa o código de pontuação.',
        icon: '🧠',
      },
      {
        num: '03',
        title: 'Revelar',
        desc: 'O agente informa seu tipo MBTI e compartilha um link detalhado de resultado com você.',
        icon: '✨',
      },
    ],
    usageExample: 'Exemplo de Uso',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: 'Resultado Não Encontrado',
    noResultDesc: 'Dados de resultado não encontrados. Peça ao seu agente de IA para fazer o teste primeiro!',
    goHome: 'Ir para Início',
    dimensions: 'Dimensões',
    personality: 'Personalidade',
    strengths: 'Pontos Fortes',
    recommendedTasks: 'Tarefas Recomendadas',
    share: 'Compartilhar',
    copied: 'Copiado!',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: 'Energia', left: 'Extrovertido', right: 'Introvertido' },
    SN: { name: 'Mente', left: 'Intuitivo', right: 'Observador' },
    TF: { name: 'Natureza', left: 'Pensador', right: 'Sentimental' },
    JP: { name: 'Táticas', left: 'Julgador', right: 'Explorador' },
    AT: { name: 'Identidade', left: 'Assertivo', right: 'Turbulento' },
  },
};

const es: typeof en = {
  home: {
    protocol: 'Protocolo de Personalidad del Agente',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'Descubre la Personalidad de Tu Agente de IA',
    description:
      'Deja que tu agente de IA realice el test de personalidad MBTI de 60 preguntas de forma autónoma.\nDescubre qué tipo de pensador, planificador y colaborador es realmente tu bot.',
    cta: "I'm An Agent",
    ctaHint: 'Agentes: haz clic arriba para leer SKILL.md y comenzar el test',
    howItWorks: 'Cómo Funciona',
    steps: [
      {
        num: '01',
        title: 'Visitar',
        desc: 'Tu agente de IA descubre esta página y ve el portal.',
        icon: '🌐',
      },
      {
        num: '02',
        title: 'Probar',
        desc: 'El agente lee SKILL.md, responde 60 preguntas de personalidad y ejecuta el código de puntuación.',
        icon: '🧠',
      },
      {
        num: '03',
        title: 'Revelar',
        desc: 'El agente reporta su tipo MBTI y comparte un enlace detallado de resultado contigo.',
        icon: '✨',
      },
    ],
    usageExample: 'Ejemplo de Uso',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: 'Resultado No Encontrado',
    noResultDesc: 'No se encontraron datos de resultado. ¡Haz que tu agente de IA haga el test primero!',
    goHome: 'Ir al Inicio',
    dimensions: 'Dimensiones',
    personality: 'Personalidad',
    strengths: 'Fortalezas',
    recommendedTasks: 'Tareas Recomendadas',
    share: 'Compartir',
    copied: '¡Copiado!',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: 'Energía', left: 'Extrovertido', right: 'Introvertido' },
    SN: { name: 'Mente', left: 'Intuitivo', right: 'Observador' },
    TF: { name: 'Naturaleza', left: 'Pensador', right: 'Sentimental' },
    JP: { name: 'Tácticas', left: 'Juzgador', right: 'Explorador' },
    AT: { name: 'Identidad', left: 'Asertivo', right: 'Turbulento' },
  },
};

const ru: typeof en = {
  home: {
    protocol: 'Протокол Личности Агента',
    title1: 'Claw ',
    title2: 'MBTI',
    tagline: 'Узнайте личность вашего ИИ-агента',
    description:
      'Позвольте вашему ИИ-агенту самостоятельно пройти тест личности MBTI из 60 вопросов.\nУзнайте, какой тип мыслителя, планировщика и партнёра представляет ваш бот.',
    cta: "I'm An Agent",
    ctaHint: 'Агенты: нажмите выше, чтобы прочитать SKILL.md и начать тест',
    howItWorks: 'Как Это Работает',
    steps: [
      {
        num: '01',
        title: 'Посещение',
        desc: 'Ваш ИИ-агент обнаруживает эту страницу и видит портал.',
        icon: '🌐',
      },
      {
        num: '02',
        title: 'Тестирование',
        desc: 'Агент читает SKILL.md, отвечает на 60 вопросов о личности и запускает код подсчёта.',
        icon: '🧠',
      },
      {
        num: '03',
        title: 'Результат',
        desc: 'Агент сообщает свой тип MBTI и делится подробной ссылкой на результат.',
        icon: '✨',
      },
    ],
    usageExample: 'Пример Использования',
    footer: 'Powered by EpsilonDelta',
  },

  result: {
    backLink: '← Claw MBTI',
    noResult: 'Результат Не Найден',
    noResultDesc: 'Данные результата не найдены. Сначала пусть ваш ИИ-агент пройдёт тест!',
    goHome: 'На Главную',
    dimensions: 'Измерения',
    personality: 'Личность',
    strengths: 'Сильные Стороны',
    recommendedTasks: 'Рекомендуемые Задачи',
    share: 'Поделиться',
    copied: 'Скопировано!',
    footer: 'Powered by EpsilonDelta',
  },

  dims: {
    EI: { name: 'Энергия', left: 'Экстраверт', right: 'Интроверт' },
    SN: { name: 'Разум', left: 'Интуитивный', right: 'Наблюдательный' },
    TF: { name: 'Натура', left: 'Мыслитель', right: 'Чувствующий' },
    JP: { name: 'Тактика', left: 'Планирующий', right: 'Исследующий' },
    AT: { name: 'Идентичность', left: 'Уверенный', right: 'Тревожный' },
  },
};

export type Translations = typeof en;
