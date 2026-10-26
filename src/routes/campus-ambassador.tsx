import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Megaphone, Network, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  AMBASSADOR_BENEFITS,
  AMBASSADOR_DUTIES,
  AMBASSADOR_STEPS,
  CAMPUS_AMBASSADOR_FORM_URL,
} from "@/data/campus-ambassador";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/campus-ambassador")({
  head: () => ({
    meta: [
      { title: "Campus Ambassador Program — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Represent ORIGIN POINT at your campus. Grow the community at your college, earn real rewards — goodies, vouchers, coupons and prizes worth ₹15,000 for top rank holders.",
      },
      { property: "og:title", content: "Campus Ambassador Program — ORIGIN POINT" },
      {
        property: "og:description",
        content:
          "Lead ORIGIN POINT at your college. Top rank holders take home goodies, vouchers, coupons and prizes worth ₹15,000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Campus Ambassador Program — ORIGIN POINT" },
      {
        name: "twitter:description",
        content:
          "Lead ORIGIN POINT at your college. Top rank holders take home goodies, vouchers, coupons and prizes worth ₹15,000.",
      },
    ],
  }),
  component: CampusAmbassadorPage,
});

const DUTY_ICONS: LucideIcon[] = [Megaphone, Users, Sparkles, Network];
const BENEFIT_ICONS: LucideIcon[] = [Gift, Zap, Network, Sparkles];

function CampusAmbassadorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Campus Ambassador Program"
        title="Lead ORIGIN POINT at your campus."
        description="Become the ambassador for your college — bring builders together, run activities that matter, and get rewarded for the impact you create. Top rank holders take home goodies, vouchers, coupons and prizes worth ₹15,000."
      >
        <a
          href={CAMPUS_AMBASSADOR_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Register as an Ambassador
        </a>
        <Link
          to="/community"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          See the Community
        </Link>
      </PageHero>

      {/* What you'll do */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The role"
            title="What a Campus Ambassador does."
            description="You're ORIGIN POINT's voice and energy at your institution — supported by the core team at every step, never left to figure it out alone."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {AMBASSADOR_DUTIES.map((duty, i) => {
              const Icon = DUTY_ICONS[i % DUTY_ICONS.length] ?? Megaphone;
              return (
                <Reveal as="li" key={duty.title} delay={(i % 2) * 0.06}>
                  <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{duty.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{duty.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* What you'll gain */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="The rewards"
            title="What's in it for you."
            description="Ambassadors are ranked by the impact they create at their campus — and the top rank holders are rewarded seriously."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {AMBASSADOR_BENEFITS.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length] ?? Gift;
              return (
                <Reveal as="li" key={benefit.title} delay={(i % 2) * 0.06}>
                  <div
                    className={
                      benefit.highlight
                        ? "flex h-full gap-4 rounded-2xl border border-primary/40 bg-accent p-6"
                        : "flex h-full gap-4 rounded-2xl border border-border bg-background p-6"
                    }
                  >
                    <span
                      aria-hidden
                      className={
                        benefit.highlight
                          ? "grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
                          : "grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"
                      }
                    >
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Rewards are performance-based: ambassador rankings are decided by the activity and growth
              you drive at your campus, and the leading ambassadors claim the prizes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How to start */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Getting started"
            title="Three steps to your campus."
            description="No eligibility tests, no fees. If you're a student who wants to build something real at your college, this is for you."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {AMBASSADOR_STEPS.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="text-xs font-bold tracking-wide text-primary uppercase">{step.step}</span>
                  <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  {i === 0 ? (
                    <a
                      href={CAMPUS_AMBASSADOR_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Open the form
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Your campus. Your leadership. Your rewards."
        description="Register today, bring ORIGIN POINT to your college, and rank among the top ambassadors to claim goodies, vouchers, coupons and prizes worth ₹15,000."
        primary={{ label: "Register as an Ambassador", href: CAMPUS_AMBASSADOR_FORM_URL, external: true }}
        secondary={{ label: "How It Works", to: "/join" }}
      />
    </main>
  );
}
