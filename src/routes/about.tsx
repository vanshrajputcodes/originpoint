import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { FounderCard } from "@/components/shared/FounderCard";
import { BRAND, FOUNDERS } from "@/data/site";
import { JOURNEY_STAGES } from "@/data/journey";
import { DISCIPLINES } from "@/data/disciplines";
import { FAQS } from "@/data/faqs";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Why ORIGIN POINT exists: a community connecting learning, execution, people, and opportunity — founded by Vansh Raj Singh and Dishank Singh.",
      },
      { property: "og:title", content: "About — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Talent is everywhere. Opportunity should be too. Meet the community behind the mission.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Build over talk",
    body: "Progress here is measured in shipped projects, not intentions. Every program pushes members toward something real.",
  },
  {
    title: "Honesty over hype",
    body: "No fake counters, invented placements, or borrowed credibility. What is confirmed is confirmed; what is not is labeled.",
  },
  {
    title: "Cross-functional by design",
    body: "Builders need designers, marketers, and business minds. The community is deliberately multidisciplinary.",
  },
  {
    title: "Give back as you grow",
    body: "Every member who moves forward holds the door for the next one. Mentorship is a stage of the journey, not a favor.",
  },
];

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Potential is the starting point."
        description={`${BRAND.name} is a community and opportunity ecosystem for people who want to do more than learn — they want to build, compete, collaborate, and create opportunities.`}
      >
        <Link
          to="/community"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Meet the community
        </Link>
      </PageHero>

      {/* Mission */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Our mission"
            title="Connect learning, execution, people, and opportunity."
            description={BRAND.mission}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The journey, summarized */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="How members grow"
            title="A journey, not a syllabus."
            description="Members move through seven stages at their own pace — the community supports every step."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STAGES.map((s, i) => (
              <Reveal as="li" key={s.num} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <span className="text-xs font-bold text-primary">{s.num}</span>
                  <h3 className="mt-2 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Beyond technology */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Beyond technology"
            title="Every discipline has a place here."
            description="Real projects fail without them — so ORIGIN POINT welcomes them from day one."
          />
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {DISCIPLINES.map((d) => (
              <li key={d}>
                <span className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading eyebrow="Founders" title="Started by two builders." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <Reveal as="li" key={f.name}>
                <FounderCard founder={f} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <div className="mt-12 max-w-3xl">
            <FaqAccordion faqs={FAQS.slice(0, 8)} />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More questions?{" "}
            <Link to="/faq" className="font-semibold text-accent-foreground hover:underline">
              Read the full FAQ
            </Link>{" "}
            or{" "}
            <a href={WHATSAPP.communityUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-foreground hover:underline">
              ask the community directly
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Be part of the story."
        description="The community is young — which means your contribution shapes what it becomes."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Explore Programs", to: "/programs" }}
      />
    </main>
  );
}
