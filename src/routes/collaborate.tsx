import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  COLLAB_SKILLS,
  COMMITMENT_LEVELS,
  TEAMMATE_TYPES,
  buildCollaboratorMessage,
  validateCollaboratorRequest,
  type CollaboratorRequest,
} from "@/data/collaborate";
import { waMeLink, WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    meta: [
      { title: "Find a Collaborator — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Select your skills, describe your project idea, and pick the teammate you need — get a ready-to-post collaboration request for the ORIGIN POINT community.",
      },
      { property: "og:title", content: "Find a Collaborator — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Skills in, teammates found — a one-tap collaboration request.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CollaboratePage,
});

function ChipGroup({
  options,
  selected,
  onToggle,
  single = false,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  single?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-secondary",
            )}
          >
            {option}
          </button>
        );
      })}
      {single ? null : null}
    </div>
  );
}

function toggleIn(list: string[], value: string, single = false): string[] {
  if (list.includes(value)) return list.filter((v) => v !== value);
  return single ? [value] : [...list, value];
}

function CollaboratePage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [idea, setIdea] = useState("");
  const [teammateTypes, setTeammateTypes] = useState<string[]>([]);
  const [commitment, setCommitment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<CollaboratorRequest | null>(null);

  const submit = () => {
    const draft = { name, skills, idea, teammateTypes, commitment };
    const problem = validateCollaboratorRequest(draft);
    if (problem) {
      setError(problem);
      setSubmitted(null);
      return;
    }
    setError(null);
    setSubmitted(draft);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Find a Collaborator"
        title="Your idea is missing a few skills. That's the point."
        description="Select what you bring, describe what you're building, and pick the teammate you need — you'll get a ready-to-post collaboration request for the community."
      />


      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {submitted ? (
            <Reveal>
              <div className="rounded-4xl border border-border bg-card p-8 shadow-op sm:p-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                  <CheckCircle2 aria-hidden className="size-5 text-primary" />
                  Request ready
                </div>
                <h2 className="text-h2 mt-3 text-balance text-foreground">
                  Post this in the community.
                </h2>
                <dl className="mt-6 space-y-3 rounded-2xl bg-secondary p-6 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Name</dt>
                    <dd className="mt-0.5 text-muted-foreground">{submitted.name}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Skills you bring</dt>
                    <dd className="mt-0.5 text-muted-foreground">{submitted.skills.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Project idea</dt>
                    <dd className="mt-0.5 text-muted-foreground">{submitted.idea}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Looking for</dt>
                    <dd className="mt-0.5 text-muted-foreground">{submitted.teammateTypes.join(", ")}</dd>
                  </div>
                  {submitted.commitment ? (
                    <div>
                      <dt className="font-semibold text-foreground">Commitment</dt>
                      <dd className="mt-0.5 text-muted-foreground">{submitted.commitment}</dd>
                    </div>
                  ) : null}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={waMeLink(buildCollaboratorMessage(submitted))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Send request on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setError(null);
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    Edit my answers
                  </button>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  This is a local prototype — nothing is stored on this site. The message opens in
                  WhatsApp for you to review and send, and matching happens in the community. A real
                  in-app matching system is planned for later.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="rounded-4xl border border-border bg-card p-8 shadow-op sm:p-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  <div>
                    <label htmlFor="collab-name" className="text-sm font-semibold text-foreground">
                      Your name
                    </label>
                    <input
                      id="collab-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Mehta"
                      className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                  </div>

                  <div className="mt-8">
                    <span className="text-sm font-semibold text-foreground">Skills you bring</span>
                    <p className="mt-1 text-xs text-muted-foreground">Pick as many as apply.</p>
                    <div className="mt-3">
                      <ChipGroup
                        options={COLLAB_SKILLS}
                        selected={skills}
                        onToggle={(v) => setSkills((prev) => toggleIn(prev, v))}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <label htmlFor="collab-idea" className="text-sm font-semibold text-foreground">
                      Project idea
                    </label>
                    <textarea
                      id="collab-idea"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      rows={4}
                      placeholder="What are you building, and what stage is it at?"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                  </div>

                  <div className="mt-8">
                    <span className="text-sm font-semibold text-foreground">Teammate you need</span>
                    <div className="mt-3">
                      <ChipGroup
                        options={TEAMMATE_TYPES}
                        selected={teammateTypes}
                        onToggle={(v) => setTeammateTypes((prev) => toggleIn(prev, v))}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <span className="text-sm font-semibold text-foreground">Commitment</span>
                    <p className="mt-1 text-xs text-muted-foreground">Optional — helps teammates plan.</p>
                    <div className="mt-3">
                      <ChipGroup
                        options={COMMITMENT_LEVELS}
                        selected={commitment ? [commitment] : []}
                        onToggle={(v) => setCommitment((prev) => (prev === v ? "" : v))}
                        single
                      />
                    </div>
                  </div>

                  {error ? (
                    <p role="alert" className="mt-6 text-sm font-medium text-destructive">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    Build my collaboration request
                  </button>
                </form>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground">
                No project idea yet?{" "}
                <a
                  href={WHATSAPP.communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Join the community
                </a>{" "}
                and find one in the making.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="How matching works"
            title="Honest about the prototype."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Today",
                detail:
                  "Your request opens in WhatsApp for you to review and send. The community is where matches actually happen — introductions, teammates, and project teams form there.",
              },
              {
                title: "What this page does",
                detail:
                  "It structures your ask — skills, idea, teammate type — so members can respond to a clear request instead of a vague one.",
              },
              {
                title: "Later",
                detail:
                  "Real in-app matching needs a shared backend with member profiles. When that exists, this prototype graduates into it — the format here is the blueprint.",
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
        </div>
      </section>

      <CtaBand
        title="Find the people. Build the thing."
        description="The fastest way to a teammate is a clear request in a room full of builders."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Projects & Open Source", to: "/projects" }}
      />
    </main>
  );
}
