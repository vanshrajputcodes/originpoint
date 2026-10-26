import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Join the ORIGIN POINT WhatsApp community — meet builders, find collaborators, hear about events and opportunities first.",
      },
      { property: "og:title", content: "Community — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Find your people. Learn, build, and move forward together.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CommunityPage,
});

const WAYS_IN = [
  {
    title: "Start the conversation",
    body: "Introduce yourself in the WhatsApp community — what you do, what you're learning, and what you want to build. That's the whole onboarding.",
  },
  {
    title: "Plug into what's live",
    body: "OP Connect — networking, introductions, and industry conversations — is active today, with everything else growing from member demand.",
  },
  {
    title: "Raise your hand",
    body: "Want a workshop, a hackathon, a project team? Say so. Programs launch when members rally around them — early voices get priority.",
  },
  {
    title: "Give back early",
    body: "Answer questions, share opportunities you find, review someone's work. Contribution is how reputation gets built here.",
  },
];

const PARTICIPATION = [
  {
    role: "Beginners",
    body: "Learning roadmaps, workshops, and beginner-friendly project roles. No question is too basic — everyone here started somewhere.",
  },
  {
    role: "Experienced professionals",
    body: "Project reviews, hackathon judging, honest career advice, and a network of people who actually build.",
  },
  {
    role: "Mentors",
    body: "Structured mentorship opportunities matched to your availability — a few focused hours can change someone's trajectory.",
  },
  {
    role: "Campus organizers",
    body: "Start a chapter at your institution: host events, lead a local community, and build real leadership experience.",
  },
  {
    role: "Companies & organizations",
    body: "Collaborate on events, challenges, and hiring pipelines. Reach motivated builders with proof of work.",
  },
];

function CommunityPage() {
  return (
    <main>
      <PageHero
        eyebrow="Community"
        title="Find your people."
        description="ORIGIN POINT lives in its WhatsApp community — announcements, introductions, event updates, opportunity sharing, and honest conversations, all in one place."
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
          Explore programs
        </Link>
      </PageHero>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Getting started"
            title="How to make the community yours."
            description="Joining takes one tap. Making it valuable takes a little intent — here's how."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {WAYS_IN.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Participation"
            title="Every level of experience belongs."
            description="The community is designed so different stages strengthen each other — beginners get direction, experienced members get impact."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTICIPATION.map((p, i) => (
              <Reveal as="li" key={p.role} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold text-foreground">{p.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
              Joining the WhatsApp community is free. If any program or event ever carries a cost,
              it will be stated explicitly in advance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Campus chapters"
            title="Bring ORIGIN POINT to your campus."
            description="Students who want to lead can establish a chapter at their institution — with support from the core team on events, formats, and growth."
          />
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start a chapter
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP.contactNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Message us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="The community is the point."
        description="Programs launch, events happen, and opportunities move — all through the people who show up."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "About ORIGIN POINT", to: "/about" }}
      />
    </main>
  );
}
