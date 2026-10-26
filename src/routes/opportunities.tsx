import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ACCESS_CARDS } from "@/data/access";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Hackathons, internships, jobs, freelance work, and open-source contributions — discovered and shared through the ORIGIN POINT community.",
      },
      { property: "og:title", content: "Opportunities — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Find opportunities — and the preparation to make the most of them.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: OpportunitiesPage,
});

const OPPORTUNITY_TYPES = [
  {
    title: "Hackathons & competitions",
    body: "Events announced in the community with honest details — dates, formats, and what teams need. Never a fabricated prize pool.",
    link: { label: "See events", to: "/events" },
  },
  {
    title: "Internships & roles",
    body: "Internships and jobs shared by members and partners, with context on who each one suits and how to apply well.",
    link: { label: "Career support", to: "/careers" },
  },
  {
    title: "Open source & contributions",
    body: "Beginner-friendly contribution paths where your first pull request becomes a public, verifiable track record.",
    link: { label: "Open source", to: "/projects" },
  },
  {
    title: "Freelance & real-world briefs",
    body: "Real-world work to practice on — scoping, communication, delivery — so your first client isn't an experiment.",
    link: { label: "Build experience", to: "/projects" },
  },
  {
    title: "Collaborators & teams",
    body: "Find people with complementary skills — developers with designers, builders with marketers — inside one community.",
    link: { label: "Find your people", to: "/community" },
  },
  {
    title: "Mentorship & feedback",
    body: "Experienced eyes on your projects and career decisions, before the stakes are high.",
    link: { label: "Explore mentorship", to: "/mentorship" },
  },
];

function OpportunitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Opportunities"
        title="Opportunity is a network effect."
        description="Hackathons, internships, roles, freelance briefs, and collaborations — they move through people. ORIGIN POINT is where those people are."
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
          <SectionHeading
            eyebrow="What flows through the community"
            title="Six kinds of opportunity."
            description="Shared by members and partners, with honest context — no invented openings, no exaggerated outcomes."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPPORTUNITY_TYPES.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">{o.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                  <Link
                    to={o.link.to}
                    className="mt-4 text-sm font-semibold text-accent-foreground hover:underline"
                  >
                    {o.link.label}
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Be ready for them"
            title="Access means little without preparation."
            description="When an opportunity appears, the members who benefit are the ones already prepared. The community invests in that."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACCESS_CARDS.slice(1, 9).map((card, i) => (
              <Reveal as="li" key={card.title} delay={(i % 4) * 0.05}>
                <Link
                  to={card.link.to}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
                >
                  <span aria-hidden className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <card.icon className="size-4.5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{card.title}</h3>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              ORIGIN POINT facilitates preparation and access. Jobs, internships, referrals, and
              placement outcomes are not guaranteed — your preparation and each opportunity's own
              process decide the result. For filterable live listings, open the{" "}
              <Link to="/radar" className="font-semibold text-primary hover:underline">
                Opportunity &amp; Events Radar
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Hear about it first."
        description="Opportunities move fast. The community is where they get shared — with context, not spam."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Career preparation", to: "/careers" }}
      />
    </main>
  );
}
