export interface JourneyStage {
  num: string;
  title: string;
  description: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    num: "01",
    title: "Discover",
    description: "Find what excites you — a skill, a problem, a community of people building.",
  },
  {
    num: "02",
    title: "Learn",
    description: "Follow roadmaps and workshops that connect theory to practice from day one.",
  },
  {
    num: "03",
    title: "Build",
    description: "Ship real projects — not tutorials. Everything here is built to be used.",
  },
  {
    num: "04",
    title: "Collaborate",
    description: "Team up with complementary skills: developers with designers, builders with marketers.",
  },
  {
    num: "05",
    title: "Showcase",
    description: "Present your work at demo days, in your portfolio, and to the community.",
  },
  {
    num: "06",
    title: "Pursue Opportunities",
    description: "Turn proof of work into applications, internships, freelance gigs and roles.",
  },
  {
    num: "07",
    title: "Give Back",
    description: "Mentor newcomers, contribute to open source, and lift the next member up.",
  },
];
