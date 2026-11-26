import { defineArrayMember, defineField, defineType } from 'sanity';

/** {vi, en, ko} helpers — Vietnamese required, EN/KO optional (fall back to VI). */
const loc = (name: string, title: string, rows?: number) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { columns: rows ? 1 : 3 },
    fields: (['vi', 'en', 'ko'] as const).map((l) => ({
      name: l,
      title: l === 'vi' ? 'Tiếng Việt' : l === 'en' ? 'English' : '한국어',
      type: rows ? 'text' : 'string',
      ...(rows ? { rows } : {}),
    })),
  });

const locMember = (title: string, rows?: number) =>
  defineArrayMember({
    type: 'object',
    title,
    fields: (['vi', 'en', 'ko'] as const).map((l) => ({ name: l, title: l.toUpperCase(), type: rows ? 'text' : 'string', ...(rows ? { rows } : {}) })),
    preview: { select: { title: 'vi', subtitle: 'en' } },
  });

export const homePage = defineType({
  name: 'homePage',
  title: 'Trang chủ',
  type: 'document',
  groups: [
    { name: 'bio', title: 'Giới thiệu', default: true },
    { name: 'lenses', title: 'Hai lăng kính' },
    { name: 'timeline', title: 'Mốc & nguyên tắc' },
  ],
  fields: [
    { ...loc('city', 'Thành phố'), group: 'bio' },
    defineField({ name: 'about', title: 'Đoạn giới thiệu (About)', type: 'array', group: 'bio', of: [locMember('Đoạn', 4)] }),
    { ...loc('vision', 'Tầm nhìn nghệ thuật (trích dẫn)', 4), group: 'bio' },
    defineField({ name: 'interests', title: 'Sở thích / mối quan tâm', type: 'array', group: 'bio', of: [locMember('Mục')] }),
    defineField({
      name: 'lenses',
      title: 'Lăng kính A / B',
      type: 'array',
      group: 'lenses',
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'lens',
          fields: [
            { name: 'index', title: 'Ký hiệu', type: 'string', description: '(A) hoặc (B)' },
            loc('label', 'Nhãn'),
            loc('title', 'Tên ngành'),
            loc('sub', 'Dòng phụ'),
            { name: 'meta', title: 'Thông tin nhỏ (DAV · 2025 — 2029)', type: 'string' },
            { name: 'body', title: 'Nội dung', type: 'array', of: [locMember('Đoạn', 4)] },
          ],
          preview: { select: { title: 'title.vi', subtitle: 'index' } },
        }),
      ],
    }),
    defineField({ name: 'philosophy', title: '5 nguyên tắc sáng tạo', type: 'array', group: 'timeline', of: [locMember('Nguyên tắc', 2)] }),
    defineField({
      name: 'milestones',
      title: 'Các mốc (2022 — nay)',
      type: 'array',
      group: 'timeline',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [{ name: 'year', title: 'Năm', type: 'string' }, loc('text', 'Nội dung', 3)],
          preview: { select: { title: 'year', subtitle: 'text.vi' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Trang chủ' }) },
});
