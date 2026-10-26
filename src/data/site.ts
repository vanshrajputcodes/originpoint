export const BRAND = {
  name: "ORIGIN POINT",
  short: "OP",
  tagline: "Every Journey Has an Origin.",
  supporting: "Learn. Build. Connect. Become.",
  mission:
    "ORIGIN POINT is a community and opportunity ecosystem where students, developers, designers, founders, creators, and ambitious professionals learn practical skills, build real-world projects, and turn ideas into meaningful outcomes.",
} as const;

export interface Founder {
  name: string;
  role: string;
  linkedin: string;
  focus: string;
}

export const FOUNDERS: Founder[] = [
  {
    name: "Vansh Raj Singh",
    role: "Co-Founder, ORIGIN POINT",
    linkedin: "https://www.linkedin.com/in/linkvansh/",
    focus: "Community, programs and builder experience.",
  },
  {
    name: "Dishank Singh",
    role: "Co-Founder, ORIGIN POINT",
    linkedin: "https://www.linkedin.com/in/dishanksingh29/",
    focus: "Ecosystem, partnerships and member growth.",
  },
];

export interface NavLink {
  label: string;
  to: string;
}

export const NAV_CENTER: NavLink[] = [
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "Programs", to: "/programs" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Events", to: "/events" },
  { label: "Projects", to: "/projects" },
];

export const FOOTER_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Community",
    links: [
      { label: "About", to: "/about" },
      { label: "Community", to: "/community" },
      { label: "Our Team", to: "/team" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Programs", to: "/programs" },
      { label: "Mentorship", to: "/mentorship" },
      { label: "Hackathons & Events", to: "/events" },
      { label: "Projects & Open Source", to: "/projects" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Community Compass", to: "/compass" },
      { label: "Opportunity & Events Radar", to: "/radar" },
      { label: "Find a Collaborator", to: "/collaborate" },
      { label: "Member Spotlight", to: "/spotlight" },
      { label: "Community Guide", to: "/guide" },
    ],
  },
  {
    title: "Growth",
    links: [
      { label: "How It Works", to: "/join" },
      { label: "Opportunities", to: "/opportunities" },
      { label: "Careers & Internships", to: "/careers" },
      { label: "Campus Ambassador", to: "/campus-ambassador" },
      { label: "OP AI", to: "/op-ai" },
      { label: "Join Community", to: WHATSAPP_GROUP_URL() },
    ],
  },
];

function WHATSAPP_GROUP_URL(): string {
  // Defined inline to keep this data module dependency-free.
  return "https://chat.whatsapp.com/G4sGk613psAHPIDpmOq4RE";
}

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];
