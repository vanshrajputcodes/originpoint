import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Wrench, BookOpen } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { STARTER_SUGGESTIONS } from "@/data/assistant";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/op-ai")({
  head: () => ({
    meta: [
      { title: "OP AI — ORIGIN POINT" },
      {
        name: "description",
        content:
          "OP AI is the community assistant floating on every page — instant answers about ORIGIN POINT from published community information.",
      },
      { property: "og:title", content: "OP AI — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Ask OP AI about the community, programs, events, careers, and how to join.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: OpAiPage,
});

function OpAiPage() {
  return (
    <main>
      <PageHero
        eyebrow="OP AI"
        title="The community assistant, on every page."
        description="Look for the OP AI button in the bottom-right corner — it answers questions about ORIGIN POINT instantly, from published community information."
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="What it knows"
            title="Ask it anything about the community."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Community & programs", body: "What ORIGIN POINT is, the six program families, and how the ecosystem fits together." },
              { icon: Sparkles, title: "Events & opportunities", body: "Event formats, hackathons, internships, and how opportunity sharing works." },
              { icon: Wrench, title: "Building & careers", body: "The project lifecycle, open-source paths, and preparation for placement readiness." },
              { icon: ShieldCheck, title: "People & contact", body: "Founder profiles, mentorship, partnerships, and how to reach the team." },
            ].map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span aria-hidden className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-14 rounded-3xl border border-border bg-card p-8 sm:p-10">
              <h3 className="text-h3">Try it now</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Open OP AI from the floating button and start with one of these:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {STARTER_SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-border bg-accent p-6">
              <p className="text-sm font-semibold text-accent-foreground">An honest note</p>
              <p className="mt-2 text-sm leading-relaxed text-accent-foreground/90">
                OP AI is a local knowledge assistant — it matches your question against curated
                community content and answers from that alone. It is not connected to a live AI
                model, doesn't collect your data, and says so up front. When a secure AI backend
                becomes available, the assistant is built to plug straight in.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Prefer a human answer?"
        description="The team and the community are one message away."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Contact the team", to: "/contact" }}
      />
    </main>
  );
}
