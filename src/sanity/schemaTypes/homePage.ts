/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineArrayMember, defineField, defineType } from 'sanity';

/** {vi, en, ko} helpers - Vietnamese required, EN/KO optional (fall back to VI). */
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
    { name: 'featured', title: 'Đang chiếu' },
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
            { name: 'meta', title: 'Thông tin nhỏ (DAV · 2025 - 2029)', type: 'string' },
            { name: 'body', title: 'Nội dung', type: 'array', of: [locMember('Đoạn', 4)] },
          ],
          preview: { select: { title: 'title.vi', subtitle: 'index' } },
        }),
      ],
    }),
    defineField({
      name: 'featuredWorks',
      title: 'Tác phẩm nổi bật / Đang chiếu',
      description: 'Danh sách thẻ trong mục "Đang chiếu" ở trang chủ - kéo để đổi thứ tự, bật "Ẩn" để tạm giấu. Để trống = tự lấy 3 portfolio + thư mục nổi bật (không trùng).',
      type: 'array',
      group: 'featured',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featuredWork',
          title: 'Thẻ',
          groups: [
            { name: 'source', title: 'Nguồn', default: true },
            { name: 'card', title: 'Ghi đè nội dung thẻ' },
          ],
          fields: [
            { name: 'hidden', title: 'Ẩn thẻ này', type: 'boolean', initialValue: false, group: 'source' },
            {
              name: 'source',
              title: 'Lấy từ',
              type: 'string',
              group: 'source',
              initialValue: 'portfolio',
              options: { layout: 'radio', direction: 'horizontal', list: [
                { title: 'Portfolio', value: 'portfolio' },
                { title: 'Thư mục ảnh', value: 'folder' },
                { title: 'Tự nhập', value: 'custom' },
              ] },
            },
            {
              name: 'portfolio',
              title: 'Portfolio',
              type: 'string',
              group: 'source',
              hidden: ({ parent }: { parent?: { source?: string } }) => parent?.source !== 'portfolio',
              options: { list: [
                { title: 'Project Portfolio (UIC · Yonsei)', value: 'project' },
                { title: 'SSEAYP 49th Photo Portfolio', value: 'sseayp' },
                { title: 'Nhãn Quan Thế Kỷ', value: 'nhan-quan-the-ky' },
              ] },
            },
            {
              name: 'folder',
              title: 'Thư mục ảnh',
              type: 'reference',
              group: 'source',
              to: [{ type: 'photoFolder' }],
              hidden: ({ parent }: { parent?: { source?: string } }) => parent?.source !== 'folder',
            },
            { ...loc('title', 'Tiêu đề'), group: 'card' },
            { ...loc('category', 'Hạng mục'), group: 'card' },
            { name: 'year', title: 'Năm', type: 'string', group: 'card' },
            { ...loc('role', 'Vai trò'), group: 'card' },
            { ...loc('semester', 'Năm / Học kỳ'), group: 'card' },
            { ...loc('clientOrGear', 'Thiết bị / Khách hàng'), group: 'card' },
            { ...loc('quote', 'Trích dẫn', 3), group: 'card' },
            { name: 'coverImage', title: 'Ảnh bìa', type: 'image', options: { hotspot: true }, group: 'card' },
            { name: 'href', title: 'Đường dẫn (ví dụ /gallery/abc)', type: 'string', group: 'card' },
            { name: 'pdfUrl', title: 'Link PDF', type: 'url', group: 'card', validation: (r) => r.uri({ allowRelative: true }) },
          ],
          preview: {
            select: { t: 'title.vi', p: 'portfolio', f: 'folder.title', src: 'source', hidden: 'hidden', media: 'coverImage' },
            prepare: ({ t, p, f, src, hidden, media }: Record<string, any>) => ({
              title: `${hidden ? '🙈 ' : ''}${t || f || p || 'Thẻ chưa đặt tên'}`,
              subtitle: src === 'folder' ? 'Thư mục ảnh' : src === 'custom' ? 'Tự nhập' : 'Portfolio',
              media,
            }),
          },
        }),
      ],
    }),
    defineField({ name: 'philosophy', title: '5 nguyên tắc sáng tạo', type: 'array', group: 'timeline', of: [locMember('Nguyên tắc', 2)] }),
    defineField({
      name: 'milestones',
      title: 'Các mốc (2022 - nay)',
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
