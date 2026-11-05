// A faint grey wake behind the cursor, across the whole page. Glyphs are thrown off
// the cursor, drift and slow, then break down into lighter glyphs as they fade.
// It only draws while glyphs are alive, so a still mouse costs nothing.

const DECAY = '#*+=-:.';
const COLOR = { dark: '#a3a3a3', light: '#777777' };
const FONT = 'Fragment Mono';
const CELL_H = 12;
const CELL_W = 7.2;
const MAX_GLYPHS = 220;
const LIFE_MS = 1100;
const PEAK_ALPHA = 0.7;
const DRAG = 2.6;
const FRAME_MS = 30;

const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
let glyphs = [];
let drawing = false;
let lastDraw = 0;
let previous = null;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${CELL_H}px "${FONT}", ui-monospace, Menlo, monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
}

// Each glyph keeps a share of the cursor's velocity plus a random sideways kick,
// so the trail fans out behind fast movement and stays tight around slow movement.
function spawn(x, y, vx, vy, speed) {
  if (glyphs.length >= MAX_GLYPHS) return;
  const angle = Math.random() * Math.PI * 2;
  const kick = 20 + Math.random() * 60;
  glyphs.push({
    x: x + (Math.random() - 0.5) * CELL_W * 2,
    y: y + (Math.random() - 0.5) * CELL_H * 2,
    vx: vx * 0.22 + Math.cos(angle) * kick,
    vy: vy * 0.22 + Math.sin(angle) * kick,
    born: performance.now(),
    weight: Math.min(1, speed / 1800) * (0.5 + Math.random() * 0.5),
  });
}

function draw(now) {
  const dt = Math.min(now - lastDraw, 100) / 1000;
  if (now - lastDraw >= FRAME_MS) {
    lastDraw = now;
    const drag = Math.exp(-DRAG * dt);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = document.documentElement.dataset.theme === 'light' ? COLOR.light : COLOR.dark;
    glyphs = glyphs.filter((item) => {
      const age = (now - item.born) / LIFE_MS;
      if (age >= 1) return false;
      item.x += item.vx * dt;
      item.y += item.vy * dt;
      item.vx *= drag;
      item.vy *= drag;

      // Heavier glyphs start further up the decay sequence.
      const start = Math.round((1 - item.weight) * (DECAY.length - 3));
      const step = Math.min(DECAY.length - 1, start + Math.floor(age * (DECAY.length - start)));
      const col = Math.round(item.x / CELL_W);
      const row = Math.round(item.y / CELL_H);
      ctx.globalAlpha = PEAK_ALPHA * (1 - age * age);
      ctx.fillText(DECAY[step], col * CELL_W, row * CELL_H);
      return true;
    });
  }
  if (glyphs.length > 0) {
    requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawing = false;
  }
}

function onMove(event) {
  if (event.pointerType !== 'mouse') return;
  if (canvas.width === 0 && innerWidth > 0) resize();
  const now = performance.now();
  const x = event.clientX;
  const y = event.clientY;
  if (previous && now > previous.t) {
    const dt = Math.max(now - previous.t, 8) / 1000;
    const vx = (x - previous.x) / dt;
    const vy = (y - previous.y) / dt;
    const speed = Math.hypot(vx, vy);
    const count = Math.min(4, Math.floor(Math.hypot(x - previous.x, y - previous.y) / 9));
    for (let i = 0; i < count; i++) spawn(x, y, vx, vy, speed);
  }
  previous = { x, y, t: now };
  if (!drawing && glyphs.length > 0) {
    drawing = true;
    lastDraw = now;
    requestAnimationFrame(draw);
  }
}

if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', onMove, { passive: true });
  document.fonts.load(`${CELL_H}px "${FONT}"`).then(resize).catch(() => {});
}
