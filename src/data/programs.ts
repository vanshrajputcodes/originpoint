export type ProgramStatus = "Proposed" | "Active";

export interface Program {
  key: string;
  name: string;
  headline: string;
  description: string;
  bullets: string[];
  status: ProgramStatus;
}

/**
 * The six program families of the ORIGIN POINT ecosystem.
 * Status is stated honestly: these categories describe what the community
 * organizes around; each panel says what is live today versus proposed.
 */
export const PROGRAMS: Program[] = [
  {
    key: "learn",
    name: "OP Learn",
    headline: "Learn the way you'll actually work.",
    description:
      "Structured learning roadmaps, hands-on workshops, guided learning tracks, and peer study groups — designed so every concept ends in something you have built.",
    bullets: [
      "Role-based learning roadmaps",
      "Hands-on workshops and guided tracks",
      "Peer study and accountability groups",
      "Skill check-ins to track real progress",
    ],
    status: "Proposed",
  },
  {
    key: "build",
    name: "OP Build",
    headline: "Real projects, shipped properly.",
    description:
      "Collaborative development on real-world projects and product-building sprints — from planning and design through deployment and maintenance.",
    bullets: [
      "Real-world project teams",
      "Collaborative product-building sprints",
      "Production standards: testing, deployment, docs",
      "Project showcases and demo days",
    ],
    status: "Proposed",
  },
  {
    key: "hack",
    name: "OP Hack",
    headline: "Compete. Learn. Ship under pressure.",
    description:
      "Hackathons, coding competitions, design challenges, and innovation events — with teams formed inside the community so nobody competes alone.",
    bullets: [
      "Hackathons and coding competitions",
      "Design and product challenges",
      "Team formation for participants",
      "Innovation and ideation events",
    ],
    status: "Proposed",
  },
  {
    key: "careers",
    name: "OP Careers",
    headline: "Be ready before the opportunity arrives.",
    description:
      "Career preparation that respects your time: resume and portfolio reviews, mock interviews, skill-gap planning, and discovery of real opportunities.",
    bullets: [
      "Resume and portfolio reviews",
      "Mock interviews with feedback",
      "Skill-gap planning per target role",
      "Curated opportunity discovery",
    ],
    status: "Proposed",
  },
  {
    key: "connect",
    name: "OP Connect",
    headline: "Your network is built here.",
    description:
      "Networking with mentors, founders and industry practitioners — through community meetups, industry conversations, and honest career discussions.",
    bullets: [
      "Mentor and founder conversations",
      "Community meetups and gatherings",
      "Industry Q&A sessions",
      "Cross-disciplinary introductions",
    ],
    status: "Active",
  },
  {
    key: "launch",
    name: "OP Launch",
    headline: "From idea to first launch.",
    description:
      "MVP development, project showcases, startup exploration, and launch guidance for members who want to take their idea further than a prototype.",
    bullets: [
      "MVP development sprints",
      "Project and product showcases",
      "Startup exploration with peers",
      "Launch planning guidance",
    ],
    status: "Proposed",
  },
];

export const PROGRAM_STATUS_NOTE =
  "OP Connect is live in the WhatsApp community today. The other program families describe how the community organizes — they launch as members rally around them. Tell us what you want to join and we will build it first.";
