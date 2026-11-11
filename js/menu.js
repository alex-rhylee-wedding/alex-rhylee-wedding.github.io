// =========================================================
// SITE MENU — the hamburger button + drop-down panel shown
// on every page.
//
// TO ADD A NEW TAB: add one line to MENU_ITEMS below, then
// create a folder with that name containing an index.html
// (copy any existing tab page, e.g. dress-code/index.html,
// as a starting point). Every page picks up the change.
// =========================================================
// "blurb" is the one-liner shown on that tab's card on the home page.
const MENU_ITEMS = [
  { label: "Home",           path: "" },
  { label: "Save the Date",  path: "save-the-date/",  blurb: "Our save-the-date film and envelope, plus a spot to send us your mailing info." },
  { label: "Dress Code",     path: "dress-code/",     blurb: "What to wear, and a few things to keep in mind." },
  { label: "Food Menu",      path: "food-menu/",      blurb: "What we'll be serving, from cocktail hour to dessert." },
  { label: "Drink Requests", path: "drink-requests/", blurb: "Tell us your favorite drink and we'll do our best to have it." },
  { label: "Lodging",        path: "lodging/",        blurb: "Where to stay nearby for the wedding weekend." },
  { label: "Directions",     path: "directions/",     blurb: "How to find us, plus parking and arrival notes." },
];

(function buildMenu() {
  // data-root on <body> tells us how far this page is from the site root
  // ("" on the home page, "../" on a page inside a folder).
  const root = document.body.dataset.root || "";
  // When a page is opened straight from disk (file://), folders don't
  // auto-open their index.html, so link to it explicitly.
  const local = location.protocol === "file:";
  const hrefFor = (path) => root + path + (local ? "index.html" : "") || "./";

  // Work out which tab is the current page so it can be highlighted.
  const here = location.pathname.replace(/index\.html$/, "");
  const isCurrent = (path) => {
    if (path === "") {
      return MENU_ITEMS.every((i) => i.path === "" || !here.includes("/" + i.path)) &&
        !here.includes("/more/");
    }
    return here.endsWith("/" + path) || (path === "save-the-date/" && here.includes("/more/"));
  };

  const btn = document.createElement("button");
  btn.className = "menu-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Open menu");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "site-menu");
  btn.innerHTML = '<span class="menu-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>';

  const panel = document.createElement("nav");
  panel.className = "menu-panel";
  panel.id = "site-menu";
  panel.setAttribute("aria-label", "Site menu");

  const list = document.createElement("ul");
  MENU_ITEMS.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = hrefFor(item.path);
    a.textContent = item.label;
    if (isCurrent(item.path)) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    list.appendChild(li);
  });
  panel.innerHTML = '<p class="menu-heading">Rhylee <span>&amp;</span> Alex</p>';
  panel.appendChild(list);

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!panel.classList.contains("is-open"));
  });
  // Clicks inside the panel shouldn't bubble to page handlers
  // (e.g. the save-the-date envelope opens on any click).
  panel.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      setOpen(false);
      btn.focus();
    }
  });
})();
