import 'server-only';
import manifest from './media.generated.json';
import type { MediaRef, ResolvedMedia } from './types';

type Entry = { src: string; width: number; height: number; blur: string };
const table = manifest as Record<string, Entry>;

/** Resolve a MediaRef against the generated manifest (server only, keeps blur data out of client bundles). */
export function resolve(ref: MediaRef): ResolvedMedia {
  const entry = table[ref.id];
  if (!entry) throw new Error(`Unknown media id "${ref.id}"`);
  return { ...ref, ...entry };
}

export function resolveAll(refs: MediaRef[]): ResolvedMedia[] {
  return refs.map(resolve);
}

/** Every manifest id that starts with a prefix, in order — handy for bulk collections. */
export function idsWithPrefix(prefix: string): string[] {
  return Object.keys(table)
    .filter((k) => k.startsWith(prefix))
    .sort();
}
