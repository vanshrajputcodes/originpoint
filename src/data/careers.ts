export interface PrepTrack {
  title: string;
  description: string;
}

export const PREP_TRACKS: PrepTrack[] = [
  {
    title: "Software development roles",
    description:
      "Data structures and system design fundamentals, project-based portfolios, coding practice with review, and clear expectations for entry-level interviews.",
  },
  {
    title: "AI and data roles",
    description:
      "Practical ML and data analysis skills, applied projects with real datasets, and how to present technical work to non-technical evaluators.",
  },
  {
    title: "Design and product roles",
    description:
      "Portfolio curation, case-study writing, critique sessions, and understanding how product decisions actually get made.",
  },
  {
    title: "Marketing and content roles",
    description:
      "Positioning, copywriting, analytics literacy, and a portfolio of real work produced for community projects and events.",
  },
  {
    title: "Business and operations roles",
    description:
      "Business fundamentals, operations thinking, startup exposure, and how to demonstrate ownership without a formal title.",
  },
  {
    title: "Startup and freelance opportunities",
    description:
      "How startup hiring differs from campus placements, how to scope and price freelance work, and how to build credibility through delivered projects.",
  },
];

export interface SupportService {
  title: string;
  description: string;
}

export const SUPPORT_SERVICES: SupportService[] = [
  {
    title: "Resume and portfolio guidance",
    description: "Structured feedback on how your resume and portfolio read to a recruiter — clarity, evidence, and impact.",
  },
  {
    title: "Mock interviews",
    description: "Practice interviews with feedback rounds, so the real one is never your first one.",
  },
  {
    title: "Skill-gap planning",
    description: "Map the role you want against what you can do today, and get a realistic plan to close the gap.",
  },
  {
    title: "Application preparation",
    description: "Referrals where genuinely available, plus how to track, follow up on, and learn from applications.",
  },
  {
    title: "Opportunity discovery",
    description: "Internships, roles, and freelance work shared in the community — with context on who each one suits.",
  },
];

export const CAREERS_HONESTY_NOTE =
  "ORIGIN POINT facilitates preparation and access. Jobs, internships, referrals, and placement outcomes are not guaranteed — your preparation and the opportunity's own process decide the result.";
