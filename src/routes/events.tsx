import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarX2 } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { EVENT_CATEGORIES, CONFIRMED_EVENTS, type EventItem } from "@/data/events";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Hackathons & Events — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Hackathons, workshops, community meetups, technical talks, and non-technical challenges — confirmed events announced honestly, never invented.",
      },
      { property: "og:title", content: "Hackathons & Events — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Where the community shows up — build, learn, and compete together.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: EventsPage,
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
      <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
        {event.date ? <div>📅 {event.date}</div> : null}
        {event.mode ? <div>Location: {event.mode}{event.location ? ` — ${event.location}` : ""}</div> : null}
      </dl>
      {event.registrationUrl ? (
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Register
        </a>
      ) : null}
    </article>
  );
}

function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Hackathons & Events"
        title="Where the community shows up."
        description="Events are listed here only once dates and details are confirmed — nothing is invented. Join the community to hear about everything first."
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
          <SectionHeading eyebrow="Calendar" title="Upcoming events." />
          {CONFIRMED_EVENTS.length === 0 ? (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center sm:p-14">
                <CalendarX2 aria-hidden className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold text-foreground">
                  No confirmed events announced yet
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We don't list tentative dates or invented lineups. When an event is confirmed —
                  with a real date, format, and registration details — it appears here and is
                  announced in the community.
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
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Formats"
            title="What we run."
            description="Five event formats — technical and non-technical — designed so members participate, not just attend."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {EVENT_CATEGORIES.map((cat, i) => (
              <Reveal as="li" key={cat.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-5">
                  <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
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
                Propose or host an event
              </Link>
              <Link
                to="/projects"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See what teams build
              </Link>
              <Link
                to="/radar"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Open the Opportunity & Events Radar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Never miss the first one."
        description="The earliest events are the ones members help shape — join now and get a say."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Community page", to: "/community" }}
      />
    </main>
  );
}
