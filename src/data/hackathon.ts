import type { Faq } from "@/data/faqs";

/**
 * ORIGIN POINT's own flagship hackathon.
 *
 * REGISTRATION LINK: paste the Google Form URL into `registrationUrl` below.
 * While it is empty, the Register button shows "Registration opens soon".
 */
export const HACKATHON = {
  name: "Ideas to Impact",
  fullName: "ORIGIN POINT Hackathon — Ideas to Impact",
  tagline: "Build anything. Solve something real.",
  description:
    "An open-track virtual hackathon: no fixed theme, no limits on the stack. Bring an original idea — an app, a tool, an AI agent, a hardware hack, a design system, a social-impact product — and turn it into something people can actually use.",
  date: "To be announced",
  mode: "Virtual (online)",
  registrationTarget: "1 Lakh+ registrations",
  prizePool: "Prizes worth ₹25,000",
  registrationUrl: "",
  highlights: [
    { title: "Open track", text: "Build anything — every domain and stack is welcome." },
    { title: "Unique ideas win", text: "Originality and real-world impact matter most." },
    { title: "Mentorship", text: "Guidance from builders while you ship." },
    { title: "Showcase", text: "Top teams demo their builds to the community." },
  ],
} as const;

/**
 * Rules for ORIGIN POINT's own hackathon.
 *
 * Honest by design: every rule is a commitment we can actually keep, and
 * submission/judging specifics are only promised as "announced with the
 * registration form" — never invented ahead of confirmation.
 */
export const HACKATHON_RULES: { title: string; text: string }[] = [
  {
    title: "Open track",
    text: "There is no fixed theme. Build any original idea — an app, a tool, an AI agent, a hardware hack, a design system, or a social-impact product.",
  },
  {
    title: "Original work only",
    text: "Whatever you submit must be built by you or your team during the hackathon window. Using open-source libraries, APIs, and AI tools is fine — copying someone else's project and presenting it as yours is not.",
  },
  {
    title: "Unique ideas win",
    text: "Originality and real-world impact matter most. A simple idea that genuinely solves a problem beats a flashy demo that doesn't.",
  },
  {
    title: "Solo or team",
    text: "Participate alone or as a team. Team size and any caps will be stated clearly in the registration form — never changed after registration opens.",
  },
  {
    title: "Virtual participation",
    text: "The hackathon runs online, so you can participate from anywhere. No travel, no venue — just build and submit from where you are.",
  },
  {
    title: "What you submit",
    text: "A working demo or prototype plus a short explanation of the problem it solves. The exact submission format is shared with everyone who registers — no surprises.",
  },
  {
    title: "How you're judged",
    text: "Submissions are evaluated on originality, usefulness, execution, and how clearly you present the idea. Judging details are announced alongside the event.",
  },
  {
    title: "Prizes",
    text: "Prizes worth ₹25,000 go to the top builds. Showcase and announcements happen with the whole community.",
  },
  {
    title: "Fair play",
    text: "No plagiarism, no false claims about what your build does, and no mistreating other participants. Standard community etiquette applies throughout.",
  },
  {
    title: "Open to everyone",
    text: "Students, working professionals, and complete beginners — all can participate. Beginners are exactly who this event is for.",
  },
];

/** Hackathon-specific FAQ, rendered on the Hackathons & Events page. */
export const HACKATHON_FAQS: Faq[] = [
  {
    question: "Who can participate in the hackathon?",
    answer:
      "Anyone — students, working professionals, freelancers, and complete beginners. You can participate solo or with a team. There are no formal eligibility requirements.",
  },
  {
    question: "What does \"open track\" mean?",
    answer:
      "There is no fixed theme or problem statement. You bring any original idea and build it — an app, a tool, an AI agent, a hardware hack, a design system, anything real.",
  },
  {
    question: "Can I use AI tools, open-source libraries, and APIs?",
    answer:
      "Yes — use whatever helps you build faster and better. What is judged is your idea and how well it works for real users. Copying an existing project and passing it off as your own is the only thing that's off-limits.",
  },
  {
    question: "Do I need a team?",
    answer:
      "No — solo builders are welcome. If you'd rather build with a team, you can find teammates in the community or through the Find a Collaborator page. Any team-size cap will be stated in the registration form itself.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No — registration is free. If anything about that ever changes, it will be stated clearly before you register, never after.",
  },
  {
    question: "How do I register?",
    answer:
      "Through the official registration form linked on this page. While the link is not live yet, the button reads \"Registration opens soon\" — once it's added, it opens the form directly.",
  },
  {
    question: "What do I have to submit?",
    answer:
      "A working demo or prototype of your idea plus a short explanation of the problem it solves. The exact submission format and deadline are shared with everyone who registers — nothing is invented ahead of time.",
  },
  {
    question: "How are winners decided?",
    answer:
      "Submissions are evaluated on originality, real-world usefulness, execution quality, and how clearly the idea is presented. A judging panel reviews and picks the top builds — details are announced with the event.",
  },
  {
    question: "What can I win?",
    answer:
      "Top builds receive prizes worth ₹25,000, and standout projects get showcased to the whole community.",
  },
  {
    question: "When is it happening?",
    answer:
      "The date is to be announced. It will appear on this page and in the WhatsApp community first — join the community so you don't miss it.",
  },
];
