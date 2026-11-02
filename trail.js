// A faint grey trail of glyphs behind the cursor, across the whole page. It only
// draws while there are glyphs left to fade, so a still mouse costs nothing.

const GLYPHS = '.,:;-~+';
const COLOR = '#8c8c8c';
const FONT = 'Fragment Mono';
const CELL_H = 12;
const CELL_W = 7.2;
const SPREAD = 4;
const MAX_GLYPHS = 160;
const LIFE_MS = 900;
const PEAK_ALPHA = 0.4;

const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
const glyphs = new Map();
let drawing = false;
let lastDraw = 0;
let previous = null;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${CELL_H}px "${FONT}", ui-monospace, Menlo, monospace`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = COLOR;
}

function seed(x, y) {
  if (glyphs.size >= MAX_GLYPHS) return;
  const angle = Math.random() * Math.PI * 2;
  const reach = Math.random() * Math.random() * SPREAD;
  const col = Math.round(x / CELL_W + (Math.cos(angle) * reach * CELL_H) / CELL_W);
  const row = Math.round(y / CELL_H + Math.sin(angle) * reach);
  const key = `${col},${row}`;
  if (glyphs.has(key)) return;
  glyphs.set(key, {
    col,
    row,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    born: performance.now(),
  });
}

function draw(now) {
  if (now - lastDraw >= 30) {
    lastDraw = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    glyphs.forEach((item, key) => {
      const age = (now - item.born) / LIFE_MS;
      if (age >= 1) {
        glyphs.delete(key);
        return;
      }
      ctx.globalAlpha = PEAK_ALPHA * (1 - age) * (1 - age);
      ctx.fillText(item.glyph, item.col * CELL_W, item.row * CELL_H);
    });
  }
  if (glyphs.size > 0) {
    requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawing = false;
  }
}

function onMove(event) {
  if (event.pointerType !== 'mouse') return;
  const x = event.clientX;
  const y = event.clientY;
  const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 0;
  previous = { x, y };
  for (let i = Math.min(3, Math.ceil(distance / 14)); i > 0; i--) seed(x, y);
  if (!drawing && glyphs.size > 0) {
    drawing = true;
    requestAnimationFrame(draw);
  }
}

if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', onMove, { passive: true });
  document.fonts.load(`${CELL_H}px "${FONT}"`).then(resize).catch(() => {});
}
