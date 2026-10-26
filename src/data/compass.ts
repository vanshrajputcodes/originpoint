/**
 * Community Compass — a short interactive selector that maps a visitor's
 * interests, stage, and goal to relevant site sections and a recommended
 * starting point. Purely deterministic: no backend, no AI.
 */

export interface CompassOption {
  id: string;
  label: string;
}

export interface CompassQuestion {
  id: "interest" | "stage" | "goal";
  title: string;
  options: CompassOption[];
}

export const COMPASS_QUESTIONS: CompassQuestion[] = [
  {
    id: "interest",
    title: "What pulls you the most?",
    options: [
      { id: "code", label: "Coding & building software" },
      { id: "design", label: "Design, content & creativity" },
      { id: "business", label: "Business, marketing & growth" },
      { id: "career", label: "Careers & interview prep" },
    ],
  },
  {
    id: "stage",
    title: "Where are you right now?",
    options: [
      { id: "starting", label: "Just starting out" },
      { id: "learning", label: "Learning the basics" },
      { id: "building", label: "Working on real projects" },
      { id: "ready", label: "Ready for jobs or gigs" },
    ],
  },
  {
    id: "goal",
    title: "What outcome do you want first?",
    options: [
      { id: "learn", label: "Learn a skill properly" },
      { id: "build", label: "Build and ship a project" },
      { id: "compete", label: "Compete in hackathons" },
      { id: "job", label: "Land a job or internship" },
    ],
  },
];

export interface CompassLink {
  label: string;
  to: string;
  note: string;
}

export interface CompassResult {
  headline: string;
  summary: string;
  links: CompassLink[];
  firstStep: string;
}

const INTEREST_LEAD = {
  code: "Your path runs through real codebases, not just tutorials.",
  design: "Your path runs through work people can see, feel, and use.",
  business: "Your path runs through real problems, real audiences, real numbers.",
  career: "Your path runs through proof of work and honest preparation.",
} satisfies Record<string, string>;

const STAGE_FIRST_STEP = {
  starting:
    "Join the community and follow the How It Works path — your first week is already mapped out.",
  learning:
    "Pick one roadmap, pair it with a beginner-friendly build, and share progress in the community.",
  building:
    "Show what you're working on and find teammates who complement your skills.",
  ready:
    "Commit to a preparation track and start applying to live opportunities this month — with the community reviewing your applications.",
} satisfies Record<string, string>;

/** Deterministic recommendation from the three compass answers. */
export function recommendRoute(
  interest: string,
  stage: string,
  goal: string,
): CompassResult {
const GOAL_KEYS = ["learn", "build", "compete", "job"] as const;
type GoalKey = (typeof GOAL_KEYS)[number];

const byGoal: Record<GoalKey, Omit<CompassResult, "firstStep" | "summary">> = {
    learn: {
      headline: "Start with structured learning.",
      links: [
        { label: "Programs", to: "/programs", note: "Six program families across learn, build, hack, and careers." },
        { label: "Community Guide", to: "/guide", note: "Onboarding, etiquette, and curated resources in one place." },
        { label: "Mentorship", to: "/mentorship", note: "Honest feedback from mentors and experienced peers." },
      ],
    },
    build: {
      headline: "Get onto a real build.",
      links: [
        { label: "Projects & Open Source", to: "/projects", note: "Production-ready lifecycles and beginner-friendly contribution paths." },
        { label: "Find a Collaborator", to: "/collaborate", note: "Match your idea with the skills you don't have yet." },
        { label: "Programs", to: "/programs", note: "OP Build and OP Learn keep momentum between projects." },
      ],
    },
    compete: {
      headline: "Pick your first competition.",
      links: [
        { label: "Opportunity & Events Radar", to: "/radar", note: "Filterable hackathons, internships, and workshops in one view." },
        { label: "Hackathons & Events", to: "/events", note: "Confirmed community events — announced honestly, never invented." },
        { label: "Find a Collaborator", to: "/collaborate", note: "Assemble a team before the next sprint." },
      ],
    },
    job: {
      headline: "Turn proof of work into offers.",
      links: [
        { label: "Opportunities", to: "/opportunities", note: "Freelance, gigs, internships, and roles — plus preparation." },
        { label: "Careers & Internships", to: "/careers", note: "Role tracks and support services for placement readiness." },
        { label: "Opportunity & Events Radar", to: "/radar", note: "Live internship and job portals, filtered to what you need." },
      ],
    },
  };

  const goalKey = GOAL_KEYS.includes(goal as GoalKey) ? (goal as GoalKey) : "learn";
  const goalResult = byGoal[goalKey];
  const interestLead = INTEREST_LEAD[interest as keyof typeof INTEREST_LEAD] ?? INTEREST_LEAD.code;
  const firstStep = STAGE_FIRST_STEP[stage as keyof typeof STAGE_FIRST_STEP] ?? STAGE_FIRST_STEP.starting;
  return {
    headline: goalResult.headline,
    summary: interestLead,
    links: goalResult.links,
    firstStep,
  };
}
