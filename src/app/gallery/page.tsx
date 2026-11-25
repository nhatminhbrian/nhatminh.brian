import type { Metadata } from 'next';
import { GalleryArchive, type ArchiveFolder } from '@/components/gallery/GalleryArchive';
import { T } from '@/components/i18n/LanguageProvider';
import { getFolders, partnerGroups } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Event photography by Brian (Nguyễn Nhật Minh), indexed by year and partner group.',
};

export default async function GalleryPage() {
  const folders = await getFolders();
  // only what the client needs (no full image lists)
  const items: ArchiveFolder[] = folders.map((f) => ({
    id: f.id,
    indexNumber: f.indexNumber,
    title: f.title,
    i18n: f.i18n,
    year: f.year,
    semester: f.semester,
    organization: f.organization,
    partnerGroup: f.partnerGroup,
    date: f.date,
    location: f.location,
    count: f.images.length,
    cover: f.coverImage,
  }));

  return (
    <div className="frame">
      <header className="grid gap-6 pb-10 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12"><T k="gallery.kicker" /></p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-8"><T k="gallery.title" /></h1>
        <p className="prose-ice self-end md:col-span-4"><T k="gallery.lede" /></p>
      </header>
      <GalleryArchive folders={items} groups={partnerGroups.map(({ id, label }) => ({ id, label }))} />
    </div>
  );
}
