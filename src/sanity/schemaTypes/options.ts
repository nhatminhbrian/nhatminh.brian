// Shared option lists - kept in sync with the site's filters and gallery groups.
export const partnerOptions = [
  { title: 'Khoa Kinh tế Quốc tế', value: 'khoa-kinh-te-quoc-te' },
  { title: 'Đoàn Thanh niên HVNG', value: 'doan-thanh-nien-hvng' },
  { title: 'SSEAYP 49th & 50th', value: 'sseayp' },
  { title: 'Sắc Lam Tân Thời', value: 'sac-lam-tan-thoi' },
  { title: 'PÍCH-XỒ', value: 'pich-xo' },
  { title: 'Street & Heritage', value: 'street-heritage' },
  { title: 'Concept & Studio', value: 'concept-studio' },
  { title: 'Youth Events', value: 'youth-events' },
  { title: 'Khác (bộ ảnh độc lập)', value: 'other' },
];

export const kindOptions = [
  { title: 'Client', value: 'Client' },
  { title: 'Event', value: 'Event' },
  { title: 'Personal', value: 'Personal' },
];

export const yearOptions = ['2026–2027', '2025–2026', '2022–2025'];
export const semesterOptions = ['Kì 1', 'Kì 2', 'Hè'];
export const categoryOptions = ['Nhiếp ảnh', 'Truyền thông', 'Quốc tế', 'Lãnh đạo', 'Học thuật', 'Cộng đồng', 'Chứng chỉ'];

export const partnerGroupOptions = [
  { title: 'HVNG & Các Khoa', value: 'hvng' },
  { title: 'SSEAYP', value: 'sseayp' },
  { title: 'Triển lãm & Nghệ thuật', value: 'art' },
  { title: 'Cấp 3 & Cộng đồng', value: 'community' },
  { title: 'Street & Travel', value: 'street' },
];

/** Studio “Bản dịch” group: EN and KO versions of the text fields. Vietnamese stays in the
 *  original fields, so entries published before this change keep working unchanged. */
export function translationsField(fields: { name: string; title: string; type: 'string' | 'text' | 'array' }[], group?: string) {
  const lang = (code: 'en' | 'ko', label: string) => ({
    name: code,
    title: label,
    type: 'object',
    options: { collapsible: true, collapsed: code === 'ko' },
    fields: fields.map((f) =>
      f.type === 'array'
        ? { name: f.name, title: f.title, type: 'array', of: [{ type: 'string' }] }
        : { name: f.name, title: f.title, type: f.type, ...(f.type === 'text' ? { rows: 4 } : {}) },
    ),
  });
  return {
    name: 'translations',
    title: 'Bản dịch (EN / 한)',
    description: 'Tiếng Việt nhập ở các ô phía trên. Bỏ trống ô nào thì web hiện tiếng Việt cho ô đó.',
    type: 'object',
    ...(group ? { group } : {}),
    fields: [lang('en', 'English'), lang('ko', '한국어')],
  };
}
