// =========================================================
// CONFIG — set your real wedding date/time here.
// Format: "YYYY-MM-DDTHH:MM:SS" in 24-hour time, guests'
// local timezone is used automatically for the countdown.
// =========================================================
const WEDDING_DATE_ISO = "2027-06-12T16:00:00";

const dateLabelEl = document.getElementById("countdown-date-label");
if (dateLabelEl) {
  const target = new Date(WEDDING_DATE_ISO);
  const formatted = target.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dateLabelEl.textContent = formatted;
}

const daysEl = document.getElementById("cd-days");
const hoursEl = document.getElementById("cd-hours");
const minsEl = document.getElementById("cd-mins");
const secsEl = document.getElementById("cd-secs");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const target = new Date(WEDDING_DATE_ISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(mins);
  secsEl.textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);
