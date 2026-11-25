/**
 * Credits for the cinema-archival showcase cards (Featured Works, /portfolios, /gallery).
 * Keyed by edition slug or gallery collection slug. Quotes are Minh's own words from the PDFs.
 */
export type ShowcaseCredit = {
  year: string;
  role: string;
  yearSemester: string;
  gearClient: string;
  specs: string;
  quote: string;
};

export const editionCredits: Record<string, ShowcaseCredit> = {
  project: {
    year: '2025',
    role: 'Author · Photographer · Designer',
    yearSemester: '2024–2025 · Kì 2',
    gearClient: 'UIC · Yonsei University',
    specs: '42PP · EN',
    quote: 'Photography is not just my passion but my way of expressing perspectives and identities.',
  },
  sseayp: {
    year: '2026',
    role: 'Media collaborator · Photographer',
    yearSemester: '2025–2026 · Kì 2',
    gearClient: 'SSEAYP 49th Viet Nam Contingent',
    specs: '16PP · 4 ACTS',
    quote: 'Behind the lens, my mission was never just to document schedules. I wanted to freeze time.',
  },
  'nhan-quan-the-ky': {
    year: '2026',
    role: 'Photographer · Art direction',
    yearSemester: '2025–2026 · Kì 2',
    gearClient: 'Đại cương truyền thông quốc tế',
    specs: '12PP · VI',
    quote: 'Mỗi vết xước, một thế kỷ.',
  },
};

export const collectionCredits: Record<string, ShowcaseCredit> = {
  sseayp: {
    year: '2026',
    role: 'Event photographer',
    yearSemester: '2025–2026 · Kì 2',
    gearClient: 'Canon 6D · EF 24-105mm f/4',
    specs: 'Event · 29 frames',
    quote: 'Through my viewfinder, it is an ecosystem of raw emotions.',
  },
  'doan-thanh-nien-hvng': {
    year: '2026',
    role: 'Collaborator · Photographer',
    yearSemester: '2025–2026 · Kì 1',
    gearClient: 'D.A.V Youth Union',
    specs: 'Client · 12 frames',
    quote: 'A place I deeply and proudly call “Home”.',
  },
  'street-heritage': {
    year: '2023–26',
    role: 'Street & documentary',
    yearSemester: 'Personal archive',
    gearClient: 'Canon 6D · EF 24-105mm f/4',
    specs: 'Personal · 21 frames',
    quote: 'My grandfather was a photojournalist. Through him I learned the power of capturing real life.',
  },
  'concept-studio': {
    year: '2023–25',
    role: 'Concept · Lighting · Post',
    yearSemester: '2022–2025',
    gearClient: 'VAXcine crew · Jan21st Studio',
    specs: 'Studio · 37 frames',
    quote: 'If Red Sun is the relentless pursuit, then Blue Moon is the quiet surrender.',
  },
  'youth-events': {
    year: '2022–25',
    role: 'Event recap photographer',
    yearSemester: '2022–2025',
    gearClient: 'THPT Chuyên Ngoại ngữ clubs',
    specs: 'Event · 22 frames',
    quote: 'As an “observer,” my responsibility is to capture these moments as truthfully as possible.',
  },
};
