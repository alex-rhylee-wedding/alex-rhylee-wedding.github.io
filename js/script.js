// =========================================================
// CONFIG — edit these two lines to personalize the site
// =========================================================
const YOUTUBE_VIDEO_ID = "VIDEO_ID_HERE"; // <-- replace with your real YouTube video ID
const COUPLE_NAMES = "Emma & Noah";

// =========================================================
// Smooth-scroll "Begin" button
// =========================================================
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.scrollTo);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// =========================================================
// Guest name capture -> personalize the envelope + letter
// =========================================================
let guestName = "";

function applyGuestName(name) {
  guestName = (name || "").trim();
  const greetingEl = document.getElementById("envelope-greeting");
  const letterToEl = document.getElementById("letter-to");

  if (guestName) {
    greetingEl.textContent = `A little something for you, ${guestName}`;
    letterToEl.textContent = `Dear ${guestName},`;
  } else {
    greetingEl.textContent = "A little something for you";
    letterToEl.textContent = "Dear Friend,";
  }
}

const guestForm = document.getElementById("guest-form");
const guestInput = document.getElementById("guest-name");
const skipGuestBtn = document.getElementById("skip-guest");

guestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  applyGuestName(guestInput.value);
  document.getElementById("envelope").scrollIntoView({ behavior: "smooth" });
});

skipGuestBtn.addEventListener("click", () => {
  applyGuestName("");
  document.getElementById("envelope").scrollIntoView({ behavior: "smooth" });
});

// Set a sensible default in case guest scrolls past without submitting
applyGuestName("");

// =========================================================
// Envelope open interaction
// =========================================================
const envelopeBtn = document.getElementById("envelope-button");
const envelopeInstruction = document.querySelector(".envelope-instruction");

envelopeBtn.addEventListener("click", () => {
  if (envelopeBtn.classList.contains("is-open")) return;
  envelopeBtn.classList.add("is-open");
  if (envelopeInstruction) {
    envelopeInstruction.textContent = "Scroll down when you're ready to watch";
  }
  // Give the open animation a moment, then nudge to the video section
  setTimeout(() => {
    document.getElementById("video").scrollIntoView({ behavior: "smooth" });
  }, 1400);
});

// =========================================================
// Video: lazy-load the YouTube iframe only once the guest
// chooses to play it (keeps the page light + avoids
// autoplay-with-sound restrictions)
// =========================================================
const videoPlayBtn = document.getElementById("video-play-btn");
const videoSlot = document.getElementById("video-slot");
const videoFallbackLink = document.getElementById("video-fallback-link");

if (videoFallbackLink) {
  videoFallbackLink.href = `https://youtu.be/${YOUTUBE_VIDEO_ID}`;
}

if (videoPlayBtn) {
  videoPlayBtn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;
    iframe.title = `${COUPLE_NAMES} — Save the Date`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    videoSlot.innerHTML = "";
    videoSlot.appendChild(iframe);
  });
}

// =========================================================
// Side rail nav: highlight the section in view + click to jump
// =========================================================
const railDots = document.querySelectorAll(".rail-dot");
const screens = document.querySelectorAll(".screen");

railDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const id = dot.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        railDots.forEach((dot) => {
          dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.5 }
);

screens.forEach((screen) => observer.observe(screen));
