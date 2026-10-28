(() => {
  const root = document.getElementById("about-book");
  if (!root) return;
  const stage = root.closest(".about-book-stage");
  const controls = stage.querySelector(".about-book-controls");
  const previous = controls.querySelector('[data-book-action="previous"]');
  const next = controls.querySelector('[data-book-action="next"]');
  const status = controls.querySelector(".book-position");
  const reading = document.querySelector(".about-book-reading");
  const pages = [...root.querySelectorAll(".about-book-page")];
  // Keep readable text separate from the visual pages and the library's clones.
  pages.forEach((page) => {
    const copy = page.cloneNode(true);
    copy.removeAttribute("class");
    copy.querySelector(".book-page-number")?.remove();
    copy.querySelectorAll("img").forEach((image) => {
      const text = document.createElement("p");
      text.textContent = image.alt;
      image.replaceWith(text);
    });
    reading.append(copy);
  });
  const originalMarkup = root.innerHTML;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!window.St?.PageFlip) {
    root.removeAttribute("aria-hidden");
    return; // Static pages and the transcript remain usable if the CDN fails.
  }
  let book;
  let busy = false;
  const syncControls = () => {
    const index = book.getCurrentPageIndex();
    const spread = Math.floor(index / 2);
    const total = Math.ceil(book.getPageCount() / 2);
    previous.disabled = busy || spread === 0;
    next.disabled = busy || spread >= total - 1;
    status.textContent = `Spread ${spread + 1} of ${total}`;
  };
  try {
    book = new St.PageFlip(root, {
      width: 480, height: 600, size: "stretch",
      minWidth: 80, maxWidth: 480, minHeight: 100, maxHeight: 600,
      usePortrait: false, showCover: false, autoSize: false,
      drawShadow: true, maxShadowOpacity: 0.28, flippingTime: 950,
      useMouseEvents: false, showPageCorners: false,
      mobileScrollSupport: false
    });
    book.on("init", () => { controls.hidden = false; syncControls(); });
    book.on("flip", syncControls);
    book.on("changeState", (event) => { busy = event.data !== "read"; syncControls(); });
    book.loadFromHTML(pages);
  } catch (error) {
    root.innerHTML = originalMarkup;
    root.className = "about-book";
    root.removeAttribute("style");
    root.removeAttribute("aria-hidden");
    controls.hidden = true;
    console.warn("About book could not start; showing static pages.", error);
    return;
  }
  function turn(direction) {
    if (busy || (direction === "previous" ? previous.disabled : next.disabled)) return;
    if (motion.matches) {
      direction === "previous" ? book.turnToPrevPage() : book.turnToNextPage();
      syncControls();
    } else {
      direction === "previous" ? book.flipPrev("bottom") : book.flipNext("bottom");
    }
  }
  previous.addEventListener("click", () => turn("previous"));
  next.addEventListener("click", () => turn("next"));
  stage.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      turn(event.key === "ArrowLeft" ? "previous" : "next");
    }
  });
})();
