import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/spotlight")({
  head: () => ({
    meta: [
      { title: "Member Spotlight & Build Logs — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Real member projects, learning journeys, and milestones — published only with explicit permission. No invented stories, ever.",
      },
      { property: "og:title", content: "Member Spotlight & Build Logs — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Real stories from real members — published only with permission.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SpotlightPage,
});

function SpotlightPage() {
  return (
    <main>
      <PageHero
        eyebrow="Member Spotlight & Build Logs"
        title="Real members. Real progress. Published with permission."
        description="This page will feature genuine member stories — projects shipped, skills learned, milestones crossed. Every story appears only with the member's explicit permission."
      />


      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="The wall"
            title="The first spotlight hasn't been published yet."
            description="We don't invent testimonials, stats, or stories to fill this space. When real members share real journeys — with their consent — this wall fills up with them."
          />
          <Reveal>
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center sm:p-14">
              <p className="text-lg font-semibold text-foreground">
                This could be your build log
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Join the community, start shipping, keep a log of what you learn and build — and
                when you have a story worth telling, we'll ask your permission to tell it.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={WHATSAPP.communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Join Community
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP.contactNumber}?text=${encodeURIComponent(
                    "I'd like to share my journey for the Member Spotlight — here's my build log:",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Share your story
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="The format"
            title="What a build log includes."
            description="A simple, honest structure — the same one the community encourages in weekly progress posts. It's a format, not a template for invention."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Milestone",
                detail: "One concrete thing that moved: shipped, learned, fixed, or launched.",
              },
              {
                title: "What was built",
                detail: "The artifact itself — a link, a repo, a design, a campaign, a deck.",
              },
              {
                title: "Lessons",
                detail: "What worked, what didn't, and what you'd do differently next week.",
              },
              {
                title: "Next step",
                detail: "The single next move — small enough to start, clear enough to finish.",
              },
            ].map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              Publishing policy: members are featured only with explicit, individual permission —
              obtained before anything goes live. No story is paraphrased into existence, and any
              member can withdraw their feature at any time.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Be the first story on this wall."
        description="Members who join early don't just read the spotlight — they become it."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Projects & Open Source", to: "/projects" }}
      />
    </main>
  );
}
