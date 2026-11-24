/**
 * Content model. Every type here maps 1:1 to a future Sanity schema
 * (see `sanity` notes in src/lib/content.ts). Keep fields serialisable.
 */

export type MediaRef = {
  /** key into media.generated.json (later: Sanity image asset _id) */
  id: string;
  alt: string;
  caption?: string;
};

export type ResolvedMedia = MediaRef & {
  src: string;
  width: number;
  height: number;
  blur: string;
};

export type AcademicYear = '2026–2027' | '2025–2026' | '2022–2025';
export type Semester = 'Kì 1' | 'Kì 2' | 'Hè';
export type AchievementCategory =
  | 'Học thuật'
  | 'Truyền thông'
  | 'Nhiếp ảnh'
  | 'Lãnh đạo'
  | 'Quốc tế'
  | 'Chứng chỉ';

export type Achievement = {
  id: string;
  title: string;
  subtitle?: string;
  organisation: string;
  role?: string;
  period: string;
  year: AcademicYear;
  semester: Semester;
  category: AchievementCategory;
  summary: string;
  details: string[];
  cover?: MediaRef;
  link?: { href: string; label: string };
  /** true when a date/semester was inferred and should be confirmed by Minh */
  needsReview?: boolean;
};

export type GalleryCollection = {
  slug: string;
  index: string; // "(01)"
  partner: string;
  partnerEn: string;
  kind: 'Client' | 'Event' | 'Personal';
  years: string;
  summary: string;
  statement?: string[];
  gear?: string;
  cover?: MediaRef;
  photos: MediaRef[];
  /** archive not yet uploaded — renders an honest empty state */
  pending?: boolean;
  relatedPortfolio?: string;
};

export type PortfolioEdition = {
  slug: 'project' | 'sseayp' | 'nhan-quan-the-ky';
  index: string;
  title: string;
  kicker: string;
  language: 'EN' | 'VI';
  context: string;
  summary: string;
  pdf: { href: string; label: string; pages: number; sizeMb: number };
  cover: MediaRef;
  palette: { accent: string; label: string };
};
