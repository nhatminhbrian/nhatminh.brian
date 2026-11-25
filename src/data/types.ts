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
  | 'Cộng đồng'
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

/** One card in the cinema-archival showcase stack. */
export type ShowcaseItem = {
  id: string;
  href: string;
  index: string;
  year: string;
  title: string;
  category: string;
  role: string;
  yearSemester: string;
  gearClient: string;
  specs: string;
  quote: string;
  cover: ResolvedMedia;
  secondary?: { href: string; label: string };
};

/* ───────── Gallery folders (one event / shoot = one folder) ───────── */

export type PartnerGroup = 'hvng' | 'sseayp' | 'art' | 'community' | 'street';

/**
 * A single event folder. Each entry is independent — add one and it is indexed
 * automatically under its `year` tab and `partnerGroup` pill.
 */
export type PhotoFolder = {
  /** stable id, also used as the URL slug: /gallery/<id> */
  id: string;
  /** optional manual order within the year ("01", "02"…); computed from date when omitted */
  indexNumber?: string;
  title: string;
  year: number;
  semester?: Semester;
  partnerGroup: PartnerGroup;
  /** the organisation / client shown on the card, e.g. "Đoàn Thanh niên HVNG" */
  organization: string;
  /** ISO date (YYYY-MM-DD or YYYY-MM) used for sorting */
  date: string;
  location?: string;
  gear?: string;
  summary?: string;
  story?: string[];
  quote?: string;
  role?: string;
  featured?: boolean;
  coverImage: MediaRef;
  images: MediaRef[];
  /** true when the date was estimated and should be confirmed */
  needsReview?: boolean;
};

/** A folder with resolved images, ready to render (from local data, public/gallery or Sanity). */
export type FolderView = Omit<PhotoFolder, 'coverImage' | 'images' | 'indexNumber'> & {
  indexNumber: string;
  coverImage: ResolvedMedia;
  images: ResolvedMedia[];
  source: 'archive' | 'filesystem' | 'sanity';
};
