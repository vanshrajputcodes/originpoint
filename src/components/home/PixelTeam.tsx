import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import teamAsset from "@/assets/team-photo.png.asset.json";

/**
 * The real ORIGIN POINT study-team photo rendered as a live pixel mosaic.
 *
 * The photo is sampled into a grid of round particles. At rest the mosaic is
 * a faint, shimmering dot-matrix of the image; moving the pointer across it
 * lights particles up near the cursor — full color, slightly enlarged, gently
 * pushed aside — with a smooth trail that fades back to rest. Particles only
 * ever exist inside the photo's silhouette (its white background is skipped).
 *
 * Static full render under prefers-reduced-motion; no interaction there.
 */

const SOURCE_ASPECT = 2; // source image is 1774x887
const CELL = 6; // css px per particle cell
const INFLUENCE_RADIUS = 150; // css px around the pointer
const MAX_PARTICLES = 6000;

interface Particle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  phase: number;
  e: number; // energy 0..1 (cursor proximity, eased)
  ox: number;
  oy: number; // eased push-away offset
}

export function PixelTeam() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let built = false;
    const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawStatic = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, CELL * 0.36, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const build = () => {
      width = wrap.clientWidth;
      if (!width || !img.complete || !img.naturalWidth) return;
      height = Math.round(width / SOURCE_ASPECT);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      let cell = CELL;
      let cols = Math.max(2, Math.floor(width / cell));
      let rows = Math.max(2, Math.floor(height / cell));
      // Grow the cell if the grid would produce too many particles.
      while (cols * rows > MAX_PARTICLES) {
        cell += 1;
        cols = Math.max(2, Math.floor(width / cell));
        rows = Math.max(2, Math.floor(height / cell));
      }

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const cellW = width / cols;
      const cellH = height / rows;
      const next: Particle[] = [];
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = (gy * cols + gx) * 4;
          const a = data[i + 3] ?? 0;
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          if (a < 40) continue;
          if (r > 242 && g > 242 && b > 242) continue; // skip the photo's white background
          next.push({
            x: (gx + 0.5) * cellW,
            y: (gy + 0.5) * cellH,
            r,
            g,
            b,
            phase: Math.random() * Math.PI * 2,
            e: 0,
            ox: 0,
            oy: 0,
          });
        }
      }
      particles = next;
      built = true;
      if (reduced) drawStatic();
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !built) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const radius = INFLUENCE_RADIUS;
      const r2 = radius * radius;
      pointer.sx += (pointer.x - pointer.sx) * 0.22;
      pointer.sy += (pointer.y - pointer.sy) * 0.22;
      const time = t / 1000;

      for (const p of particles) {
        let target = 0;
        let pushX = 0;
        let pushY = 0;
        if (pointer.active) {
          const dx = p.x - pointer.sx;
          const dy = p.y - pointer.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const falloff = 1 - d / radius;
            target = falloff * falloff;
            const push = target * 9;
            pushX = (dx / d) * push;
            pushY = (dy / d) * push;
          }
        }
        // Fast rise near the cursor, slow decay = a smooth trailing wake.
        p.e += (target - p.e) * (target > p.e ? 0.3 : 0.06);
        p.ox += (pushX - p.ox) * 0.16;
        p.oy += (pushY - p.oy) * 0.16;

        const wobble = Math.sin(time * 1.4 + p.phase) * 0.45;
        const size = CELL * 0.32 * (0.6 + p.e * 1.1) + p.e * 0.7;
        const alpha = 0.15 + p.e * 0.85;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x + p.ox + wobble, p.y + p.oy - p.e * 3, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = build;
    img.src = teamAsset.url;
    if (img.complete) build();

    const onMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(build);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(wrap);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      img.onload = null;
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      data-cursor
      data-cursor-label="Team"
      role="img"
      aria-label="The ORIGIN POINT study team: five students celebrating around their laptops"
      className="relative mx-auto w-full max-w-[560px]"
      style={{ aspectRatio: "2 / 1" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
