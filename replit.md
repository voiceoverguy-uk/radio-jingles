# RadioJingles.com

## Overview
Professional website for Radio Jingles Ltd, a UK radio jingle & commercial production company based in Torquay, Devon. Single-page site with audio demos, services, studio photos, YouTube videos, meet the team, and contact section.

## Recent Changes
- 2026-04-08: Added `/sung-radio-jingles` SEO page — full hero, stats, intro, 8 jingle types, pullquote, 6-card production grid, why-choose-us, 7 FAQ items, CTA; nav updated on all pages; sitemap updated; internal link from /jingles body
- 2026-03-10: Redesigned team section with real photos, roles & bios; updated About copy; polished audio demo cards; added Listen Live button for Torbay Radio; animated nav hover underline
- 2026-02-22: Added Radio Jingles banner to hero, added Torbay Radio section with logo, fixed Paula name in team
- 2026-02-21: Added Meet the Team section, replaced contact form with mailto button, added 2nd YouTube video
- 2026-02-21: Added YouTube video embed, Get Directions button, dynamic copyright year
- 2026-02-18: Initial build - full single-page site with Express backend

## Project Architecture
- **Server**: Express.js (`server.js`) serving static files and `/api/contact` endpoint
- **Frontend**: Static HTML/CSS/JS in `public/`
- **Port**: 5000

### File Structure
```
server.js              - Express server
public/
  index.html           - Main single-page site
  css/style.css        - All styles
  js/main.js           - Client-side JS (audio demos, contact form, nav)
  audio/               - MP3 demo files go here
  images/              - Studio photos and OG image go here
```

### How to Add New Demos
Edit the `audioDemos` array in `public/js/main.js`. Each entry needs:
- `title`: Display name
- `meta`: Category label (e.g., "Commercial Demo")
- `file`: Exact filename of the MP3 in `public/audio/`

### YouTube Video
The embedded YouTube videos are in the `#video` section of `index.html`. To change a video, update the `src` attribute of the iframe to a new `https://www.youtube.com/embed/VIDEO_ID` URL.

### Contact
The contact section uses a mailto: link to Doc@radiojingles.com with a pre-filled subject line. No form or backend email service is used.

**Note:** SendGrid integration was dismissed by user. If email sending is needed in future, either set up SendGrid or provide API credentials manually.

### Where to Put Files
- MP3s: `public/audio/`
- Images: `public/images/`

## User Preferences
- Light, clean SaaS-style design
- Blue colour palette (#1f3c88 primary, #2da9ff accent)
- Mobile-first responsive
- No heavy libraries
