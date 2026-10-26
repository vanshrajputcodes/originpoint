import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import teamAsset from "@/assets/team-photo.png";

const SOURCE_ASPECT = 2;
const CELL = 10;
const MAX_PARTICLES = 6000;
const INFLUENCE_RADIUS = 150;

interface Particle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  phase: number;
  energy: number;
  ox: number;
  oy: number;
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
    let resizeRaf = 0;
    let visible = true;
    let built = false;

    const pointer = {
      x: 0,
      y: 0,
      sx: 0,
      sy: 0,
      active: false,
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawStatic = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const blockSize = CELL * 0.88;

      for (const p of particles) {
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;

        ctx.fillRect(
          p.x - blockSize / 2,
          p.y - blockSize / 2,
          blockSize,
          blockSize
        );
      }
    };

    const img = new Image();
    img.decoding = "async";

    const build = () => {
      width = wrap.clientWidth;

      if (!width || !img.complete || !img.naturalWidth) return;

      height = Math.round(width / SOURCE_ASPECT);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      let cell = CELL;
      let cols = Math.max(2, Math.floor(width / cell));
      let rows = Math.max(2, Math.floor(height / cell));

      while (cols * rows > MAX_PARTICLES) {
        cell += 1;
        cols = Math.max(2, Math.floor(width / cell));
        rows = Math.max(2, Math.floor(height / cell));
      }

      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;

      const ctx = offscreen.getContext("2d", {
        willReadFrequently: true,
      });

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, cols, rows);

      const imageData = ctx.getImageData(0, 0, cols, rows).data;
      const cellW = width / cols;
      const cellH = height / rows;
      const next: Particle[] = [];

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = (gy * cols + gx) * 4;

          const r = imageData[i] ?? 0;
          const g = imageData[i + 1] ?? 0;
          const b = imageData[i + 2] ?? 0;
          const a = imageData[i + 3] ?? 0;

          if (a < 40) continue;

          // Remove only near-white background pixels.
          if (r > 247 && g > 247 && b > 247) continue;

          next.push({
            x: (gx + 0.5) * cellW,
            y: (gy + 0.5) * cellH,
            r,
            g,
            b,
            phase: Math.random() * Math.PI * 2,
            energy: 0,
            ox: 0,
            oy: 0,
          });
        }
      }

      particles = next;
      built = true;

      if (reduced) {
        drawStatic();
      }
    };

    const tick = (timeStamp: number) => {
      raf = requestAnimationFrame(tick);

      if (!visible || !built || reduced) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      pointer.sx += (pointer.x - pointer.sx) * 0.22;
      pointer.sy += (pointer.y - pointer.sy) * 0.22;

      const radius = INFLUENCE_RADIUS;
      const radiusSquared = radius * radius;
      const time = timeStamp / 1000;

      for (const p of particles) {
        let target = 0;
        let pushX = 0;
        let pushY = 0;

        if (pointer.active) {
          const dx = p.x - pointer.sx;
          const dy = p.y - pointer.sy;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < radiusSquared) {
            const distance = Math.sqrt(distanceSquared) || 1;
            const falloff = 1 - distance / radius;

            target = falloff * falloff;

            const push = target * 9;
            pushX = (dx / distance) * push;
            pushY = (dy / distance) * push;
          }
        }

        // Smooth energy response.
        p.energy +=
          (target - p.energy) * (target > p.energy ? 0.3 : 0.06);

        p.ox += (pushX - p.ox) * 0.16;
        p.oy += (pushY - p.oy) * 0.16;

        // Keep the resting photo visible.
        const wobble =
          Math.sin(time * 1.2 + p.phase) * 0.15;

        const blockSize = CELL * (0.88 + p.energy * 0.18);
        const alpha = 0.82 + p.energy * 0.18;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;

        ctx.fillRect(
          p.x + p.ox + wobble - blockSize / 2,
          p.y + p.oy - p.energy * 2 - blockSize / 2,
          blockSize,
          blockSize
        );
      }
    };

    img.onload = build;
    img.src = teamAsset;

    if (img.complete && img.naturalWidth) {
      build();
    }

    const onMove = (event: PointerEvent) => {
      if (reduced || event.pointerType === "touch") return;

      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    wrap.addEventListener("pointermove", onMove, {
      passive: true,
    });

    wrap.addEventListener("pointerleave", onLeave, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(build);
    });

    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });

    intersectionObserver.observe(wrap);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

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
      aria-label="The ORIGIN POINT study team"
      className="relative mx-auto w-full max-w-[560px] overflow-hidden"
      style={{ aspectRatio: "2 / 1" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
      />
    </div>
  );
}
