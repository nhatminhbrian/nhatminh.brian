@AGENTS.md

# Project rules

## No em-dashes

Never use an em-dash (U+2014) anywhere: UI copy, `<title>`/metadata, eyebrows, footer, Sanity schema labels/descriptions/placeholders, vi/en/ko fallback or seed data, or code comments. Always use a standard hyphen `-`, spaced as ` - ` when it works as a divider (e.g. `Portfolios - Brian`, `(02) - PORTFOLIO`).

Content already in Sanity is normalised at render time: every Sanity read goes through `cleanDashes()` in `src/sanity/fetch.ts`, and `pickLang()` / `tr()` in `src/i18n/pick.ts` apply `noEmDash()`. Keep new CMS fetches and text helpers routed through these.

Check before committing: `grep -rnP '\x{2014}' src sanity.config.ts scripts` must return nothing.
