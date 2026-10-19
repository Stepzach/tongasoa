# Tongasoa Zazakely — static website

A lightweight bilingual (French/English) single-page website. No build tools, JavaScript framework, accounts or backend are required.

## Deploy

**Netlify / Cloudflare Pages / Vercel / another static host:** Upload the *contents* of this folder, keeping `index.html` at the site root. With Git-based deployment, select the repository root as the publish directory. Build command: **none** (or leave blank). For GitHub Pages, place the files at the root of the publishing branch and enable Pages for that branch.

**Local preview:** From this folder, run `python3 -m http.server 8080`, then open `http://localhost:8080`.

## Included files

- `index.html` — French-first semantic page content, metadata and translations.
- `assets/site.css` — design system and responsive layouts, dark mode, reduced motion and high-contrast support.
- `assets/site.js` — navigation overlay, keyboard controls, language switch and simple interactions.
- `assets/favicon.svg` and `assets/apple-touch-icon.png` — site icons.
- `robots.txt` — allows search-engine crawling.

## Review before launch

1. **Photos:** This package uses existing externally hosted photos on `ik.imagekit.io` (13 references). Make sure those images remain publicly available, the association has the rights/consent to publish them, and the crops are suitable on smaller screens. If you want a fully self-hosted site, download authorized images into `assets/` and update their `src` attributes in `index.html`.
2. **Fonts:** The editorial serif (`Newsreader`) and handwriting (`Caveat`) load from Google Fonts. They gracefully fall back if unavailable. The previous `Nonos-Handwritting.woff` was missing from the supplied file, so this site does not reference it.
3. **Content:** Confirm the 2027 Foulpointe project details, the €2,000 target, the legal identifier and the HelloAsso/Facebook links are still correct before publishing.
4. **Domain / SEO:** Once you know the domain, add an absolute canonical link and `og:url` to the `<head>`; optionally add a sitemap using the same public domain.
5. **Privacy:** The site has no first-party tracking code or cookies; it does use third-party photo hosting, Google Fonts, and external donation/social links. Review your hosting provider's privacy requirements before launch.

## Editing

French text lives directly in `index.html`; add the English translation in the corresponding `data-en` attribute. For image descriptions, edit `alt` and `data-alt-en` together. Keep `loading="lazy"` on below-the-fold images. The top hero image intentionally loads immediately.

## Browser behavior

- Mobile/tablet menu overlays the content without changing document height; it supports Escape, outside-tap closing, keyboard navigation and screen-reader labels.
- Touch targets and links are designed for 44px+ interaction zones.
- OS reduced-motion and high-contrast preferences are respected.
- Without JavaScript, the primary links remain visible and usable; the page content remains readable.

## Design direction

Built from the more personal, original design rather than the later minimalist redesign. All **13 original unique photographs** and the asymmetrical photo arrangements are retained. No overline/eyebrow labels are used; handwritten touches are deliberately limited.
