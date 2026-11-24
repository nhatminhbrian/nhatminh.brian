import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  // Full-screen layer above the site chrome (header, footer, grain).
  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <NextStudio config={config} />
    </div>
  );
}
