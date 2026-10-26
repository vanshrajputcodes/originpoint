import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  Users,
  Trophy,
  GitBranch,
  Boxes,
  Briefcase,
  Compass,
  Rocket,
  PenTool,
  GraduationCap,
  Target,
  CalendarDays,
  HeartHandshake,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee, PLATFORMS_NOTE } from "@/components/home/LogoMarquee";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { Journey } from "@/components/home/Journey";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WHATSAPP } from "@/lib/whatsapp";
import { PROGRAM_STATUS_NOTE } from "@/data/programs";
import { CONFIRMED_EVENTS } from "@/data/events";
import { PREP_TRACKS, CAREERS_HONESTY_NOTE } from "@/data/careers";
import { PROJECT_CATEGORIES, PROJECT_EMPTY_NOTE } from "@/data/projects";
import { DISCIPLINES } from "@/data/disciplines";
import { FOUNDERS } from "@/data/site";
import { FAQS } from "@/data/faqs";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { FounderCard } from "@/components/shared/FounderCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORIGIN POINT — Every Journey Has an Origin." },
      {
        name: "description",
        content:
          "A community and opportunity ecosystem for builders — hackathons, production-ready projects, mentorship, open source, and career preparation. Learn. Build. Connect. Become.",
      },
      { property: "og:title", content: "ORIGIN POINT — Every Journey Has an Origin." },
      {
        property: "og:description",
        content:
          "A community where developers, designers, founders and creators build real projects, compete, and discover opportunities together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "ORIGIN POINT — Every Journey Has an Origin." },
      {
        name: "twitter:description",
        content: "Learn. Build. Connect. Become. Join a community of builders turning ideas into outcomes.",
      },
    ],
  }),
  component: HomePage,
});

const GAP_CARDS = [
  {
    title: "Learning without application",
    body: "Courses pile up, but nothing gets built. Knowledge stays theoretical while portfolios stay empty.",
  },
  {
    title: "Projects that never ship",
    body: "Half-finished code, demos without users, ideas that quietly die in a folder on a laptop.",
  },
  {
    title: "No honest feedback",
    body: "Without experienced eyes on your work, the same mistakes repeat for years.",
  },
  {
    title: "Collaborators are hard to find",
    body: "Builders with complementary skills rarely sit in the same room — especially early on.",
  },
  {
    title: "Limited exposure to opportunity",
    body: "Hackathons, internships and industry events exist, but information about them reaches few people.",
  },
  {
    title: "Career confusion",
    body: "Roadmaps, placements, interviews, freelancing — everyone gets contradictory advice.",
  },
];

interface EcosystemTile {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  span?: string;
}

const ECOSYSTEM_TILES: EcosystemTile[] = [
  {
    title: "Developer Community",
    description: "Find your people — developers, designers, founders, and creators building together.",
    icon: Users,
    to: "/community",
    span: "lg:col-span-3 lg:row-span-2",
  },
  {
    title: "Hackathons & Competitions",
    description: "Compete, ship under real deadlines, and build the habit of finishing.",
    icon: Trophy,
    to: "/events",
    span: "lg:col-span-3",
  },
  {
    title: "Open Source",
    description: "Make your first PR and build a public, verifiable track record.",
    icon: GitBranch,
    to: "/projects",
    span: "lg:col-span-3",
  },
  {
    title: "Projects & Product Building",
    description: "Teams that plan, build, test, deploy, and maintain real software.",
    icon: Boxes,
    to: "/projects",
    span: "lg:col-span-2",
  },
  {
    title: "Internships & Careers",
    description: "Roles and freelance work shared by members — plus strong applications.",
    icon: Briefcase,
    to: "/careers",
    span: "lg:col-span-2",
  },
  {
    title: "Mentorship & Peer Learning",
    description: "Honest feedback from mentors and experienced peers.",
    icon: Compass,
    to: "/mentorship",
    span: "lg:col-span-2",
  },
  {
    title: "Startups & Networking",
    description: "Validate ideas, find collaborators, and meet people who build.",
    icon: Rocket,
    to: "/community",
    span: "lg:col-span-3",
  },
  {
    title: "Design, Marketing & Non-Technical Careers",
    description: "Real projects need more than engineers — and this community proves it.",
    icon: PenTool,
    to: "/careers",
    span: "lg:col-span-3",
  },
];

const OPPORTUNITY_PATHS = [
  { title: "Internships", to: "/careers", icon: Briefcase },
  { title: "Hackathons", to: "/events", icon: Trophy },
  { title: "Open-source programs", to: "/projects", icon: GitBranch },
  { title: "Scholarships & learning programs", to: "/opportunities", icon: GraduationCap },
  { title: "Jobs & career resources", to: "/careers", icon: Target },
  { title: "Community events", to: "/events", icon: CalendarDays },
] as const;

function JoinButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <a
      href={WHATSAPP.communityUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {children ?? "Join the Community"}
      <ArrowUpRight aria-hidden className="size-4" />
    </a>
  );
}

function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero />

      {/* ── Platforms & Ecosystem marquee ────────────────── */}
      <section aria-labelledby="platforms-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="platforms-heading" className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Platforms &amp; Ecosystem
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Discover the platforms, tools, and professional ecosystems our community engages with.
            </p>
          </div>
          <Reveal className="mt-8">
            <LogoMarquee />
          </Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            {PLATFORMS_NOTE}
          </p>
        </div>
      </section>

      {/* ── Section A — Philosophy ───────────────────────── */}
      <PhilosophySection />

      {/* ── Why ORIGIN POINT exists ──────────────────────── */}
      <section aria-labelledby="why-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Why we exist"
            title={
              <span id="why-heading">
                Talent is everywhere. <span className="text-primary">Opportunity should be too.</span>
              </span>
            }
            description="These gaps show up everywhere — in campuses, cities, and online communities. ORIGIN POINT exists to connect learning, execution, people, and opportunity in one place, starting with the members who show up."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAP_CARDS.map((gap, i) => (
              <Reveal as="li" key={gap.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40">
                  <Quote aria-hidden className="size-4 text-primary" />
                  <h3 className="mt-3 font-semibold text-foreground">{gap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{gap.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              We can't promise to solve these problems at scale overnight. What we can do is give
              every member a place to learn with intent, build with standards, find the right people,
              and hear about real opportunities — and grow that place until it reaches further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Section B — Explore the ecosystem ────────────── */}
      <section aria-labelledby="ecosystem-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The ecosystem"
            title={<span id="ecosystem-heading">Explore the ecosystem</span>}
            description="Eight ways in — each one a real part of the community with its own page, not a placeholder."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr">
            {ECOSYSTEM_TILES.map((tile, i) => (
              <Reveal as="li" key={tile.title} delay={(i % 3) * 0.05} className={cn(tile.span)}>
                <Link
                  to={tile.to}
                  className={cn(
                    "group flex h-full min-h-40 flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-op focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    i === 0 && "bg-accent/60",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 place-items-center rounded-xl bg-background text-foreground transition-colors",
                      i === 0 ? "bg-primary text-primary-foreground" : "",
                    )}
                  >
                    <tile.icon className="size-5" />
                  </span>
                  <h3 className={cn("mt-4 font-semibold text-foreground", i === 0 && "text-h3")}>{tile.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tile.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-foreground">
                    Open
                    <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section C — Learn. Build. Connect. Become. ───── */}
      <section aria-labelledby="journey-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The journey"
            title={
              <span id="journey-heading">
                Learn. Build. Connect. <span className="text-primary">Become.</span>
              </span>
            }
            description="A four-part path every member walks at their own pace — with the community alongside at each step."
          />
          <div className="mt-14">
            <Journey />
          </div>
        </div>
      </section>

      {/* ── Section D — From ideas to real projects ──────── */}
      <section aria-labelledby="projects-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Project showcase"
            title={<span id="projects-heading">From ideas to real projects</span>}
            description="Community projects follow a professional lifecycle from day one. Categories below show what teams form around."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {PROJECT_CATEGORIES.map((cat, i) => (
              <Reveal as="li" key={cat.name} delay={(i % 2) * 0.06}>
                <Link
                  to="/projects"
                  data-cursor="magnetic"
                  data-cursor-label="Explore"
                  className={cn(
                    "group flex h-full min-h-52 flex-col justify-between overflow-hidden rounded-3xl border border-border p-8 transition-all hover:-translate-y-0.5 hover:shadow-op focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    i % 2 === 0 ? "bg-foreground text-background" : "bg-card text-foreground",
                  )}
                >
                  <div>
                    <p className={cn("text-xs font-bold tracking-[0.2em] uppercase", i % 2 === 0 ? "text-primary" : "text-primary")}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-h3 mt-2">{cat.name}</h3>
                    <p className={cn("mt-3 max-w-md text-sm leading-relaxed", i % 2 === 0 ? "text-background/70" : "text-muted-foreground")}>
                      {cat.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                      i % 2 === 0
                        ? "bg-primary text-primary-foreground group-hover:bg-primary/90"
                        : "border border-border bg-background text-foreground group-hover:bg-secondary",
                    )}
                  >
                    How project teams work
                    <ArrowRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-3xl rounded-2xl border border-border bg-accent px-5 py-4 text-sm leading-relaxed text-accent-foreground">
              {PROJECT_EMPTY_NOTE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Section E — Opportunities ────────────────────── */}
      <section aria-labelledby="opportunities-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Opportunities"
            title={<span id="opportunities-heading">Opportunity is a network effect</span>}
            description="Members share internships, openings, competitions, and programs directly in the community — with context from people who've taken them."
          />
          <Reveal>
            <p className="mt-6 max-w-3xl rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              Opportunities are shared by members and verified where possible — they are not an
              automatically updated listings feed.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OPPORTUNITY_PATHS.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 3) * 0.05}>
                <Link
                  to={o.to}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-op"
                >
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <o.icon className="size-5" />
                  </span>
                  <span className="flex-1 font-semibold text-foreground">{o.title}</span>
                  <ArrowRight aria-hidden className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-accent p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-accent-foreground">{CAREERS_HONESTY_NOTE}</p>
              <Link
                to="/opportunities"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                All opportunities
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section F — Beyond coding ────────────────────── */}
      <section aria-labelledby="beyond-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Beyond coding</p>
                <h2 id="beyond-heading" className="text-h2 mt-3 max-w-sm text-balance text-foreground">
                  There's more than one way to make an impact.
                </h2>
                <p className="text-lead mt-6 max-w-md text-pretty">
                  Design, marketing, writing, product, operations — real projects are cross-functional,
                  and every discipline here has a place and a path.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/careers"
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    Non-technical career paths
                  </Link>
                </div>
              </div>
            </Reveal>
            <ul className="flex flex-wrap content-start gap-3">
              {DISCIPLINES.map((d, i) => (
                <Reveal as="li" key={d} delay={Math.min(i * 0.03, 0.3)}>
                  <motion.span
                    className={cn(
                      "inline-block rounded-2xl border border-border bg-card font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
                      i % 5 === 0 ? "px-6 py-4 text-lg" : i % 3 === 0 ? "px-5 py-3 text-base" : "px-4 py-2.5 text-sm",
                    )}
                  >
                    {d}
                  </motion.span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section G — Community experience ─────────────── */}
      <section aria-labelledby="membership-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Community experience"
            title={<span id="membership-heading">Built for every stage of the journey</span>}
            description="Learn from one another, find collaborators, share your work, and contribute wherever you are."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Students & beginners",
                body: "Start with learning roadmaps, workshops, and beginner-friendly project roles. Ask anything — the community is structured to help people start.",
              },
              {
                icon: Briefcase,
                title: "Experienced professionals",
                body: "Share hard-won lessons, review projects, judge hackathons, and build your own network while helping others grow faster.",
              },
              {
                icon: Compass,
                title: "Mentors",
                body: "Offer guidance in your domain — career decisions, project reviews, interview prep — with the time you actually have.",
              },
              {
                icon: HeartHandshake,
                title: "Campus organizers",
                body: "Bring ORIGIN POINT to your institution — the Campus Ambassador Program is built exactly for this.",
              },
              {
                icon: Rocket,
                title: "Founders & freelancers",
                body: "Find collaborators, early users, and honest feedback — and give others a window into how real work gets done.",
              },
              {
                icon: Users,
                title: "Companies & organizations",
                body: "Partner on events, challenges, and hiring pipelines that connect you with motivated, proven builders.",
              },
            ].map((m, i) => (
              <Reveal as="li" key={m.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <span aria-hidden className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <m.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-10 text-center">
              <JoinButton />
              <p className="mt-3 text-xs text-muted-foreground">Opens the WhatsApp community in a new tab — free to join.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Events & programs status ─────────────────────── */}
      <section aria-labelledby="programs-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Programs & events"
            title={<span id="programs-heading">What's live, stated honestly</span>}
            description="Every program carries its real status. Events appear here only when dates and details are confirmed."
          />
          <Reveal>
            <p className="mt-6 rounded-xl border border-border bg-accent px-4 py-3 text-sm text-accent-foreground">
              {PROGRAM_STATUS_NOTE}
            </p>
          </Reveal>
          {CONFIRMED_EVENTS.length === 0 ? (
            <Reveal>
              <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-semibold text-foreground">No confirmed events announced yet</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Join the community and you'll hear about every event first — before it reaches this page.
                </p>
                <JoinButton className="mt-6" />
              </div>
            </Reveal>
          ) : null}
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Explore all six programs
              </Link>
              <Link
                to="/events"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Events & hackathons
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section H — Founders ─────────────────────────── */}
      <section aria-labelledby="founders-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Founders"
            title={<span id="founders-heading">Who's behind ORIGIN POINT</span>}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 0.06}>
                <FounderCard founder={f} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Careers prep tracks ──────────────────────────── */}
      <section aria-labelledby="careers-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Careers"
            title={<span id="careers-heading">Career & internship readiness</span>}
            description="Preparation that respects your time — for the roles you actually want."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PREP_TRACKS.map((track, i) => (
              <Reveal as="li" key={track.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">{track.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{track.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-8">
              <Link
                to="/careers"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-foreground hover:underline"
              >
                Careers & Internships
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Campus Ambassador highlight ──────────────────── */}
      <section aria-labelledby="ambassador-heading" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-3xl border border-primary/40 bg-accent p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Gift className="size-6" />
                </span>
                <div>
                  <h2 id="ambassador-heading" className="text-h3 text-foreground">
                    Become a Campus Ambassador
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-accent-foreground">
                    Lead ORIGIN POINT at your college — and if you rank at the top, goodies, vouchers,
                    coupons and prizes worth ₹15,000 are waiting for you.
                  </p>
                </div>
              </div>
              <Link
                to="/campus-ambassador"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Apply now
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section aria-labelledby="faq-heading" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="FAQ"
            title={<span id="faq-heading">Questions, answered honestly</span>}
          />
          <div className="mt-12 max-w-3xl">
            <FaqAccordion faqs={FAQS} />
          </div>
        </div>
      </section>

      {/* ── Section I — Final conversion ─────────────────── */}
      <section aria-labelledby="final-heading" className="relative overflow-hidden bg-foreground text-background">
        <div aria-hidden className="bg-coordinate-grid absolute inset-0 opacity-[0.15] invert" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="flex flex-col items-center text-center">
            {/* animated brand accent: pulsing origin rings */}
            <motion.div
              aria-hidden
              className="relative grid size-24 place-items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute size-16 rounded-full border border-primary/60"
                {...({ animate: { scale: [1, 1.5], opacity: [0.9, 0] } } as object)}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute size-16 rounded-full border border-primary/40"
                {...({ animate: { scale: [1, 2], opacity: [0.6, 0] } } as object)}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
              />
              <span className="size-3.5 rounded-full bg-primary" />
            </motion.div>
            <Reveal>
              <h2 id="final-heading" className="text-h2 mt-8 max-w-2xl text-balance">
                Your journey doesn't have to start alone.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lead mt-5 max-w-xl text-pretty text-background/70">
                Find your people. Build something meaningful. Take your next step with ORIGIN POINT.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <JoinButton />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
