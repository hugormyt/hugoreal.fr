// Fait apparaître en douceur les éléments [data-reveal] quand ils entrent à l'écran.
document.documentElement.classList.add('js');

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
