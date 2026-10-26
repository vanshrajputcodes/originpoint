// Campus Ambassador Program — content sourced from the founders' brief.
// Rewards are goods (goodies, vouchers, coupons, and more) with a total prize
// value of ₹15,000 for top rank holders. There is intentionally no mention of
// cash or money anywhere in this module or in pages that use it.

export const CAMPUS_AMBASSADOR_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScK1EeHbUGlVWyhk6Kxrjg06lAve7jcHyvNmYtFBy5MwAL4pg/viewform?usp=sharing&ouid=106767916614158468135/";

export const AMBASSADOR_PRIZE_VALUE = "₹15,000";

export const AMBASSADOR_REWARDS_SUMMARY = `Top rank holders take home goodies, vouchers, coupons and much more — with prizes worth ${AMBASSADOR_PRIZE_VALUE} in total for the leading ambassadors.`;

export interface AmbassadorDuty {
  title: string;
  body: string;
}

export const AMBASSADOR_DUTIES: AmbassadorDuty[] = [
  {
    title: "Be the face on your campus",
    body: "Introduce ORIGIN POINT to the students around you — your class, your club, your hostel wing — and show them what the community actually does.",
  },
  {
    title: "Grow the local community",
    body: "Bring motivated peers into the WhatsApp community and help them take their first step, whether that's a roadmap, a project role, or an event.",
  },
  {
    title: "Run campus activities",
    body: "Plan study circles, demo nights, or mini-challenges at your college with support and material from the core team.",
  },
  {
    title: "Feed information back",
    body: "Tell us what students at your campus actually need — so programs, events, and opportunities get sharper for everyone.",
  },
];

export interface AmbassadorBenefit {
  title: string;
  body: string;
  highlight?: boolean;
}

export const AMBASSADOR_BENEFITS: AmbassadorBenefit[] = [
  {
    title: "Rewards worth working for",
    body: AMBASSADOR_REWARDS_SUMMARY,
    highlight: true,
  },
  {
    title: "Real leadership experience",
    body: "You plan, coordinate, and lead at your institution — the kind of responsibility that stands out on a resume and in interviews.",
  },
  {
    title: "A network that travels with you",
    body: "Work directly with the core team and connect with builders, mentors, and founders across the ORIGIN POINT community.",
  },
  {
    title: "First to know",
    body: "Hear about programs, events, and opportunities before they reach the wider community — and carry that advantage to your campus.",
  },
];

export interface AmbassadorStep {
  step: string;
  title: string;
  body: string;
}

export const AMBASSADOR_STEPS: AmbassadorStep[] = [
  {
    step: "Step 1",
    title: "Register",
    body: "Fill the Campus Ambassador registration form — it takes a couple of minutes and there's no fee.",
  },
  {
    step: "Step 2",
    title: "Join the community",
    body: "If you're not in the WhatsApp community yet, join it — that's where coordination, material, and announcements happen.",
  },
  {
    step: "Step 3",
    title: "Start leading",
    body: "Pick up your campus, plan your first activity, and climb the ranks. Top performers earn the rewards.",
  },
];
