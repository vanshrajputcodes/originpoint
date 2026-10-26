import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Hammer, Users, Compass, type LucideIcon } from "lucide-react";

interface JourneyStep {
  num: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: JourneyStep[] = [
  {
    num: "01",
    title: "Learn",
    description: "Build skills through practical learning, peer discussions, and shared resources.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Build",
    description: "Work on projects, participate in hackathons, and turn ideas into real outcomes.",
    icon: Hammer,
  },
  {
    num: "03",
    title: "Connect",
    description: "Meet collaborators, mentors, developers, designers, and ambitious peers.",
    icon: Users,
  },
  {
    num: "04",
    title: "Become",
    description: "Develop your portfolio, discover opportunities, and move toward your goals.",
    icon: Compass,
  },
];

/**
 * The four-part Learn. Build. Connect. Become. journey. The connecting line
 * fills progressively as the section scrolls (GSAP ScrollTrigger); on mobile
 * it reads as a clean vertical timeline. Fully readable without animation.
 */
export function Journey() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const line = el.querySelector<HTMLElement>("[data-progress-line]");
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {/* Horizontal rail (desktop) */}
      <div className="relative mx-10 hidden h-px bg-border lg:block" aria-hidden>
        <div data-progress-line className="h-px w-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
      </div>

      <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((step, i) => (
          <li key={step.num} className="relative">
            {/* rail nodes (desktop) */}
            <span
              aria-hidden
              className="absolute top-[7px] hidden size-3.5 rounded-full border-2 border-primary bg-background lg:-left-1.5 lg:block"
            />
            {/* vertical rail (mobile/tablet) */}
            {i < STEPS.length - 1 ? (
              <span
                aria-hidden
                className="absolute top-9 left-[7px] h-[calc(100%+1.5rem)] w-px bg-border lg:hidden"
              />
            ) : null}
            <div className="lg:pl-0">
              <span
                aria-hidden
                className="inline-grid size-8 place-items-center rounded-full bg-primary text-primary-foreground lg:hidden"
              >
                <step.icon className="size-4" />
              </span>
              <p className="mt-0 text-sm font-bold tracking-[0.18em] text-primary lg:mt-4">{step.num}</p>
              <h3 className="mt-1.5 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
