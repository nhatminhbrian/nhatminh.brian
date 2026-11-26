'use client';

/**
 * Sanity Studio, mounted at /studio. Minh signs in with GitHub and manages
 * Trang chủ (home copy, VI/EN/KO), Thư mục ảnh and Thành tích here.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { photoFolder } from './src/sanity/schemaTypes/photoFolder';
import { achievement } from './src/sanity/schemaTypes/achievement';
import { homePage } from './src/sanity/schemaTypes/homePage';

export default defineConfig({
  name: 'nhatminh',
  title: 'Nhật Minh - Studio',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: [homePage, photoFolder, achievement],
    // singleton: no "create new" / duplicate for Trang chủ
    templates: (t) => t.filter((x) => x.schemaType !== 'homePage'),
  },
  document: {
    actions: (prev, ctx) => (ctx.schemaType === 'homePage' ? prev.filter((a) => !['duplicate', 'delete', 'unpublish'].includes(a.action ?? '')) : prev),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            S.listItem().title('Trang chủ').id('homePage').child(S.document().schemaType('homePage').documentId('homePage').title('Trang chủ')),
            S.divider(),
            S.listItem()
              .title('Thư mục ảnh')
              .child(
                S.list()
                  .title('Thư mục ảnh')
                  .items([
                    S.listItem().title('Tất cả (mới nhất trước)').child(S.documentTypeList('photoFolder').title('Tất cả thư mục').defaultOrdering([{ field: 'date', direction: 'desc' }])),
                    S.listItem().title('Đang nổi bật').child(S.documentTypeList('photoFolder').title('Nổi bật').filter('_type == "photoFolder" && featured == true')),
                    ...['2026', '2025', '2024', '2023', '2022'].map((y) =>
                      S.listItem().title(`Năm ${y}`).child(S.documentTypeList('photoFolder').title(`Năm ${y}`).filter('_type == "photoFolder" && year == $y').params({ y: Number(y) })),
                    ),
                  ]),
              ),
            S.listItem()
              .title('Thành tích')
              .child(
                S.list()
                  .title('Thành tích')
                  .items([
                    S.listItem().title('Tất cả (theo thứ tự hiển thị)').child(S.documentTypeList('achievement').title('Tất cả thành tích').defaultOrdering([{ field: 'order', direction: 'asc' }])),
                    ...['Nhiếp ảnh', 'Truyền thông', 'Quốc tế', 'Lãnh đạo', 'Học thuật', 'Cộng đồng', 'Chứng chỉ'].map((c) =>
                      S.listItem().title(c).child(S.documentTypeList('achievement').title(c).filter('_type == "achievement" && category == $c').params({ c })),
                    ),
                  ]),
              ),
          ]),
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
