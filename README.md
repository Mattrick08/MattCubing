# MattCubing

A Rubik's cube solve-time tracker. Time yourself, watch your progress on a chart, and keep your personal bests — no account, no backend, no build step.

## Features

- **Live timer** — tap the timer or press space to start and stop. Every completed solve is added automatically.
- **Manual entry** — add or correct a time by minutes, seconds, and milliseconds (useful if you mistimed a solve or want to log an old one).
- **Progress chart** — solve time plotted against trial number, with your best solve highlighted in gold and your latest in green.
- **Stats** — best, average, and latest time, always visible.
- **Delete** — remove any mis-entered time from the history list.
- **Persistence** — your times are saved automatically and are still there the next time you open the app. No sign-up required.

## Files

- `mattcubing.html` — the entire app (markup, styles, and logic in one file).
- `manifest.json` — lets the app be installed like a lightweight app on desktop or mobile (via "Add to Home Screen" / "Install").
- `icon-192.png`, `icon-512.png` — app icons referenced by the manifest. **Not included yet** — add your own square PNGs at these sizes, or point the manifest at different filenames, or remove the `icons` field if you don't need installability.

## Running it

Just open `mattcubing.html` in a browser, or host the folder on GitHub Pages:

1. Push these files to a repo (e.g. `mattcubing`).
2. In the repo settings, enable **GitHub Pages** for the branch/folder these files live in.
3. Visit the published URL — the app works as-is, and if you've added icons, it can be installed as an app too.

## Notes

- Solve data is stored locally in the browser you use, so it won't automatically sync across different devices or browsers unless you add a backend later.
- The timer's fonts load from Google Fonts; if that's ever unreachable, the app falls back to system fonts and keeps working normally.
