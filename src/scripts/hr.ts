// Section H/R : le H et le R ne bougent pas. Les lettres qui suivent s'envolent une à une
// (flou + montée), puis les nouvelles arrivent par en dessous, en cascade.
// Défile tout seul tant qu'on n'a pas cliqué.

const root = document.querySelector<HTMLElement>('[data-hr]');
if (root) init(root);

function init(root: HTMLElement) {
  const hEl = root.querySelector<HTMLElement>('[data-hr-h]')!;
  const rEl = root.querySelector<HTMLElement>('[data-hr-r]')!;
  const wordEl = root.querySelector<HTMLElement>('[data-hr-word]')!;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-hr-btn]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-hr-panel]')];
  const words = buttons.map((b) => ({ h: b.dataset.h!.slice(1), r: b.dataset.r!.slice(1) }));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DELAY = 5000;
  root.style.setProperty('--hr-delay', `${DELAY}ms`);

  let current = 0;
  let timer = 0;
  let auto = !reduced;
  let visible = false;

  panels.forEach((p, k) => (p.hidden = k !== 0));

  function show(i: number) {
    if (i === current) return;
    current = i;
    buttons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    panels.forEach((p, k) => {
      p.hidden = k !== i;
      p.classList.toggle('in', k === i);
    });
    wordEl.setAttribute('aria-label', `H${words[i].h} R${words[i].r}`);
    swap(hEl, words[i].h, reduced);
    swap(rEl, words[i].r, reduced, 90);
    // relance l'animation de la barre de progression
    const bar = buttons[i].querySelector<HTMLElement>('.bar');
    if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
  }

  function schedule() {
    clearTimeout(timer);
    if (!auto || !visible) return;
    timer = window.setTimeout(() => {
      show((current + 1) % words.length);
      schedule();
    }, DELAY);
  }

  buttons.forEach((b, k) =>
    b.addEventListener('click', () => {
      auto = false;
      root.classList.remove('auto');
      clearTimeout(timer);
      show(k);
    }),
  );

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    root.classList.toggle('auto', auto && visible);
    schedule();
  }, { threshold: 0.4 }).observe(root);
}

const tokens = new WeakMap<HTMLElement, number>();
const EASE_OUT = 'cubic-bezier(.2, .8, .2, 1)';
const EASE_IN = 'cubic-bezier(.6, 0, .8, .2)';

const letters = (text: string) =>
  [...text].map((c) => {
    const s = document.createElement('span');
    s.className = 'l';
    s.textContent = c;
    return s;
  });

async function swap(el: HTMLElement, target: string, instant: boolean, delay = 0) {
  const token = (tokens.get(el) ?? 0) + 1;
  tokens.set(el, token);

  if (instant) {
    el.textContent = target;
    return;
  }

  // Au repos le mot est du texte normal (crénage correct). On ne le découpe
  // en lettres que le temps de l'animation.
  if (!el.children.length) el.replaceChildren(...letters(el.textContent ?? ''));

  // 1. les anciennes lettres s'envolent, de la dernière à la première
  const old = [...el.children] as HTMLElement[];
  await Promise.all(
    old.map((s, k) =>
      s
        .animate(
          [
            { transform: 'none', opacity: 1, filter: 'blur(0)' },
            { transform: 'translateY(-.45em) rotate(-8deg)', opacity: 0, filter: 'blur(8px)' },
          ],
          { duration: 300, delay: delay + (old.length - 1 - k) * 28, easing: EASE_IN, fill: 'forwards' },
        )
        .finished.catch(() => {}),
    ),
  );
  if (tokens.get(el) !== token) return; // un autre changement a eu lieu entre-temps

  // 2. les nouvelles arrivent par en dessous, de la première à la dernière
  const fresh = letters(target);
  el.replaceChildren(...fresh);
  await Promise.all(
    fresh.map((s, k) =>
      s
        .animate(
          [
            { transform: 'translateY(.5em) rotate(6deg)', opacity: 0, filter: 'blur(8px)' },
            { transform: 'none', opacity: 1, filter: 'blur(0)' },
          ],
          { duration: 620, delay: k * 38, easing: EASE_OUT, fill: 'backwards' },
        )
        .finished.catch(() => {}),
    ),
  );

  // 3. animation finie : on recolle les lettres en un seul mot
  if (tokens.get(el) === token) el.textContent = target;
}
