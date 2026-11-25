import { defineArrayMember, defineField, defineType } from 'sanity';
import { partnerGroupOptions, semesterOptions } from './options';

/** One event / shoot = one folder. Indexed on /gallery by year + partner group. */
export const photoFolder = defineType({
  name: 'photoFolder',
  title: 'Thư mục ảnh',
  type: 'document',
  groups: [
    { name: 'photos', title: 'Ảnh', default: true },
    { name: 'info', title: 'Thông tin' },
    { name: 'story', title: 'Nội dung' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Tên sự kiện / bộ ảnh', type: 'string', group: ['photos', 'info'], validation: (r) => r.required().max(90) }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (URL)',
      type: 'slug',
      group: 'photos',
      description: 'Bấm “Generate”. Trang sẽ là /gallery/<đường-dẫn>.',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'images',
      title: 'Ảnh',
      type: 'array',
      group: 'photos',
      description: 'Kéo thả cả folder ảnh vào đây. Kéo để đổi thứ tự.',
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
      name: 'coverImage',
      title: 'Ảnh bìa',
      type: 'image',
      group: 'photos',
      description: 'Bỏ trống thì dùng ảnh đầu tiên.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Mô tả ảnh (alt)', type: 'string' })],
    }),
    defineField({ name: 'date', title: 'Ngày', type: 'date', group: 'info', options: { dateFormat: 'DD/MM/YYYY' }, validation: (r) => r.required() }),
    defineField({
      name: 'year',
      title: 'Năm (tab)',
      type: 'number',
      group: 'info',
      description: 'Bỏ trống thì lấy theo Ngày.',
      validation: (r) => r.min(2015).max(2100).integer(),
    }),
    defineField({ name: 'semester', title: 'Học kì', type: 'string', group: 'info', options: { list: semesterOptions, layout: 'radio', direction: 'horizontal' } }),
    defineField({
      name: 'partnerGroup',
      title: 'Nhóm đối tác',
      type: 'string',
      group: 'info',
      options: { list: partnerGroupOptions, layout: 'radio' },
      initialValue: 'hvng',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'organization', title: 'Đơn vị / khách hàng', type: 'string', group: 'info', description: 'VD: Khoa Kinh tế Quốc tế', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Địa điểm', type: 'string', group: 'info' }),
    defineField({ name: 'gear', title: 'Thiết bị', type: 'string', group: 'info', initialValue: 'CANON 6D • EF 24-105MM F/4' }),
    defineField({ name: 'role', title: 'Vai trò', type: 'string', group: 'info', initialValue: 'Photographer' }),
    defineField({ name: 'indexNumber', title: 'Số thứ tự (tuỳ chọn)', type: 'string', group: 'info', description: 'VD: 01. Bỏ trống để tự đánh số theo ngày.' }),
    defineField({ name: 'summary', title: 'Mô tả ngắn', type: 'text', rows: 3, group: 'story' }),
    defineField({ name: 'story', title: 'Nội dung', type: 'text', rows: 10, group: 'story', description: 'Xuống dòng 2 lần để tách đoạn.' }),
    defineField({ name: 'quote', title: 'Câu trích', type: 'string', group: 'story' }),
    defineField({ name: 'featured', title: 'Đưa lên Featured Works (trang chủ)', type: 'boolean', group: 'story', initialValue: false }),
  ],
  orderings: [{ title: 'Mới nhất', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', org: 'organization', media: 'coverImage', first: 'images.0', count: 'images.length' },
    prepare: ({ title, date, org, media, first, count }) => ({
      title,
      subtitle: [date && new Date(date).toLocaleDateString('vi-VN'), org, count ? `${count} ảnh` : null].filter(Boolean).join(' · '),
      media: media ?? first,
    }),
  },
});
