import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import teamAsset from "@/assets/team-photo.png";

const SOURCE_ASPECT = 2;
const CELL = 8;
const MAX_PARTICLES = 6000;
const INFLUENCE_RADIUS = 130;

interface Particle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  delay: number;
  energy: number;
  ox: number;
  oy: number;
}

export function PixelTeam() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let resizeRaf = 0;
    let visible = false;
    let revealed = false;
    let built = false;
    let startTime = 0;

    const pointer = {
      x: 0,
      y: 0,
      sx: 0,
      sy: 0,
      active: false,
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const image = new Image();
    image.decoding = "async";

    function draw(time: number) {
      if (!built || !visible) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      pointer.sx += (pointer.x - pointer.sx) * 0.14;
      pointer.sy += (pointer.y - pointer.sy) * 0.14;

      const elapsed = Math.max(0, time - startTime);
      const revealDuration = reducedMotion ? 0 : 1200;
      const progress = Math.min(1, elapsed / revealDuration);
      const easedReveal =
        1 - Math.pow(1 - progress, 4);

      for (const p of particles) {
        const localProgress = reducedMotion
          ? 1
          : Math.max(
              0,
              Math.min(1, (progress - p.delay) / 0.72)
            );

        const reveal =
          1 - Math.pow(1 - localProgress, 3);

        let target = 0;
        let pushX = 0;
        let pushY = 0;

        if (pointer.active && !reducedMotion) {
          const dx = p.x - pointer.sx;
          const dy = p.y - pointer.sy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < INFLUENCE_RADIUS) {
            const falloff =
              1 - distance / INFLUENCE_RADIUS;

            target = falloff * falloff;

            const force = target * 12;
            const safeDistance = distance || 1;

            pushX = (dx / safeDistance) * force;
            pushY = (dy / safeDistance) * force;
          }
        }

        p.energy +=
          (target - p.energy) *
          (target > p.energy ? 0.22 : 0.055);

        p.ox += (pushX - p.ox) * 0.13;
        p.oy += (pushY - p.oy) * 0.13;

        const blockSize = CELL * (0.84 + p.energy * 0.16);
        const baseX = p.x;
        const baseY = p.y;

        // Reveal each block from a slightly offset position.
        const offsetY = (1 - reveal) * 12;
        const alpha = 0.94 * reveal;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;

        ctx.fillRect(
          baseX + p.ox - blockSize / 2,
          baseY + p.oy + offsetY - blockSize / 2,
          blockSize,
          blockSize
        );
      }

      ctx.globalAlpha = 1;

      if (progress < 1 && !reducedMotion) {
        raf = requestAnimationFrame(draw);
      } else if (pointer.active && !reducedMotion) {
        raf = requestAnimationFrame(draw);
      } else if (!reducedMotion) {
        const hasMotion = particles.some(
          (p) =>
            p.energy > 0.002 ||
            Math.abs(p.ox) > 0.02 ||
            Math.abs(p.oy) > 0.02
        );

        if (hasMotion) {
          raf = requestAnimationFrame(draw);
        }
      }
    }

    function render() {
      width = wrap.clientWidth;
      if (!width || !image.complete || !image.naturalWidth) return;

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

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;

      const sampleCtx = sample.getContext("2d", {
        willReadFrequently: true,
      });

      if (!sampleCtx) return;

      sampleCtx.drawImage(image, 0, 0, cols, rows);

      const pixels = sampleCtx.getImageData(
        0,
        0,
        cols,
        rows
      ).data;

      const cellW = width / cols;
      const cellH = height / rows;
      const next: Particle[] = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;

          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          if (a < 40) continue;

          // Skip near-white background while retaining light details.
          if (r > 247 && g > 247 && b > 247) continue;

          next.push({
            x: (x + 0.5) * cellW,
            y: (y + 0.5) * cellH,
            r,
            g,
            b,
            delay: Math.random() * 0.25,
            energy: 0,
            ox: 0,
            oy: 0,
          });
        }
      }

      particles = next;
      built = true;

      cancelAnimationFrame(raf);
      startTime = performance.now();
      revealed = false;

      if (reducedMotion) {
        revealed = true;
        drawStatic();
      } else if (visible) {
        raf = requestAnimationFrame((t) => {
          revealed = true;
          draw(t);
        });
      }
    }

    function drawStatic() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
        ctx.fillRect(
          p.x - CELL * 0.44,
          p.y - CELL * 0.44,
          CELL * 0.88,
          CELL * 0.88
        );
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion || event.pointerType === "touch") return;

      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;

      if (revealed && visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    }

    function onPointerLeave() {
      pointer.active = false;

      if (revealed && visible && !reducedMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    }

    image.onload = render;
    image.onerror = () => {
      canvas.style.display = "none";
      wrap.style.backgroundImage = `url("${image.src}")`;
      wrap.style.backgroundSize = "cover";
      wrap.style.backgroundPosition = "center";
    };
    image.src = teamAsset;

    if (image.complete && image.naturalWidth) render();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(render);
    });

    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;

        if (visible && built && !revealed && !reducedMotion) {
          startTime = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame((t) => {
            revealed = true;
            draw(t);
          });
        }

        if (!visible) {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 }
    );

    intersectionObserver.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    wrap.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      image.onload = null;
      image.onerror = null;
    };
  }, [reducedMotion]);

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
