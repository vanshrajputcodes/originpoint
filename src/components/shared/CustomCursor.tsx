import { useEffect, useRef, useState } from "react";

/**
 * Refined desktop cursor: a small central dot plus a smooth-following outer
 * ring with a gentle magnetic pull over interactive elements. Driven by a
 * single rAF loop writing transforms directly — no React state per move.
 * Enabled only for fine pointers with no reduced-motion preference; the
 * native cursor stays intact whenever the custom one is off.
 */
export function CustomCursor() {
  // Starts false on the server and during the first client render so the
  // markup matches hydration; the effect flips it on for fine pointers.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let visible = false;
    let active = false;
    let label = "";
    const pos = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let magnet: { cx: number; cy: number } | null = null;

    const root = document.documentElement;
    root.classList.add("op-cursor");

    const interactive = "a, button, [role='button'], input, textarea, select, label";

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.x = ring.x = pos.x;
        dot.y = ring.y = pos.y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      const el = (e.target as Element | null)?.closest?.(`[data-cursor='magnetic'], ${interactive}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        magnet = { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
      } else {
        magnet = null;
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(`[data-cursor], ${interactive}`);
      active = !!el;
      label = (el as HTMLElement | null)?.dataset?.["cursorLabel"] ?? "";
    };

    const tick = () => {
      const targetX = magnet ? pos.x + (magnet.cx - pos.x) * 0.22 : pos.x;
      const targetY = magnet ? pos.y + (magnet.cy - pos.y) * 0.22 : pos.y;
      dot.x += (targetX - dot.x) * 0.4;
      dot.y += (targetY - dot.y) * 0.4;
      ring.x += (targetX - ring.x) * 0.16;
      ring.y += (targetY - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${active ? 1.7 : 1})`;
        ringRef.current.dataset["active"] = active ? "true" : "false";
        if (ringRef.current.textContent !== label) ringRef.current.textContent = label;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      root.classList.remove("op-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={ringRef}
        data-active="false"
        className="absolute top-0 left-0 grid size-8 place-items-center overflow-hidden rounded-full border border-foreground/30 text-center text-[9px] font-bold tracking-wide text-accent-foreground opacity-0 transition-[border-color,width,height,background-color] duration-200 data-[active=true]:size-14 data-[active=true]:border-primary/70 data-[active=true]:bg-accent/40"
      />
      <div ref={dotRef} className="absolute top-0 left-0 size-1.5 rounded-full bg-primary opacity-0" />
    </div>
  );
}
