import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PROGRAMS, PROGRAM_STATUS_NOTE } from "@/data/programs";
import { WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Six program families — OP Learn, OP Build, OP Hack, OP Careers, OP Connect, and OP Launch. Status stated honestly; join and help launch what you want.",
      },
      { property: "og:title", content: "Programs — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Learning, building, competing, careers, networking, and launching — organized into six program families.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Programs"
        title="One ecosystem, six ways to grow."
        description="Everything ORIGIN POINT does organizes into six program families. Each panel says honestly what is live today and what is proposed."
      >
        <a
          href={WHATSAPP.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join Community
        </a>
      </PageHero>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <p className="rounded-xl border border-border bg-accent px-4 py-3 text-sm text-accent-foreground">
              {PROGRAM_STATUS_NOTE}
            </p>
          </Reveal>
          <ul className="mt-12 space-y-6">
            {PROGRAMS.map((p, i) => (
              <Reveal as="li" key={p.key} delay={Math.min(i * 0.04, 0.2)}>
                <article
                  className={cn(
                    "grid gap-8 rounded-3xl border bg-card p-8 transition-colors lg:grid-cols-[1fr_1.2fr]",
                    p.status === "Active" ? "border-primary/40" : "border-border",
                  )}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-h3">{p.name}</h2>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-semibold",
                          p.status === "Active"
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-medium text-foreground">{p.headline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={WHATSAPP.communityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Show interest in {p.name}
                      </a>
                      <Link
                        to="/contact"
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                      >
                        Ask the team
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Which program should launch first?"
        description="Tell the team what you want to join — member demand decides the roadmap."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </main>
  );
}
