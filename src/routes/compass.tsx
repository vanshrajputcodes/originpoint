import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  COMPASS_QUESTIONS,
  recommendRoute,
  type CompassResult,
} from "@/data/compass";
import { WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compass")({
  head: () => ({
    meta: [
      { title: "Community Compass — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Answer three quick questions about your interests and goals, and the Community Compass points you to the right sections and a recommended starting point.",
      },
      { property: "og:title", content: "Community Compass — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Not sure where to start? Three questions to your first step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CompassPage,
});

type Answers = { interest?: string; stage?: string; goal?: string };

function CompassPage() {
  const [answers, setAnswers] = useState<Answers>({});

  const questions = COMPASS_QUESTIONS;
  const current = questions.find((q) => answers[q.id] === undefined);
  const done = current === undefined;
  const result: CompassResult | null = done
    ? recommendRoute(answers.interest ?? "code", answers.stage ?? "starting", answers.goal ?? "learn")
    : null;

  const pick = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <main>
      <PageHero
        eyebrow="Community Compass"
        title="Three questions. One honest starting point."
        description="Tell the compass what pulls you, where you stand, and what you want first — it maps you straight to the right sections of ORIGIN POINT."
      />


      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {done && result ? (
            <Reveal>
              <div className="rounded-4xl border border-border bg-card p-8 shadow-op sm:p-10">
                <p className="text-sm font-semibold tracking-wide text-accent-foreground">
                  Your starting point
                </p>
                <h2 className="text-h2 mt-3 text-balance text-foreground">{result.headline}</h2>
                <p className="text-lead mt-4 text-pretty">{result.summary}</p>
                <ul className="mt-8 grid gap-3">
                  {result.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-secondary"
                      >
                        <span>
                          <span className="font-semibold text-foreground">{link.label}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{link.note}</span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-secondary p-5">
                  <p className="text-sm font-semibold text-foreground">Your first step</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {result.firstStep}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnswers({})}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <RotateCcw aria-hidden className="size-4" />
                  Start over
                </button>
              </div>
            </Reveal>
          ) : current ? (
            <div key={current.id} className="rounded-4xl border border-border bg-card p-8 shadow-op sm:p-10">
              <p className="text-sm font-semibold tracking-wide text-accent-foreground">
                Question {questions.findIndex((q) => q.id === current.id) + 1} of {questions.length}
              </p>
              <h2 className="text-h2 mt-3 text-balance text-foreground">{current.title}</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {current.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => pick(current.id, option.id)}
                    className={cn(
                      "rounded-2xl border border-border bg-background p-5 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <Reveal>
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                Prefer to just look around first?{" "}
                <Link to="/guide" className="font-semibold text-primary hover:underline">
                  Open the Community Guide
                </Link>{" "}
                or{" "}
                <a
                  href={WHATSAPP.communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  join the community
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Every journey has an origin."
        description="Wherever the compass points, the first move is the same: show up among people building."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "How It Works", to: "/join" }}
      />
    </main>
  );
}
