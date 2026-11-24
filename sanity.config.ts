'use client';

/**
 * Sanity Studio, mounted at /studio. Minh signs in with GitHub and manages
 * Bộ ảnh (photo albums) and Thành tích (achievements) here.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { album } from './src/sanity/schemaTypes/album';
import { achievement } from './src/sanity/schemaTypes/achievement';

export default defineConfig({
  name: 'nhatminh',
  title: 'Nhật Minh — Studio',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: [album, achievement] },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nội dung')
          .items([
            S.documentTypeListItem('album').title('Bộ ảnh'),
            S.documentTypeListItem('achievement').title('Thành tích'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
