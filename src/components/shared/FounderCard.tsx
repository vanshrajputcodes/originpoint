import { Linkedin as LinkedInIcon } from "lucide-react";
import type { Founder } from "@/data/site";


/**
 * Typographic founder profile. Portraits are only shown when an authentic
 * image is supplied — never generated placeholders.
 */
export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/40">
      <div>
        <div
          aria-hidden
          className="grid size-14 place-items-center rounded-2xl bg-accent text-lg font-bold text-accent-foreground"
        >
          {founder.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">{founder.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{founder.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{founder.focus}</p>
      </div>
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent-foreground"
        aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
      >
        <span aria-hidden className="grid size-8 place-items-center rounded-lg border border-border bg-background">
          <LinkedInIcon className="size-4" />
        </span>
        LinkedIn profile
      </a>
    </div>
  );
}
