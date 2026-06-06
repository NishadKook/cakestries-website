# Cakestries — Bespoke Cake Atelier Website

A premium, photography-led website for the custom cake business **Cakestries**.
Static HTML/CSS/JS — no build step, no dependencies. Opens anywhere, hosts anywhere.

## The concept — "The Edible Atelier"

Positioned not as a bakery but as a **commission-based cake atelier** — the portfolio
of a couturier who happens to work in sugar. Editorial, hushed, premium, photography-first.

- **Canvas:** warm porcelain ivory (`#F6F1E9`) with a faint paper grain
- **Ink:** deep espresso (`#221B16`)
- **Accents:** baked-sugar clay/terracotta-rose (`#BC8569`) + champagne gold (`#A98A5C`) for hairlines only
- **Type:** **Fraunces** (curvy display serif + italic) paired with **Jost** (quiet geometric sans)
- **Signature:** a magazine "index" system — numbered sections, small-caps labels, gold hairlines,
  framed images that draw in on hover

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, philosophy, featured work, disciplines, maker, process, quote, CTA |
| `about.html` | About — story, ethos, the maker |
| `portfolio.html` | Portfolio — filterable masonry gallery |
| `custom-orders.html` | Custom Orders — process, what's included, investment guide, enquiry form |
| `faq.html` | FAQ — accordion |
| `contact.html` | Contact — form + studio details |
| `styles.css` | All styling + design tokens |
| `script.js` | Nav, scroll reveals, accordion, gallery filter, forms |

## Running it locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.
(Any static server works — `npx serve`, VS Code Live Server, etc.)

## Swapping in the real photography

All images are tasteful **stand-ins** (Unsplash) so the site looks complete now.
To use the real Cakestries photos:

1. Drop your images into the `assets/` folder (e.g. `assets/marchmont.jpg`).
2. Find each `<img src="https://images.unsplash.com/...">` and replace the `src`
   with your local path, e.g. `src="assets/marchmont.jpg"`.
3. Keep the existing **aspect ratios** for a clean layout. Suggested export sizes:
   - Hero / CTA backgrounds: **2000px** wide, landscape
   - Gallery & feature images: **1000–1400px** wide
   - Portrait/split images: **1200px** wide, portrait (4:5)
4. Update the `alt="…"` text to describe each real cake (good for SEO + accessibility).
5. The `onerror="this.style.opacity=0"` fallback can stay — it hides any image that fails
   to load so the warm background shows instead of a broken icon.

> Tip: square/portrait crops sit best in the gallery. The masonry layout handles
> varying heights automatically.

## Notes

- **Forms** are front-end demos (they show a success message, nothing is sent).
  To make them live, connect each `<form data-demo>` to a service like Formspree,
  Basin, or your own endpoint, and remove the `data-demo` attribute.
- Replace `hello@cakestries.com` and confirm the Instagram handle throughout.
- Fully responsive (mobile-first), with a reduced-motion mode for accessibility.

## Deploying

Drag the folder into **Netlify Drop**, or `vercel deploy`, or any static host.
No configuration needed.
