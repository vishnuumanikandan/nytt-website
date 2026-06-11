# National Youth Think Tank — Website

Full rebuild of [nationalyouththinktank.org](https://nationalyouththinktank.org): a public site, chapter application flow, member dashboard, and admin panel in a single Next.js app.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions). No separate backend.
- **SQLite** via better-sqlite3. The database lives at `data/nytt.db` and is created and seeded automatically on first run.
- **Tailwind CSS v4** with a dual-theme semantic token system (see `DESIGN.md` and `PRODUCT.md`). Light and dark editions both pass WCAG AA; theme follows system preference with a manual lightbulb toggle in the nav, persisted in localStorage.
- **GSAP** scroll choreography (scrubbed text reveal, parallax photo frames), fully disabled under `prefers-reduced-motion`. All content is server-rendered visible; motion is progressive enhancement.
- Sessions are httpOnly cookies backed by a sessions table. Passwords are bcrypt-hashed.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Admin access

On first run an admin account is created from environment variables:

| Variable | Default |
| --- | --- |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `nytt-admin` |

**Set a real `ADMIN_PASSWORD` before deploying.** Log in at `/admin-login`. The admin panel approves or rejects chapter applications, publishes and deletes Journal posts, and creates and deletes events.

## Data and seeding

- On first run, `lib/seed-chapters.json` (the 48 chapters exported from the previous site, passwords stripped) is imported. Imported chapter accounts are **locked**: the old site exposed password data through its public API, so those credentials were treated as compromised. Imported chapters can be given fresh access by re-registering or by a future password-reset flow.
- New chapter applications are created through `/register`, appear as pending in the admin panel, and join the public directory at `/chapters` when approved.
- The Journal (`/blog`) and Events (`/events`) start empty and are populated from the admin panel. Both have designed empty states.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage |
| `/about`, `/mission`, `/team`, `/formats`, `/featured-project` | Org, programs, team, competitions, NextBridge Advisory |
| `/chapters` | Public chapter directory |
| `/register`, `/login`, `/dashboard` | Chapter application, login, member dashboard |
| `/blog`, `/blog/[slug]`, `/events` | Journal and events |
| `/admin-login`, `/admin` | Admin panel |

## Checks

```bash
npx eslint app components lib scripts   # lint
npx tsc --noEmit                        # types
node scripts/e2e.mjs                    # full browser end-to-end suite (needs dev server on :3456 and Chrome)
node scripts/overflow-check.mjs         # horizontal-overflow audit at 4 viewport widths
node scripts/contrast-check.mjs         # WCAG AA contrast audit of every page in BOTH themes
node scripts/shoot-all.mjs              # full-page screenshots of every route in both themes
```

The e2e suite covers: chapter registration, login (including wrong-password handling), admin approval, the public directory, event creation and registration, Journal publishing, security (no password data in any public page), and route protection.

## Deploying

The app needs a Node host with a persistent disk for `data/nytt.db` (Railway, Render, Fly.io, a VPS, or Replit). Vercel's serverless filesystem will not persist SQLite.

1. `npm run build && npm start` (port via `PORT`).
2. Set `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
3. Back up `data/nytt.db` (it is the entire application state).
4. Point the `nationalyouththinktank.org` DNS at the new host.

## Credits

Capitol photography from Wikimedia Commons (CC BY-SA): Pennsylvania State Capitol exterior by w_lemay, Senate Chamber by Bestbudbrian, rotunda by Acroteion. Team and NextBridge photos are the organization's own, carried over from the previous site.
