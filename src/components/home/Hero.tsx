import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PixelTeam } from "@/components/home/PixelTeam";
import { WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const HEADLINE_WORDS = ["Every", "Journey", "Has", "an"] as const;

const FLOATING_CHIPS = [
  { label: "Learn", className: "top-[2%] left-[1%]", delay: 0 },
  { label: "Build", className: "top-[38%] right-[0%]", delay: 0.7 },
  { label: "Collaborate", className: "bottom-[30%] left-[0%]", delay: 1.4 },
  { label: "Grow", className: "bottom-[3%] right-[3%]", delay: 2.1 },
] as const;

function AnimatedHeadline() {
  const reduced = useReducedMotion();
  return (
    <h1 className="text-display text-balance text-foreground">
      {HEADLINE_WORDS.map((word, i) => (
        <motion.span
          key={word}
          className="inline-block"
          initial={reduced ? false : { opacity: 0, y: "0.5em", rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {"\u00A0"}
        </motion.span>
      ))}
      <motion.span
        className="relative inline-block"
        initial={reduced ? false : { opacity: 0, y: "0.5em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="bg-gradient-to-br from-primary to-[oklch(0.6_0.18_35)] bg-clip-text text-primary">
          Origin.
        </span>
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-primary/70"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.span>
    </h1>
  );
}

function VisualStage() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const stageX = useTransform(springX, (v) => v * 12);
  const stageY = useTransform(springY, (v) => v * 12);
  const chipX = useTransform(springX, (v) => v * -18);
  const chipY = useTransform(springY, (v) => v * -18);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[560px] py-6"
    >
      {/* soft radial glow behind the pixel mosaic */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-3xl" />
      </div>

      <motion.div
        {...(reduced ? {} : { style: { x: stageX, y: stageY } })}
        className="relative"
      >
        <PixelTeam />
      </motion.div>

      {/* floating context chips */}
      <motion.div
        aria-hidden
        {...(reduced ? {} : { style: { x: chipX, y: chipY } })}
        className="absolute inset-0"
      >
        {FLOATING_CHIPS.map((chip) => (
          <motion.span
            key={chip.label}
            className={cn(
              "absolute rounded-full border border-border bg-card/95 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-op backdrop-blur-sm",
              chip.className,
            )}
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.9 + chip.delay * 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="block"
              {...(reduced ? {} : { animate: { y: [0, -5, 0] } })}
              transition={{ duration: 3.4, repeat: Infinity, delay: chip.delay, ease: "easeInOut" }}
            >
              {chip.label}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Art-directed homepage hero: editorial headline with word-stagger reveal,
 * layered orbit stage with pointer parallax, and a scroll cue.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-coordinate-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:pt-24 lg:pb-6">
        <div>
          <motion.p
            initial={false}
            animate={{ opacity: 1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-op"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            A community for people who build
          </motion.p>
          <AnimatedHeadline />
          <motion.p
            className="text-lead mt-6 max-w-xl text-pretty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Your starting point for building real skills, shipping meaningful projects, finding
            opportunities, and meeting people who help you move forward.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={WHATSAPP.communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Join the Community
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <Link
              to="/opportunities"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore Opportunities
            </Link>
          </motion.div>
          <motion.p
            className="mt-7 text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Learn. Build. Connect. Become.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <VisualStage />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="relative mx-auto hidden w-fit flex-col items-center gap-1 pb-4 text-muted-foreground lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.span
          {...({ animate: { y: [0, 5, 0] } } as object)}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
