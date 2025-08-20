# The Symposia — Prototype Codebase

A minimal, accessible Next.js 14 (App Router + TypeScript) implementation for a digital audio/visual magazine:
- Topics list
- Topic detail page with Video.js player
- Captions (WebVTT) and transcript support
- Mobile-first UI with TailwindCSS
- Keyboard navigation and focus-visible styles

## Quick Start

```bash
# 1) Install deps
npm install

# If you see an error about '@tailwindcss/typography', add it:
npm install -D @tailwindcss/typography

# 2) Run dev server
npm run dev

# 3) Open
http://localhost:3000
```

## Project Structure

```
app/                # Next.js App Router pages
  page.tsx          # Topic list
  topics/[slug]/    # Topic detail
  about/            # About page
components/         # UI components
  VideoPlayer.tsx   # Accessible Video.js player
data/topics.json    # Demo content (replace with CMS fetch later)
public/captions/    # Demo WebVTT caption files
lib/                # Utilities
```

## Content Management (Swap in later)

This prototype ships with `data/topics.json`. For a production setup, connect a headless CMS (e.g., Sanity/Strapi) and fetch topics in `app/page.tsx` and `app/topics/[slug]/page.tsx` via their SDK/REST APIs.

## Accessibility

- Skip link provided
- Focus-visible outlines
- Captions via WebVTT tracks
- Transcript under `<details>` disclosure
- Semantic landmarks & headings

## Notes

- Demo uses public HLS sample streams.
- To use DASH, update the `type` in `VideoPlayer` if your source ends with `.mpd`.
- For self-hosted videos, place files under a CDN and reference the `.m3u8` playlist URL.
