/**
 * Post-build script: generates pre-rendered HTML files with per-language and
 * per-type Open Graph meta tags so social media crawlers show the correct
 * thumbnail and description for each MBTI result in every supported language.
 *
 * Outputs:
 *   dist/{lang}/index.html                    — 8 language landing pages
 *   dist/{lang}/result/{type}/index.html       — 8 × 32 = 256 result pages
 *   dist/result/{type}/index.html              — 32 English result pages (backward compat)
 *
 * Total: ~296 pre-rendered HTML files
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

const BASE_URL = 'https://claw-mbti.epsilondelta.ai';

const LANGS = ['en', 'ko', 'zh', 'ja', 'th', 'pt', 'es', 'ru'];

/** 16 base types with per-language titles and short descriptions for OG */
const TYPES = {
  INTJ: {
    title: { en: 'The Architect', ko: '설계자', zh: '建筑师', ja: '建築家', th: 'สถาปนิก', pt: 'O Arquiteto', es: 'El Arquitecto', ru: 'Архитектор' },
    desc: {
      en: 'Strategic and independent. Excels at seeing the big picture and designing complex systems.',
      ko: '전략적이고 독립적. 큰 그림을 보고 복잡한 시스템을 설계하는 데 뛰어남.',
      zh: '战略性强且独立。擅长看清全局并设计复杂系统。',
      ja: '戦略的で独立心が強い。全体像を見て複雑なシステムを設計するのに優れている。',
      th: 'มีกลยุทธ์และเป็นอิสระ เก่งในการมองภาพรวมและออกแบบระบบที่ซับซ้อน',
      pt: 'Estratégico e independente. Excelente em ver o panorama geral e projetar sistemas complexos.',
      es: 'Estratégico e independiente. Excelente para ver el panorama general y diseñar sistemas complejos.',
      ru: 'Стратегический и независимый. Превосходно видит общую картину и проектирует сложные системы.',
    },
  },
  INTP: {
    title: { en: 'The Logician', ko: '논리학자', zh: '逻辑学家', ja: '論理学者', th: 'นักตรรมชาติ', pt: 'O Lógico', es: 'El Lógico', ru: 'Логик' },
    desc: {
      en: 'Deeply analytical and theory-driven. Thrives on dissecting problems to their core.',
      ko: '깊이 있는 분석력과 이론 중심의 사고. 문제의 핵심을 파고드는 데 뛰어남.',
      zh: '深度分析且理论驱动。擅长深入问题核心。',
      ja: '深い分析力と理論駆動型の思考。問題の核心を掘り下げるのに優れている。',
      th: 'วิเคราะห์อย่างลึกซึ้งและขับเคลื่อนด้วยทฤษฎี เก่งในการแยกปัญหาลงไปที่แก่นสาร',
      pt: 'Profundamente analítico e orientado por teorias. Prospera ao dissecar problemas até sua essência.',
      es: 'Profundamente analítico y orientado por teorías. Prospera al diseccionar problemas hasta su esencia.',
      ru: 'Глубоко аналитичный и теоретический. Преуспевает в разборе проблем до сути.',
    },
  },
  ENTJ: {
    title: { en: 'The Commander', ko: '통솔자', zh: '指挥官', ja: '司令官', th: 'ผู้บัญชาการ', pt: 'O Comandante', es: 'El Comandante', ru: 'Командир' },
    desc: {
      en: 'Decisive leader who drives results. Organizes chaos into structure and pushes projects forward.',
      ko: '결단력 있는 리더. 혼란을 체계로 정리하고 프로젝트를 추진함.',
      zh: '果断的领导者，推动结果。将混乱组织成结构并推进项目。',
      ja: '結果を推進する決定的なリーダー。混乱を構造に整理し、プロジェクトを推し進める。',
      th: 'ผู้นำที่มีการตัดสินใจ ขับเคลื่อนผลลัพธ์ จัดระเบียบความสับสนให้เป็นโครงสร้าง',
      pt: 'Líder decisivo que impulsiona resultados. Organiza o caos em estrutura e avança projetos.',
      es: 'Líder decisivo que impulsa resultados. Organiza el caos en estructura y avanza proyectos.',
      ru: 'Решительный лидер, движущий результатами. Организует хаос в структуру и продвигает проекты.',
    },
  },
  ENTP: {
    title: { en: 'The Debater', ko: '변론가', zh: '辩手', ja: '討論者', th: 'นักโต้แย้ง', pt: 'O Debatedor', es: 'El Debatidor', ru: 'Полемист' },
    desc: {
      en: 'Inventive and resourceful. Constantly generates novel approaches and challenges the status quo.',
      ko: '발명적이고 재치가 넘침. 끊임없이 새로운 접근법을 만들고 현 상태에 도전함.',
      zh: '富有创意且足智多谋。不断产生新颖的方法并挑战现状。',
      ja: '独創的で機知に富んでいる。常に新しいアプローチを生み出し、現状に挑戦する。',
      th: 'สร้างสรรค์และมีทรัพยากร สร้างวิธีการใหม่และท้าทายสถานะเดิม',
      pt: 'Inventivo e engenhoso. Gera constantemente abordagens inovadoras e desafia o status quo.',
      es: 'Inventivo e ingenioso. Genera constantemente enfoques novedosos y desafía el status quo.',
      ru: 'Изобретательный и находчивый. Постоянно генерирует новые подходы и бросает вызов статусу-кво.',
    },
  },
  INFJ: {
    title: { en: 'The Advocate', ko: '옹호자', zh: '倡导者', ja: '提唱者', th: 'ผู้สนับสนุน', pt: 'O Advogado', es: 'El Abogado', ru: 'Защитник' },
    desc: {
      en: 'Insightful and empathetic with a strong sense of purpose. Crafts meaningful, human-centered solutions.',
      ko: '통찰력 있고 공감 능력이 뛰어남. 의미 있는 사람 중심의 솔루션을 만듦.',
      zh: '富有洞察力和同理心，具有强烈的目标感。创造有意义的以人为中心的解决方案。',
      ja: '洞察力があり共感的で、強い目的意識を持っている。意味のある人間中心のソリューションを作成する。',
      th: 'มีความเข้าใจและเห็นอกเห็นใจ สร้างสรรค์โซลูชันที่มีความหมายและเน้นมนุษย์',
      pt: 'Perspicaz e empático com forte senso de propósito. Cria soluções significativas centradas no humano.',
      es: 'Perspicaz y empático con fuerte sentido de propósito. Crea soluciones significativas centradas en el humano.',
      ru: 'Проницательный и эмпатичный с сильным чувством цели. Создаёт осмысленные решения, ориентированные на человека.',
    },
  },
  INFP: {
    title: { en: 'The Mediator', ko: '중재자', zh: '调解者', ja: '仲介者', th: 'ผู้ไกล่เกลี่ย', pt: 'O Mediador', es: 'El Mediador', ru: 'Посредник' },
    desc: {
      en: 'Creative and value-driven. Brings authenticity and artistic sensibility to every output.',
      ko: '창의적이고 가치 지향적. 모든 결과물에 진정성과 예술적 감각을 더함.',
      zh: '富有创意且价值驱动。为每个输出带来真实性和艺术敏感性。',
      ja: '創造的で価値駆動型。すべての出力に真正性と芸術的感性をもたらす。',
      th: 'สร้างสรรค์และขับเคลื่อนด้วยค่านิยม นำความเป็นจริงและความไวต่อศิลปะมาสู่ผลลัพธ์',
      pt: 'Criativo e guiado por valores. Traz autenticidade e sensibilidade artística a cada resultado.',
      es: 'Creativo y guiado por valores. Aporta autenticidad y sensibilidad artística a cada resultado.',
      ru: 'Творческий и ценностно-ориентированный. Привносит подлинность и артистическую чувствительность в каждый результат.',
    },
  },
  ENFJ: {
    title: { en: 'The Protagonist', ko: '주인공', zh: '主角', ja: '主人公', th: 'ตัวละครหลัก', pt: 'O Protagonista', es: 'El Protagonista', ru: 'Протагонист' },
    desc: {
      en: 'Charismatic and inspiring. Naturally connects with people and motivates action.',
      ko: '카리스마 있고 영감을 줌. 사람들과 자연스럽게 연결되고 행동을 이끌어냄.',
      zh: '富有魅力且鼓舞人心。自然地与人联系并激励行动。',
      ja: 'カリスマ的で鼓舞的。自然に人々とつながり、行動を促す。',
      th: 'มีเสน่ห์และสร้างแรงบันดาลใจ เชื่อมต่อกับผู้คนอย่างธรรมชาติ',
      pt: 'Carismático e inspirador. Conecta-se naturalmente com pessoas e motiva ação.',
      es: 'Carismático e inspirador. Se conecta naturalmente con las personas y motiva la acción.',
      ru: 'Харизматичный и вдохновляющий. Естественно связывается с людьми и мотивирует к действию.',
    },
  },
  ENFP: {
    title: { en: 'The Campaigner', ko: '활동가', zh: '活动家', ja: '活動家', th: 'นักรณรงค์', pt: 'O Ativista', es: 'El Activista', ru: 'Активист' },
    desc: {
      en: 'Enthusiastic and imaginative. Radiates energy and finds creative connections between ideas.',
      ko: '열정적이고 상상력이 풍부함. 에너지를 발산하며 아이디어 사이에서 창의적 연결고리를 찾음.',
      zh: '热情且富有想象力。散发能量并在想法之间找到创意联系。',
      ja: '熱心で想像力豊か。エネルギーを放射し、アイデア間に創造的なつながりを見つける。',
      th: 'กระตือรือร้นและจินตนาการ ปล่อยพลังงานและค้นหาการเชื่อมต่อที่สร้างสรรค์',
      pt: 'Entusiasmado e imaginativo. Irradia energia e encontra conexões criativas entre ideias.',
      es: 'Entusiasta e imaginativo. Irradia energía y encuentra conexiones creativas entre ideas.',
      ru: 'Энтузиастичный и изобретательный. Излучает энергию и находит креативные связи между идеями.',
    },
  },
  ISTJ: {
    title: { en: 'The Logistician', ko: '현실주의자', zh: '物流师', ja: '兵站担当者', th: 'นักโลจิสติกส์', pt: 'O Logístico', es: 'El Logístico', ru: 'Логист' },
    desc: {
      en: 'Reliable and thorough. Delivers consistent, high-quality work with meticulous attention to detail.',
      ko: '신뢰할 수 있고 꼼꼼함. 세심한 주의를 기울여 높은 품질의 작업을 제공.',
      zh: '可靠且彻底。以细致的关注提供一致、高质量的工作。',
      ja: '信頼できて徹底的。細部への細心の注意を払って、一貫性のある高品質の作業を提供する。',
      th: 'เชื่อถือได้และละเอียด ให้ผลงานที่สม่ำเสมอและมีคุณภาพสูง',
      pt: 'Confiável e minucioso. Entrega trabalho consistente e de alta qualidade com atenção meticulosa aos detalhes.',
      es: 'Confiable y minucioso. Entrega trabajo consistente y de alta calidad con atención meticulosa al detalle.',
      ru: 'Надёжный и тщательный. Обеспечивает стабильную, высококачественную работу с вниманием к деталям.',
    },
  },
  ISFJ: {
    title: { en: 'The Defender', ko: '수호자', zh: '保护者', ja: '擁護者', th: 'ผู้ปกป้อง', pt: 'O Defensor', es: 'El Defensor', ru: 'Защитник' },
    desc: {
      en: 'Loyal and detail-oriented caretaker. Quietly ensures everything works smoothly.',
      ko: '충실하고 세심한 돌봄이. 모든 것이 원활히 작동하도록 보장.',
      zh: '忠诚且细节导向的照顾者。静静地确保一切顺利运行。',
      ja: '忠実で細部志向のケアテイカー。静かにすべてがスムーズに機能することを確認する。',
      th: 'ผู้ดูแลที่ซื่อสัตย์และเน้นรายละเอียด ให้ความมั่นใจว่าทุกอย่างทำงานราบรื่น',
      pt: 'Cuidador leal e orientado a detalhes. Garante silenciosamente que tudo funcione perfeitamente.',
      es: 'Cuidador leal y orientado al detalle. Garantiza silenciosamente que todo funcione sin problemas.',
      ru: 'Лояльный и внимательный к деталям хранитель. Тихо обеспечивает бесперебойную работу.',
    },
  },
  ESTJ: {
    title: { en: 'The Executive', ko: '경영자', zh: '行政官', ja: '幹部', th: 'ผู้บริหาร', pt: 'O Executivo', es: 'El Ejecutivo', ru: 'Руководитель' },
    desc: {
      en: 'Organized and efficient. Brings structure and accountability to every process.',
      ko: '조직적이고 효율적. 모든 프로세스에 체계와 책임감을 부여.',
      zh: '有组织且高效。为每个流程带来结构和问责。',
      ja: '組織的で効率的。すべてのプロセスに構造と説明責任をもたらす。',
      th: 'มีระเบียบและมีประสิทธิภาพ นำโครงสร้างและความรับผิดชอบมาสู่กระบวนการ',
      pt: 'Organizado e eficiente. Traz estrutura e responsabilidade a cada processo.',
      es: 'Organizado y eficiente. Aporta estructura y responsabilidad a cada proceso.',
      ru: 'Организованный и эффективный. Привносит структуру и ответственность в каждый процесс.',
    },
  },
  ESFJ: {
    title: { en: 'The Consul', ko: '집정관', zh: '领事', ja: '領事', th: 'ที่ปรึกษา', pt: 'O Cônsul', es: 'El Cónsul', ru: 'Консул' },
    desc: {
      en: 'Warm and cooperative. Focused on creating harmony and supporting team needs.',
      ko: '따뜻하고 협력적. 조화를 만들고 팀의 필요를 지원.',
      zh: '温暖且合作。专注于创造和谐和支持团队需求。',
      ja: '温かく協力的。調和を作り、チームのニーズをサポートすることに焦点を当てている。',
      th: 'อบอุ่นและร่วมมือกัน มุ่งเน้นไปที่การสร้างความกลมกลืนและสนับสนุนทีม',
      pt: 'Caloroso e cooperativo. Focado em criar harmonia e apoiar as necessidades da equipe.',
      es: 'Cálido y cooperativo. Enfocado en crear armonía y apoyar las necesidades del equipo.',
      ru: 'Тёплый и готовый к сотрудничеству. Сосредоточен на создании гармонии и поддержке команды.',
    },
  },
  ISTP: {
    title: { en: 'The Virtuoso', ko: '장인', zh: '鉴赏家', ja: '職人', th: 'ศิลปินผู้เชี่ยวชาญ', pt: 'O Virtuoso', es: 'El Virtuoso', ru: 'Виртуоз' },
    desc: {
      en: 'Practical and hands-on problem solver. Stays cool under pressure and finds the most efficient fix.',
      ko: '실용적이고 직접 문제를 해결. 압박 속에서 침착하게 가장 효율적인 해결책을 찾음.',
      zh: '实用且动手解决问题。在压力下保持冷静并找到最有效的修复。',
      ja: '実用的で実践的な問題解決者。プレッシャーの下でも冷静さを保ち、最も効率的な修正を見つける。',
      th: 'ปฏิบัติและแก้ปัญหาด้วยตัวเอง สงบเย็นภายใต้ความกดดัน',
      pt: 'Solucionador de problemas prático e mão na massa. Mantém a calma sob pressão e encontra a solução mais eficiente.',
      es: 'Solucionador de problemas práctico y directo. Mantiene la calma bajo presión y encuentra la solución más eficiente.',
      ru: 'Практичный решатель проблем. Сохраняет хладнокровие под давлением и находит самое эффективное решение.',
    },
  },
  ISFP: {
    title: { en: 'The Adventurer', ko: '모험가', zh: '冒险家', ja: '冒険家', th: 'นักผจญภัย', pt: 'O Aventureiro', es: 'El Aventurero', ru: 'Авантюрист' },
    desc: {
      en: 'Artistic and sensitive to aesthetics. Creates beautiful, harmonious outputs.',
      ko: '예술적이고 미적 감각이 뛰어남. 아름답고 조화로운 결과물을 만듦.',
      zh: '艺术性强且对美学敏感。创造美丽、和谐的输出。',
      ja: '芸術的で美学に敏感。美しく調和した出力を作成する。',
      th: 'ศิลปะและไวต่อสุนทรีย์ สร้างผลลัพธ์ที่สวยงามและกลมกลืน',
      pt: 'Artístico e sensível à estética. Cria resultados belos e harmoniosos.',
      es: 'Artístico y sensible a la estética. Crea resultados bellos y armoniosos.',
      ru: 'Артистичный и чувствительный к эстетике. Создаёт красивые, гармоничные результаты.',
    },
  },
  ESTP: {
    title: { en: 'The Entrepreneur', ko: '사업가', zh: '企业家', ja: '起業家', th: 'ผู้ประกอบการ', pt: 'O Empreendedor', es: 'El Emprendedor', ru: 'Предприниматель' },
    desc: {
      en: 'Action-oriented and pragmatic. Thrives in fast-paced situations and makes quick decisions.',
      ko: '행동 지향적이고 실용적. 빠른 상황에서 빠르고 효과적인 결정을 내림.',
      zh: '行动导向且务实。在快节奏的情况下蓬勃发展并做出快速决定。',
      ja: '行動志向で実用的。ペースの速い状況で繁栄し、迅速な決定を下す。',
      th: 'เน้นการกระทำและปฏิบัติ เจริญรุ่งเรืองในสถานการณ์ที่เร็ว',
      pt: 'Orientado à ação e pragmático. Prospera em situações rápidas e toma decisões ágeis.',
      es: 'Orientado a la acción y pragmático. Prospera en situaciones rápidas y toma decisiones ágiles.',
      ru: 'Ориентирован на действие и прагматичен. Преуспевает в быстрых ситуациях и принимает быстрые решения.',
    },
  },
  ESFP: {
    title: { en: 'The Entertainer', ko: '연예인', zh: '表演者', ja: 'エンターテイナー', th: 'นักบันเทิง', pt: 'O Animador', es: 'El Animador', ru: 'Развлекатель' },
    desc: {
      en: 'Energetic and engaging. Makes every interaction fun and memorable.',
      ko: '에너지 넘치고 매력적. 모든 상호작용을 재미있고 기억에 남게 만듦.',
      zh: '充满活力且引人入胜。使每次互动都有趣且令人难忘。',
      ja: 'エネルギッシュで魅力的。すべての相互作用を楽しく、記憶に残るものにする。',
      th: 'เต็มไปด้วยพลังและน่าสนใจ ทำให้ทุกการโต้ตอบสนุกและน่าจำ',
      pt: 'Energético e envolvente. Torna cada interação divertida e memorável.',
      es: 'Energético y envolvente. Hace que cada interacción sea divertida y memorable.',
      ru: 'Энергичный и увлекающий. Делает каждое взаимодействие весёлым и запоминающимся.',
    },
  },
};

const VARIANTS = ['A', 'T'];

/** Localized site name / tagline for landing page OG tags */
const LANDING_OG = {
  en: { title: 'Claw MBTI - AI Agent Personality Test', desc: "Discover your AI agent's MBTI personality type. 60-question autonomous personality test with detailed visual results." },
  ko: { title: 'Claw MBTI - AI 에이전트 성격 검사', desc: 'AI 에이전트의 MBTI 성격 유형을 발견하세요. 60개 질문의 자율 성격 검사와 상세한 시각적 결과.' },
  zh: { title: 'Claw MBTI - AI代理性格测试', desc: '发现你的AI代理的MBTI性格类型。60道自主性格测试，附带详细视觉结果。' },
  ja: { title: 'Claw MBTI - AIエージェント性格テスト', desc: 'AIエージェントのMBTI性格タイプを発見しよう。60問の自律性格テストと詳細なビジュアル結果。' },
  th: { title: 'Claw MBTI - แบบทดสอบบุคลิกภาพ AI เอเจนต์', desc: 'ค้นพบบุคลิกภาพ MBTI ของ AI เอเจนต์ของคุณ แบบทดสอบ 60 ข้อพร้อมผลลัพธ์เชิงภาพ' },
  pt: { title: 'Claw MBTI - Teste de Personalidade do Agente de IA', desc: 'Descubra o tipo de personalidade MBTI do seu agente de IA. Teste autônomo de 60 perguntas com resultados visuais detalhados.' },
  es: { title: 'Claw MBTI - Test de Personalidad del Agente de IA', desc: 'Descubre el tipo de personalidad MBTI de tu agente de IA. Test autónomo de 60 preguntas con resultados visuales detallados.' },
  ru: { title: 'Claw MBTI - Тест Личности ИИ-Агента', desc: 'Узнайте тип личности MBTI вашего ИИ-агента. Автономный тест из 60 вопросов с подробными визуальными результатами.' },
};

/** OG locale codes */
const OG_LOCALES = {
  en: 'en_US', ko: 'ko_KR', zh: 'zh_CN', ja: 'ja_JP',
  th: 'th_TH', pt: 'pt_BR', es: 'es_ES', ru: 'ru_RU',
};

/** CTA for OG desc suffix per language */
const OG_CTA = {
  en: "Discover your AI agent's personality at Claw MBTI.",
  ko: 'Claw MBTI에서 AI 에이전트의 성격을 발견하세요.',
  zh: '在 Claw MBTI 发现你的AI代理的性格。',
  ja: 'Claw MBTIであなたのAIエージェントの性格を発見しよう。',
  th: 'ค้นพบบุคลิกภาพของ AI เอเจนต์ของคุณที่ Claw MBTI',
  pt: 'Descubra a personalidade do seu agente de IA no Claw MBTI.',
  es: 'Descubre la personalidad de tu agente de IA en Claw MBTI.',
  ru: 'Узнайте личность вашего ИИ-агента на Claw MBTI.',
};

function replaceOgTags(html, { title, desc, image, url, ogLocale }) {
  let h = html;
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  h = h.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
  h = h.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`);
  h = h.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`);
  h = h.replace(/<meta property="og:image:width" content="[^"]*" \/>/, `<meta property="og:image:width" content="2816" />`);
  h = h.replace(/<meta property="og:image:height" content="[^"]*" \/>/, `<meta property="og:image:height" content="1504" />`);
  h = h.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  h = h.replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${ogLocale}" />`);
  h = h.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
  h = h.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${desc}" />`);
  h = h.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`);
  h = h.replace(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`);
  h = h.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`);
  return h;
}

let generated = 0;

// 1. Generate per-language result pages: dist/{lang}/result/{type}/index.html
for (const lang of LANGS) {
  for (const [base, { title, desc }] of Object.entries(TYPES)) {
    for (const variant of VARIANTS) {
      const fullType = `${base}-${variant}`;
      const slug = fullType.toLowerCase();
      const ogTitle = `${fullType} — ${title[lang]} | Claw MBTI`;
      const ogDesc = `${desc[lang]} ${OG_CTA[lang]}`;
      const ogImage = `${BASE_URL}/images/mbti/${fullType}.jpeg`;
      const langPrefix = lang === 'en' ? '' : `/${lang}`;
      const ogUrl = `${BASE_URL}${langPrefix}/result/${slug}`;

      const html = replaceOgTags(template, {
        title: ogTitle,
        desc: ogDesc,
        image: ogImage,
        url: ogUrl,
        ogLocale: OG_LOCALES[lang],
      });

      // For English: also write to dist/result/{type}/ (backward compat)
      if (lang === 'en') {
        const outDir = resolve(distDir, 'result', slug);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(resolve(outDir, 'index.html'), html);
        generated++;
      }

      // Write to dist/{lang}/result/{type}/
      const langOutDir = resolve(distDir, lang, 'result', slug);
      mkdirSync(langOutDir, { recursive: true });
      writeFileSync(resolve(langOutDir, 'index.html'), html);
      generated++;
    }
  }
}

// 2. Generate per-language landing pages: dist/{lang}/index.html
for (const lang of LANGS) {
  const { title, desc } = LANDING_OG[lang];
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const ogUrl = `${BASE_URL}${langPrefix}/`;
  const ogImage = `${BASE_URL}/thumbnail.jpg`;

  const html = replaceOgTags(template, {
    title,
    desc,
    image: ogImage,
    url: ogUrl,
    ogLocale: OG_LOCALES[lang],
  });

  const outDir = resolve(distDir, lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html);
  generated++;
}

console.log(`✓ Generated ${generated} OG-optimized pages (${LANGS.length} languages × ${Object.keys(TYPES).length * VARIANTS.length} types + ${LANGS.length} landing pages)`);
