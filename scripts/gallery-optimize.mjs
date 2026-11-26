// Shrinks oversized camera files in public/gallery/** to ≤2400px (long edge), in place.
// Run once after dropping a new folder:  npm run gallery:optimize
import { readdirSync, statSync, renameSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const MAX = 2400;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
let n = 0;
for (const file of walk(join('public', 'gallery'))) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
  const meta = await sharp(file).metadata();
  if (Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX && statSync(file).size < 1_500_000) continue;
  const tmp = file + '.tmp';
  let pipeline = sharp(file).rotate().resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true });
  pipeline = ext === '.png' ? pipeline.png({ compressionLevel: 9 }) : ext === '.webp' ? pipeline.webp({ quality: 82 }) : pipeline.jpeg({ quality: 84, mozjpeg: true });
  await pipeline.toFile(tmp);
  renameSync(tmp, file);
  n++;
  console.log('optimized', file);
}
console.log(`gallery:optimize - ${n} file(s) resized`);
