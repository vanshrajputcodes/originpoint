import { useReducedMotion } from "framer-motion";
import { PLATFORMS, PLATFORMS_NOTE } from "@/data/platforms";

function BrandItem({ name, svgPath, wordmark }: { name: string; svgPath?: string; wordmark?: boolean }) {
  return (
    <span className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-xl px-5 text-foreground/70 transition-colors duration-300 hover:text-foreground">
      {svgPath ? (
        <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 fill-current transition-colors duration-300 group-hover:text-primary">
          <path d={svgPath} />
        </svg>
      ) : null}
      <span className={wordmark ? "text-lg font-extrabold tracking-tight whitespace-nowrap" : "text-lg font-bold tracking-tight whitespace-nowrap"}>
        {wordmark ? name.replace(/\.com$/, ".com") : name}
      </span>
    </span>
  );
}

/**
 * Continuous platforms marquee: the track holds two identical sequences so the
 * loop never gaps. Pauses on hover; renders as a static wrapped row when the
 * user prefers reduced motion.
 */
export function LogoMarquee() {
  const reduced = useReducedMotion();
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-2 pr-2">
      {PLATFORMS.map((p) => (
        <li key={`${hidden ? "b" : "a"}-${p.id}`}>
          <BrandItem {...p} />
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {PLATFORMS.map((p) => (
          <BrandItem key={p.id} {...p} />
        ))}
      </div>
    );
  }

  return (
    <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export { PLATFORMS_NOTE };
