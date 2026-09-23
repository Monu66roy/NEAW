# NEAW Website — UI/UX Demo

A responsive UI demo for Nepal Energy and Water Resources Pvt. Ltd. (NEAW),
built with Next.js (App Router), TypeScript, and Tailwind CSS v4, per the
attached brief. This phase covers UI/UX only — no backend, database, or
cloud/domain configuration.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To create a production build:

```bash
npm run build
npm run start
```

## Structure

- `app/` — one route per page (Home, About, What We Do, Projects,
  Partnerships, Opportunities, Insights, Careers, Contact, Privacy Policy),
  each using the shared `RootLayout` (Navbar + Footer).
- `components/` — reusable UI building blocks (Navbar, MobileMenu, Footer,
  HeroSection, SectionHeading, ImageSection, ServiceCard, ProjectCard,
  OpportunityCard, ArticleCard, CTASection, ContactForm, Button, Badge,
  Modal, TopoArt).
- `lib/site.ts` — shared site content (nav links, contact details, focus
  areas). Update this file to change real content across the site.
- `public/brand/` — supplied logo and brand assets.

## Design tokens

Defined in `app/globals.css` under `@theme inline`:

- Colors: `ink`, `slate`, `slate-light`, `surface`, `surface-alt`, `line`,
  `blue`, `blue-deep`, `blue-pale`, `green`, `green-light`, `green-pale` —
  drawn from the supplied NEAW logo (leaf green + water-drop blue).
- Type: Manrope for headings (`font-display`), Inter for body text
  (`font-body`), both self-hosted via `@fontsource` so no external font CDN
  is required.

## Content

Anything shown in `[square brackets]` is placeholder copy, per the brief's
instruction not to invent company facts, projects, figures, or claims.
Replace these with confirmed content as it becomes available — most page
copy is centralised in `app/*/page.tsx` and `lib/site.ts` for easy editing.

## Next phase

The frontend is structured so a FastAPI + PostgreSQL backend can be
connected later (contact form submission, careers applications, an
insights/CMS feed, and an admin dashboard for projects/opportunities), per
section 25 of the brief. No backend, database, hosting, domain, or
production credentials have been configured at this stage.
