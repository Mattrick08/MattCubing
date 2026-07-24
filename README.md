# MattCubing

A Rubik's Cube solve-time tracker and community hub. Time yourself, chart your progress, race friends live, and build out your algorithm notebook — all in a single-page app with no build step.

## Features

### Timing & practice
- **Live timer** — tap and hold the timer (or hold space) to start; release to begin inspection or the solve, per your settings.
- **Inspection countdown** — optional 15-second WCA-style inspection period before the solve starts; time spent past 15s is tracked as overtime.
- **Scramble generator** — generates a random scramble per solve, with the ability to edit it manually, copy it, or share it via a link (`?scramble=...`) so someone else can attempt the same scramble.
- **Manual entry** — log or correct a time by minutes, seconds, and milliseconds, useful for old solves or mistimed attempts.
- **Notation guide** — a built-in reference for cube notation.

### Stats & history
- **Live stats** — best, average, latest, today's count, and this week's count, always visible.
- **Progress chart** — solve time plotted against trial number, with your best highlighted in gold, latest in green, and DNFs marked distinctly.
- **History list** — every solve with its scramble and notes, filterable by note text or date range, and editable/deletable in place.
- **Notes** — attach a note to any solve (e.g. "lost my OLL alg mid-solve").

### Account & sync
- **Accounts** — email/password auth backed by Supabase; each account has a display name shown across the community features.
- **Cloud sync with offline support** — solves save to your account automatically; if you're offline, they queue locally and sync once you're back online, with a banner indicating pending syncs.
- **Cross-device** — because solves live in your account (not just local storage), your history follows you across browsers and devices.

### Community
- **Friends** — search for and add other users to a friends list.
- **Leaderboard** — compare stats (including Arena wins) against friends or the wider community.
- **Daily & weekly challenges** — a shared scramble everyone attempts, with submitted results ranked.
- **Direct messages** — chat one-on-one with friends.
- **Arena (live races)** — create a public or private race room, share the room code or invite link, ready up, and race friends head-to-head on a shared scramble with live results and in-room chat.

### Algorithm notebook
- **Repertoires** — organize algorithms into named groups (e.g. "OLL", "PLL", "F2L").
- **Algorithm entries** — save an algorithm's moves, name, and description; moves are parsed and rendered as step-by-step move cards.
- **Quick copy** — copy any algorithm's move sequence to your clipboard.

### App behavior
- **Installable (PWA)** — add MattCubing to your home screen or desktop via the browser's install prompt.
- **Offline-capable shell** — a service worker caches the app shell so it opens even without a connection; it fetches fresh files first and only falls back to the cache when offline, so installed users always get the latest version when online.
- **Graceful font fallback** — the timer's display fonts load from Google Fonts; if that's unreachable, the app falls back to system fonts and keeps working normally.

## Files

- `index.html` — the entire app (markup, styles, and logic in one file).
- `manifest.json` — lets the app be installed like a lightweight app on desktop or mobile (via "Add to Home Screen" / "Install").
- `sw.js` — the service worker that powers offline/installed behavior.
- `icon-192.png`, `icon-512.png` — app icons referenced by the manifest and page head. **Filenames must match exactly** across `index.html`, `manifest.json`, and `sw.js` — if you rename or replace these icons, update all three.

## Setup

MattCubing needs a [Supabase](https://supabase.com) project for accounts, sync, and community features:

1. Create a Supabase project.
2. Add your project URL and anon/public key in `index.html` (see the comment near the top of the `<script>` block, just above where the Supabase client is created).
3. Set up the required tables (solves, profiles, friends, arenas, arena participants, arena chat, direct messages, challenges, algo repertoires, algo entries) with row-level security scoped to `user_id`.

Without a Supabase connection configured, the app will show a message on the auth screen instead of the sign-in form.

## Running it

Just open `index.html` in a browser, or host the folder on GitHub Pages:

1. Push these files to a repo (e.g. `mattcubing`).
2. In the repo settings, enable **GitHub Pages** for the branch/folder these files live in.
3. Visit the published URL — the app works as-is, and can be installed as an app since icons are included.

## Notes

- Solve data lives in your Supabase account, so it syncs across devices once you're signed in. If you're offline when you finish a solve, it's queued locally and synced automatically once you're back online.
- The timer's fonts load from Google Fonts; if that's ever unreachable, the app falls back to system fonts and keeps working normally.
