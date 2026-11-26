# Nguyễn Nhật Minh - @_wandergraph_

Portfolio site for Nguyễn Nhật Minh (Brian) - International Economics student at the Diplomatic Academy of Viet Nam and visual storyteller.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Framer Motion · self-hosted variable fonts (Cormorant Garamond, Inter Tight, JetBrains Mono - Vietnamese subsets).

## Routes

| Route | What it is |
| --- | --- |
| `/` | Editorial hero, interactive 01–04 index with hover previews, dual-lens bio, philosophy, milestones |
| `/achievements` | Archive filterable by năm học, học kì and lĩnh vực with `+` detail drawers |
| `/gallery`, `/gallery/[slug]` | Collections by partner, asymmetric masonry, swipeable fullscreen lightbox |
| `/portfolios` | Hub for the three web editions + original PDFs |
| `/portfolios/project` | Project Portfolio (EN) - luminescent. Red Sun / Blue Moon switcher |
| `/portfolios/sseayp` | SSEAYP 49th - three-act switcher + Act 4 coda |
| `/portfolios/nhan-quan-the-ky` | Nhãn Quan Thế Kỷ visual essay with artifact hotspots |

## Adding photo albums & achievements (no code)

Open **`/studio`** on the live site and sign in with GitHub.

- **Bộ ảnh → +**: name the album, pick the partner group (Đoàn TN, Khoa KTQT, SSEAYP…), date, short description and story, then drag a whole folder of photos into *Ảnh trong bộ*. Reorder by dragging, set a cover, **Publish**.
- The album gets its own page at `/gallery/<slug>`, shows up first in the `/gallery` reel, and is listed under its partner's page. Tick *Featured Works* to put it on the home page.
- **Thành tích → +**: title, organisation, năm học, học kì, lĩnh vực, summary - it appears in `/achievements` filters automatically.
- Images are resized and compressed by Sanity's CDN; the site refreshes within about a minute.

Sanity project: `sy9719i7`, dataset `production` (override with `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`).

## Content

All content lives in `src/data/` and is read only through `src/lib/content.ts`:

- `profile.ts` - bio, dual-lens copy, philosophy, credentials
- `achievements.ts` - archive entries (`needsReview: true` marks an inferred semester to confirm)
- `gallery.ts` - collections; `pending: true` renders an "archive in preparation" state
- `portfolios.ts` - the three editions' text, acts, hotspots
- `media.generated.json` - image manifest (src, size, blur placeholder), produced from the PDFs/photos

To move to **Sanity**: model the types in `src/data/types.ts` as schemas, mount Studio at `/studio`, and re-implement the functions in `src/lib/content.ts` with GROQ - pages and components stay unchanged.

### Adding photos to a collection

1. Put WebP files in `public/media/<collection>/`.
2. Add entries (`src`, `width`, `height`, `blur`) to `src/data/media.generated.json`.
3. Reference their ids in `src/data/gallery.ts` and remove `pending: true`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploys to Vercel with zero config (framework preset: Next.js).
