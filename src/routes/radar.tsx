import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarX2, ExternalLink } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  RADAR_FILTERS,
  RADAR_NOTE,
  RADAR_PORTALS,
  type RadarPortal,
} from "@/data/radar";
import { EVENT_CATEGORIES, CONFIRMED_EVENTS, type EventItem } from "@/data/events";
import { WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "Opportunity & Events Radar — ORIGIN POINT" },
      {
        name: "description",
        content:
          "A filterable radar for hackathons, internships, workshops, and community events — confirmed community events plus curated links to real external portals.",
      },
      { property: "og:title", content: "Opportunity & Events Radar — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Hackathons, internships, workshops, and community events — filtered to what you need.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RadarPage,
});

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">{event.name}</h3>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {event.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-primary">{event.category}</p>
    </article>
  );
}

function PortalCard({ portal }: { portal: RadarPortal }) {
  return (
    <a
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground">{portal.name}</h3>
        <ExternalLink
          aria-hidden
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        />
      </div>
      <p className="mt-1 text-xs font-medium text-primary">
        {portal.categories
          .map((c) => RADAR_FILTERS.find((f) => f.id === c)?.label ?? c)
          .join(" · ")}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{portal.description}</p>
    </a>
  );
}

function RadarPage() {
  const [filter, setFilter] = useState("all");
  const portals =
    filter === "all" ? RADAR_PORTALS : RADAR_PORTALS.filter((p) => p.categories.includes(filter));

  return (
    <main>
      <PageHero
        eyebrow="Opportunity & Events Radar"
        title="Everything worth applying to, in one sweep."
        description="A filterable radar for hackathons, internships, workshops, and community events. Community events are listed only once confirmed — external portals are curated links to real platforms."
      />


      {/* Community events — honest, never invented */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Community"
            title="ORIGIN POINT events."
            description="Events run under five formats. Confirmed community events appear here with real dates and registration links — nothing tentative."
          />
          {CONFIRMED_EVENTS.length === 0 ? (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center sm:p-12">
                <CalendarX2 aria-hidden className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold text-foreground">
                  No confirmed community events announced yet
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We don't list invented lineups. When an event is confirmed it appears here and is
                  announced first in the community — meanwhile the radar below points to live
                  opportunities on external platforms.
                </p>
                <a
                  href={WHATSAPP.communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get announcements on WhatsApp
                </a>
              </div>
            </Reveal>
          ) : (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONFIRMED_EVENTS.map((e) => (
                <li key={e.name}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          )}
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {EVENT_CATEGORIES.map((cat) => (
                <span
                  key={cat.name}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filterable external radar */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="External radar"
            title="Live portals, filtered."
            description="A manually maintained list of real, evergreen platforms where hackathons, internships, and workshops are posted. Open the ones that match your filter."
          />

          <Reveal>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter radar listings">
              {RADAR_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    filter === f.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portals.map((portal, i) => (
              <Reveal as="li" key={portal.url} delay={Math.min(i * 0.05, 0.25)}>
                <PortalCard portal={portal} />
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">{RADAR_NOTE}</p>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/opportunities"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See how we prepare you
              </Link>
              <Link
                to="/events"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Community events page
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="The radar finds openings. The community gets you ready."
        description="Portals tell you what exists — preparation, teammates, and honest feedback come from the community."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Careers & Internships", to: "/careers" }}
      />
    </main>
  );
}
