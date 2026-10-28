"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import teamPhoto from "@/assets/team-photo.png";

const IMAGE_SRC = teamPhoto;
const SOURCE_ASPECT = 2;
const CELL = 8;
const MAX_PARTICLES = 6000;
const REVEAL_DURATION = 1400;

interface Particle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  delay: number;
}

export function PixelTeam() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  const [showRealImage, setShowRealImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    if (!wrap || !canvas || !imageLoaded || reducedMotion) {
      if (reducedMotion && imageLoaded) {
        setShowRealImage(true);
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = IMAGE_SRC;

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let started = false;
    let startTime = 0;
    let disposed = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function finishAnimation() {
      if (disposed) return;
      cancelAnimationFrame(raf);
      setShowRealImage(true);
    }

    function draw(timestamp: number) {
      if (disposed || !visible) return;

      width = wrap.clientWidth;
      height = width / SOURCE_ASPECT;

      if (!width || !height) return;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);

      const progress = Math.min(
        1,
        (timestamp - startTime) / REVEAL_DURATION
      );

      for (const p of particles) {
        const localProgress = Math.max(
          0,
          Math.min(1, (progress - p.delay) / 0.7)
        );

        const eased =
          1 - Math.pow(1 - localProgress, 3);

        const size = CELL * 0.92 * eased;
        const alpha = eased;

        if (size <= 0.1) continue;

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;

        ctx!.fillRect(
          p.x - size / 2,
          p.y - size / 2,
          size,
          size
        );
      }

      ctx!.globalAlpha = 1;

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        finishAnimation();
      }
    }

    function build() {
      if (
        disposed ||
        !image.complete ||
        !image.naturalWidth ||
        !wrap.clientWidth
      ) {
        return;
      }

      width = wrap.clientWidth;
      height = width / SOURCE_ASPECT;

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = "100%";
      canvas!.style.height = "100%";

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

      if (!sampleCtx) {
        finishAnimation();
        return;
      }

      sampleCtx.drawImage(image, 0, 0, cols, rows);

      const pixels = sampleCtx.getImageData(
        0,
        0,
        cols,
        rows
      ).data;

      const cellW = width / cols;
      const cellH = height / rows;

      particles = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;

          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          if (a < 40) continue;
          if (r > 250 && g > 250 && b > 250) continue;

          particles.push({
            x: (x + 0.5) * cellW,
            y: (y + 0.5) * cellH,
            r,
            g,
            b,
            delay: Math.random() * 0.22,
          });
        }
      }

      if (!started && visible) {
        started = true;
        startTime = performance.now();
        raf = requestAnimationFrame(draw);
      }
    }

    image.onload = build;

    image.onerror = () => {
      finishAnimation();
    };

    if (image.complete && image.naturalWidth) {
      build();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;

        if (visible && !started && particles.length > 0) {
          started = true;
          startTime = performance.now();
          raf = requestAnimationFrame(draw);
        }

        if (!visible) {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(() => {
      if (!started) {
        cancelAnimationFrame(raf);
        build();
      }
    });

    resizeObserver.observe(wrap);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      image.onload = null;
      image.onerror = null;
    };
  }, [imageLoaded, reducedMotion]);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="The ORIGIN POINT study team"
      className="relative mx-auto w-full max-w-[560px] overflow-hidden"
      style={{ aspectRatio: "2 / 1" }}
    >
      <img
        src={IMAGE_SRC}
        alt="The ORIGIN POINT study team"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          showRealImage ? "opacity-100" : "opacity-0"
        }`}
      />

      {!showRealImage && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
        />
      )}
    </div>
  );
}