/**
 * OP Community Guide — curated, local knowledge: community etiquette,
 * onboarding guidance, and resource discovery. No API, no AI provider —
 * the same policy as OP AI (deterministic, curated content only).
 */

export interface GuideItem {
  title: string;
  detail: string;
}

/** Community etiquette — expectations inside the WhatsApp community. */
export const COMMUNITY_ETIQUETTE: GuideItem[] = [
  {
    title: "Introduce yourself properly",
    detail:
      "Name, what you're learning or building, and what you're looking for. A real introduction gets real replies — a bare \"hi\" gets lost.",
  },
  {
    title: "Ask questions with context",
    detail:
      "Share what you tried, what broke, and where you're stuck. Members answer specific questions far faster than \"can anyone help me?\"",
  },
  {
    title: "Give before you take",
    detail:
      "Answer one question, review one resume, or share one resource for every ask you make. The community compounds when contribution is normal.",
  },
  {
    title: "Keep announcements official",
    detail:
      "Event dates, program launches, and partnerships are announced by the team. Anything else is a personal offer — verify before you act on it.",
  },
  {
    title: "Respect every discipline",
    detail:
      "Developers, designers, marketers, finance minds, creators, and beginners all belong here. Real projects are cross-functional — treat it that way.",
  },
  {
    title: "No spam, ever",
    detail:
      "No unsolicited promotions, referral floods, or repeated DMs to members. Promotions only with team approval.",
  },
];

/** Onboarding guidance — the honest first weeks in ORIGIN POINT. */
export const ONBOARDING_STEPS: GuideItem[] = [
  {
    title: "Join the WhatsApp community",
    detail:
      "One tap from the Join Community button. Announcements, introductions, and events all happen there — it is the single source of what's live.",
  },
  {
    title: "Introduce yourself in week one",
    detail:
      "Use the etiquette above. Say what you're exploring — even if you haven't picked a discipline yet. Nobody joins knowing everything.",
  },
  {
    title: "Pick one program family to start",
    detail:
      "OP Connect runs live today; the other five families ramp as members rally around them. Tell the team which one you want — that's how programs get scheduled.",
  },
  {
    title: "Show up for the first event you can",
    detail:
      "Workshops and meetups are announced in the community. Attending is how you meet the people you'll build with.",
  },
  {
    title: "Start a build log",
    detail:
      "Track what you're learning and shipping, week by week. It becomes your portfolio, your spotlight application, and your accountability — in that order.",
  },
];
