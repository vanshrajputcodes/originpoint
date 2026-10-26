import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Honest guidance from mentors and experienced peers — on skills, projects, and career decisions. Offer mentorship or find a mentor.",
      },
      { property: "og:title", content: "Mentorship — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Get honest feedback and direction from people who have done the work.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MentorshipPage,
});

const MENTORSHIP_FORMATS = [
  {
    title: "Project reviews",
    body: "A mentor reviews your project — code, design, or strategy — and tells you what's working, what's not, and what to do next.",
  },
  {
    title: "Career conversations",
    body: "One focused discussion about direction: which roles fit your strengths, what to learn, and what to stop worrying about.",
  },
  {
    title: "Mock interviews",
    body: "Practice the real format with feedback rounds — technical, behavioral, portfolio, or case-based.",
  },
  {
    title: "Peer accountability",
    body: "Small groups that set goals together and check in — the gentle pressure that turns plans into progress.",
  },
];

function MentorshipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Mentorship"
        title="Guidance from people who've done the work."
        description="Mentorship at ORIGIN POINT is honest and specific: real feedback on real work, from mentors and experienced peers who remember what starting felt like."
      >
        <a
          href={WHATSAPP.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Find a mentor
        </a>
        <Link
          to="/contact"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Become a mentor
        </Link>
      </PageHero>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Formats"
            title="Four ways mentorship happens."
            description="Matched to the time mentors actually have — a great hour beats a vague monthly promise."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {MENTORSHIP_FORMATS.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                  {i % 2 === 0 ? (
                    <Compass aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  ) : (
                    <HeartHandshake aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="For mentors"
            title="Why experienced members mentor here."
            description="Mentoring sharpens your own judgment, builds your reputation in front of the exact people who hire and collaborate, and — honestly — feels good."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Set your scope", body: "Choose your domain and availability. A few focused hours a month is enough to matter." },
              { title: "Structured matching", body: "We connect you with members whose questions fit your experience — no random noise." },
              { title: "Visible impact", body: "Your reviews and guidance are attributed to you, building a public record of leadership." },
            ].map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Mentor onboarding is based on genuine experience and availability. Reach out through
              the{" "}
              <Link to="/contact" className="font-semibold text-accent-foreground hover:underline">
                contact form
              </Link>{" "}
              or WhatsApp with your background and how you'd like to help.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="One conversation can change the path."
        description="Ask for guidance, or offer it — both move the community forward."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Careers support", to: "/careers" }}
      />
    </main>
  );
}
