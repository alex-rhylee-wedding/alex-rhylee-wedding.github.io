# Rhylee & Alex — Wedding website

Pure HTML/CSS/JS, no build step — works directly on GitHub Pages.

## Layout
```
index.html            Home: one long scrolling page (hero, countdown, welcome, detail cards)
save-the-date/        The original save-the-date (form → video → envelope)
more/                 Save-the-date page 2 (countdown + engagement photo)
dress-code/           Tab pages, one folder each
food-menu/
drink-requests/
lodging/
directions/
css/style.css         Original tokens, fonts, save-the-date styles (shared by every page)
css/site.css          Home page + tab page styles
css/menu.css          Hamburger button + drop-down menu
js/menu.js            Builds the menu on every page  ← tab list lives here
js/home.js            Home countdown + detail cards  ← wedding date lives here
js/drinks.js          Drink request form             ← form endpoint lives here
js/script.js          Save-the-date page logic (unchanged)
img/qr-code.png/.svg  QR code to the home page
```

## Add a new tab
1. In `js/menu.js`, add a line to `MENU_ITEMS`, e.g.
   `{ label: "Registry", path: "registry/", blurb: "Where to find our registry." },`
2. Copy the `dress-code/` folder, rename it to `registry/`, and edit the
   title and content in its `index.html`.

The menu on every page and the cards on the home page update automatically.

## Fill in details
Each tab page has `<span class="tbd">Details coming soon</span>` markers and
`<!-- EDIT -->` comments where your content goes. On `directions/`, update the
venue address in the three places marked `VENUE`.

## Wedding date
Set in `js/home.js` (`WEDDING_DATE_ISO`) and `more/script.js` — keep them the same.

## Connect the drink request form
Until `DRINK_ENDPOINT` in `js/drinks.js` is set, requests are **not saved**.
Same approach as the save-the-date form: create a Google Sheet → Extensions →
Apps Script, paste:
```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Drink Requests")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Drink Requests");
  if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "Name", "Drink", "Notes"]);
  const p = e.parameter;
  sheet.appendRow([new Date(), p.name, p.drink, p.notes]);
  return ContentService.createTextOutput("ok");
}
```
Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
Paste the `/exec` URL into `DRINK_ENDPOINT`.

The save-the-date info form still posts to the `FORM_ENDPOINT` in `js/script.js`.

## Publishing
Upload everything (keeping the folder structure) to the
`alex-rhylee-wedding.github.io` repo, replacing the old files. Delete the old
root-level save-the-date content only if it's still there — the new `index.html`
replaces it.

Preview locally: double-click `index.html` (links switch to `index.html`
automatically when opened from disk).
