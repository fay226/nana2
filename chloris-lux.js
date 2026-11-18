const chapterLinks = [...document.querySelectorAll('.chloris-chapters a')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        chapterLinks.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-15% 0px -60% 0px' }
  );

  chapterLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

const intentionSlideshow = document.querySelector('[data-intention-slideshow]');

if (intentionSlideshow) {
  const imageSources = intentionSlideshow.dataset.images
    .split('|')
    .map(source => source.trim())
    .filter(Boolean);
  const slides = intentionSlideshow.querySelector('.intention-slides');
  const toggle = intentionSlideshow.querySelector('.intention-slideshow-toggle');
  const previous = intentionSlideshow.querySelector('.intention-slideshow-previous');
  const next = intentionSlideshow.querySelector('.intention-slideshow-next');
  const map = intentionSlideshow.closest('.intention-map');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  Promise.all(
    imageSources.map(
      source =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.className = 'intention-slide';
          image.alt = '';
          image.decoding = 'async';
          image.addEventListener('load', () => resolve(image), { once: true });
          image.addEventListener('error', reject, { once: true });
          image.src = source;
        })
    )
  )
    .then(images => {
      images.forEach(image => slides.append(image));
      images[0].classList.add('is-active');
      intentionSlideshow.hidden = false;
      map.classList.add('has-slideshow');

      if (reduceMotion) return;

      let activeIndex = 0;
      let intervalId;
      let pausedByUser = false;

      const showSlide = index => {
        images[activeIndex].classList.remove('is-active');
        activeIndex = (index + images.length) % images.length;
        images[activeIndex].classList.add('is-active');
      };

      const showNext = () => showSlide(activeIndex + 1);
      const showPrevious = () => showSlide(activeIndex - 1);

      const stop = () => {
        window.clearInterval(intervalId);
        intervalId = undefined;
      };

      const start = () => {
        if (!intervalId && !pausedByUser) {
          intervalId = window.setInterval(showNext, 3000);
        }
      };

      toggle.addEventListener('click', () => {
        pausedByUser = !pausedByUser;
        toggle.setAttribute('aria-pressed', String(pausedByUser));
        toggle.textContent = pausedByUser ? 'Play drawings' : 'Pause drawings';
        if (pausedByUser) stop();
        else start();
      });

      previous.addEventListener('click', showPrevious);
      next.addEventListener('click', showNext);

      intentionSlideshow.addEventListener('pointerenter', stop);
      intentionSlideshow.addEventListener('pointerleave', start);
      intentionSlideshow.addEventListener('focusin', stop);
      intentionSlideshow.addEventListener('focusout', start);

      start();
    })
    .catch(() => {
      // Keep the existing intention graphic visible until all drawings are available.
    });
}

