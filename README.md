# Tongasoa Zazakely

Deploy-ready static website. No framework, backend, build command, or cookies required.

## Deploy

Upload the **contents** of this directory to Netlify, Cloudflare Pages, Vercel, GitHub Pages, or another static host. The entry file is `index.html`. When using Git-based hosting, set the publish directory to `/` and leave the build command blank. There are no dependencies to install.

## Before going live

- Confirm that all images at `ik.imagekit.io` load from the live domain. The photos are hosted externally, not in this ZIP. For guaranteed self-contained delivery, download images you own into `assets/photos/` and update `src` references. Asset downloads were not possible in the authoring environment.
- Confirm the association information, 2027 project timing, fundraiser target (€2,000), and all external links with the association.
- Add the real canonical site URL and `og:url` meta tag once your final domain is known. You may also choose a permanent homepage preview image on your domain.
- Review image alt descriptions against the photographs. Current alt text intentionally describes their known context only, rather than inventing visual details.
- If necessary, supply a privacy statement appropriate to any future tracking tools you add. The site currently doesn't include analytics or tracking scripts.

## Files

- `index.html`: site content in French; English in `data-en` attributes.
- `assets/site.css`: layout, design tokens, responsive and dark mode styles.
- `assets/site.js`: language switcher and accessible mobile menu.
- `assets/favicon.svg` and `assets/apple-touch-icon.png`: site icons.
- `robots.txt`: allow indexing.

## Design rules

Warm cream, burgundy accent, Newsreader for editorial text, sans serif for interface text, one primary donation button, consistent section spacing, plain photo treatment and one handwritten signature. Avoid adding card backgrounds, arbitrary staggered layouts, decorative numbering, and multiple versions of the same information. Inspired by Impeccable's *distill*, *quieter*, *typeset*, *layout*, and *polish* guidance: https://impeccable.style/docs/.

## Testing

Test menu open/close, language switching, keyboard focus, mobile device widths and external photo loads on your deployed domain. The photo URL and Google Fonts need network access; graceful system font fallbacks are provided.
