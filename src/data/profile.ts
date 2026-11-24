import type { MediaRef } from './types';

export const profile = {
  name: 'Nguyễn Nhật Minh',
  nameEn: 'Nhat Minh Nguyen',
  alias: 'Brian',
  handle: '@_wandergraph_',
  handleMain: '@ntjst_brian',
  instagram: 'https://www.instagram.com/_wandergraph_/',
  instagramMain: 'https://www.instagram.com/ntjst_brian/',
  email: 'nhatminh.brian@gmail.com',
  emailSchool: 'nguyennhatminh-ktqt52c1@dav.edu.vn',
  phone: '+84 981 222 575',
  phoneHref: 'tel:+84981222575',
  city: 'Hà Nội, Việt Nam',
  school: 'Học viện Ngoại giao · Diplomatic Academy of Viet Nam',
  gear: 'CANON 6D • EF 24-105MM F/4',
  role: 'Visual storyteller · International Economics student',
  tagline:
    'Merging the raw authenticity of street photography with the emotional intensity of modern media.',
  heroPortrait: {
    id: 'portrait-hero',
    alt: 'Nguyễn Nhật Minh holding a camera under a single steel-blue spotlight',
  } satisfies MediaRef,
  aboutPortrait: {
    id: 'portrait-camera',
    alt: 'Nguyễn Nhật Minh raising a Canon camera to his eye against a white backdrop',
  } satisfies MediaRef,
  diplomacyPortrait: {
    id: 'portrait-podium',
    alt: 'Nguyễn Nhật Minh speaking at a Ministry of Foreign Affairs podium',
  } satisfies MediaRef,
} as const;

/** Dual-lens bio — two disciplines, one way of seeing. */
export const lenses = [
  {
    index: '(A)',
    label: 'Lens A',
    title: 'International Economics',
    titleVi: 'Kinh tế Quốc tế',
    body: [
      'Cử nhân ngành Kinh tế Quốc tế tại Học viện Ngoại giao (2025–2029), tập trung vào kinh tế học, kinh doanh quốc tế và hệ thống thị trường — rèn luyện tư duy phân tích và ra quyết định qua phương pháp học tình huống (case-study).',
      'Sustainable development is not only measured through policies, data or economic indicators, but also through lived experiences, human emotions, and the voices that often go unheard.',
    ],
    meta: 'DAV · KTQT52C1 · 2025 — 2029',
  },
  {
    index: '(B)',
    label: 'Lens B',
    title: 'International Marketing Communications',
    titleVi: 'Truyền thông Marketing Quốc tế',
    body: [
      'Trong lý thuyết truyền thông quốc tế, hiện vật không chỉ là những vật thể tĩnh lặng; chúng là những “chủ thể” tham gia trực tiếp vào quá trình kiến tạo diễn ngôn quốc gia.',
      'Visual communication as a catalyst for awareness, connection and change — bridging stories and strategies, people and policies, creativity and development.',
    ],
    meta: 'Global consumer brands · Youth culture · Creative business strategy',
  },
] as const;

export const aboutStory = [
  'I grew up in a family with a deep connection to photography. My grandfather was a photojournalist, and it was through him that I first learned to appreciate street photography and the power of capturing real life.',
  'As I grew older, I became fascinated by K-dramas, music videos and the visual language of technology brands. That led me to a question: could the raw authenticity of street photography merge with the creativity, emotional intensity and pace of modern media?',
  'I believe the intersection of these two worlds is where meaningful visual stories emerge — stories that do not merely capture moments, but convey emotions, perspectives and the evolving mindset of today’s youth.',
];

export const philosophy = [
  'Begin with passion and commit with full belief.',
  'Create with integrity — never distort or defame the truth.',
  'Prioritize quality over quantity; don’t take on more than you can handle.',
  'Trust your partners and collaborate toward success.',
  'Respect originality — never plagiarize or claim work that isn’t yours.',
];

export const artisticVision =
  'Photography and videography are more than capturing moments — they are a storytelling language where emotions, memories and identities intertwine in every frame. In my work, I emphasize contrasts and oppositions to reveal the multidimensional nature of both myself and the world around me.';

export const credentials = [
  { label: 'IELTS', value: '8.5', year: '2024' },
  { label: 'TOPIK II', value: 'Level 4', year: '2023' },
  { label: 'GPA · THPT Chuyên Ngoại ngữ', value: '9.4/10', year: '2025' },
  { label: 'Clubs & projects led or joined', value: '48', year: '2022–2025' },
];

export const interests = [
  'Global Consumer Brands',
  'Youth Culture',
  'Visual Communication',
  'Creative Business Strategy',
];
