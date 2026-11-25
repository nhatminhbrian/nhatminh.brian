/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GALLERY FOLDERS — one event / shoot = one folder
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  /gallery indexes every folder by YEAR (tabs) and PARTNER GROUP (pills).
 *  Nothing in the UI needs editing when you add a folder. Three ways to add one:
 *
 *  ① Sanity Studio (recommended for big, frequent recaps)
 *     /studio → "Thư mục ảnh" → + → fill the form, drag in the whole folder of photos,
 *     Publish. Live within ~1 minute; Sanity's CDN resizes the originals.
 *
 *  ② Drop a folder into the repo
 *     public/gallery/<year>/<folder-slug>/
 *        ├── folder.json      ← optional metadata (see public/gallery/README.md)
 *        ├── 01.jpg
 *        └── 02.jpg …
 *     Run `npm run gallery` (also runs automatically before every build) — it reads
 *     sizes, makes blur placeholders and writes src/data/folders.generated.json.
 *     Tip: `npm run gallery:optimize` shrinks big camera JPEGs to ≤2400px first.
 *
 *  ③ Add an entry below with `folder({...})` — used for the archive built from the PDFs.
 *
 *  Fields: id (= URL slug), title, year, semester?, partnerGroup, organization,
 *  date (YYYY-MM-DD or YYYY-MM), location?, gear?, summary?, story?, coverImage, images.
 */
import type { MediaRef, PartnerGroup, PhotoFolder } from './types';

export const partnerGroups: { id: PartnerGroup; label: string; hint: string }[] = [
  { id: 'hvng', label: 'HVNG & Các Khoa', hint: 'Học viện Ngoại giao, Đoàn Thanh niên, các Khoa' },
  { id: 'sseayp', label: 'SSEAYP', hint: 'Ship for Southeast Asian and Japanese Youth Program' },
  { id: 'art', label: 'Triển lãm & Nghệ thuật', hint: 'Concept, studio, bảo tàng, triển lãm' },
  { id: 'community', label: 'Cấp 3 & Cộng đồng', hint: 'THPT Chuyên Ngoại ngữ, CLB, dự án cộng đồng' },
  { id: 'street', label: 'Street & Travel', hint: 'Phố, di sản, du lịch' },
];

export const DEFAULT_GEAR = 'CANON 6D • EF 24-105MM F/4';

/** Build MediaRefs from manifest ids with a shared alt prefix. */
const imgs = (prefix: string, parts: string[], alt: string): MediaRef[] =>
  parts.map((p, i) => ({ id: `${prefix}-${p}`, alt: `${alt} — frame ${String(i + 1).padStart(2, '0')}` }));

/** Helper so every folder is type-checked; images[0] is the cover unless coverImage is given. */
function folder(f: Omit<PhotoFolder, 'coverImage'> & { coverImage?: MediaRef }): PhotoFolder {
  return { gear: DEFAULT_GEAR, ...f, coverImage: f.coverImage ?? f.images[0] };
}

export const archiveFolders: PhotoFolder[] = [
  /* ── 2026 ─────────────────────────────────────────── */
  folder({
    id: 'sseayp-49-le-ra-quan',
    title: 'SSEAYP 49 — Lễ ra quân',
    year: 2026,
    semester: 'Kì 2',
    partnerGroup: 'sseayp',
    organization: 'SSEAYP 49th Viet Nam Contingent',
    date: '2026-01',
    location: 'Học viện Thanh thiếu niên Việt Nam, Hà Nội',
    role: 'Media collaborator · Photographer',
    summary: 'The first heartbeats of Vietnamese culture brought to life on stage — a fierce declaration of identity and readiness to reach out to the world.',
    quote: 'A – RI – GA – TO!',
    featured: true,
    coverImage: { id: 'sseayp-004-008', alt: 'Delegates raising Vietnamese flags on stage' },
    images: imgs('sseayp', ['003-004', '003-005', '004-006', '004-007', '004-008', '004-009', '005-010', '005-011', '005-012', '005-013', '005-014', '005-015', '006-016', '006-017'], 'SSEAYP 49 Launching Ceremony'),
  }),
  folder({
    id: 'sseayp-49-talkshow-ussh',
    title: 'Talkshow “Thương hiệu Cá nhân, Giữ Bản lĩnh Số”',
    year: 2026,
    semester: 'Kì 2',
    partnerGroup: 'sseayp',
    organization: 'SSEAYP 49 × USSH',
    date: '2026-02',
    location: 'Trường ĐH KHXH&NV, Hà Nội',
    role: 'Event photographer',
    summary: 'Attentive eyes, nodding heads, and the burning desire of young minds eager to assert their true value.',
    coverImage: { id: 'sseayp-009-027', alt: 'Talkshow participants posing on stage' },
    images: imgs('sseayp', ['007-018', '007-019', '008-020', '008-021', '008-022', '009-023', '009-024', '009-025', '009-026', '009-027'], 'USSH talkshow'),
  }),
  folder({
    id: 'sseayp-49-unitour-vinuni',
    title: 'SSEAYP Unitour — VinUniversity',
    year: 2026,
    semester: 'Kì 2',
    partnerGroup: 'sseayp',
    organization: 'SSEAYP 49 × VinUniversity',
    date: '2026-03',
    location: 'Traditional Room, VinUniversity',
    role: 'Event photographer',
    summary: 'No matter who you are or where you come from, barriers fade under the shared roof of the SSEAYP network.',
    coverImage: { id: 'sseayp-011-030', alt: 'SSEAYP alumni and students in the Traditional Room' },
    images: imgs('sseayp', ['010-028', '011-029', '011-030', '012-035', '012-036'], 'SSEAYP Unitour at VinUniversity'),
  }),
  folder({
    id: 'doan-thanh-nien-the-cradle',
    title: 'Đoàn Thanh niên HVNG — The Cradle',
    year: 2026,
    semester: 'Kì 2',
    partnerGroup: 'hvng',
    organization: 'Đoàn Thanh niên Học viện Ngoại giao',
    date: '2026-03',
    location: 'Học viện Ngoại giao, Hà Nội',
    role: 'Collaborator · Photographer',
    summary: 'A place I deeply and proudly call “Home” — the cradle that gave me the bravery to reach for SSEAYP 49.',
    coverImage: { id: 'sseayp-013-037', alt: 'D.A.V Youth Union members in a group photograph' },
    images: imgs('sseayp', ['013-037', '014-f178', '015-f186', '015-f189', '015-f190', '015-f191', '015-f192', '015-f193', '015-f194', '015-f195', '015-f196', '015-f197'], 'D.A.V Youth Union'),
  }),
  folder({
    id: 'bao-tang-bao-chi-nhan-quan-the-ky',
    title: 'Bảo tàng Báo chí — Nhãn Quan Thế Kỷ',
    year: 2026,
    semester: 'Kì 2',
    partnerGroup: 'art',
    organization: 'Đại cương truyền thông quốc tế · DAV',
    date: '2026-04',
    location: 'Bảo tàng Báo chí Việt Nam, Hà Nội',
    role: 'Photographer · Art direction',
    summary: 'Macro studies of a century of revolutionary press — rust, peeling paint and mechanical scratches as soft-power language.',
    quote: 'Mỗi vết xước, một thế kỷ.',
    featured: true,
    coverImage: { id: 'nqtk-005-009', alt: 'Wartime twin-lens cameras on red velvet' },
    images: imgs('nqtk', ['001-000', '002-003', '003-004', '003-005', '003-006', '004-007', '004-008', '005-009', '005-010', '006-011', '006-012', '006-013', '006-014', '007-015', '007-016', '007-017', '007-018', '008-019', '008-020', '008-021', '008-022', '009-023', '009-024', '009-025', '009-026', '010-027', '010-028', '011-029', '011-030', '011-031', '011-032', '012-033'], 'Vietnam Press Museum'),
    needsReview: true,
  }),

  /* ── 2025 ─────────────────────────────────────────── */
  folder({
    id: 'the-closet-jan21st',
    title: 'The Closet × Jan21st',
    year: 2025,
    semester: 'Kì 2',
    partnerGroup: 'community',
    organization: 'Jan21st Studio · Lớp 12',
    date: '2025-04',
    location: 'Jan21st Studio, Hà Nội',
    role: 'Concept · Lighting design',
    summary: 'A doorway to our most cherished memories — one cohesive concept built from a survey of 45 classmates.',
    featured: true,
    coverImage: { id: 'project-028-107', alt: 'Classmate posing inside a decorated wooden closet set' },
    images: imgs('project', ['027-103', '028-106', '028-107', '028-108', '028-109', '028-110', '028-111', '029-124', '029-125', '029-126', '029-127', '030-136', '033-141'], 'The Closet'),
  }),

  /* ── 2024 ─────────────────────────────────────────── */
  folder({
    id: 'luminescent-red-sun',
    title: 'luminescent. pt.1 — Red Sun',
    year: 2024,
    partnerGroup: 'art',
    organization: 'Personal · VAXcine media crew',
    date: '2024-06',
    location: 'Studio, Hà Nội',
    role: 'Concept · Lighting · Post',
    summary: 'A feverish glow, suffocating yet captivating — be the son of devil.',
    quote: 'It is beautiful, but it is also merciless.',
    images: imgs('project', ['f703', 'f701', '012-071', '013-074', '014-079', '015-080', '016-081', '017-082'], 'luminescent Red Sun'),
    needsReview: true,
  }),
  folder({
    id: 'luminescent-blue-moon',
    title: 'luminescent. pt.2 — Blue Moon',
    year: 2024,
    partnerGroup: 'art',
    organization: 'Personal · VAXcine media crew',
    date: '2024-06',
    location: 'Studio, Hà Nội',
    role: 'Concept · Lighting · Post',
    summary: 'A fleeting moment, effortless and unbound — the quiet surrender.',
    images: imgs('project', ['f749', 'f750', '019-090', '021-095', '022-098', '023-099'], 'luminescent Blue Moon'),
    needsReview: true,
  }),
  folder({
    id: 'lost-in-the-garden-of-eden',
    title: 'Lost in the Garden of Eden',
    year: 2024,
    partnerGroup: 'art',
    organization: 'Personal concept',
    date: '2024-03',
    role: 'Photographer',
    images: imgs('project', ['035-152', '035-153', '035-154', '035-155'], 'Lost in the Garden of Eden'),
    needsReview: true,
  }),
  folder({
    id: 'a-sunset-girl',
    title: 'A Sunset Girl',
    year: 2024,
    partnerGroup: 'art',
    organization: 'Personal portrait',
    date: '2024-05',
    role: 'Photographer',
    coverImage: { id: 'project-036-169', alt: 'Profile with earphones in golden light' },
    images: imgs('project', ['036-168', '036-169', '036-170', '036-171', '036-164', '036-165', '036-166', '036-167'], 'A Sunset Girl'),
    needsReview: true,
  }),
  folder({
    id: 'school-stage-concerts',
    title: 'Sân khấu & đêm nhạc học đường',
    year: 2024,
    partnerGroup: 'community',
    organization: 'THPT Chuyên Ngoại ngữ',
    date: '2024-11',
    role: 'Event recap photographer',
    summary: 'When the music starts, the performances unfold — joyful or melancholic, lively or intimate.',
    images: imgs('project', ['007-029', '007-030', '007-031', '007-032', '007-033', '008-052', '008-051'], 'School concert'),
    needsReview: true,
  }),
  folder({
    id: 'clubs-class-projects',
    title: 'CLB & dự án lớp',
    year: 2024,
    partnerGroup: 'community',
    organization: 'THPT Chuyên Ngoại ngữ',
    date: '2024-09',
    role: 'Media lead · Photographer',
    images: imgs('project', ['008-044', '008-045', '008-046', '008-047', '008-048', '008-049', '008-050', '008-053', '008-054', '008-055', '009-056', '009-057', '009-058', '009-059', '009-060'], 'School clubs and projects'),
    needsReview: true,
  }),

  /* ── 2023 ─────────────────────────────────────────── */
  folder({
    id: 'long-bien-footprints-of-time',
    title: 'Long Biên — Footprints of Time',
    year: 2023,
    partnerGroup: 'street',
    organization: 'Street & heritage',
    date: '2023-10',
    location: 'Cầu Long Biên & phố đường tàu, Hà Nội',
    role: 'Street photographer',
    quote: 'My grandfather was a photojournalist. Through him I learned the power of capturing real life.',
    coverImage: { id: 'project-038-193', alt: 'Blue-and-yellow train approaching on the Hà Nội rail line' },
    images: imgs('project', ['038-192', '038-193', '038-194', '038-195', '038-196', '006-019', '006-020', '006-021', '006-022'], 'Long Biên and the rail line'),
    needsReview: true,
  }),
  folder({
    id: 'town-of-light',
    title: 'Town of Light',
    year: 2023,
    partnerGroup: 'street',
    organization: 'Travel',
    date: '2023-07',
    location: 'Phố cổ về đêm',
    role: 'Street photographer',
    images: imgs('project', ['037-180', '037-181', '037-182', '037-183'], 'Town of Light'),
    needsReview: true,
  }),
];
