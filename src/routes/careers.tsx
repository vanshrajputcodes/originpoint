import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PREP_TRACKS, SUPPORT_SERVICES, CAREERS_HONESTY_NOTE } from "@/data/careers";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Internships — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Resume reviews, mock interviews, skill-gap planning, and opportunity discovery — honest career preparation for tech and non-tech roles.",
      },
      { property: "og:title", content: "Careers & Internships — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Be ready before the opportunity arrives. Preparation for software, AI, design, marketing, and business roles.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers & Internships"
        title="Be ready before the opportunity arrives."
        description="ORIGIN POINT's career support is preparation-first: build proof of work, practice the formats, and walk into every interview having done a dry run."
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
            eyebrow="Role tracks"
            title="Preparation for the roles you actually want."
            description="Tech and non-tech alike — each track starts from what the role demands, not from a generic checklist."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PREP_TRACKS.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Support services"
            title="What the community provides."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SUPPORT_SERVICES.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 5) * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-10 rounded-2xl border border-border bg-accent p-6">
              <p className="text-sm leading-relaxed text-accent-foreground">{CAREERS_HONESTY_NOTE}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Employers & partners"
            title="Hiring? Meet builders with proof of work."
            description="Organizations can partner with ORIGIN POINT to reach members whose skills are demonstrated in shipped projects and open-source contributions — not just claims on a resume."
          />
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start a partnership
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
        title="Preparation compounds."
        description="Every review, mock interview, and shipped project makes the next opportunity easier to win."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Build projects", to: "/projects" }}
      />
    </main>
  );
}
