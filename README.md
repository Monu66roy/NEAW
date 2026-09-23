# NEAW Website — Full Stack (Next.js + FastAPI + PostgreSQL)

This is the NEAW website split into two parts:

- **frontend/** — the Next.js site you already had (unchanged visually).
  Every page that used to hold hardcoded text/lists now fetches that
  content from the backend instead, and a new `/admin` section lets you
  edit it without touching code.
- **backend/** — a new FastAPI + PostgreSQL API that owns all editable
  content: settings, page text, projects, opportunities, articles, job
  openings, and images (stored as bytes directly in Postgres).

Nothing about the site's design, layout, or components was changed —
only *where the content comes from* changed, from hardcoded arrays to
this API.

## Quick start (local development)

**1. Start Postgres** (via Docker, or point `DATABASE_URL` at your own):

```bash
docker compose up -d
```

**2. Set up and run the backend:**

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env          # edit ADMIN_PASSWORD and JWT_SECRET
.venv/bin/python -m app.seed  # loads your existing site content
.venv/bin/uvicorn app.main:app --reload
```

The API is now at http://localhost:8000, with interactive docs at
http://localhost:8000/docs.

**3. Set up and run the frontend** (in a second terminal):

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

The site is now at http://localhost:3000, and the admin panel at
http://localhost:3000/admin (sign in with the `ADMIN_USERNAME` /
`ADMIN_PASSWORD` you set in `backend/.env`).

## Two ways to edit content

**1. The admin panel (`/admin`)** — sign in, then:
- **Settings** — company name, tagline, contact info, social links
- **Page Content** — freeform text blocks (currently wired up for the
  Home and About hero/intro sections and the Contact hero — see
  "Extending Page Content" below to add more)
- **Content Lists** — Focus Areas, Core Values, Partnership Types,
  Career Reasons, Privacy Policy sections, or any brand-new list you
  create by typing a new list key
- **Projects / Opportunities / Insights / Job Openings** — full
  add/edit/delete, with image upload for Projects and Articles
- **Images** — a library of everything uploaded, stored in Postgres

**2. The code/API interface** — every admin-panel action is just a call
to the FastAPI backend. For bulk edits, scripts, or integrations, use
the interactive docs at `/docs` (or `/redoc`) to call the same
endpoints directly — no separate code path to maintain.

## How the content flows

```
Postgres  <-->  FastAPI (backend/)  <-->  Next.js pages (frontend/lib/api.ts)  -->  rendered site
                        ^
                        |
              Admin panel (frontend/app/admin/*)
```

- `backend/app/models.py` — the database schema
- `backend/app/routers/` — the REST endpoints (public reads, JWT-protected writes)
- `backend/app/seed.py` — loads your current copy so nothing visibly changes on first run
- `frontend/lib/api.ts` — the only place frontend pages fetch content from (with safe fallbacks if the API is unreachable)
- `frontend/lib/admin/` — the admin panel's API client and auth guard
- `frontend/components/admin/` — the reusable table/form/image-picker used by every admin CRUD screen

### Extending "Page Content" to more text

Right now only a few hero/intro blocks are wired through the generic
Page Content system (see `backend/app/seed.py`'s `seed_page_content`
for the full list). To make another piece of static text editable:

1. In the relevant `app/*/page.tsx`, fetch it: `const content = await getPageContent("about")`
2. Replace the hardcoded string with `block(content, "some_key", "current text as the fallback")`
3. Add a matching row in the admin panel's **Page Content** screen (page slug + block key + value) — no backend change needed.

### Adding a brand-new content list

The **Content Lists** admin screen and the `/lists/{list_key}` API work
for *any* key — typing a new one (e.g. `timeline_milestones`) and
adding items to it works immediately. To actually show that list on a
page, add one line to the page: `const items = await getContentList("timeline_milestones")`.

## Images

Images are uploaded through the admin panel (or `POST /images` with a
file), stored as bytes in Postgres, and served back at
`/images/{id}/file`. Projects and Articles reference an image by ID;
if none is set, the site falls back to the existing decorative
placeholder graphic rather than showing a broken image.

## Notes on this migration

- All content currently in the database was extracted from your actual
  site (`frontend/app/**/page.tsx`) at the time of this change, so the
  first run should look identical to what you had.
- The two previously-separate project lists (one on `/projects`, a
  different one on `/projects/[id]`) have been consolidated into a
  single `projects` table — the detail page now looks up the same
  record by slug instead of keeping its own copy.
- A few project images referenced in the old code
  (`water-resources-development.jpg`, `clean-energy-opportunities.jpg`,
  `hydropower-development.jpg`) didn't actually exist in `public/images`
  — those projects now render the existing placeholder graphic instead
  of a broken image until you upload real photos via the admin panel.

## Production deployment

- Run Postgres as a managed instance (or your own server) rather than
  the local Docker container.
- Set `DATABASE_URL`, a strong `JWT_SECRET`, and a strong
  `ADMIN_PASSWORD` in the backend's environment.
- Set `CORS_ORIGINS` to your real frontend domain(s).
- Set `NEXT_PUBLIC_API_URL` on the frontend to your deployed backend's
  public URL.
- Run the backend with a process manager (e.g. `uvicorn` behind
  `gunicorn`, or a container) and the frontend with `next build && next start`.
