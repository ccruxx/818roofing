# 03 — Build Brief: 8:18 Roofing LLC

## Design System
- **Primary:** #EA580C (Bold Orange)
- **Secondary:** #F97316 (Warm Orange)
- **Accent:** #2563EB (Trust Blue)
- **Dark BG:** #0F172A (Deep Navy)
- **Background:** #FFF7ED (Warm Off-White)
- **Font:** IBM Plex Sans — professional, financial, trustworthy
- **Style:** Exaggerated Minimalism — huge type, high contrast, bold sections
- **Animations:** GSAP + ScrollTrigger, 150–350ms, ease-out entrances

## Site Architecture
- **index.html** — Single-page site (all sections)
  - Hero (#hero)
  - Services (#services)
  - Insurance Claims (#insurance) ← KEY DIFFERENTIATOR
  - Transformation / Work (#work)
  - Why 8:18 (#why-us)
  - CTA Band
  - Contact + Form (#contact)
  - Footer

## Key Differentiator
Insurance claim navigation is 8:18's #1 selling point. It must be:
- Given its own full dark section
- Featured as "Most Requested" on the services grid
- Described step-by-step (4 steps)
- Backed by stats (100%, $0, All-In)

## Conversion Strategy
- Primary CTA: "Get a Free Inspection" → scrolls to contact form
- Secondary CTA: "Call or Text Now" → tel: link
- Form fields: name, phone, email (optional), address, service type, message
- Form submission: currently simulated (needs backend endpoint)

## SEO Targets
- "roofing Oklahoma"
- "storm damage roofing Oklahoma"
- "insurance claim roofing Roosevelt OK"
- "free roof inspection Oklahoma"
- "siding replacement Oklahoma"

## Anti-Patterns (Avoid)
- No emojis as icons (SVG only — Heroicons inline)
- No gradient purple/pink (AI aesthetic)
- No heavy image grids that slow mobile
- No stock photo of handshake or hard hat close-up
