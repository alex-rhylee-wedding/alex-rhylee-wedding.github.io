# Rhylee & Alex — Save the Date site

Three screens on the main page: info form → auto-playing Short →
click-anywhere four-flap envelope reveal — followed by a second page
(`/more/`) with a countdown, engagement photo, and "more to come."
Pure HTML/CSS/JS, no build step — works directly on GitHub Pages.

## Files
```
save-the-date/
├── index.html
├── css/style.css
├── js/script.js
├── more/
│   ├── index.html
│   ├── style.css
│   └── script.js
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

## The video is locked until you submit or skip

`index.html` opens with `<body class="pre-video">`. While that class is
present, the video and envelope screens are set to `display: none` in
`css/style.css` — so there's nothing to scroll to, and the guest can't
skip ahead. Submitting the form or clicking "I've already submitted my
info" removes that class in `js/script.js`, which is what unlocks them.

## Set your real wedding date (for the countdown)

In `more/script.js`:
```js
const WEDDING_DATE_ISO = "2027-06-12T16:00:00";
```
Replace with your actual date and time — the countdown and the
formatted date line both read from this one value.

## Add your engagement photo

In `more/index.html`, find this block inside the "Our Engagement" section:
```html
<div class="engagement-photo-placeholder">
  <span>Add your engagement photo here</span>
  <span class="placeholder-hint">replace this block with an &lt;img&gt; — see README</span>
</div>
```
Replace the whole `<div class="engagement-photo-placeholder">...</div>`
with:
```html
<img src="photo.jpg" alt="Rhylee and Alex's engagement">
```
Then upload your photo file (named `photo.jpg`, or update the `src` to
match your filename) into the `more/` folder alongside `index.html`.

## Personalizing the main page

In `js/script.js`:
```js
const YOUTUBE_VIDEO_ID = "c03SZa1nvb8";
const COUPLE_NAMES = "Rhylee & Alex";
```
The save-the-date blurb text lives in `index.html` inside
`<div class="reveal-content">` — edit `<p class="reveal-blurb">` to
your own wording.

## Preview locally
Double-click `index.html` — no server needed. (The video needs internet;
everything else works offline.)

## Publish on GitHub Pages
1. Create a repo named exactly `yourusername.github.io`.
2. Upload `index.html`, `css/`, `js/`, and the whole `more/` folder
   (Add file → Upload files → drag them all in, keeping folder structure).
3. Commit changes.
4. Settings → Pages → source: Deploy from a branch → branch `main`,
   folder `/ (root)` → Save.
5. Visit `https://yourusername.github.io` after a minute or two, and
   `https://yourusername.github.io/more/` for the second page.

## How each screen works

- **Screen 1 (info form)** — name, phone, email, address, plus an
  "I've already submitted my info" button that skips straight to the
  video without submitting. The video/envelope screens don't exist in
  the page until one of these is used, so there's no way to scroll
  past this screen early.
- **Screen 2 (video)** — the Short loads and autoplays (muted, per
  browser autoplay rules — guests can unmute with the player's speaker
  icon) as soon as it's unlocked. A plain-text fallback link sits
  underneath.
- **Screen 3 (envelope reveal)** — tapping anywhere on the screen
  triggers all four triangular flaps to fold outward in a staggered
  3D animation, revealing the save-the-date blurb in the center. Once
  open, a "Please continue to the next page" link fades in just below
  the envelope's bottom-right corner, linking to `/more/`.
- **`/more/` page** — a live countdown to your wedding date, your
  engagement photo, and a "still blooming" teaser for the full wedding
  site to come. Has its own "← Back" link to return to the main page.

Respects `prefers-reduced-motion`; all interactive elements are real
buttons/links/inputs and keyboard-reachable.

