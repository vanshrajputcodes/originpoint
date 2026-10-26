/**
 * Opportunity & Events Radar data.
 *
 * Community events come exclusively from CONFIRMED_EVENTS (src/data/events.ts)
 * which is intentionally empty until real events are announced — nothing here
 * is fabricated. The radar's second source is a manually maintained list of
 * links to independent, real external platforms.
 */

export interface RadarFilter {
  id: string;
  label: string;
}

export const RADAR_FILTERS: RadarFilter[] = [
  { id: "all", label: "All" },
  { id: "hackathons", label: "Hackathons" },
  { id: "internships", label: "Internships" },
  { id: "workshops", label: "Workshops" },
  { id: "community", label: "Community Events" },
];

export interface RadarPortal {
  name: string;
  url: string;
  categories: string[];
  description: string;
}

/**
 * Curated external portals — real, evergreen landing pages on independent
 * platforms. ORIGIN POINT is not affiliated with, endorsed by, or officially
 * partnered with any of them (consistent with PLATFORMS_NOTE).
 */
export const RADAR_PORTALS: RadarPortal[] = [
  {
    name: "Unstop — Hackathons",
    url: "https://unstop.com/hackathons",
    categories: ["hackathons"],
    description: "Nationwide hackathons and competitions across engineering, business, and design.",
  },
  {
    name: "Devfolio",
    url: "https://devfolio.co/hackathons",
    categories: ["hackathons"],
    description: "Student-first hackathon listings with team matching and application deadlines.",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/",
    categories: ["hackathons", "workshops"],
    description: "Practice problems, courses, and recurring contests like Job-A-Thon.",
  },
  {
    name: "Google Cloud Skills Boost",
    url: "https://www.cloudskillsboost.google/",
    categories: ["workshops"],
    description: "Hands-on labs and skill badges you complete in a browser, at your own pace.",
  },
  {
    name: "Unstop — Internships",
    url: "https://unstop.com/internships",
    categories: ["internships"],
    description: "Internship openings and student programs from verified recruiters.",
  },
  {
    name: "LinkedIn — Internships",
    url: "https://www.linkedin.com/jobs/internships",
    categories: ["internships"],
    description: "Internship listings with recruiter context and application tracking.",
  },
  {
    name: "Naukri.com",
    url: "https://www.naukri.com/",
    categories: ["internships"],
    description: "Large Indian job portal — filter by internship, experience, and location.",
  },
  {
    name: "LinkedIn Events",
    url: "https://www.linkedin.com/events/",
    categories: ["community", "workshops"],
    description: "Public webinars, meetups, and industry events you can join with one click.",
  },
];

/** Disclaimer shown alongside every portal card. */
export const RADAR_NOTE =
  "External listings are links to independent platforms. ORIGIN POINT is not affiliated with, endorsed by, or officially partnered with them — always verify event details on the host platform.";
