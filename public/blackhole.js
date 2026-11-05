// A Schwarzschild black hole with a thin accretion disk, drawn as ASCII.
// Pass 1 traces bent light rays into a small texture, a quarter of them per frame.
// Pass 2 picks one glyph per character cell, and pass 3 draws those glyphs to the
// screen. Lengths are in Schwarzschild radii, so the horizon is r = 1.

const RAMP = ' .,:;-~=+*xoXO#%@';
const EDGES = '-/|\\';
const FONT = 'Fragment Mono';
const FRAME_MS = 1000 / 15;
const SLOW_FRAME_MS = 110;

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const SCENE = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uView;
uniform float uTime;
uniform float uElevation;
uniform int uSteps;
uniform int uPhase;
out vec4 outColor;

const float CAMERA = 17.0;
const float FAR = 34.0;
const float R_IN = 2.5;
const float R_OUT = 11.5;
const float FLOW_PERIOD = 40.0;
const float ROLL = -0.07;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * noise(p);
    p = p * vec3(2.03, 2.03, 2.2) + 11.7;
    amp *= 0.5;
  }
  return sum;
}

// Gas streaks: stretched around the disk, tight across it.
float streaks(float r, float phi, float seed) {
  float ring = 2.6;
  return fbm(vec3(cos(phi) * ring, sin(phi) * ring, log(r) * 11.0 + seed));
}

// The inner disk orbits faster, which would shear any pattern to nothing, so two
// copies of the pattern cross-fade, each restarting while it is invisible.
float diskLight(vec2 p) {
  float r = length(p);
  if (r < R_IN || r > R_OUT) return 0.0;
  float phi = atan(p.y, p.x);
  float omega = 1.1 * pow(r, -1.5);
  float a = fract(uTime / FLOW_PERIOD);
  float b = fract(uTime / FLOW_PERIOD + 0.5);
  float spinA = omega * (a - 0.5) * FLOW_PERIOD;
  float spinB = omega * (b - 0.5) * FLOW_PERIOD;
  float inflow = 0.02 * FLOW_PERIOD;
  float n = streaks(r + (a - 0.5) * inflow, phi + spinA, 0.0) * (1.0 - abs(2.0 * a - 1.0))
          + streaks(r + (b - 0.5) * inflow, phi + spinB, 4.3) * (1.0 - abs(2.0 * b - 1.0));
  float edge = smoothstep(R_IN, R_IN + 0.5, r) * (1.0 - smoothstep(R_OUT - 5.0, R_OUT, r));
  float gaps = smoothstep(0.26, 0.62, n);
  return edge * pow(R_IN / r, 2.3) * (0.75 + 2.6 * gaps);
}

float stars(vec3 dir) {
  vec3 q = dir * 55.0;
  vec3 id = floor(q);
  float h = hash(id);
  if (h < 0.95) return 0.0;
  return smoothstep(0.42, 0.12, length(fract(q) - 0.5)) * (h - 0.95) * 16.0;
}

void main() {
  // The disk moves slowly, so each frame only re-traces one ray in four.
  if (uPhase >= 0) {
    ivec2 at = ivec2(gl_FragCoord.xy) % 2;
    if (at.x + 2 * at.y != uPhase) discard;
  }

  vec2 p = (gl_FragCoord.xy / uRes - 0.5) * 2.0 * uView;
  p = mat2(cos(ROLL), sin(ROLL), -sin(ROLL), cos(ROLL)) * p;

  vec3 ro = CAMERA * vec3(0.0, sin(uElevation), -cos(uElevation));
  vec3 forward = -normalize(ro);
  vec3 right = normalize(cross(vec3(0, 1, 0), forward));
  vec3 up = cross(forward, right);

  vec3 x = ro;
  vec3 v = normalize(forward + p.x * right + p.y * up);

  // Null geodesic in Schwarzschild spacetime, in Cartesian form. The bending
  // acts as a force of -1.5 h^2 x / r^5, with h the conserved angular momentum.
  vec3 c = cross(x, v);
  float h2 = dot(c, c);
  float light = 0.0;
  float clear = 1.0;
  float closest = CAMERA;
  bool captured = false;

  for (int i = 0; i < uSteps; i++) {
    float r = length(x);
    closest = min(closest, r);
    if (r < 1.0) {
      captured = true;
      break;
    }
    if (r > FAR && dot(x, v) > 0.0) break;

    float dt = clamp(0.09 * r, 0.03, 1.2);
    vec3 next = x + v * dt * 0.5;
    float rn = length(next);
    v += -1.5 * h2 * next / (rn * rn * rn * rn * rn) * dt;
    next += v * dt * 0.5;

    if (x.y * next.y < 0.0) {
      vec3 hit = mix(x, next, x.y / (x.y - next.y));
      light += clear * diskLight(hit.xz);
      clear *= 0.72;
    }
    x = next;
  }

  if (!captured) {
    light += clear * stars(normalize(v)) * 0.5;
    // Rays that skim the photon sphere at r = 1.5 pile up into a thin bright ring.
    light += 2.4 * exp(-max(closest - 1.5, 0.0) * 9.0);
  }

  float tone = 1.0 - exp(-light * 1.25);
  outColor = vec4(pow(tone, 0.8), 0.0, 0.0, 1.0);
}`;

const CELLS = `#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uScene;
uniform int uSub;
uniform int uRamp;
out vec4 outColor;

float brightness(ivec2 cell) {
  float sum = 0.0;
  ivec2 size = textureSize(uScene, 0);
  for (int y = 0; y < uSub; y++) {
    for (int x = 0; x < uSub; x++) {
      ivec2 at = clamp(cell * uSub + ivec2(x, y), ivec2(0), size - 1);
      sum += texelFetch(uScene, at, 0).r;
    }
  }
  return sum / float(uSub * uSub);
}

void main() {
  ivec2 cell = ivec2(gl_FragCoord.xy);
  float l = brightness(cell);
  vec2 slope = vec2(
    brightness(cell + ivec2(1, 0)) - brightness(cell - ivec2(1, 0)),
    brightness(cell + ivec2(0, 1)) - brightness(cell - ivec2(0, 1)));

  int glyph = int(clamp(l, 0.0, 0.999) * float(uRamp));
  // Hard edges take a line glyph along the edge, which keeps the shadow's outline crisp.
  if (length(slope) > 0.8 && l > 0.14) {
    float angle = atan(slope.y, slope.x) + 3.14159265 / 2.0;
    int turn = int(floor(mod(angle, 3.14159265) / 3.14159265 * 4.0 + 0.5)) % 4;
    glyph = uRamp + turn;
  }

  outColor = vec4(l, float(glyph) / 255.0, 0.0, 1.0);
}`;

const ASCII = `#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uCells;
uniform sampler2D uGlyphs;
uniform ivec2 uCell;
uniform bool uLight;
out vec4 outColor;

vec3 heat(float t) {
  vec3 ember = vec3(0.42, 0.20, 0.09);
  vec3 gold = vec3(0.90, 0.60, 0.28);
  vec3 white = vec3(1.0, 0.95, 0.85);
  return t < 0.55 ? mix(ember, gold, t / 0.55) : mix(gold, white, (t - 0.55) / 0.45);
}

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  ivec2 cell = px / uCell;
  ivec2 local = px - cell * uCell;
  vec4 data = texelFetch(uCells, cell, 0);
  int glyph = int(data.g * 255.0 + 0.5);
  ivec2 texel = ivec2(glyph * uCell.x + local.x, uCell.y - 1 - local.y);
  float ink = texelFetch(uGlyphs, texel, 0).r;
  if (uLight) {
    // Black on white: faint parts of the disk are grey, bright parts are solid black.
    vec3 shade = vec3(mix(0.62, 0.0, smoothstep(0.0, 0.75, data.r)));
    outColor = vec4(mix(vec3(1.0), shade, ink), 1.0);
  } else {
    outColor = vec4(heat(data.r) * ink, 1.0);
  }
}`;

function compile(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  [
    [gl.VERTEX_SHADER, vertexSource],
    [gl.FRAGMENT_SHADER, fragmentSource],
  ].forEach(([type, source]) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    gl.attachShader(program, shader);
  });
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  const uniforms = new Proxy({}, {
    get: (cache, name) => {
      if (!(name in cache)) cache[name] = gl.getUniformLocation(program, name);
      return cache[name];
    },
  });
  return { program, uniforms };
}

function drawGlyphs(gl, texture, cellW, cellH) {
  const glyphs = RAMP + EDGES;
  const canvas = document.createElement('canvas');
  canvas.width = cellW * glyphs.length;
  canvas.height = cellH;
  const ctx = canvas.getContext('2d');
  ctx.font = `${Math.round(cellH * 0.86)}px "${FONT}", ui-monospace, Menlo, monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  [...glyphs].forEach((glyph, i) => ctx.fillText(glyph, (i + 0.5) * cellW, cellH / 2));

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

function start(canvas) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
  const scene = compile(gl, VERT, SCENE);
  const cells = compile(gl, VERT, CELLS);
  const ascii = compile(gl, VERT, ASCII);
  gl.bindVertexArray(gl.createVertexArray());

  const sceneTexture = gl.createTexture();
  const cellTexture = gl.createTexture();
  const glyphTexture = gl.createTexture();
  const sceneBuffer = gl.createFramebuffer();
  const cellBuffer = gl.createFramebuffer();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const state = {
    sub: 2,
    steps: 110,
    cellW: 0,
    cellH: 0,
    cols: 0,
    rows: 0,
    view: [1, 1],
    tilt: 0,
    tiltTarget: 0,
    slowFrames: 0,
    frame: 0,
  };

  function target(framebuffer, texture, width, height) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  }

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const cssCell = rect.width < 600 ? 10 : 12;
    state.cellH = Math.round(cssCell * dpr);
    state.cellW = Math.round(state.cellH * 0.6);
    state.cols = Math.ceil(canvas.width / state.cellW);
    state.rows = Math.ceil(canvas.height / state.cellH);

    const aspect = rect.width / rect.height;
    const extent = aspect < 1 ? 0.34 : 0.42;
    state.view = aspect < 1 ? [extent, extent / aspect] : [extent * aspect, extent];

    drawGlyphs(gl, glyphTexture, state.cellW, state.cellH);

    target(sceneBuffer, sceneTexture, state.cols * state.sub, state.rows * state.sub);
    target(cellBuffer, cellTexture, state.cols, state.rows);
  }

  // A partial render replaces one ray in four and keeps the rest of the last frame.
  function render(seconds, partial = false) {
    state.tilt += (state.tiltTarget - state.tilt) * 0.08;
    const elevation = 0.07 + 0.012 * Math.sin(seconds * 0.11) + state.tilt;
    const phase = partial && state.sub === 2 ? [0, 3, 1, 2][state.frame++ % 4] : -1;

    gl.useProgram(scene.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneBuffer);
    gl.viewport(0, 0, state.cols * state.sub, state.rows * state.sub);
    gl.uniform2f(scene.uniforms.uRes, state.cols * state.sub, state.rows * state.sub);
    gl.uniform2f(scene.uniforms.uView, state.view[0], state.view[1]);
    gl.uniform1f(scene.uniforms.uTime, seconds);
    gl.uniform1f(scene.uniforms.uElevation, elevation);
    gl.uniform1i(scene.uniforms.uSteps, state.steps);
    gl.uniform1i(scene.uniforms.uPhase, phase);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.useProgram(cells.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, cellBuffer);
    gl.viewport(0, 0, state.cols, state.rows);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.uniform1i(cells.uniforms.uScene, 0);
    gl.uniform1i(cells.uniforms.uSub, state.sub);
    gl.uniform1i(cells.uniforms.uRamp, RAMP.length);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.useProgram(ascii.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.bindTexture(gl.TEXTURE_2D, cellTexture);
    gl.uniform1i(ascii.uniforms.uCells, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glyphTexture);
    gl.uniform1i(ascii.uniforms.uGlyphs, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform2i(ascii.uniforms.uCell, state.cellW, state.cellH);
    gl.uniform1i(ascii.uniforms.uLight, document.documentElement.dataset.theme === 'light' ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // Stills start part-way through the flow, where the disk has its best structure.
  const startOffset = 120;
  let running = false;
  let inView = true;
  let last = 0;
  let previous = 0;
  let clock = startOffset;

  function lowerQuality() {
    if (state.sub > 1) {
      state.sub = 1;
    } else if (state.steps > 70) {
      state.steps = 70;
    } else {
      return;
    }
    resize();
    render(clock);
  }

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    // The small margin stops 60Hz screens from rounding down to every third vsync.
    if (now - last < FRAME_MS - 3) return;
    const elapsed = now - last;
    last = now;
    if (previous) clock += Math.min(elapsed, 100) / 1000;
    previous = now;


    render(clock, true);

    state.slowFrames = elapsed > SLOW_FRAME_MS ? state.slowFrames + 1 : Math.max(0, state.slowFrames - 1);
    if (state.slowFrames > 20) {
      state.slowFrames = 0;
      lowerQuality();
    }
  }

  function update() {
    const shouldRun = inView && !document.hidden && !reducedMotion.matches;
    if (shouldRun && !running) {
      running = true;
      previous = 0;
      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
      render(clock);
    }
  }

  resize();
  render(clock);

  new ResizeObserver(() => {
    resize();
    render(clock);
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    update();
  }).observe(canvas);
  document.addEventListener('visibilitychange', update);
  // Redraw straight away when the theme changes, even while the animation is paused.
  new MutationObserver(() => render(clock)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  reducedMotion.addEventListener('change', update);
  addEventListener('pointermove', (event) => {
    // A zero-height window (a background tab, say) would make the tilt infinite
    // and turn every ray into NaN, so skip it and keep the tilt in range.
    if (event.pointerType === 'mouse' && innerHeight > 0) {
      const tilt = (0.5 - event.clientY / innerHeight) * 0.09;
      state.tiltTarget = Math.max(-0.045, Math.min(0.045, tilt));
    }
  });
  canvas.addEventListener('webglcontextlost', () => {
    running = false;
    document.documentElement.classList.remove('live');
  });

  update();
}

const canvas = document.getElementById('hole');
if (document.documentElement.classList.contains('live')) {
  const fontReady = document.fonts.load(`16px "${FONT}"`, RAMP).catch(() => {});
  const timeout = new Promise((resolve) => setTimeout(resolve, 1500));
  Promise.race([fontReady, timeout]).then(() => {
    try {
      start(canvas);
    } catch (error) {
      console.error(error);
      document.documentElement.classList.remove('live');
    }
  });
}
