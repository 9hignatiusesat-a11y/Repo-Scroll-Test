# PROJECT V — v3 (Multi-scene cinematic, scroll-driven)

This demo contains a multi-scene cinematic landing page where video playback is controlled by scrolling (scrub).

## Files
- index.html — main page
- style.css — styles used by the page
- script.js — GSAP + ScrollTrigger logic
- assets/
  - city.svg (poster)
  - character.svg (poster)
  - logo.svg (poster)

Notes:
- Video sources are CDN-hosted demo files (for immediate use). Replace `data-src` with your own `assets/*.mp4` if you prefer local videos.
- The demo is mute-only to avoid autoplay blocking; it uses SVG posters as fallbacks.
- To deploy: upload folder contents to your GitHub repo and enable GitHub Pages (branch `main`, root).
