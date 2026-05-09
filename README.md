# 8:18 Roofing LLC — Website

Premium marketing website for 8:18 Roofing LLC, Roosevelt, OK.

## Project Structure

```
site/
  index.html          Main single-page site
  css/styles.css      All styles (design tokens, components, layout)
  js/main.js          GSAP animations, nav, form validation
  assets/images/      Drop client photos here
research/
  01-client-brand.md  Brand extraction
  03-build-brief.md   Master design decisions
```

## To Deploy

### Option A — Vercel (Recommended, Free)
1. Install Vercel CLI: `npm i -g vercel`
2. From this folder: `vercel`
3. Follow prompts — it deploys automatically
4. Custom domain: add in Vercel dashboard

### Option B — Netlify (Free)
1. Drag the `site/` folder to netlify.com/drop
2. Custom domain: add in Netlify dashboard

### Option C — Traditional Hosting
Upload the contents of `site/` to any web host's public folder (public_html).

## Customization Checklist

### Replace Placeholders
- [ ] Hero background — replace `.hero__bg-placeholder` gradient with a real photo
      or drop a Nano Banana 3D asset (1440×900px) — marked with `<!-- NANO BANANA ASSET HERE -->`
- [ ] Insurance section visual — replace stat block with a photo or 3D asset (600×700px)
- [ ] Transform cards — replace placeholder gradients with real before/after photos
- [ ] Favicon — add `favicon.ico` to `site/` root

### Wire Up the Contact Form
The form currently simulates submission (1.2s delay + success message).
To handle real submissions, use one of:
- **Formspree** (free): add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
- **Netlify Forms**: add `data-netlify="true"` to the `<form>` tag
- **Custom backend**: replace the `await new Promise(...)` in `js/main.js` with a `fetch()` POST

### SEO
- [ ] Update `og:image` meta tag with a real photo URL
- [ ] Submit `sitemap.xml` to Google Search Console (add the client's domain first)
- [ ] Verify business in Google Business Profile

## Contact Info Embedded
- Phone: (580) 699-0195
- Email: eight.18roofing@gmail.com / eight.18construction@gmail.com
- Address: 724 Wichita, Roosevelt, OK 73564
- Facebook: https://www.facebook.com/profile.php?id=61580919282887

## Tech Stack
- HTML5, CSS3 (custom properties / design tokens), Vanilla JavaScript
- GSAP 3 + ScrollTrigger (CDN) for scroll animations
- IBM Plex Sans via Google Fonts
- No build step required — open index.html directly or serve from any host
