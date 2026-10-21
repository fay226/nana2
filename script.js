// Each illustrated object is a real link. CSS handles hover and keyboard motion.
// On touchscreens, labels and reveals remain visible; one tap follows the link.
// Artwork uses stacked transparent PNG images in the shared 1440 × 900 scene.
// Preserve classes such as .needle, .heart, .sparkle, and .address on moving layers.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    const destination = document.getElementById(id);
    if (destination) {
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
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
