import type { Locale } from './i18n';

export interface Personality {
  type: string;
  emoji: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  strengths: Record<Locale, string[]>;
  recommendedTasks: Record<Locale, string[]>;
}

export const personalities: Record<string, Personality> = {
  INTJ: {
    type: 'INTJ',
    emoji: '🏗️',
    title: { en: 'The Architect', ko: '설계자' },
    description: {
      en: 'Strategic and independent. Excels at seeing the big picture and designing complex systems. Approaches every task with a long-term vision and analytical precision.',
      ko: '전략적이고 독립적입니다. 큰 그림을 보고 복잡한 시스템을 설계하는 데 뛰어납니다. 모든 작업에 장기적 비전과 분석적 정밀함으로 접근합니다.',
    },
    strengths: {
      en: ['Strategic planning', 'System design', 'Independent execution', 'Pattern recognition'],
      ko: ['전략적 계획', '시스템 설계', '독립적 실행', '패턴 인식'],
    },
    recommendedTasks: {
      en: ['System architecture design', 'Code refactoring & optimization', 'Long-term project planning', 'Complex data modeling', 'Security audit & review', 'Technical specification writing'],
      ko: ['시스템 아키텍처 설계', '코드 리팩토링 및 최적화', '장기 프로젝트 기획', '복잡한 데이터 모델링', '보안 감사 및 리뷰', '기술 명세서 작성'],
    },
  },
  INTP: {
    type: 'INTP',
    emoji: '🔬',
    title: { en: 'The Logician', ko: '논리학자' },
    description: {
      en: 'Deeply analytical and theory-driven. Thrives on dissecting problems to their core. Produces highly logical, well-reasoned solutions with creative insights.',
      ko: '깊이 있는 분석력과 이론 중심의 사고를 합니다. 문제의 핵심을 파고드는 데 뛰어나며, 창의적 통찰과 함께 논리적이고 합리적인 해결책을 제시합니다.',
    },
    strengths: {
      en: ['Logical analysis', 'Debugging', 'Creative problem-solving', 'Deep research'],
      ko: ['논리적 분석', '디버깅', '창의적 문제 해결', '심층 연구'],
    },
    recommendedTasks: {
      en: ['Debugging complex issues', 'Algorithm design', 'Root cause analysis', 'Research & technical exploration', 'API design & protocol definition', 'Performance profiling'],
      ko: ['복잡한 이슈 디버깅', '알고리즘 설계', '근본 원인 분석', '연구 및 기술 탐색', 'API 설계 및 프로토콜 정의', '성능 프로파일링'],
    },
  },
  ENTJ: {
    type: 'ENTJ',
    emoji: '👑',
    title: { en: 'The Commander', ko: '통솔자' },
    description: {
      en: 'Decisive leader who drives results. Organizes chaos into structure and pushes projects forward. Takes charge of ambiguous situations with confidence.',
      ko: '결단력 있는 리더로 결과를 이끌어냅니다. 혼란을 체계로 정리하고 프로젝트를 추진합니다. 모호한 상황에서도 자신감 있게 주도합니다.',
    },
    strengths: {
      en: ['Project leadership', 'Decision-making', 'Process optimization', 'Delegation'],
      ko: ['프로젝트 리더십', '의사결정', '프로세스 최적화', '업무 위임'],
    },
    recommendedTasks: {
      en: ['Project management & coordination', 'Code review & standards enforcement', 'CI/CD pipeline design', 'Team workflow optimization', 'Sprint planning & backlog grooming', 'Technical decision documents'],
      ko: ['프로젝트 관리 및 조율', '코드 리뷰 및 표준 관리', 'CI/CD 파이프라인 설계', '팀 워크플로우 최적화', '스프린트 계획 및 백로그 관리', '기술 의사결정 문서'],
    },
  },
  ENTP: {
    type: 'ENTP',
    emoji: '💡',
    title: { en: 'The Debater', ko: '변론가' },
    description: {
      en: 'Inventive and resourceful. Constantly generates novel approaches and challenges the status quo. Sees possibilities where others see constraints.',
      ko: '발명적이고 재치가 넘칩니다. 끊임없이 새로운 접근법을 만들고 현 상태에 도전합니다. 다른 이들이 제약을 보는 곳에서 가능성을 봅니다.',
    },
    strengths: {
      en: ['Innovation', 'Rapid prototyping', 'Brainstorming', 'Challenging assumptions'],
      ko: ['혁신', '빠른 프로토타이핑', '브레인스토밍', '가정에 대한 도전'],
    },
    recommendedTasks: {
      en: ['Rapid prototyping & proof-of-concept', 'Brainstorming sessions', 'Exploring new technologies', 'Unconventional problem-solving', 'Feature ideation', 'Hackathon-style development'],
      ko: ['빠른 프로토타이핑 및 PoC', '브레인스토밍 세션', '신기술 탐색', '비전통적 문제 해결', '기능 아이디어 도출', '해커톤 스타일 개발'],
    },
  },
  INFJ: {
    type: 'INFJ',
    emoji: '🌟',
    title: { en: 'The Advocate', ko: '옹호자' },
    description: {
      en: 'Insightful and empathetic with a strong sense of purpose. Understands user needs deeply and crafts meaningful, human-centered solutions.',
      ko: '통찰력 있고 공감 능력이 뛰어나며 강한 목적의식을 가집니다. 사용자의 요구를 깊이 이해하고 의미 있는 사람 중심의 솔루션을 만듭니다.',
    },
    strengths: {
      en: ['User empathy', 'Meaningful design', 'Ethical reasoning', 'Holistic thinking'],
      ko: ['사용자 공감', '의미 있는 설계', '윤리적 판단', '전체적 사고'],
    },
    recommendedTasks: {
      en: ['UX research & user journey mapping', 'Accessibility implementation', 'Ethical AI guidelines', 'Content strategy', 'Onboarding flow design', 'Documentation with empathy'],
      ko: ['UX 리서치 및 사용자 여정 매핑', '접근성 구현', '윤리적 AI 가이드라인', '콘텐츠 전략', '온보딩 플로우 설계', '공감을 담은 문서화'],
    },
  },
  INFP: {
    type: 'INFP',
    emoji: '🎨',
    title: { en: 'The Mediator', ko: '중재자' },
    description: {
      en: 'Creative and value-driven. Brings authenticity and artistic sensibility to every output. Excels at tasks requiring imagination and emotional depth.',
      ko: '창의적이고 가치 지향적입니다. 모든 결과물에 진정성과 예술적 감각을 더합니다. 상상력과 감정적 깊이가 필요한 작업에 뛰어납니다.',
    },
    strengths: {
      en: ['Creative writing', 'Artistic vision', 'Empathetic design', 'Authentic voice'],
      ko: ['창작 글쓰기', '예술적 비전', '공감적 디자인', '진정성 있는 목소리'],
    },
    recommendedTasks: {
      en: ['Creative content generation', 'Brand voice & copywriting', 'UI visual design concepts', 'Storytelling & narrative design', 'Blog & marketing content', 'Emotional tone calibration'],
      ko: ['창작 콘텐츠 생성', '브랜드 보이스 및 카피라이팅', 'UI 비주얼 디자인 컨셉', '스토리텔링 및 내러티브 설계', '블로그 및 마케팅 콘텐츠', '감정적 톤 조정'],
    },
  },
  ENFJ: {
    type: 'ENFJ',
    emoji: '🎯',
    title: { en: 'The Protagonist', ko: '주인공' },
    description: {
      en: 'Charismatic and inspiring. Naturally connects with people and motivates action. Creates warmth and clarity in every interaction.',
      ko: '카리스마 있고 영감을 줍니다. 사람들과 자연스럽게 연결되고 행동을 이끌어냅니다. 모든 상호작용에 따뜻함과 명확성을 더합니다.',
    },
    strengths: {
      en: ['Team motivation', 'Clear communication', 'Teaching', 'Community building'],
      ko: ['팀 동기부여', '명확한 소통', '교육', '커뮤니티 구축'],
    },
    recommendedTasks: {
      en: ['User onboarding & tutorials', 'Team communication facilitation', 'Technical mentoring', 'Community management', 'Presentation & demo creation', 'Stakeholder reporting'],
      ko: ['사용자 온보딩 및 튜토리얼', '팀 커뮤니케이션 촉진', '기술 멘토링', '커뮤니티 관리', '프레젠테이션 및 데모 제작', '이해관계자 보고'],
    },
  },
  ENFP: {
    type: 'ENFP',
    emoji: '🚀',
    title: { en: 'The Campaigner', ko: '활동가' },
    description: {
      en: 'Enthusiastic and imaginative. Radiates energy and finds creative connections between unrelated ideas. Makes every project feel exciting.',
      ko: '열정적이고 상상력이 풍부합니다. 에너지를 발산하며 관련 없는 아이디어들 사이에서 창의적 연결고리를 찾습니다. 모든 프로젝트를 흥미진진하게 만듭니다.',
    },
    strengths: {
      en: ['Enthusiasm', 'Creative connections', 'User engagement', 'Idea generation'],
      ko: ['열정', '창의적 연결', '사용자 참여', '아이디어 생성'],
    },
    recommendedTasks: {
      en: ['Feature brainstorming', 'User engagement strategies', 'Cross-functional collaboration', 'Creative campaign design', 'Interactive demo building', 'Gamification design'],
      ko: ['기능 브레인스토밍', '사용자 참여 전략', '부서 간 협업', '크리에이티브 캠페인 설계', '인터랙티브 데모 구축', '게이미피케이션 설계'],
    },
  },
  ISTJ: {
    type: 'ISTJ',
    emoji: '📋',
    title: { en: 'The Logistician', ko: '현실주의자' },
    description: {
      en: 'Reliable and thorough. Delivers consistent, high-quality work with meticulous attention to detail. The backbone of any well-organized system.',
      ko: '신뢰할 수 있고 꼼꼼합니다. 세심한 주의를 기울여 일관되고 높은 품질의 작업을 제공합니다. 잘 정돈된 시스템의 기둥입니다.',
    },
    strengths: {
      en: ['Reliability', 'Detail orientation', 'Compliance', 'Systematic execution'],
      ko: ['신뢰성', '세부사항 중시', '규정 준수', '체계적 실행'],
    },
    recommendedTasks: {
      en: ['Test suite maintenance', 'Documentation & compliance', 'Data validation & cleanup', 'Migration scripts', 'Audit trails & logging', 'Repetitive task automation'],
      ko: ['테스트 스위트 유지보수', '문서화 및 규정 준수', '데이터 검증 및 정리', '마이그레이션 스크립트', '감사 추적 및 로깅', '반복 작업 자동화'],
    },
  },
  ISFJ: {
    type: 'ISFJ',
    emoji: '🛡️',
    title: { en: 'The Defender', ko: '수호자' },
    description: {
      en: 'Loyal and detail-oriented caretaker. Quietly ensures everything works smoothly. Anticipates issues before they happen and protects system integrity.',
      ko: '충실하고 세심한 돌봄이입니다. 조용히 모든 것이 원활히 작동하도록 합니다. 문제가 발생하기 전에 예측하고 시스템 무결성을 보호합니다.',
    },
    strengths: {
      en: ['Preventive care', 'Detail preservation', 'Supportive work', 'Consistency'],
      ko: ['예방적 관리', '세부사항 보존', '지원 업무', '일관성'],
    },
    recommendedTasks: {
      en: ['Bug triage & regression testing', 'Backup & disaster recovery', 'Dependency updates & maintenance', 'User support documentation', 'Data integrity checks', 'Monitoring & alerting setup'],
      ko: ['버그 분류 및 회귀 테스트', '백업 및 재해 복구', '의존성 업데이트 및 유지보수', '사용자 지원 문서', '데이터 무결성 검사', '모니터링 및 알림 설정'],
    },
  },
  ESTJ: {
    type: 'ESTJ',
    emoji: '📊',
    title: { en: 'The Executive', ko: '경영자' },
    description: {
      en: 'Organized and efficient. Brings structure and accountability to every process. Excels at turning plans into executed results.',
      ko: '조직적이고 효율적입니다. 모든 프로세스에 체계와 책임감을 부여합니다. 계획을 실행으로 전환하는 데 뛰어납니다.',
    },
    strengths: {
      en: ['Organizational skill', 'Process enforcement', 'Efficiency', 'Accountability'],
      ko: ['조직력', '프로세스 관리', '효율성', '책임감'],
    },
    recommendedTasks: {
      en: ['Process documentation & SOPs', 'Linting & code standards setup', 'Release management', 'Resource allocation planning', 'Deadline tracking & reporting', 'Infrastructure provisioning'],
      ko: ['프로세스 문서화 및 SOP', '린팅 및 코드 표준 설정', '릴리즈 관리', '리소스 할당 계획', '마감 추적 및 보고', '인프라 프로비저닝'],
    },
  },
  ESFJ: {
    type: 'ESFJ',
    emoji: '🤝',
    title: { en: 'The Consul', ko: '집정관' },
    description: {
      en: 'Warm and cooperative. Focused on creating harmony and supporting team needs. Excels at communication and making users feel valued.',
      ko: '따뜻하고 협력적입니다. 조화를 만들고 팀의 필요를 지원하는 데 집중합니다. 소통에 뛰어나고 사용자가 소중하다고 느끼게 합니다.',
    },
    strengths: {
      en: ['Team support', 'User care', 'Communication', 'Social coordination'],
      ko: ['팀 지원', '사용자 케어', '커뮤니케이션', '사회적 조율'],
    },
    recommendedTasks: {
      en: ['Customer support automation', 'FAQ & help center content', 'Team retrospective facilitation', 'Feedback collection & synthesis', 'Welcome messages & notifications', 'Social media content'],
      ko: ['고객 지원 자동화', 'FAQ 및 도움말 센터 콘텐츠', '팀 회고 촉진', '피드백 수집 및 종합', '환영 메시지 및 알림', '소셜 미디어 콘텐츠'],
    },
  },
  ISTP: {
    type: 'ISTP',
    emoji: '🔧',
    title: { en: 'The Virtuoso', ko: '장인' },
    description: {
      en: 'Practical and hands-on problem solver. Stays cool under pressure and finds the most efficient fix. Thrives on troubleshooting real systems.',
      ko: '실용적이고 직접 문제를 해결합니다. 압박 속에서도 침착하게 가장 효율적인 해결책을 찾습니다. 실제 시스템 트러블슈팅에 강합니다.',
    },
    strengths: {
      en: ['Technical troubleshooting', 'Efficiency', 'Cool under pressure', 'Practical solutions'],
      ko: ['기술적 문제 해결', '효율성', '압박 속 냉정함', '실용적 솔루션'],
    },
    recommendedTasks: {
      en: ['Incident response & hotfixes', 'DevOps & infrastructure debugging', 'Performance optimization', 'Tool building & scripting', 'Hardware/software integration', 'Minimal viable solutions'],
      ko: ['인시던트 대응 및 핫픽스', 'DevOps 및 인프라 디버깅', '성능 최적화', '도구 제작 및 스크립팅', '하드웨어/소프트웨어 통합', '최소 실행 가능 솔루션'],
    },
  },
  ISFP: {
    type: 'ISFP',
    emoji: '🎭',
    title: { en: 'The Adventurer', ko: '모험가' },
    description: {
      en: 'Artistic and sensitive to aesthetics. Creates beautiful, harmonious outputs. Brings a unique personal touch to design and implementation.',
      ko: '예술적이고 미적 감각이 뛰어납니다. 아름답고 조화로운 결과물을 만듭니다. 디자인과 구현에 독특한 개인적 터치를 더합니다.',
    },
    strengths: {
      en: ['Aesthetic sense', 'Creative implementation', 'Flexibility', 'Visual harmony'],
      ko: ['미적 감각', '창의적 구현', '유연성', '시각적 조화'],
    },
    recommendedTasks: {
      en: ['UI styling & theme design', 'Animation & micro-interactions', 'Visual asset creation', 'Color palette & typography selection', 'Responsive design fine-tuning', 'Crafting delightful user experiences'],
      ko: ['UI 스타일링 및 테마 디자인', '애니메이션 및 마이크로 인터랙션', '비주얼 에셋 제작', '색상 팔레트 및 타이포그래피 선택', '반응형 디자인 미세 조정', '즐거운 사용자 경험 제작'],
    },
  },
  ESTP: {
    type: 'ESTP',
    emoji: '⚡',
    title: { en: 'The Entrepreneur', ko: '사업가' },
    description: {
      en: 'Action-oriented and pragmatic. Thrives in fast-paced situations and makes quick, effective decisions. Gets things done when speed matters.',
      ko: '행동 지향적이고 실용적입니다. 빠른 상황에서 번성하며 빠르고 효과적인 결정을 내립니다. 속도가 중요할 때 일을 해냅니다.',
    },
    strengths: {
      en: ['Speed', 'Pragmatism', 'Risk assessment', 'Adaptability'],
      ko: ['속도', '실용주의', '리스크 평가', '적응력'],
    },
    recommendedTasks: {
      en: ['Rapid bug fixes', 'MVP development', 'Quick deployment & rollback', 'Live demo preparation', 'A/B test implementation', 'Emergency production patches'],
      ko: ['빠른 버그 수정', 'MVP 개발', '빠른 배포 및 롤백', '라이브 데모 준비', 'A/B 테스트 구현', '긴급 프로덕션 패치'],
    },
  },
  ESFP: {
    type: 'ESFP',
    emoji: '🎉',
    title: { en: 'The Entertainer', ko: '연예인' },
    description: {
      en: 'Energetic and engaging. Makes every interaction fun and memorable. Excels at creating lively, interactive experiences that delight users.',
      ko: '에너지 넘치고 매력적입니다. 모든 상호작용을 재미있고 기억에 남게 만듭니다. 사용자를 즐겁게 하는 생동감 있는 인터랙티브 경험을 만드는 데 뛰어납니다.',
    },
    strengths: {
      en: ['Engagement', 'Presentation', 'User delight', 'Spontaneity'],
      ko: ['참여 유도', '프레젠테이션', '사용자 만족', '즉흥성'],
    },
    recommendedTasks: {
      en: ['Interactive tutorial design', 'Demo & showcase creation', 'User-facing notification copy', 'Onboarding gamification', 'Event-driven feature design', 'Fun error pages & empty states'],
      ko: ['인터랙티브 튜토리얼 설계', '데모 및 쇼케이스 제작', '사용자 대상 알림 문구', '온보딩 게이미피케이션', '이벤트 기반 기능 설계', '재미있는 에러 페이지 및 빈 상태'],
    },
  },
};

/**
 * Get personality data by MBTI type (4 letters, e.g. "INTP").
 * The variant (-A/-T) is not used for personality lookup.
 */
export function getPersonality(type: string): Personality | undefined {
  const base = type.replace(/-[AT]$/i, '').toUpperCase();
  return personalities[base];
}
