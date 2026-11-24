// Re-assembles the original portfolio PDFs from <3.5 MB parts (kept small so the
// repo can be updated from GitHub's web uploader). Runs before dev and build.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = 'pdf-parts';
const out = join('public', 'pdf');
mkdirSync(out, { recursive: true });

const groups = new Map();
for (const f of readdirSync(src).sort()) {
  const m = f.match(/^(.+\.pdf)\.part\d+$/);
  if (!m) continue;
  if (!groups.has(m[1])) groups.set(m[1], []);
  groups.get(m[1]).push(f);
}

for (const [name, parts] of groups) {
  const target = join(out, name);
  const data = Buffer.concat(parts.map((p) => readFileSync(join(src, p))));
  if (existsSync(target) && readFileSync(target).equals(data)) continue;
  writeFileSync(target, data);
  console.log(`assembled ${target} (${parts.length} parts, ${(data.length / 1e6).toFixed(1)} MB)`);
}
