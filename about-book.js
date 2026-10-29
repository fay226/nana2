/* Three illustrated spreads; each individual PNG can be replaced with hand-drawn artwork. */
(() => {
  const host = document.getElementById("about-flipbook");
  if (!host) return;
  const pages = [...host.querySelectorAll(".about-page")];
  const prev = document.querySelector(".about-prev");
  const next = document.querySelector(".about-next");
  const status = document.getElementById("about-page-status");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const spreadCount = Math.ceil(pages.length / 2);
  let current = 0;
  let book = null;

  function updateControls(pageIndex) {
    current = Math.max(0, Math.min(spreadCount - 1, Math.floor(pageIndex / 2)));
    prev.disabled = current === 0;
    next.disabled = current === spreadCount - 1;
    status.textContent = `Spread ${current + 1} of ${spreadCount}`;
  }

  function showStaticSpread(index) {
    pages.forEach((page, i) => {
      const visible = i >= index * 2 && i < index * 2 + 2;
      page.style.display = visible ? "block" : "none";
    });
    updateControls(index * 2);
  }

  if (window.St && typeof window.St.PageFlip === "function") {
    try {
      book = new window.St.PageFlip(host, {
        width: 450, height: 600, size: "stretch", minWidth: 160, maxWidth: 450,
        minHeight: 214, maxHeight: 600, showCover: false,
        usePortrait: true, mobileScrollSupport: false,
        flippingTime: reduceMotion.matches ? 0 : 750,
        drawShadow: !reduceMotion.matches, maxShadowOpacity: .26,
        autoSize: true, clickEventForward: false
      });
      book.loadFromHTML(pages);
      book.on("flip", event => updateControls(event.data));
      book.on("init", event => updateControls(event.data.page || 0));
    } catch (error) {
      console.warn("Flipbook unavailable; using static page navigation.", error);
      book = null;
    }
  }
  if (!book) {
    host.classList.add("about-static-book");
    showStaticSpread(0);
  }

  prev.addEventListener("click", () => {
    if (book) book.flipPrev(reduceMotion.matches ? "top" : "bottom");
    else showStaticSpread(Math.max(0, current - 1));
  });
  next.addEventListener("click", () => {
    if (book) book.flipNext(reduceMotion.matches ? "top" : "bottom");
    else showStaticSpread(Math.min(spreadCount - 1, current + 1));
  });

  host.closest(".about-book-section").addEventListener("keydown", event => {
    if (event.target.matches("summary, a, button") || event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.key === "ArrowRight") { event.preventDefault(); next.click(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); prev.click(); }
  });
  updateControls(0);
})();
