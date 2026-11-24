'use client';

/**
 * Sanity Studio, mounted at /studio. Minh signs in with GitHub and manages
 * Thư mục ảnh (photo folders) and Thành tích (achievements) here.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { photoFolder } from './src/sanity/schemaTypes/photoFolder';
import { achievement } from './src/sanity/schemaTypes/achievement';

export default defineConfig({
  name: 'nhatminh',
  title: 'Nhật Minh — Studio',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: [photoFolder, achievement] },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            S.documentTypeListItem('photoFolder').title('Thư mục ảnh'),
            S.documentTypeListItem('achievement').title('Thành tích'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
