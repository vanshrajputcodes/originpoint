import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { JOURNEY_STAGES } from "@/data/journey";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "How It Works — ORIGIN POINT" },
      {
        name: "description",
        content:
          "How ORIGIN POINT works: join the free WhatsApp community, introduce yourself, and move through the seven-stage journey from discovering skills to giving back.",
      },
      { property: "og:title", content: "How It Works — ORIGIN POINT" },
      {
        property: "og:description",
        content:
          "One tap to join. A seven-stage journey from discovering what excites you to lifting the next member up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "How It Works — ORIGIN POINT" },
      {
        name: "twitter:description",
        content: "One tap to join. A seven-stage journey from discovery to giving back.",
      },
    ],
  }),
  component: JoinPage,
});

const FIRST_STEPS = [
  {
    step: "Step 1",
    title: "Join the WhatsApp community",
    body: "One tap and you're in. Announcements, introductions, and day-to-day conversation all happen there — it's free.",
    action: "internal" as const,
  },
  {
    step: "Step 2",
    title: "Introduce yourself",
    body: "Say who you are and what you want to learn or build. Beginners, career switchers, and non-tech members are all welcome — say so proudly.",
    action: "none" as const,
  },
  {
    step: "Step 3",
    title: "Pick your lane and start",
    body: "Follow the learning roadmaps, watch for workshop and hackathon announcements, and put your hand up for a project role that fits you.",
    action: "none" as const,
  },
];

function JoinPage() {
  return (
    <main>
      <PageHero
        eyebrow="Start here"
        title="Starting is one tap away."
        description="No applications, no eligibility tests, no fees. Here's exactly what happens after you join and how members grow inside the community."
      >
        <a
          href={WHATSAPP.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join Community
        </a>
        <Link
          to="/programs"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          See the Programs
        </Link>
      </PageHero>

      {/* First steps */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The first week"
            title="Three steps, then you're moving."
            description="Most members do this in their first days. Nothing is mandatory — but this is the fastest path from joining to contributing."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {FIRST_STEPS.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="text-xs font-bold tracking-wide text-primary uppercase">{s.step}</span>
                  <h3 className="mt-2 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  {s.action === "internal" ? (
                    <a
                      href={WHATSAPP.communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Join now
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The full journey */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The long game"
            title="A seven-stage journey, at your pace."
            description="Every stage is supported by the community — roadmaps and workshops for learning, teams for building, demo days for showcasing, and mentors for the last mile."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.num} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <span className="text-xs font-bold text-primary">{stage.num}</span>
                  <h3 className="mt-2 font-semibold text-foreground">{stage.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Honest status */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground uppercase">
                  Happening now
                </span>
                <h3 className="mt-3 font-semibold text-foreground">The community is live</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The WhatsApp group is active — introductions, discussions, and announcements happen daily.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground uppercase">
                  In progress
                </span>
                <h3 className="mt-3 font-semibold text-foreground">Programs are ramping up</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Some programs are already active, others are proposed and shaped with early members.{" "}
                  <Link to="/programs" className="font-semibold text-accent-foreground hover:underline">
                    See their real status
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-muted-foreground uppercase">
                  Coming soon
                </span>
                <h3 className="mt-3 font-semibold text-foreground">Events are being planned</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nothing confirmed yet — and we won't pretend otherwise.{" "}
                  <Link to="/events" className="font-semibold text-accent-foreground hover:underline">
                    Watch the events page
                  </Link>{" "}
                  or the community for first announcements.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your journey doesn't have to start alone."
        description="Join today and meet the people who will learn, build, and grow alongside you."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Read the FAQ", to: "/faq" }}
      />
    </main>
  );
}
