import { defineArrayMember, defineField, defineType } from 'sanity';
import { categoryOptions, semesterOptions, yearOptions } from './options';

export const achievement = defineType({
  name: 'achievement',
  title: 'Thành tích',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tên thành tích / danh hiệu', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Phụ đề', type: 'string' }),
    defineField({ name: 'organisation', title: 'Tổ chức / đơn vị', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Vai trò', type: 'string' }),
    defineField({ name: 'period', title: 'Thời gian (hiển thị)', type: 'string', description: 'VD: 01/2026 — 03/2026', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Ngày (để sắp xếp)', type: 'date' }),
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
      name: 'cover',
      title: 'Ảnh',
      type: 'image',
      options: { hotspot: true },
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
  ],
  preview: {
    select: { title: 'title', year: 'year', semester: 'semester', category: 'category', media: 'cover' },
    prepare: ({ title, year, semester, category, media }) => ({
      title,
      subtitle: [year, semester, category].filter(Boolean).join(' · '),
      media,
    }),
  },
});
