# Emma & Noah — Save the Date site

A single-page save-the-date site: intro → guest name → click-to-open envelope →
save-the-date video → "more info to come." Pure HTML/CSS/JS, no build step —
works directly on GitHub Pages' free hosting.

## Files

```
save-the-date/
├── index.html      the whole page (5 sections)
├── css/style.css   all styling (wildflower palette, envelope animation)
├── js/script.js    guest name capture, envelope open, video lazy-load
└── README.md       this file
```

## 1. Personalize it — the only 2 things you must change

Open `js/script.js`, lines 1–4:

```js
const YOUTUBE_VIDEO_ID = "VIDEO_ID_HERE"; // <-- put your real video ID here
const COUPLE_NAMES = "Emma & Noah";
```

**Finding your YouTube video ID:** in a URL like
`https://www.youtube.com/watch?v=aBcD3fGhIjK`, the ID is the part after `v=`
— here, `aBcD3fGhIjK`. Paste just that part in, keeping the quotes.

Then replace every other appearance of "Emma", "Noah", "Emma & Noah",
"June 12, 2027", and "Charleston, South Carolina" in `index.html` with your
real names, date, and location. They currently appear in:
- `<title>` tag and meta description (top of file)
- The `intro` section (`<h1 class="names">`, `.date-plate`)
- The envelope seal initials (`.seal-initials`) — currently "E N"
- The `more` section sign-off

Use your editor's find-and-replace (Ctrl/Cmd+F) — every instance is plain text.

## 2. Preview it locally

Just double-click `index.html` to open it in your browser — no server needed.
(The envelope, guest form, and video button all work offline; only the actual
YouTube video needs internet.)

## 3. Put it on GitHub Pages

1. Create a new repository on GitHub named exactly `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username). This exact name
   is what makes GitHub serve it as a website automatically.
2. On the repository page, click **Add file → Upload files**.
3. Drag in `index.html`, the `css` folder, and the `js` folder (keep the
   folder structure intact — GitHub preserves it).
4. Scroll down and click **Commit changes**.
5. Go to the repo's **Settings → Pages** tab. Under "Build and deployment,"
   confirm the source is "Deploy from a branch," branch `main`, folder `/root`.
   Save if you changed anything.
6. Wait 1–2 minutes, then visit `https://yourusername.github.io` — your site
   is live.

Any time you want to update text, images, or the video, just edit the file
on GitHub directly (pencil icon on the file page) or re-upload it — changes
go live within a minute or two.

## 4. What's already built

- **Intro** — names, tagline, the date and place.
- **Guest info** — a name field that personalizes the envelope's greeting
  ("Dear [Name]"), with a skip option that falls back to "Dear Friend."
- **Envelope** — a hand-built CSS envelope with a wax seal. Tapping it plays
  a flap-opening animation and reveals a small note card, then nudges the
  guest down to the video.
- **Video** — a poster/play button first (keeps the page fast and avoids
  autoplay-with-sound issues), and only loads the real YouTube embed once
  tapped. A plain-text fallback link is included too.
- **More info to come** — a soft closing section you can expand later with
  your full wedding site, RSVP, registry, etc.

## 5. Extending it later

Since you mentioned more will be added: the simplest path is to keep this
exact file structure and add new `<section class="screen">` blocks to
`index.html` between `#more` and `</main>`, matching the existing pattern
(each screen is `min-height: 100vh`, has its own `id`, and can reuse the
`.eyebrow` / `.section-title` / `.section-copy` classes already styled in
`css/style.css`). Add a matching `.rail-dot` link in the `<nav class="rail">`
at the top so the side navigation stays in sync.

## Notes on accessibility & performance

- Respects `prefers-reduced-motion` (swaying flowers and the pulse ring turn
  off automatically for guests who've asked for less motion).
- All interactive elements are real `<button>`/`<a>`/`<input>` tags and are
  keyboard-reachable with a visible focus ring.
- The video iframe isn't loaded until the guest presses play, so the page
  stays fast on mobile data.
