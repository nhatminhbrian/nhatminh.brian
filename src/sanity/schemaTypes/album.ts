import { defineArrayMember, defineField, defineType } from 'sanity';
import { kindOptions, partnerOptions, semesterOptions, yearOptions } from './options';

export const album = defineType({
  name: 'album',
  title: 'Bộ ảnh',
  type: 'document',
  groups: [
    { name: 'photos', title: 'Ảnh', default: true },
    { name: 'story', title: 'Nội dung' },
    { name: 'credits', title: 'Credits' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tên bộ ảnh',
      type: 'string',
      group: ['photos', 'story'],
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (URL)',
      type: 'slug',
      group: 'photos',
      description: 'Bấm “Generate” để tạo từ tên bộ ảnh. Trang sẽ là /gallery/<đường-dẫn>.',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'partner',
      title: 'Đối tác / nhóm',
      type: 'string',
      group: 'photos',
      options: { list: partnerOptions, layout: 'dropdown' },
      initialValue: 'other',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Loại',
      type: 'string',
      group: 'photos',
      options: { list: kindOptions, layout: 'radio', direction: 'horizontal' },
      initialValue: 'Event',
    }),
    defineField({
      name: 'date',
      title: 'Ngày chụp',
      type: 'date',
      group: 'photos',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Ảnh bìa',
      type: 'image',
      group: 'photos',
      description: 'Ảnh lớn trên thẻ showcase. Bỏ trống thì dùng ảnh đầu tiên.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Mô tả ảnh (alt)', type: 'string' })],
    }),
    defineField({
      name: 'photos',
      title: 'Ảnh trong bộ',
      type: 'array',
      group: 'photos',
      description: 'Kéo thả nhiều ảnh (hoặc cả folder) vào đây. Kéo để đổi thứ tự.',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Mô tả ảnh (alt)', type: 'string' }),
            defineField({ name: 'caption', title: 'Chú thích', type: 'string' }),
          ],
        }),
      ],
      validation: (r) => r.min(1).error('Thêm ít nhất 1 ảnh'),
    }),
    defineField({
      name: 'summary',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      group: 'story',
      validation: (r) => r.max(400),
    }),
    defineField({
      name: 'story',
      title: 'Nội dung bộ ảnh',
      type: 'text',
      rows: 10,
      group: 'story',
      description: 'Câu chuyện phía sau bộ ảnh. Xuống dòng 2 lần để tách đoạn.',
    }),
    defineField({
      name: 'quote',
      title: 'Câu trích (pull-quote)',
      type: 'string',
      group: 'story',
      description: 'Hiện ở góc phải dưới của thẻ showcase.',
    }),
    defineField({ name: 'role', title: 'Vai trò', type: 'string', group: 'credits', initialValue: 'Photographer' }),
    defineField({
      name: 'gear',
      title: 'Thiết bị / Khách hàng',
      type: 'string',
      group: 'credits',
      initialValue: 'CANON 6D • EF 24-105MM F/4',
    }),
    defineField({
      name: 'academicYear',
      title: 'Năm học',
      type: 'string',
      group: 'credits',
      options: { list: yearOptions },
    }),
    defineField({
      name: 'semester',
      title: 'Học kì',
      type: 'string',
      group: 'credits',
      options: { list: semesterOptions, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'featured',
      title: 'Đưa lên Featured Works (trang chủ)',
      type: 'boolean',
      group: 'credits',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Mới nhất', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', partner: 'partner', media: 'cover', first: 'photos.0', count: 'photos.length' },
    prepare({ title, date, partner, media, first, count }) {
      const p = partnerOptions.find((o) => o.value === partner)?.title ?? '';
      return {
        title,
        subtitle: [date && new Date(date).toLocaleDateString('vi-VN'), p, count ? `${count} ảnh` : null].filter(Boolean).join(' · '),
        media: media ?? first,
      };
    },
  },
});
