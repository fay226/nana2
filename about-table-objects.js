// Derive hit targets and animation pivots from each separate full-frame PNG.
// Coordinates stay proportional when the table resizes; no manual icon offsets.
(() => {
  function measure(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context || !canvas.width || !canvas.height) return null;
    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let left = canvas.width, top = canvas.height, right = -1, bottom = -1;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        if (data[(y * canvas.width + x) * 4 + 3] <= 16) continue;
        left = Math.min(left, x); right = Math.max(right, x);
        top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
    }
    if (right < left) return null;
    return {
      x: (left + right + 1) / 2 / canvas.width * 100,
      y: (top + bottom + 1) / 2 / canvas.height * 100,
      w: (right - left + 1) / canvas.width * 100,
      h: (bottom - top + 1) / canvas.height * 100
    };
  }
  document.querySelectorAll("[data-table-art]").forEach((object) => {
    const image = object.querySelector("img");
    const update = () => {
      if (!image.naturalWidth) return;
      try {
        const bounds = measure(image);
        if (!bounds) return;
        for (const key of ["x", "y", "w", "h"]) {
          object.style.setProperty("--art-" + key, bounds[key] + "%");
        }
        if (object.classList.contains("about-card-base")) {
          object.parentElement.style.setProperty("--art-x", bounds.x + "%");
          object.parentElement.style.setProperty("--art-y", bounds.y + "%");
        }
        object.classList.add("has-art");
      } catch (error) {
        // Keep visible text links if image pixels cannot be inspected.
        console.warn("Unable to align table artwork:", image.getAttribute("src"));
      }
    };
    image.addEventListener("load", update, { once: true });
    image.addEventListener("error", () => object.classList.remove("has-art"));
    if (image.complete) update();
  });
})();
