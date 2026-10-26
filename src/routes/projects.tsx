import { createFileRoute, Link } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { BUILD_LIFECYCLE, PROJECT_CATEGORIES, PROJECT_EMPTY_NOTE } from "@/data/projects";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Open Source — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Real-world project teams, a production-grade development lifecycle, and beginner-friendly open-source contribution paths.",
      },
      { property: "og:title", content: "Projects & Open Source — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Production-ready, not tutorial-ready. Build with a real lifecycle and a real team.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Projects & Open Source"
        title="Production-ready, not tutorial-ready."
        description="Community projects follow the same lifecycle professional teams use — from idea validation through documentation. That's what makes the work count."
      >
        <a
          href={WHATSAPP.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join a project team
        </a>
      </PageHero>

      {/* Lifecycle */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The lifecycle"
            title="How community projects get built."
            description="Ten stages, no shortcuts. Members rotate through roles so everyone learns more than their specialty."
          />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BUILD_LIFECYCLE.map((step, i) => (
              <Reveal as="li" key={step} delay={(i % 5) * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm font-semibold text-foreground">{step}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Project categories + honest empty state */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="What teams build"
            title="Project categories."
            description={PROJECT_EMPTY_NOTE}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {PROJECT_CATEGORIES.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-semibold text-foreground">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Open source */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Open source"
            title="Your first pull request starts here."
            description="Open-source initiative work includes beginner-friendly contribution paths, team formation, and contribution guidelines — so nobody stares at a codebase alone."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Beginner-friendly issues", body: "Curated first tasks with clear expectations and a reviewer assigned." },
              { title: "Team formation", body: "Find collaborators with complementary skills before you commit." },
              { title: "Contribution guidelines", body: "Clear standards for commits, reviews, and communication." },
              { title: "Demo days", body: "Show what you built — to the community, and to the people watching it." },
            ].map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <GitBranch aria-hidden className="size-5 text-primary" />
                  <h3 className="mt-3 font-semibold text-foreground">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Propose a project
              </Link>
              <Link
                to="/events"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See demo days & events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Build something people use."
        description="Join a project team, contribute to open source, or pitch your own — the lifecycle is ready for you."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Programs overview", to: "/programs" }}
      />
    </main>
  );
}
