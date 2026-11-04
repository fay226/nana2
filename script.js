// Each illustrated object is a real link. CSS handles hover and keyboard motion.
// On touchscreens, labels and reveals remain visible; one tap follows the link.
// Artwork uses stacked transparent PNG images in the shared 1440 × 900 scene.
// Preserve classes such as .needle, .heart, .sparkle, and .address on moving layers.
const projectAnimations = new WeakMap();

const projectSelectionRequests = new WeakMap();
async function animateSelectedProject(image) {
  if (!image) return;
  const request = {};
  projectSelectionRequests.set(image, request);
  projectAnimations.get(image)?.cancel();
  // Wait for smooth scrolling to finish, with a bound for continuous scrolling.
  await new Promise((resolve) => {
    let idleTimer;
    let limitTimer;
    function finish() {
      clearTimeout(idleTimer);
      clearTimeout(limitTimer);
      window.removeEventListener("scroll", onScroll);
      resolve();
    }
    function onScroll() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(finish, 180);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    limitTimer = setTimeout(finish, 2500);
    onScroll();
  });
  if (typeof image.decode === "function") {
    try { await image.decode(); } catch { return; }
  }
  const rect = image.getBoundingClientRect();
  if (projectSelectionRequests.get(image) !== request || document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !image.animate || rect.bottom <= 0 || rect.top >= window.innerHeight) return;
  projectAnimations.set(image, image.animate(
    [
      { transform: "scale(1)" },
      { transform: window.innerWidth <= 760 ? "scale(1.10)" : "scale(1.16)", offset: 0.45 },
      { transform: "scale(1)" }
    ],
    { duration: 1200, easing: "ease-in-out" }
  ));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    const destination = document.getElementById(id);
    if (destination) {
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
      if (link.closest(".project-index") && destination.matches(".project-artifact")) {
        event.preventDefault();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        destination.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "center" });
        if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
        updateNavigationFromHash();
        const image = destination.querySelector("img");
        animateSelectedProject(image);
      }
    }
  });
});

// Scale one scene canvas, including all images, text, animations, and hit targets.
const sceneFrame = document.querySelector(".scene-frame");
const sceneCanvas = document.querySelector(".scene-canvas");
function fitScene() {
  const { width } = sceneFrame.getBoundingClientRect();
  // Full page width; the frame keeps the drawing’s 1440:900 aspect ratio.
  const scale = width / 1440;
  sceneCanvas.style.setProperty("--scene-scale", String(scale));
  sceneCanvas.classList.add("is-sized");
}
fitScene();
new ResizeObserver(fitScene).observe(sceneFrame);

// Keep navigation state available to sighted visitors and screen readers.
const navigationLinks = [...document.querySelectorAll(".main-nav a")];
function setCurrentSection(id) {
  navigationLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrentSection(entry.target.id);
    });
  },
  { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
);
["home", "work", "about", "contact"].forEach((id) => {
  sectionObserver.observe(document.getElementById(id));
});
function updateNavigationFromHash() {
  const id = location.hash.slice(1);
  const section = ["custom-cafe", "career-compass", "chloris-lux"].includes(id)
    ? "work"
    : id;
  if (["home", "work", "about", "contact"].includes(section)) {
    setCurrentSection(section);
  }
}
window.addEventListener("hashchange", updateNavigationFromHash);
updateNavigationFromHash();

const soundFiles = {
  ".scene-book": "assets/sounds/book.mp3",
  ".scene-laptop": "assets/sounds/laptop.mp3",
  ".scene-compass": "assets/sounds/compass.mp3",
  ".scene-bracelet": "assets/sounds/bracelet.mp3",
  ".scene-cup": "assets/sounds/cup.mp3",
  ".scene-painting": "assets/sounds/painting.mp3",
  ".scene-envelope": "assets/sounds/envelope.mp3",
};

let activeSound = null;
let lastPlayedAt = -Infinity;


function stopSceneSound() {
  if (!activeSound) return;

  activeSound.pause();
  activeSound.currentTime = 0;
  activeSound = null;
}

Object.entries(soundFiles).forEach(([selector, source]) => {
  const object = document.querySelector(selector);
  const hitArea = object?.querySelector(".object-hit");

  if (!object || !hitArea) return;

  const audio = new Audio(source);
  audio.preload = "auto";
  audio.load();
  audio.volume = 0.2;

  function playSound() {
    if (document.hidden) return;

    // Prevent rapid repeated sounds.
    const now = performance.now();
    if (now - lastPlayedAt < 250) return;
    lastPlayedAt = now;

    stopSceneSound();

    audio.currentTime = 0;
    activeSound = audio;

    audio.play().catch((error) => {
      console.warn("Sound failed:", source, error.name, error.message);
    });
  }

  // Only the object's clickable area triggers the hover sound.
  hitArea.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") playSound();
  });
});

// Stop audio when the visitor switches tabs.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopSceneSound();
});

// Cancel selection zoom when reduced motion is enabled.
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
  if (!event.matches) return;
  document.querySelectorAll(".project-artifact > img").forEach((image) => {
    projectSelectionRequests.delete(image);
    projectAnimations.get(image)?.cancel();
  });
});

// Contact illustration: hover on pointer devices; tap/Enter/Space on touch/keyboard.
// The artwork uses aligned full-canvas PNGs in assets/contact/.
(() => {
  const envelope = document.querySelector("[data-contact-envelope]");
  if (!envelope) return;
  const trigger = envelope.querySelector(".contact-envelope-trigger");
  const links = envelope.querySelector(".contact-envelope-links");
  const feedback = document.querySelector(".contact-feedback");
  const linkedin = envelope.querySelector("[data-contact-linkedin]");
  const email = envelope.querySelector("[data-contact-email]");
  const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/fiona-sun-703961276";
  const CONTACT_EMAIL = "sunfiona52@gmail.com";

  // If an image is missing, hide the broken image and retain accessible link fallback.
  envelope.querySelectorAll("img").forEach((img) => {
    const missing = () => {
      if (img.closest(".contact-icon-link")) img.closest(".contact-icon-link").classList.add("image-missing");
      else img.style.display = "none";
    };
    img.addEventListener("error", missing);
    if (img.complete && img.naturalWidth === 0) missing();
  });

  const validProfile = /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(LINKEDIN_PROFILE_URL);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);
  if (validProfile) linkedin.href = LINKEDIN_PROFILE_URL;
  if (validEmail) email.href = "mailto:" + CONTACT_EMAIL;
  [linkedin, email].forEach((link) => {
    link.addEventListener("click", (event) => {
      if ((link === linkedin && !validProfile) || (link === email && !validEmail)) {
        event.preventDefault();
        feedback.textContent = "This contact link will be available soon.";
      }
    });
  });

  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let pinned = false;
  let hovering = false;
  const openingSound = new Audio("assets/sounds/envelope-open.mp3");
  openingSound.preload = "none";
  openingSound.volume = 0.2;
  function setOpen(open) {
    const wasOpen = envelope.classList.contains("is-open");
    if (open && !wasOpen && !document.hidden) {
      stopSceneSound();
      openingSound.currentTime = 0;
      activeSound = openingSound;
      // Hover playback may be blocked until the browser has user activation.
      openingSound.play().catch(() => {});
    }
    envelope.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Close contact envelope" : "Open contact envelope");
    links.inert = !open;
  }
  function sync() { setOpen(pinned || hovering); }
  envelope.addEventListener("pointerenter", (e) => {
    if (fineHover.matches && e.pointerType === "mouse") { hovering = true; sync(); }
  });
  envelope.addEventListener("pointerleave", () => { hovering = false; sync(); });
  trigger.addEventListener("click", () => { pinned = !pinned; feedback.textContent = ""; sync(); });
  document.addEventListener("pointerdown", (e) => {
    if (!envelope.contains(e.target)) { pinned = false; hovering = false; sync(); }
  });
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { pinned = false; hovering = false; sync(); trigger.focus(); }
  });
  envelope.addEventListener("focusout", (e) => {
    if (!envelope.contains(e.relatedTarget) && !hovering) { pinned = false; sync(); }
  });
  setOpen(false);
})();
