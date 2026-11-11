// =========================================================
// HOME PAGE — countdown, detail cards, scroll fade-ins.
// =========================================================

// Wedding date/time (24-hour, local time). Keep this in sync with
// more/script.js, which runs the countdown on the save-the-date page.
const WEDDING_DATE_ISO = "2027-08-14T14:00:00";

// ---- Date line in the hero ----
const heroDate = document.getElementById("hero-date");
if (heroDate) {
  heroDate.textContent = new Date(WEDDING_DATE_ISO).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

// ---- Countdown ----
const cd = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs"),
};
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  const diff = Math.max(0, new Date(WEDDING_DATE_ISO).getTime() - Date.now());
  cd.days.textContent = Math.floor(diff / 86400000);
  cd.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
  cd.mins.textContent = pad(Math.floor(diff / 60000) % 60);
  cd.secs.textContent = pad(Math.floor(diff / 1000) % 60);
}
if (cd.days) { tick(); setInterval(tick, 1000); }

// ---- Detail cards: one per menu tab (from MENU_ITEMS in js/menu.js) ----
const cardsEl = document.getElementById("detail-cards");
if (cardsEl && typeof MENU_ITEMS !== "undefined") {
  const local = location.protocol === "file:";
  MENU_ITEMS.filter((i) => i.path).forEach((item, idx) => {
    const a = document.createElement("a");
    a.className = "card reveal-on-scroll";
    a.href = item.path + (local ? "index.html" : "");
    a.innerHTML = `
      <span class="card-num">${pad(idx + 1)}</span>
      <h3 class="card-title"></h3>
      <p class="card-blurb"></p>
      <span class="card-go">View &rarr;</span>`;
    a.querySelector(".card-title").textContent = item.label;
    a.querySelector(".card-blurb").textContent = item.blurb || "";
    cardsEl.appendChild(a);
  });
}

// ---- Fade sections in as they scroll into view ----
const fadeEls = document.querySelectorAll(".reveal-on-scroll");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach((el) => io.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add("is-visible"));
}
