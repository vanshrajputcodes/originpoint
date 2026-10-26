import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { FAQS } from "@/data/faqs";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Honest answers about ORIGIN POINT: who can join, membership costs, internships, hackathons, open source, mentoring, and partnerships.",
      },
      { property: "og:title", content: "FAQ — ORIGIN POINT" },
      {
        property: "og:description",
        content:
          "Every common question about the community, answered plainly — no hype, no fine print.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "FAQ — ORIGIN POINT" },
      {
        name: "twitter:description",
        content: "Every common question about the community, answered plainly.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered honestly."
        description="Everything people ask before joining — from who the community is for to whether it guarantees a job. Straight answers, no hype."
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <h2 className="text-h2 text-balance text-foreground">
                  {FAQS.length} answers, and counting.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Can't find yours? Ask directly —{" "}
                  <a
                    href={`https://wa.me/${WHATSAPP.contactNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-foreground hover:underline"
                  >
                    message the team on WhatsApp
                  </a>{" "}
                  and you'll get a real answer from a real person.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.05}>
              <div className="max-w-3xl">
                <FaqAccordion faqs={FAQS} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Still deciding?"
        description="Joining is free and takes one tap. Come see how the community works from the inside."
        primary={{ label: "Join Community", href: WHATSAPP.communityUrl, external: true }}
        secondary={{ label: "Contact the Team", to: "/contact" }}
      />
    </main>
  );
}
