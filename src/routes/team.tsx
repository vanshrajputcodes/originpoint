import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { FounderCard } from "@/components/shared/FounderCard";
import { FOUNDERS } from "@/data/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Meet the founders of ORIGIN POINT — Vansh Raj Singh and Dishank Singh — and how the community is organized.",
      },
      { property: "og:title", content: "Our Team — ORIGIN POINT" },
      {
        property: "og:description",
        content: "The people behind ORIGIN POINT.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our team"
        title="Small team, open community."
        description="ORIGIN POINT is run by its founders with the help of members who take initiative — mentors, chapter organizers, and volunteers."
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading eyebrow="Founders" title="The founders." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <Reveal as="li" key={f.name}>
                <FounderCard founder={f} />
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Detailed biographies are published only with verified information. Connect with the
              founders directly on LinkedIn — both are active in the community.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Community roles"
            title="The team is bigger than the org chart."
            description="The community runs on member contribution — here's how people step into ownership."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Mentors", body: "Experienced members who guide learners and review projects in their domain." },
              { title: "Chapter organizers", body: "Students and professionals who run ORIGIN POINT communities at their institutions." },
              { title: "Event leads", body: "Members who plan and run hackathons, workshops, and meetups." },
              { title: "Project leads", body: "Builders who own community projects from scoping through delivery." },
              { title: "Content contributors", body: "Writers, designers, and creators who produce learning material and community updates." },
              { title: "Volunteers", body: "Anyone who helps at events, moderates conversations, or welcomes new members." },
            ].map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Volunteer or lead an initiative
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Your name could be on this page."
        description="Chapter leads, mentors, and project owners all start as members who raised their hand."
        primary={{ label: "Join Community", href: "https://chat.whatsapp.com/G4sGk613psAHPIDpmOq4RE", external: true }}
        secondary={{ label: "See mentorship", to: "/mentorship" }}
      />
    </main>
  );
}
