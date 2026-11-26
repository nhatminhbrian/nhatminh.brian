import type { GalleryCollection, MediaRef } from './types';

const refs = (ids: string[], alt: string): MediaRef[] =>
  ids.map((id, i) => ({ id, alt: `${alt} - frame ${String(i + 1).padStart(2, '0')}` }));

const range = (prefix: string, parts: string[]) => parts.map((p) => `${prefix}-${p}`);

export const sseaypActs = {
  act1: range('sseayp', ['003-004', '003-005', '004-006', '004-007', '004-008', '004-009', '005-010', '005-011', '005-012', '005-013', '005-014', '005-015', '006-016', '006-017']),
  act2: range('sseayp', ['007-018', '007-019', '008-020', '008-021', '008-022', '009-023', '009-024', '009-025', '009-026', '009-027']),
  act3: range('sseayp', ['010-028', '011-029', '011-030', '012-035', '012-036']),
  act4: range('sseayp', ['013-037', '014-f178', '015-f186', '015-f189', '015-f190', '015-f191', '015-f192', '015-f193', '015-f194', '015-f195', '015-f196', '015-f197']),
};

export const collections: GalleryCollection[] = [
  {
    slug: 'khoa-kinh-te-quoc-te',
    index: '(01)',
    partner: 'Khoa Kinh tế Quốc tế',
    partnerEn: 'Faculty of International Economics - DAV',
    kind: 'Client',
    years: '2025 - nay',
    summary: 'Faculty events and portraits for the Faculty of International Economics, Diplomatic Academy of Viet Nam.',
    pending: true,
    photos: [],
  },
  {
    slug: 'doan-thanh-nien-hvng',
    index: '(02)',
    partner: 'Đoàn Thanh niên HVNG',
    partnerEn: 'D.A.V Ho Chi Minh Communist Youth Union',
    kind: 'Client',
    years: '2025 - 2026',
    summary:
      'The place I deeply and proudly call “Home” - the cradle that gave me the bravery to reach for opportunities like SSEAYP 49.',
    statement: [
      'This space witnessed more than just my first hesitant steps; it is the very cradle that nurtured and forged me. Every achievement and brilliant moment I captured through my lens stems from the dedicated guidance I received right here.',
      'Returning “Home”, I realize this voyage was never just about exploring the world; it is about bringing back the finest values to enrich the place that gave me the wings to fly.',
    ],
    gear: 'CANON 6D • EF 24-105MM F/4',
    cover: { id: 'sseayp-013-037', alt: 'D.A.V Youth Union members in a group photograph' },
    photos: refs(sseaypActs.act4, 'D.A.V Youth Union - The Cradle'),
    relatedPortfolio: '/portfolios/sseayp',
  },
  {
    slug: 'sseayp',
    index: '(03)',
    partner: 'SSEAYP 49th & 50th',
    partnerEn: 'Ship for Southeast Asian and Japanese Youth Program - Viet Nam Contingent',
    kind: 'Event',
    years: '01/2026 - nay',
    summary:
      'To the world, SSEAYP is a diplomatic voyage. Through my viewfinder, it is an ecosystem of raw emotions - where leaders are forged, cultures collide, and silent sacrifices are made behind the scenes.',
    statement: [
      'Behind the lens, my mission was never just to document schedules. I wanted to freeze time - capturing the raw dedication, the unscripted joy, and the true essence of this exceptional group.',
      '49th contingent shown below. The 50th contingent archive is being edited.',
    ],
    gear: 'CANON 6D • EF 24-105MM F/4',
    cover: { id: 'sseayp-004-008', alt: 'SSEAYP delegates raising Vietnamese flags on stage' },
    photos: [
      ...refs(sseaypActs.act1, 'SSEAYP 49th - Launching Ceremony, Viet Nam Youth Academy'),
      ...refs(sseaypActs.act2, 'SSEAYP 49th - USSH talkshow “Xây dựng Thương hiệu Cá nhân, Giữ Bản lĩnh Số”'),
      ...refs(sseaypActs.act3, 'SSEAYP 49th - Unitour at VinUniversity Traditional Room'),
    ],
    relatedPortfolio: '/portfolios/sseayp',
  },
  {
    slug: 'sac-lam-tan-thoi',
    index: '(04)',
    partner: 'Sắc Lam Tân Thời',
    partnerEn: 'Sắc Lam Tân Thời',
    kind: 'Client',
    years: '2026',
    summary: 'Photography partnership.',
    pending: true,
    photos: [],
  },
  {
    slug: 'pich-xo',
    index: '(05)',
    partner: 'PÍCH-XỒ',
    partnerEn: 'PÍCH-XỒ',
    kind: 'Client',
    years: '2026',
    summary: 'Photography partnership.',
    pending: true,
    photos: [],
  },
  {
    slug: 'street-heritage',
    index: '(06)',
    partner: 'Street & Heritage',
    partnerEn: 'Hà Nội streets, rail lines and the Vietnam Press Museum',
    kind: 'Personal',
    years: '2023 - 2026',
    summary:
      'My grandfather was a photojournalist; through him I learned the power of capturing real life. Long Biên, the train street, the old quarter at night - and the rusted machines of a century of revolutionary press.',
    gear: 'CANON 6D • EF 24-105MM F/4',
    cover: { id: 'project-038-193', alt: 'A blue-and-yellow train approaching on the Hà Nội rail line' },
    photos: [
      ...refs(range('project', ['038-192', '038-193', '038-194', '038-195', '038-196']), 'Long Biên - Footprints of Time'),
      ...refs(range('project', ['037-180', '037-181', '037-182', '037-183']), 'Town of Light'),
      ...refs(range('project', ['006-019', '006-020', '006-021', '006-022']), 'Hà Nội - artistic vision'),
      ...refs(range('nqtk', ['005-009', '008-021', '008-019', '004-008', '003-006', '008-022', '002-003', '006-011']), 'Nhãn Quan Thế Kỷ - Vietnam Press Museum artifact'),
    ],
    relatedPortfolio: '/portfolios/nhan-quan-the-ky',
  },
  {
    slug: 'concept-studio',
    index: '(07)',
    partner: 'Concept & Studio',
    partnerEn: 'luminescent. · The Closet × Jan21st · Lost in the Garden of Eden · A Sunset Girl',
    kind: 'Personal',
    years: '2023 - 2025',
    summary:
      'I emphasize contrasts and oppositions to reveal the multidimensional nature of both myself and the world around me.',
    cover: { id: 'project-028-107', alt: 'A student posing inside a decorated wooden closet set' },
    photos: [
      ...refs(range('project', ['f703', 'f701', '012-071', '013-074', '014-079', '015-080', '016-081', '017-082']), 'luminescent. - Red Sun'),
      ...refs(range('project', ['f749', 'f750', '019-090', '021-095', '022-098', '023-099']), 'luminescent. - Blue Moon'),
      ...refs(range('project', ['027-103', '028-106', '028-107', '028-108', '028-109', '028-110', '028-111', '029-124', '029-125', '029-126', '029-127', '030-136', '033-141']), 'The Closet × Jan21st'),
      ...refs(range('project', ['035-152', '035-153', '035-154', '035-155']), 'Lost in the Garden of Eden'),
      ...refs(range('project', ['036-164', '036-165', '036-166', '036-167']), 'Concept portrait on white dunes'),
      ...refs(range('project', ['036-168', '036-169', '036-170', '036-171']), 'A Sunset Girl'),
    ],
    relatedPortfolio: '/portfolios/project',
  },
  {
    slug: 'youth-events',
    index: '(08)',
    partner: 'Youth Events 2022–2025',
    partnerEn: 'Clubs, concerts and class projects - THPT Chuyên Ngoại ngữ',
    kind: 'Event',
    years: '2022 - 2025',
    summary:
      'When the music starts, the performances unfold - joyful or melancholic, lively or intimate. As an “observer,” my responsibility is to capture these moments as truthfully as possible.',
    cover: { id: 'project-008-052', alt: 'Students celebrating on a concert stage under purple light' },
    photos: refs(
      range('project', ['007-029', '007-030', '007-031', '007-032', '007-033', '008-044', '008-045', '008-046', '008-047', '008-048', '008-049', '008-050', '008-051', '008-052', '008-053', '008-054', '008-055', '009-056', '009-057', '009-058', '009-059', '009-060']),
      'Youth event',
    ),
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
