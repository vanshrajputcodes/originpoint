import {
  Trophy,
  Briefcase,
  Boxes,
  Compass,
  GitBranch,
  Target,
  Rocket,
  Users,
  Map,
  BadgeCheck,
  Laptop,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export interface AccessCard {
  title: string;
  description: string;
  icon: LucideIcon;
  link: { label: string; to: string };
}

/** The twelve things members can access — no fake counters, no unsupported claims. */
export const ACCESS_CARDS: AccessCard[] = [
  {
    title: "Hackathons & Competitions",
    description:
      "Compete in hackathons, coding contests and design challenges announced through the community — and build the habit of shipping under real deadlines.",
    icon: Trophy,
    link: { label: "See events", to: "/events" },
  },
  {
    title: "Internships & Job Opportunities",
    description:
      "Discover internships, roles and freelance work shared by members and partners, and learn how to prepare strong applications for them.",
    icon: Briefcase,
    link: { label: "Career support", to: "/careers" },
  },
  {
    title: "Production-Ready Projects",
    description:
      "Move past tutorial projects. Join teams that plan, build, test, deploy and maintain real software people can actually use.",
    icon: Boxes,
    link: { label: "How we build", to: "/projects" },
  },
  {
    title: "Mentorship & Guidance",
    description:
      "Get honest feedback and direction from mentors and experienced peers — on skills, projects, and the decisions that shape a career.",
    icon: Compass,
    link: { label: "Explore mentorship", to: "/mentorship" },
  },
  {
    title: "Open Source Contributions",
    description:
      "Make your first pull request, contribute to community initiatives, and build a public track record that employers can verify.",
    icon: GitBranch,
    link: { label: "Open source paths", to: "/projects" },
  },
  {
    title: "Career Preparation",
    description:
      "Resume reviews, mock interviews and skill-gap planning — practical preparation for placements, internships and job switches.",
    icon: Target,
    link: { label: "Get placement-ready", to: "/careers" },
  },
  {
    title: "Startup & Entrepreneurship Support",
    description:
      "Validate ideas, find collaborators, and explore what it takes to take a project from concept to a first launch.",
    icon: Rocket,
    link: { label: "Founder journey", to: "/programs" },
  },
  {
    title: "Networking & Community Events",
    description:
      "Meet people who build — developers, designers, founders and creators — through meetups, talks and community conversations.",
    icon: Users,
    link: { label: "Meet the community", to: "/community" },
  },
  {
    title: "Learning Roadmaps & Workshops",
    description:
      "Follow structured roadmaps and hands-on workshops that connect what you learn to what you can actually build.",
    icon: Map,
    link: { label: "Learning tracks", to: "/programs" },
  },
  {
    title: "Portfolio & Personal Branding",
    description:
      "Turn projects and contributions into a portfolio that tells your story — with feedback on how to present your work.",
    icon: BadgeCheck,
    link: { label: "Showcase your work", to: "/projects" },
  },
  {
    title: "Freelancing & Real-World Experience",
    description:
      "Understand how freelance work works — scoping, client communication, delivery — and find real-world briefs to practice on.",
    icon: Laptop,
    link: { label: "Real-world work", to: "/opportunities" },
  },
  {
    title: "Leadership & Campus Chapters",
    description:
      "Lead initiatives, run campus chapters, and organize events — building the leadership experience that sets you apart.",
    icon: Landmark,
    link: { label: "Start a chapter", to: "/community" },
  },
];
