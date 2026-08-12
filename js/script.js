// =========================================================
// CONFIG — edit these to personalize the site
// =========================================================
const YOUTUBE_VIDEO_ID = "QVEgDe_-X8U";
const COUPLE_NAMES = "Rhylee & Alex";

// Google Apps Script Web App URL that appends each submission as a row
// in a Google Sheet. Leave blank until you've deployed it — see the
// README for the walkthrough. Looks like:
// "https://script.google.com/macros/s/AKfycb.../exec"
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyak94TmDkCv5qdO-LFr44Hsr7LgFrWuSKhD7u4p_4IAWzItI9pGvpWzC6UubJiBeiU9g/exec";

// =========================================================
// Screen 1 -> 2: info form submit / "already submitted"
// =========================================================
const infoScreen = document.getElementById("info");
const infoForm = document.getElementById("info-form");
const alreadySubmittedBtn = document.getElementById("already-submitted");

function collapseInfoAndAdvance() {
  document.body.classList.remove("pre-video");
  infoScreen.classList.add("is-collapsing");
  // Load the video right now, in the same click, rather than after a
  // delay — browsers only allow unmuted autoplay when it happens close
  // to a real user action, so this timing matters.
  loadAndPlayVideo();
  setTimeout(() => {
    document.getElementById("video").scrollIntoView({ behavior: "smooth" });
  }, 550);
}

infoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = infoForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";

  // Advance immediately so the video load stays tied to this click.
  collapseInfoAndAdvance();

  // Send the form data in the background — we don't wait on it, so a
  // slow network never delays the guest or breaks the autoplay timing.
  // Posted as FormData directly to the Apps Script Web App, which reads
  // it via e.parameter and appends a row to the Sheet. The browser may
  // log a CORS console error trying to *read* the response (Apps Script
  // doesn't send CORS headers back) — that's harmless and expected; the
  // row is written server-side regardless, so we just swallow it below.
  if (FORM_ENDPOINT) {
    fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(infoForm),
    }).catch(() => {});
  }
});

alreadySubmittedBtn.addEventListener("click", () => {
  collapseInfoAndAdvance();
});

// =========================================================
// Screen 2: load + autoplay the YouTube Short once we arrive
// =========================================================
const videoSlot = document.getElementById("video-slot");
const videoFallbackLink = document.getElementById("video-fallback-link");
let videoLoaded = false;

if (videoFallbackLink) {
  videoFallbackLink.href = `https://youtube.com/shorts/${YOUTUBE_VIDEO_ID}`;
}

function loadAndPlayVideo() {
  if (videoLoaded) return;
  videoLoaded = true;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&playsinline=1&rel=0`;
  iframe.title = `${COUPLE_NAMES} — Save the Date`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  videoSlot.innerHTML = "";
  videoSlot.appendChild(iframe);
}

// Also auto-load if the guest scrolls to the video section on their own
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) loadAndPlayVideo();
    });
  },
  { threshold: 0.4 }
);
videoObserver.observe(document.getElementById("video"));

// =========================================================
// Screen 3: click anywhere to open the four-flap envelope
// =========================================================
const revealScreen = document.getElementById("reveal");
const envelopeReveal = document.getElementById("envelope-reveal");
const revealInstruction = document.getElementById("reveal-instruction");

revealScreen.addEventListener("click", () => {
  if (envelopeReveal.classList.contains("is-open")) return;
  envelopeReveal.classList.add("is-open");
  revealScreen.classList.add("is-open");
  revealInstruction.classList.add("is-hidden");
});

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

const railObserver = new IntersectionObserver(
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
screens.forEach((screen) => railObserver.observe(screen));
