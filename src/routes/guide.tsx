import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { FAQS } from "@/data/faqs";
import { COMMUNITY_ETIQUETTE, ONBOARDING_STEPS } from "@/data/guide";
import { JOURNEY_STAGES } from "@/data/journey";
import { RADAR_NOTE, RADAR_PORTALS } from "@/data/radar";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "OP Community Guide — ORIGIN POINT" },
      {
        name: "description",
        content:
          "The curated ORIGIN POINT guide: searchable FAQs, community etiquette, onboarding guidance, and resource discovery — no API, just honest knowledge.",
      },
      { property: "og:title", content: "OP Community Guide — ORIGIN POINT" },
      {
        property: "og:description",
        content: "FAQs, etiquette, onboarding, and curated resources in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main>
      <PageHero
        eyebrow="OP Community Guide"
        title="Everything a new member needs, curated."
        description="Frequently asked questions, how the community runs, onboarding guidance, and where to find resources — all curated by the team, no AI required."
      />

      {/* Searchable FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading eyebrow="Answers" title="Search the FAQ." />
          <Reveal>
            <div className="mt-8 relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions — e.g. beginners, internships, mentors…"
                aria-label="Search the FAQ"
                className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </div>
            {filteredFaqs.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                No answers matched "{query}". Ask the team directly on WhatsApp — real questions
                become real FAQ entries.
              </p>
            ) : (
              <div className="mt-8">
                <FaqAccordion faqs={filteredFaqs} />
              </div>
            )}
          </Reveal>
          <Reveal>
            <p className="mt-6 text-sm text-muted-foreground">
              Want the interactive version?{" "}
              <Link to="/op-ai" className="font-semibold text-primary hover:underline">
                Try OP AI
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Etiquette */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Etiquette"
            title="How the community runs."
            description="Six expectations that keep the WhatsApp community useful for everyone."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_ETIQUETTE.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Onboarding */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Onboarding"
            title="Your first weeks, in order."
            description="Five steps from joining to contributing — and the seven-stage journey they feed into."
          />
          <ol className="mt-10 grid gap-4 lg:grid-cols-5">
            {ONBOARDING_STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs font-bold text-primary">Step {i + 1}</p>
                  <h3 className="mt-1.5 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-2">
              {JOURNEY_STAGES.map((stage) => (
                <span
                  key={stage.num}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {stage.num} · {stage.title}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Resource discovery */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Resource discovery"
            title="Curated starting points."
            description="Real platforms the community learns and builds with — the same curated list the Opportunity Radar filters."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RADAR_PORTALS.map((portal, i) => (
              <Reveal as="li" key={portal.url} delay={Math.min(i * 0.05, 0.25)}>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-secondary"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-foreground">{portal.name}</span>
                    <ExternalLink
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {portal.description}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">{RADAR_NOTE}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Read the guide. Then write your own chapter."
        description="The guide tells you how the community works — joining is how it starts working for you."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Community Compass", to: "/compass" }}
      />
    </main>
  );
}
