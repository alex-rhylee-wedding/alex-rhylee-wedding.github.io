// =========================================================
// CONFIG — edit these to personalize the site
// =========================================================
const YOUTUBE_VIDEO_ID = "c03SZa1nvb8";
const COUPLE_NAMES = "Rhylee & Alex";

// Formspree (or any form-backend) endpoint. Leave blank until you've
// set one up — see the README for a 2-minute Formspree walkthrough.
// Example once set up: "https://formspree.io/f/abcdwxyz"
const FORM_ENDPOINT = "";

// =========================================================
// Screen 1 -> 2: info form submit / "already submitted"
// =========================================================
const infoScreen = document.getElementById("info");
const infoForm = document.getElementById("info-form");
const alreadySubmittedBtn = document.getElementById("already-submitted");

function collapseInfoAndAdvance() {
  document.body.classList.remove("pre-video");
  infoScreen.classList.add("is-collapsing");
  setTimeout(() => {
    document.getElementById("video").scrollIntoView({ behavior: "smooth" });
    loadAndPlayVideo();
  }, 550);
}

infoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = infoForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";

  if (FORM_ENDPOINT) {
    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(infoForm),
      });
    } catch (err) {
      console.error("Form submission failed:", err);
      // We still advance the guest even if the network request fails,
      // so a connectivity hiccup doesn't strand them on this screen.
    }
  }

  collapseInfoAndAdvance();
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
  iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0`;
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
