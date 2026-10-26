import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/data/site";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ORIGIN POINT" },
      {
        name: "description",
        content: "How ORIGIN POINT handles information — a minimal, honest privacy policy.",
      },
      { property: "og:title", content: "Privacy Policy — ORIGIN POINT" },
      { property: "og:description", content: "A minimal, honest privacy policy." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What this website collects",
    body: [
      "This website has no backend, no database, and no analytics services connected. It does not create accounts, and it does not store anything you type.",
      "The contact form does not transmit your details anywhere. When you submit it, the site opens WhatsApp with your message pre-filled so you can review and send it yourself. Your details remain on your device and in the WhatsApp message you choose to send.",
      "OP AI, the community assistant, runs entirely in your browser. Questions you type are matched locally against published community content and are not sent to any server.",
    ],
  },
  {
    title: "WhatsApp communications",
    body: [
      "If you join the community or message the team, you are communicating through WhatsApp. Their handling of your messages and account information is governed by WhatsApp's own privacy policy, which is separate from this site.",
      "Messages you send to the team are visible to the ORIGIN POINT team members who read them.",
    ],
  },
  {
    title: "Cookies and local storage",
    body: [
      "The website does not set tracking cookies and does not persist personal form details in local storage, analytics, or any third-party service.",
      "Basic technical data — such as your browser type or pages visited — may be processed by the hosting platform to serve the site. This is standard web hosting infrastructure and is not used to profile you.",
    ],
  },
  {
    title: "Children",
    body: [
      "The community is intended for people old enough to use WhatsApp under its own terms of service. We do not knowingly collect information from children through this website — and technically, we collect none at all.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If the website's functionality changes in a way that affects this policy, this page will be updated accordingly.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about this policy? Message the team on WhatsApp at ${WHATSAPP.displayNumber} or use the contact form on this site.`,
    ],
  },
];

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="mb-3 text-sm font-semibold tracking-wide text-accent-foreground">Legal</p>
      <h1 className="text-display text-foreground">Privacy Policy</h1>
      <p className="text-lead mt-4">
        How {BRAND.name} handles information — written to be read, not just displayed.
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
