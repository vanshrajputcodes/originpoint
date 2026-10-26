import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

/** Consistent editorial hero for inner pages — light, precise, unhurried. */
export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="bg-coordinate-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-accent-foreground">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </p>
        <h1 className="text-display max-w-4xl text-balance text-foreground">{title}</h1>
        <p className="text-lead mt-5 max-w-2xl text-pretty">{description}</p>
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

interface CtaBandProps {
  title: string;
  description: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; to: string };
}

/** Reusable closing call-to-action band used at the bottom of pages. */
export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  const primaryCta = primary.external ? (
    <a
      href={primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {primary.label}
    </a>
  ) : (
    <Link
      to={primary.href}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {primary.label}
    </Link>
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-4xl border border-border bg-card px-6 py-14 text-center shadow-op sm:px-12">
        <div aria-hidden className="bg-coordinate-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative">
          <h2 className="text-h2 mx-auto max-w-2xl text-balance text-foreground">{title}</h2>
          <p className="text-lead mx-auto mt-4 max-w-xl text-pretty">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primaryCta}
            {secondary ? (
              <Link
                to={secondary.to}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
