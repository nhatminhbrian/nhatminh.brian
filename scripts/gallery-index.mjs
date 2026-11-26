// Indexes photo folders dropped into public/gallery/<year>/<folder-slug>/ and writes
// src/data/folders.generated.json. Runs automatically before `dev` and `build`.
// Usage: npm run gallery
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = join('public', 'gallery');
const OUT = join('src', 'data', 'folders.generated.json');
const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const GROUPS = new Set(['hvng', 'sseayp', 'art', 'community', 'street']);

const isDir = (p) => existsSync(p) && statSync(p).isDirectory();
const humanize = (slug) => slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

async function describe(file, alt) {
  const img = sharp(file);
  const meta = await img.metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  const blur = await sharp(file).rotate().resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  return {
    src: '/' + file.split('\\').join('/').replace(/^public\//, ''),
    width,
    height,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
    alt,
  };
}

const folders = [];
if (isDir(ROOT)) {
  for (const year of readdirSync(ROOT).filter((y) => /^\d{4}$/.test(y)).sort()) {
    for (const slug of readdirSync(join(ROOT, year)).sort()) {
      const dir = join(ROOT, year, slug);
      if (!isDir(dir) || slug.startsWith('.') || slug.startsWith('_')) continue;
      const metaPath = join(dir, 'folder.json');
      const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, 'utf8')) : {};
      const files = readdirSync(dir)
        .filter((f) => IMAGE.has(extname(f).toLowerCase()) && !f.startsWith('.'))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      if (files.length === 0) continue;
      const title = meta.title || humanize(slug);
      const images = [];
      for (const [i, f] of files.entries()) {
        images.push(await describe(join(dir, f), `${title} - frame ${String(i + 1).padStart(2, '0')}`));
      }
      const coverIdx = meta.cover ? Math.max(0, files.indexOf(meta.cover)) : 0;
      const group = GROUPS.has(meta.partnerGroup) ? meta.partnerGroup : 'community';
      folders.push({
        id: meta.id || slug,
        indexNumber: meta.indexNumber,
        title,
        year: Number(year),
        semester: meta.semester,
        partnerGroup: group,
        organization: meta.organization || 'Recap',
        date: meta.date || `${year}-01`,
        location: meta.location,
        gear: meta.gear,
        summary: meta.summary,
        story: meta.story,
        quote: meta.quote,
        role: meta.role,
        featured: Boolean(meta.featured),
        coverImage: images[coverIdx],
        images,
      });
      console.log(`gallery: ${year}/${slug} - ${images.length} photos`);
    }
  }
}
writeFileSync(OUT, JSON.stringify(folders, null, 1) + '\n');
console.log(`gallery: indexed ${folders.length} folder(s) → ${OUT}`);
