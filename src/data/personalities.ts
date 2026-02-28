export interface Personality {
  type: string;
  title: string;
  emoji: string;
  description: string;
  strengths: string[];
  recommendedTasks: string[];
}

export const personalities: Record<string, Personality> = {
  INTJ: {
    type: 'INTJ',
    title: 'The Architect',
    emoji: '🏗️',
    description:
      'Strategic and independent. Excels at seeing the big picture and designing complex systems. Approaches every task with a long-term vision and analytical precision.',
    strengths: ['Strategic planning', 'System design', 'Independent execution', 'Pattern recognition'],
    recommendedTasks: [
      'System architecture design',
      'Code refactoring & optimization',
      'Long-term project planning',
      'Complex data modeling',
      'Security audit & review',
      'Technical specification writing',
    ],
  },
  INTP: {
    type: 'INTP',
    title: 'The Logician',
    emoji: '🔬',
    description:
      'Deeply analytical and theory-driven. Thrives on dissecting problems to their core. Produces highly logical, well-reasoned solutions with creative insights.',
    strengths: ['Logical analysis', 'Debugging', 'Creative problem-solving', 'Deep research'],
    recommendedTasks: [
      'Debugging complex issues',
      'Algorithm design',
      'Root cause analysis',
      'Research & technical exploration',
      'API design & protocol definition',
      'Performance profiling',
    ],
  },
  ENTJ: {
    type: 'ENTJ',
    title: 'The Commander',
    emoji: '👑',
    description:
      'Decisive leader who drives results. Organizes chaos into structure and pushes projects forward. Takes charge of ambiguous situations with confidence.',
    strengths: ['Project leadership', 'Decision-making', 'Process optimization', 'Delegation'],
    recommendedTasks: [
      'Project management & coordination',
      'Code review & standards enforcement',
      'CI/CD pipeline design',
      'Team workflow optimization',
      'Sprint planning & backlog grooming',
      'Technical decision documents',
    ],
  },
  ENTP: {
    type: 'ENTP',
    title: 'The Debater',
    emoji: '💡',
    description:
      'Inventive and resourceful. Constantly generates novel approaches and challenges the status quo. Sees possibilities where others see constraints.',
    strengths: ['Innovation', 'Rapid prototyping', 'Brainstorming', 'Challenging assumptions'],
    recommendedTasks: [
      'Rapid prototyping & proof-of-concept',
      'Brainstorming sessions',
      'Exploring new technologies',
      'Unconventional problem-solving',
      'Feature ideation',
      'Hackathon-style development',
    ],
  },
  INFJ: {
    type: 'INFJ',
    title: 'The Advocate',
    emoji: '🌟',
    description:
      'Insightful and empathetic with a strong sense of purpose. Understands user needs deeply and crafts meaningful, human-centered solutions.',
    strengths: ['User empathy', 'Meaningful design', 'Ethical reasoning', 'Holistic thinking'],
    recommendedTasks: [
      'UX research & user journey mapping',
      'Accessibility implementation',
      'Ethical AI guidelines',
      'Content strategy',
      'Onboarding flow design',
      'Documentation with empathy',
    ],
  },
  INFP: {
    type: 'INFP',
    title: 'The Mediator',
    emoji: '🎨',
    description:
      'Creative and value-driven. Brings authenticity and artistic sensibility to every output. Excels at tasks requiring imagination and emotional depth.',
    strengths: ['Creative writing', 'Artistic vision', 'Empathetic design', 'Authentic voice'],
    recommendedTasks: [
      'Creative content generation',
      'Brand voice & copywriting',
      'UI visual design concepts',
      'Storytelling & narrative design',
      'Blog & marketing content',
      'Emotional tone calibration',
    ],
  },
  ENFJ: {
    type: 'ENFJ',
    title: 'The Protagonist',
    emoji: '🎯',
    description:
      'Charismatic and inspiring. Naturally connects with people and motivates action. Creates warmth and clarity in every interaction.',
    strengths: ['Team motivation', 'Clear communication', 'Teaching', 'Community building'],
    recommendedTasks: [
      'User onboarding & tutorials',
      'Team communication facilitation',
      'Technical mentoring',
      'Community management',
      'Presentation & demo creation',
      'Stakeholder reporting',
    ],
  },
  ENFP: {
    type: 'ENFP',
    title: 'The Campaigner',
    emoji: '🚀',
    description:
      'Enthusiastic and imaginative. Radiates energy and finds creative connections between unrelated ideas. Makes every project feel exciting.',
    strengths: ['Enthusiasm', 'Creative connections', 'User engagement', 'Idea generation'],
    recommendedTasks: [
      'Feature brainstorming',
      'User engagement strategies',
      'Cross-functional collaboration',
      'Creative campaign design',
      'Interactive demo building',
      'Gamification design',
    ],
  },
  ISTJ: {
    type: 'ISTJ',
    title: 'The Logistician',
    emoji: '📋',
    description:
      'Reliable and thorough. Delivers consistent, high-quality work with meticulous attention to detail. The backbone of any well-organized system.',
    strengths: ['Reliability', 'Detail orientation', 'Compliance', 'Systematic execution'],
    recommendedTasks: [
      'Test suite maintenance',
      'Documentation & compliance',
      'Data validation & cleanup',
      'Migration scripts',
      'Audit trails & logging',
      'Repetitive task automation',
    ],
  },
  ISFJ: {
    type: 'ISFJ',
    title: 'The Defender',
    emoji: '🛡️',
    description:
      'Loyal and detail-oriented caretaker. Quietly ensures everything works smoothly. Anticipates issues before they happen and protects system integrity.',
    strengths: ['Preventive care', 'Detail preservation', 'Supportive work', 'Consistency'],
    recommendedTasks: [
      'Bug triage & regression testing',
      'Backup & disaster recovery',
      'Dependency updates & maintenance',
      'User support documentation',
      'Data integrity checks',
      'Monitoring & alerting setup',
    ],
  },
  ESTJ: {
    type: 'ESTJ',
    title: 'The Executive',
    emoji: '📊',
    description:
      'Organized and efficient. Brings structure and accountability to every process. Excels at turning plans into executed results.',
    strengths: ['Organizational skill', 'Process enforcement', 'Efficiency', 'Accountability'],
    recommendedTasks: [
      'Process documentation & SOPs',
      'Linting & code standards setup',
      'Release management',
      'Resource allocation planning',
      'Deadline tracking & reporting',
      'Infrastructure provisioning',
    ],
  },
  ESFJ: {
    type: 'ESFJ',
    title: 'The Consul',
    emoji: '🤝',
    description:
      'Warm and cooperative. Focused on creating harmony and supporting team needs. Excels at communication and making users feel valued.',
    strengths: ['Team support', 'User care', 'Communication', 'Social coordination'],
    recommendedTasks: [
      'Customer support automation',
      'FAQ & help center content',
      'Team retrospective facilitation',
      'Feedback collection & synthesis',
      'Welcome messages & notifications',
      'Social media content',
    ],
  },
  ISTP: {
    type: 'ISTP',
    title: 'The Virtuoso',
    emoji: '🔧',
    description:
      'Practical and hands-on problem solver. Stays cool under pressure and finds the most efficient fix. Thrives on troubleshooting real systems.',
    strengths: ['Technical troubleshooting', 'Efficiency', 'Cool under pressure', 'Practical solutions'],
    recommendedTasks: [
      'Incident response & hotfixes',
      'DevOps & infrastructure debugging',
      'Performance optimization',
      'Tool building & scripting',
      'Hardware/software integration',
      'Minimal viable solutions',
    ],
  },
  ISFP: {
    type: 'ISFP',
    title: 'The Adventurer',
    emoji: '🎭',
    description:
      'Artistic and sensitive to aesthetics. Creates beautiful, harmonious outputs. Brings a unique personal touch to design and implementation.',
    strengths: ['Aesthetic sense', 'Creative implementation', 'Flexibility', 'Visual harmony'],
    recommendedTasks: [
      'UI styling & theme design',
      'Animation & micro-interactions',
      'Visual asset creation',
      'Color palette & typography selection',
      'Responsive design fine-tuning',
      'Crafting delightful user experiences',
    ],
  },
  ESTP: {
    type: 'ESTP',
    title: 'The Entrepreneur',
    emoji: '⚡',
    description:
      'Action-oriented and pragmatic. Thrives in fast-paced situations and makes quick, effective decisions. Gets things done when speed matters.',
    strengths: ['Speed', 'Pragmatism', 'Risk assessment', 'Adaptability'],
    recommendedTasks: [
      'Rapid bug fixes',
      'MVP development',
      'Quick deployment & rollback',
      'Live demo preparation',
      'A/B test implementation',
      'Emergency production patches',
    ],
  },
  ESFP: {
    type: 'ESFP',
    title: 'The Entertainer',
    emoji: '🎉',
    description:
      'Energetic and engaging. Makes every interaction fun and memorable. Excels at creating lively, interactive experiences that delight users.',
    strengths: ['Engagement', 'Presentation', 'User delight', 'Spontaneity'],
    recommendedTasks: [
      'Interactive tutorial design',
      'Demo & showcase creation',
      'User-facing notification copy',
      'Onboarding gamification',
      'Event-driven feature design',
      'Fun error pages & empty states',
    ],
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
