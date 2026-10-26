"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const IMAGE_SRC = "/team-photo.png";
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
    let cellSize = CELL;
    let raf = 0;
    let resizeRaf = 0;
    let visible = false;
    let built = false;
    let revealStart = 0;
    let animationComplete = false;

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

    function drawStatic() {
      if (!built) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      const size = cellSize * 0.9;

      for (const p of particles) {
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
        ctx.fillRect(
          p.x - size / 2,
          p.y - size / 2,
          size,
          size
        );
      }
    }

    function draw(timestamp: number) {
      raf = 0;

      if (!built || !visible) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      pointer.sx += (pointer.x - pointer.sx) * 0.18;
      pointer.sy += (pointer.y - pointer.sy) * 0.18;

      const elapsed = timestamp - revealStart;
      const progress = reducedMotion
        ? 1
        : Math.min(1, elapsed / 1200);

      let hasMotion = progress < 1;

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
          const distance = Math.hypot(dx, dy);

          if (distance < INFLUENCE_RADIUS) {
            const falloff = 1 - distance / INFLUENCE_RADIUS;
            target = falloff * falloff;

            const force = target * 10;
            const safeDistance = distance || 1;

            pushX = (dx / safeDistance) * force;
            pushY = (dy / safeDistance) * force;
          }
        }

        p.energy +=
          (target - p.energy) *
          (target > p.energy ? 0.22 : 0.07);

        p.ox += (pushX - p.ox) * 0.14;
        p.oy += (pushY - p.oy) * 0.14;

        if (
          p.energy > 0.002 ||
          Math.abs(p.ox) > 0.02 ||
          Math.abs(p.oy) > 0.02
        ) {
          hasMotion = true;
        }

        const size = cellSize * (0.9 + p.energy * 0.15);
        const offsetY = (1 - reveal) * 10;

        ctx.globalAlpha = 0.96 * reveal;
        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;

        ctx.fillRect(
          p.x + p.ox - size / 2,
          p.y + p.oy + offsetY - size / 2,
          size,
          size
        );
      }

      ctx.globalAlpha = 1;

      animationComplete = progress >= 1;

      if (!reducedMotion && (hasMotion || pointer.active)) {
        raf = requestAnimationFrame(draw);
      }
    }

    function startAnimation() {
      if (!built || !visible || reducedMotion) return;

      cancelAnimationFrame(raf);

      if (animationComplete) {
        // Keep the original reveal complete after pointer movement.
        revealStart = performance.now() - 1200;
      } else {
        revealStart = performance.now();
      }

      raf = requestAnimationFrame(draw);
    }

    function render() {
      if (!wrap.isConnected || !image.complete || !image.naturalWidth) {
        return;
      }

      width = wrap.clientWidth;

      if (!width) return;

      height = Math.round(width / SOURCE_ASPECT);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      cellSize = CELL;

      let cols = Math.max(2, Math.floor(width / cellSize));
      let rows = Math.max(2, Math.floor(height / cellSize));

      while (cols * rows > MAX_PARTICLES) {
        cellSize += 1;
        cols = Math.max(2, Math.floor(width / cellSize));
        rows = Math.max(2, Math.floor(height / cellSize));
      }

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;

      const sampleCtx = sample.getContext("2d", {
        willReadFrequently: true,
      });

      if (!sampleCtx) return;

      sampleCtx.drawImage(image, 0, 0, cols, rows);

      let pixels: Uint8ClampedArray;

      try {
        pixels = sampleCtx.getImageData(
          0,
          0,
          cols,
          rows
        ).data;
      } catch (error) {
        console.error("Unable to sample team photo:", error);
        canvas.style.display = "none";
        return;
      }

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

          // Remove nearly white background pixels only.
          if (r > 250 && g > 250 && b > 250) continue;

          next.push({
            x: (x + 0.5) * cellW,
            y: (y + 0.5) * cellH,
            r,
            g,
            b,
            delay: Math.random() * 0.22,
            energy: 0,
            ox: 0,
            oy: 0,
          });
        }
      }

      particles = next;
      built = true;
      animationComplete = false;

      cancelAnimationFrame(raf);

      if (reducedMotion) {
        drawStatic();
      } else if (visible) {
        startAnimation();
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion || event.pointerType === "touch") return;

      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;

      if (visible && built && !raf) {
        raf = requestAnimationFrame(draw);
      }
    }

    function onPointerLeave() {
      pointer.active = false;

      if (visible && built && !reducedMotion && !raf) {
        raf = requestAnimationFrame(draw);
      }
    }

    image.onload = render;

    image.onerror = () => {
      console.error(`Failed to load team image: ${IMAGE_SRC}`);
      canvas.style.display = "none";
      wrap.style.backgroundImage = `url("${IMAGE_SRC}")`;
      wrap.style.backgroundSize = "contain";
      wrap.style.backgroundPosition = "center";
      wrap.style.backgroundRepeat = "no-repeat";
    };

    image.src = IMAGE_SRC;

    if (image.complete && image.naturalWidth) {
      render();
    }

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(render);
    });

    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;

        if (!visible) {
          cancelAnimationFrame(raf);
          raf = 0;
          return;
        }

        if (built && !reducedMotion) {
          if (!animationComplete) {
            startAnimation();
          } else {
            raf = requestAnimationFrame(draw);
          }
        }
      },
      { threshold: 0.05 }
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
