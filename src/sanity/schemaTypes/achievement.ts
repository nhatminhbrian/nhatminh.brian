import { defineArrayMember, defineField, defineType } from 'sanity';
import { categoryOptions, semesterOptions, translationsField, yearOptions } from './options';

export const achievement = defineType({
  name: 'achievement',
  title: 'Thành tích',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tên thành tích / danh hiệu', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Phụ đề', type: 'string' }),
    defineField({ name: 'organisation', title: 'Tổ chức / đơn vị', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Vai trò', type: 'string' }),
    defineField({ name: 'period', title: 'Thời gian (hiển thị)', type: 'string', description: 'VD: 01/2026 - 03/2026', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Ngày (để sắp xếp)', type: 'date' }),
    defineField({ name: 'order', title: 'Thứ tự hiển thị', type: 'number', description: 'Số nhỏ hiện trước trong cùng năm học. Bỏ trống thì xếp cuối, theo ngày.' }),
    defineField({
      name: 'year',
      title: 'Năm học',
      type: 'string',
      options: { list: yearOptions, layout: 'radio', direction: 'horizontal' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'semester',
      title: 'Học kì',
      type: 'string',
      options: { list: semesterOptions, layout: 'radio', direction: 'horizontal' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Lĩnh vực',
      type: 'string',
      options: { list: categoryOptions },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summary', title: 'Tóm tắt', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'details',
      title: 'Chi tiết (gạch đầu dòng)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'images',
      title: 'Thư viện ảnh',
      description: 'Kéo thả nhiều ảnh cùng lúc vào lưới; kéo để đổi thứ tự. Ảnh đầu tiên là ảnh đại diện.',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Mô tả ảnh (alt) - VI', type: 'string' }),
            defineField({ name: 'caption', title: 'Chú thích - VI', type: 'string' }),
            defineField({
              name: 'translations',
              title: 'Bản dịch EN / KO',
              type: 'object',
              options: { collapsible: true, collapsed: true },
              fields: (['en', 'ko'] as const).map((lang) =>
                defineField({
                  name: lang,
                  title: lang === 'en' ? 'English' : '한국어',
                  type: 'object',
                  fields: [
                    defineField({ name: 'alt', title: 'Alt', type: 'string' }),
                    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                  ],
                }),
              ),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cover',
      title: 'Ảnh (cũ - một ảnh)',
      description: 'Trường cũ, vẫn hiển thị sau các ảnh trong Thư viện ảnh. Ảnh mới hãy thêm vào Thư viện ảnh.',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ value }) => !value,
      fields: [defineField({ name: 'alt', title: 'Mô tả ảnh (alt)', type: 'string' })],
    }),
    defineField({
      name: 'link',
      title: 'Liên kết',
      type: 'object',
      fields: [
        defineField({ name: 'href', title: 'URL', type: 'string' }),
        defineField({ name: 'label', title: 'Nhãn', type: 'string' }),
      ],
    }),
    defineField(translationsField([
      { name: 'title', title: 'Tên thành tích', type: 'string' },
      { name: 'subtitle', title: 'Phụ đề', type: 'string' },
      { name: 'organisation', title: 'Tổ chức', type: 'string' },
      { name: 'role', title: 'Vai trò', type: 'string' },
      { name: 'period', title: 'Thời gian', type: 'string' },
      { name: 'summary', title: 'Tóm tắt', type: 'text' },
      { name: 'details', title: 'Chi tiết', type: 'array' },
    ]) as never),
  ],
  orderings: [{ title: 'Thứ tự hiển thị', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', year: 'year', semester: 'semester', category: 'category', first: 'images.0', cover: 'cover' },
    prepare: ({ title, year, semester, category, first, cover }) => ({
      title,
      subtitle: [year, semester, category].filter(Boolean).join(' · '),
      media: first ?? cover,
    }),
  },
});
