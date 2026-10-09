# david-nyurenberg.com

Single-page byline / publications site for David Nyurenberg.

## Stack

- **Framework**: Astro 6 (static export)
- **Host**: Cloudflare Pages
- **Production domain**: https://david-nyurenberg.com

## Local development

```powershell
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static export to ./dist
npm run preview  # preview the built site locally
```

## Content model

All publications live in `src/data/publications.json` as an array of entries:

```json
[
  {
    "date": "2025-06",
    "venue": "The Atlantic",
    "title": "Article title here",
    "subtitle": "Optional subtitle",
    "synopsis": "Optional 1-2 sentence description shown below the title.",
    "kind": "article",
    "slug": "article-title-here",
    "url": "https://theatlantic.com/...."
  }
]
```

Required fields: `date` (`YYYY-MM` or `YYYY-MM-DD`), `venue`, `title`.
Optional: `subtitle`, `synopsis`, `kind`, `slug`, `url`, and `links`
(`[{ "label", "url" }]`, for one entry with several formats, e.g. a podcast
plus a written interview).

## Monthly scan

`.github/workflows/scan-publications.yml` runs on the 1st of each month (or by
hand from the Actions tab). It runs `scripts/scan-publications.mjs`, which
checks the AdExchanger tag feed and Bing News for new coverage that names
David, then opens a PR with the new entries. Before merging, check each
entry's `type` and `synopsis`, because both are machine guesses. To stop the
scan proposing an item again, add its URL to `src/data/scan-ignore.json`.

If `url` is set, that's the direct link. Otherwise the resolver falls back to
`src/data/linkedin-urls.json` for known deep-links, then to the venue's
search page.

## Deploy

1. Push to GitHub (any branch — main is the default deploy branch).
2. In Cloudflare Pages, create a project connected to this repo.
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: `22.12.0` or higher
4. Add the custom domain `david-nyurenberg.com` under
   Pages → Custom domains.

CF will issue an SSL cert automatically.

## Brand

- **Paper**: `#fafaf7` (warm off-white)
- **Ink**: `#1a1a1a`
- **Accent**: `#2e3a4a` (slate) — David's signature
- **Typography**: Fraunces (serif) + Inter (sans)
- All tokens live in `src/styles/global.css` under `:root`.
