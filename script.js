// Each illustrated object is a real link. CSS handles hover and keyboard motion.
// On touchscreens, labels and reveals remain visible; one tap follows the link.
// Artwork uses stacked transparent PNG images in the shared 1440 × 900 scene.
// Preserve classes such as .needle, .heart, .sparkle, and .address on moving layers.
const projectAnimations = new WeakMap();
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
        destination.classList.add("is-revealed");
        const image = destination.querySelector("img");
        projectAnimations.get(image)?.cancel();
        if (!reducedMotion && image?.animate) {
          projectAnimations.set(image, image.animate(
            [
              { transform: "scale(1)" },
              { transform: window.innerWidth <= 760 ? "scale(1.10)" : "scale(1.16)", offset: 0.45 },
              { transform: "scale(1)" }
            ],
            { duration: 1200, delay: 200, easing: "ease-in-out" }
          ));
        }
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

// Reveal artwork once per page visit. Only opt into hiding when the API exists.
const projectMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && typeof Element.prototype.animate === "function" &&
    !projectMotionPreference.matches) {
  const projects = [...document.querySelectorAll(".project-artifact")];
  const revealFrames = (project) => {
    if (project.classList.contains("artifact-map")) {
      return [
        { clipPath: "inset(0 49.8% 0 49.8%)", transform: "scaleX(.94)", opacity: 0.5 },
        { clipPath: "inset(0 0% 0 0%)", transform: "scaleX(1)", opacity: 1 }
      ];
    }
    if (project.classList.contains("artifact-menu")) {
      return [
        { clipPath: "inset(49% 0 49% 0)", transform: "perspective(1000px) rotateX(75deg)", opacity: 0.4 },
        { clipPath: "inset(0% 0 0% 0)", transform: "perspective(1000px) rotateX(-5deg)", opacity: 1, offset: 0.8 },
        { clipPath: "inset(0% 0 0% 0)", transform: "perspective(1000px) rotateX(0deg)", opacity: 1 }
      ];
    }
    // A paper certificate lands softly, with a short press-and-release pulse.
    return [
      { transform: "translateY(-20px) rotate(-2deg) scale(1.05)", opacity: 0 },
      { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 1, offset: 0.65 },
      { transform: "translateY(0) rotate(0deg) scale(.985)", opacity: 1, offset: 0.82 },
      { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 1 }
    ];
  };
  let revealTimer;
  const pendingProjects = new Set(projects);
  function stopWatchingProjects() {
    clearTimeout(revealTimer);
    projectRevealObserver.disconnect();
    window.removeEventListener("scroll", scheduleProjectReveals);
    window.removeEventListener("resize", scheduleProjectReveals);
  }
  function revealReadyProjects() {
    if (document.hidden) return;
    pendingProjects.forEach((project) => {
      if (project.classList.contains("is-revealed")) {
        pendingProjects.delete(project);
        projectRevealObserver.unobserve(project);
        return;
      }
      const image = project.querySelector("img");
      if (!image) return;
      const rect = image.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      // Use the space available on shorter screens, so tall menus can still reveal.
      const requiredHeight = Math.min(rect.height, viewportHeight) * 0.75;
      if (rect.height <= 0 || visibleHeight < requiredHeight ||
          rect.right <= 0 || rect.left >= window.innerWidth) return;
      pendingProjects.delete(project);
      projectRevealObserver.unobserve(project);
      project.classList.add("is-revealed");
      if (!projectMotionPreference.matches) {
        projectAnimations.get(image)?.cancel();
        projectAnimations.set(image, image.animate(revealFrames(project), {
          duration: project.classList.contains("artifact-certificate") ? 1300 : 1800,
          easing: "ease-in-out"
        }));
      }
    });
    if (!pendingProjects.size) stopWatchingProjects();
  }
  function scheduleProjectReveals() {
    clearTimeout(revealTimer);
    // Restart this delay while scrolling; play after the visitor pauses.
    revealTimer = setTimeout(revealReadyProjects, 180);
  }
  const projectRevealObserver = new IntersectionObserver(scheduleProjectReveals, {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });
  projects.forEach((project) => {
    project.classList.add("has-entrance");
    projectRevealObserver.observe(project);
  });
  window.addEventListener("scroll", scheduleProjectReveals, { passive: true });
  window.addEventListener("resize", scheduleProjectReveals);
  scheduleProjectReveals();
  projectMotionPreference.addEventListener("change", (event) => {
    if (!event.matches) return;
    projects.forEach((project) => {
      project.classList.add("is-revealed");
      projectAnimations.get(project.querySelector("img"))?.cancel();
    });
    pendingProjects.clear();
    stopWatchingProjects();
  });
}
