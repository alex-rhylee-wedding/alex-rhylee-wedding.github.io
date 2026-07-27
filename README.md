# Rhylee & Alex — Save the Date site

Three screens: info form → auto-playing Short → click-anywhere four-flap
envelope reveal. Pure HTML/CSS/JS, no build step — works directly on
GitHub Pages.

## Files
```
save-the-date/
├── index.html
├── css/style.css
├── js/script.js
└── README.md
```

## Important: connect the form so you actually receive submissions

GitHub Pages only serves files — it has no server to receive form data.
Right now the "Submit" button plays the animation but the name/phone/
email/address typed in **go nowhere** until you connect a free form
backend. Recommended: **Formspree** (free, no code, 2 minutes).

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Click **New Form**, name it anything (e.g. "Save the Date"), and create it.
3. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`
   — copy it.
4. Open `js/script.js` and paste it into this line near the top:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```
5. Commit the change. From then on, every submission emails you (and
   shows up in your Formspree dashboard) automatically.

Until you do this, the site still works and looks correct — submissions
just aren't saved anywhere, so don't skip this step.

## Personalizing

In `js/script.js`:
```js
const YOUTUBE_VIDEO_ID = "c03SZa1nvb8";
const COUPLE_NAMES = "Rhylee & Alex";
```

In `index.html`, the save-the-date blurb text lives inside
`<div class="reveal-content">` near the bottom — edit the
`<p class="reveal-blurb">` text to your own wording.

## Preview locally
Double-click `index.html` — no server needed. (The video needs internet;
everything else works offline.)

## Publish on GitHub Pages
1. Create a repo named exactly `yourusername.github.io`.
2. Upload `index.html`, `css/`, and `js/` (Add file → Upload files → drag
   all three in, keeping folder structure).
3. Commit changes.
4. Settings → Pages → source: Deploy from a branch → branch `main`,
   folder `/ (root)` → Save.
5. Visit `https://yourusername.github.io` after a minute or two.

## How each screen works

- **Screen 1 (info form)** — name, phone, email, address, plus an
  "I've already submitted my info" button that skips straight to the
  video without submitting. On submit, the panel collapses with a
  smooth fade/scale-down, then the page scrolls to the video.
- **Screen 2 (video)** — the Short loads and autoplays (muted, per
  browser autoplay rules — guests can unmute with the player's speaker
  icon) as soon as it scrolls into view. A plain-text fallback link
  sits underneath.
- **Screen 3 (envelope reveal)** — tapping anywhere on the screen
  triggers all four triangular flaps to fold outward in a staggered
  3D animation, revealing the save-the-date blurb in the center.

Respects `prefers-reduced-motion`; all interactive elements are real
buttons/links/inputs and keyboard-reachable.
