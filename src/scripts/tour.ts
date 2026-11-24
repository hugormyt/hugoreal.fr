// Hero « optimal tour » : un petit problème du voyageur de commerce résolu en direct.
// Points aléatoires → tournée du plus proche voisin → améliorations 2-opt animées.
// Un clic ajoute une ville et relance l'optimisation. Clin d'œil à la recherche opérationnelle.

type Pt = { x: number; y: number };

const canvas = document.querySelector<HTMLCanvasElement>('[data-tour]');
const readout = document.querySelector<HTMLElement>('[data-tour-readout]');

if (canvas) init(canvas);

function init(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, dpr = 1;
  let pts: Pt[] = [];
  let tour: number[] = [];
  let swaps = 0;
  let i = 1, j = 2;              // curseur de la recherche 2-opt
  let improvedInPass = false;
  let solved = false;
  let solvedAt = 0;
  let flash: { a: number; b: number; t: number }[] = [];
  let drawIn = 0;               // 0 → 1 : tracé progressif au démarrage
  let running = true;
  let raf = 0;

  let colors = readColors();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    colors = readColors();
    if (!running || reduced) draw();
  });

  function readColors() {
    const s = getComputedStyle(document.documentElement);
    return {
      ink: s.getPropertyValue('--ink').trim(),
      soft: s.getPropertyValue('--ink-soft').trim(),
      accent: s.getPropertyValue('--accent').trim(),
    };
  }

  const d = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
  const length = () => tour.reduce((s, k, n) => s + d(pts[k], pts[tour[(n + 1) % tour.length]]), 0);

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    reset();
  }

  function reset() {
    const n = Math.round(Math.min(70, Math.max(24, (W * H) / 22000)));
    const pad = 24;
    pts = Array.from({ length: n }, () => ({
      x: pad + Math.random() * (W - pad * 2),
      y: pad + Math.random() * (H - pad * 2),
    }));
    tour = nearestNeighbour();
    restart();
    drawIn = reduced ? 1 : 0;
    if (reduced) {
      while (!solved) step(10_000);
      draw();
    }
  }

  function restart() {
    swaps = 0; i = 1; j = 2; improvedInPass = false; solved = false; flash = [];
  }

  function nearestNeighbour(): number[] {
    const left = new Set(pts.map((_, k) => k));
    const out = [0];
    left.delete(0);
    while (left.size) {
      const last = pts[out[out.length - 1]];
      let best = -1, bd = Infinity;
      for (const k of left) {
        const dd = d(last, pts[k]);
        if (dd < bd) { bd = dd; best = k; }
      }
      out.push(best);
      left.delete(best);
    }
    return out;
  }

  // Avance la recherche 2-opt de `budget` comparaisons.
  function step(budget: number) {
    const n = tour.length;
    while (budget-- > 0 && !solved) {
      const a = pts[tour[i - 1]], b = pts[tour[i]];
      const c = pts[tour[j]], e = pts[tour[(j + 1) % n]];
      const delta = d(a, c) + d(b, e) - d(a, b) - d(c, e);
      if (delta < -1e-6) {
        reverse(i, j);
        swaps++;
        improvedInPass = true;
        flash.push({ a: i - 1, b: j, t: performance.now() });
        if (!reduced) return; // une amélioration par frame : on la voit
      }
      j++;
      if (j >= n) {
        i++; j = i + 1;
        if (i >= n - 1) {
          if (!improvedInPass) { solved = true; solvedAt = performance.now(); }
          i = 1; j = 2; improvedInPass = false;
        }
      }
    }
  }

  function reverse(a: number, b: number) {
    while (a < b) { [tour[a], tour[b]] = [tour[b], tour[a]]; a++; b--; }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const n = tour.length;
    const shown = Math.floor(n * drawIn);

    // tournée
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.soft;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    for (let k = 0; k <= shown && k <= n; k++) {
      const p = pts[tour[k % n]];
      k === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // arêtes fraîchement améliorées, en accent
    const now = performance.now();
    flash = flash.filter((f) => now - f.t < 900);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.accent;
    for (const f of flash) {
      ctx.globalAlpha = 1 - (now - f.t) / 900;
      const p1 = pts[tour[f.a]], p2 = pts[tour[f.a + 1]];
      const p3 = pts[tour[f.b]], p4 = pts[tour[(f.b + 1) % n]];
      if (!p1 || !p2 || !p3 || !p4) continue;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y);
      ctx.stroke();
    }

    // villes
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.ink;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    // ville de départ
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(pts[tour[0]].x, pts[tour[0]].y, 4, 0, Math.PI * 2);
    ctx.fill();

    if (readout) {
      const state = solved ? '2-opt optimum reached' : drawIn < 1 ? 'nearest neighbour' : 'optimising…';
      readout.textContent =
        `${n} cities · length ${Math.round(length()).toLocaleString('en')} px · ${swaps} swaps · ${state}`;
    }
  }

  // Animation pilotée par le temps (et non par le nombre de frames) :
  // même vitesse sur un écran 120 Hz que sur un onglet ralenti.
  let last = performance.now();
  let swapBudget = 0;
  function loop(now: number) {
    if (!running) return;
    const dt = Math.min(now - last, 250);
    last = now;
    if (drawIn < 1) drawIn = Math.min(1, drawIn + dt / 1600);
    else if (!solved) {
      swapBudget += dt / 45; // ~22 améliorations visibles par seconde
      while (swapBudget >= 1 && !solved) { step(4000); swapBudget--; }
    } else if (now - solvedAt > 5000) jiggle();
    draw();
    raf = requestAnimationFrame(loop);
  }

  // Une fois optimisé : on déplace quelques villes et on recommence.
  function jiggle() {
    for (let k = 0; k < Math.ceil(pts.length / 6); k++) {
      const p = pts[Math.floor(Math.random() * pts.length)];
      p.x = Math.max(24, Math.min(W - 24, p.x + (Math.random() - 0.5) * 220));
      p.y = Math.max(24, Math.min(H - 24, p.y + (Math.random() - 0.5) * 220));
    }
    restart();
  }

  // Clic : ajoute une ville à l'endroit le moins coûteux de la tournée.
  canvas.closest('[data-tour-zone]')?.addEventListener('click', (ev) => {
    const e = ev as MouseEvent;
    if ((e.target as HTMLElement).closest('a, button')) return;
    const r = canvas.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    pts.push(p);
    const idx = pts.length - 1;
    let best = 0, bc = Infinity;
    for (let k = 0; k < tour.length; k++) {
      const a = pts[tour[k]], b = pts[tour[(k + 1) % tour.length]];
      const c = d(a, p) + d(p, b) - d(a, b);
      if (c < bc) { bc = c; best = k + 1; }
    }
    tour.splice(best, 0, idx);
    restart();
    if (reduced) { while (!solved) step(10_000); draw(); }
  });

  // Pause quand le hero n'est pas visible ou l'onglet caché
  const setRunning = (on: boolean) => {
    if (reduced) return;
    if (on && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    if (!on) { running = false; cancelAnimationFrame(raf); }
  };
  new IntersectionObserver(([e]) => setRunning(e.isIntersecting)).observe(canvas);
  document.addEventListener('visibilitychange', () => setRunning(!document.hidden));

  let rt = 0;
  new ResizeObserver(() => {
    clearTimeout(rt);
    rt = window.setTimeout(resize, 150);
  }).observe(canvas);

  resize();
  if (reduced) { running = false; draw(); } else raf = requestAnimationFrame(loop);
}
