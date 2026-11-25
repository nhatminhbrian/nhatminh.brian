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
 *  The 14 folders built from the original PDFs were moved into Studio (Nov 2026);
 *  edit or delete them there like any other folder.
 *
 *  Fields: id (= URL slug), title, year, semester?, partnerGroup, organization,
 *  date (YYYY-MM-DD or YYYY-MM), location?, gear?, summary?, story?, coverImage, images.
 */
import type { PartnerGroup } from './types';

export const partnerGroups: { id: PartnerGroup; label: string; hint: string }[] = [
  { id: 'hvng', label: 'HVNG & Các Khoa', hint: 'Học viện Ngoại giao, Đoàn Thanh niên, các Khoa' },
  { id: 'sseayp', label: 'SSEAYP', hint: 'Ship for Southeast Asian and Japanese Youth Program' },
  { id: 'art', label: 'Triển lãm & Nghệ thuật', hint: 'Concept, studio, bảo tàng, triển lãm' },
  { id: 'community', label: 'Cấp 3 & Cộng đồng', hint: 'THPT Chuyên Ngoại ngữ, CLB, dự án cộng đồng' },
  { id: 'street', label: 'Street & Travel', hint: 'Phố, di sản, du lịch' },
];

export const DEFAULT_GEAR = 'CANON 6D • EF 24-105MM F/4';
