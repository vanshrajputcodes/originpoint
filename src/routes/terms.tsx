import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/data/site";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — ORIGIN POINT" },
      {
        name: "description",
        content: "Terms of use for the ORIGIN POINT website and community.",
      },
      { property: "og:title", content: "Terms of Use — ORIGIN POINT" },
      { property: "og:description", content: "Terms of use, written in plain language." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "About these terms",
    body: [
      `These terms cover your use of this website and your participation in the ${BRAND.name} community. By using the site or joining the community, you agree to them.`,
    ],
  },
  {
    title: "What ORIGIN POINT is — and is not",
    body: [
      "ORIGIN POINT is a community and opportunity ecosystem. It facilitates learning, building, collaboration, and access to opportunities.",
      "ORIGIN POINT is not an employer, a placement agency, or an internship provider. Jobs, internships, referrals, and placement outcomes are never guaranteed. Every opportunity shared in the community follows its own selection process.",
    ],
  },
  {
    title: "Community conduct",
    body: [
      "Treat members with respect. No harassment, spam, misleading claims, or misrepresentation of opportunities.",
      "Opportunities shared in the community must be genuine. Members who share fake or misleading opportunities may be removed.",
      "The team may remove content or members who violate the spirit of the community.",
    ],
  },
  {
    title: "Content and accuracy",
    body: [
      "Website content describes the community and its programs honestly, including which programs are active versus proposed. Program availability may change; confirmed details are communicated through official community channels.",
      "The website is provided as-is, without warranties. We work to keep it accurate and available, but we don't promise uninterrupted access.",
    ],
  },
  {
    title: "Your content",
    body: [
      "Projects, messages, and contributions you share in the community remain yours. By sharing work with the community, you allow other members to view and discuss it.",
      "Project collaborations should agree on ownership and credit expectations within the team — the community can help structure that conversation.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "The site links to WhatsApp for community joining and contact, and to founders' LinkedIn profiles. Those services have their own terms and privacy policies, which apply to your use of them.",
    ],
  },
  {
    title: "Changes",
    body: [
      "These terms may be updated as the community grows. Material changes will be communicated through the community.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about these terms? Message the team on WhatsApp at ${WHATSAPP.displayNumber} or use the contact form on this site.`,
    ],
  },
];

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="mb-3 text-sm font-semibold tracking-wide text-accent-foreground">Legal</p>
      <h1 className="text-display text-foreground">Terms of Use</h1>
      <p className="text-lead mt-4">
        The ground rules for {BRAND.name} — plain language, no fine print traps.
      </p>
      <div className="mt-12 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-h3 text-foreground">{s.title}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
