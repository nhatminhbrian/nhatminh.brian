import { city } from '@/data/home.i18n';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { L, T } from '@/components/i18n/LanguageProvider';

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-32 border-t border-hairline">
      <div className="frame grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow"><T k="footer.kicker" /></p>
          <p className="display mt-6 text-[clamp(2.75rem,8vw,7rem)]">
            <T k="footer.title1" /> <em className="text-steel-300"><T k="footer.title2" /></em>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="glass glass-sheen mt-8 inline-flex min-h-12 items-center gap-3 rounded-full px-6 ui-label text-[0.6875rem] text-ice-100 transition-colors hover:text-white"
          >
            <T k="footer.write" /> {profile.email}
            <span aria-hidden>→</span>
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-end text-sm md:col-span-5">
          <div>
            <dt className="eyebrow"><T k="footer.photo" /></dt>
            <dd className="mt-2"><a className="hover:text-ice-100" href={profile.instagram}>{profile.handle}</a></dd>
          </div>
          <div>
            <dt className="eyebrow"><T k="footer.personal" /></dt>
            <dd className="mt-2"><a className="hover:text-ice-100" href={profile.instagramMain}>{profile.handleMain}</a></dd>
          </div>
          <div>
            <dt className="eyebrow"><T k="footer.phone" /></dt>
            <dd className="mt-2"><a className="hover:text-ice-100" href={profile.phoneHref}>{profile.phone}</a></dd>
          </div>
          <div>
            <dt className="eyebrow"><T k="footer.school" /></dt>
            <dd className="mt-2 break-all"><a className="hover:text-ice-100" href={`mailto:${profile.emailSchool}`}>{profile.emailSchool}</a></dd>
          </div>
        </dl>
      </div>
      <div className="frame flex flex-col gap-2 border-t border-hairline py-5 ui-label text-[0.6875rem] text-steel-400 sm:flex-row sm:justify-between">
        <span>© Brian · {profile.name} — <L t={city} /></span>
        <span>{profile.gear}</span>
        <Link href="/portfolios" className="hover:text-ice-100"><T k="footer.download" /></Link>
      </div>
    </footer>
  );
}
