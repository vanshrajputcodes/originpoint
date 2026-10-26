import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/features/contact/ContactForm";
import { WHATSAPP } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ORIGIN POINT" },
      {
        name: "description",
        content:
          "Contact the ORIGIN POINT team — the form prepares a WhatsApp message you review and send yourself. Nothing is stored.",
      },
      { property: "og:title", content: "Contact — ORIGIN POINT" },
      {
        property: "og:description",
        content: "Reach the team through WhatsApp — review your message before you send it.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-t border-border">
        <div aria-hidden className="bg-coordinate-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-24">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk."
              description="Whether it's an event idea, a partnership, a campus chapter, or a simple question — the team reads every message that comes through."
            />
            <Reveal>
              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-3">
                  <MessageCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                    <a
                      href={`https://wa.me/${WHATSAPP.contactNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {WHATSAPP.displayNumber}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Community</p>
                    <a
                      href={WHATSAPP.communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Join the WhatsApp community
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Where we are</p>
                    <p className="text-sm text-muted-foreground">
                      ORIGIN POINT is an online-first community. There is no official office address —
                      reach us on WhatsApp or through this form.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="mt-10 rounded-2xl border border-border bg-accent p-5">
                <p className="text-sm leading-relaxed text-accent-foreground">
                  This form doesn't send or store anything — it opens WhatsApp with your message
                  pre-filled so you can review and send it yourself. We reply on WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
