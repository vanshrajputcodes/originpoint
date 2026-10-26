import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";

const NODES = [
  { label: "Learn", x: 40, y: 150 },
  { label: "Build", x: 140, y: 60 },
  { label: "Connect", x: 250, y: 150 },
  { label: "Become", x: 340, y: 80 },
] as const;

const PATH = "M 40 150 C 80 150, 100 60, 140 60 S 210 150, 250 150 S 300 80, 340 80";

/**
 * Section A — the ORIGIN POINT philosophy. Split editorial layout with an
 * animated connected-path diagram: the journey line draws itself as the
 * section scrolls into view.
 */
export function PhilosophySection() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    const path = pathRef.current;
    if (!el || !path) return;

    gsap.registerPlugin(ScrollTrigger);
    const len = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "center 55%", scrub: 0.5 },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section aria-labelledby="philosophy-heading" className="border-t border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <Reveal>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">The philosophy</p>
            <h2 id="philosophy-heading" className="text-h2 mt-3 max-w-md text-balance text-foreground">
              Your next chapter starts here.
            </h2>
            <p className="text-lead mt-6 max-w-lg text-pretty">
              ORIGIN POINT is a community ecosystem where people learn with intent, build with
              standards, find collaborators and mentors, discover real opportunities — and grow
              together instead of alone.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              One place connects the learning, the doing, the people, and the openings — so effort
              compounds instead of scattering.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={rootRef} className="relative rounded-3xl border border-border bg-card p-4 shadow-op sm:p-6">
            <svg viewBox="0 0 380 210" className="h-auto w-full" role="img" aria-label="A connected path flowing through Learn, Build, Connect, and Become">
              <path
                ref={pathRef}
                d={PATH}
                fill="none"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {NODES.map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r="17" className="fill-accent" />
                  <circle cx={n.x} cy={n.y} r="17" fill="none" stroke="currentColor" className="text-primary/50" strokeWidth="1.5" />
                  <circle cx={n.x} cy={n.y} r="5" className="fill-primary" />
                  <text
                    x={n.x}
                    y={n.y + 34}
                    textAnchor="middle"
                    className="fill-foreground text-[11px] font-bold"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Learn. Build. Connect. Become. — the path every member walks at their own pace.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
