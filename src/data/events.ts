export interface EventCategory {
  name: string;
  description: string;
}

/** Categories the community runs events under. */
export const EVENT_CATEGORIES: EventCategory[] = [
  {
    name: "Hackathons",
    description: "Team-based building sprints with real deadlines, judged demos, and honest feedback.",
  },
  {
    name: "Workshops",
    description: "Hands-on sessions where you build something during the session, not after it.",
  },
  {
    name: "Community meetups",
    description: "Casual gatherings to meet members, swap ideas, and find collaborators.",
  },
  {
    name: "Technical talks",
    description: "Practitioner-led deep dives into tools, architecture, and lessons from real projects.",
  },
  {
    name: "Non-technical challenges",
    description: "Case competitions, design challenges, marketing sprints, and business idea battles.",
  },
];

export interface EventItem {
  name: string;
  category: string;
  date?: string;
  mode?: string;
  location?: string;
  registrationUrl?: string;
  status: string;
}

/**
 * Confirmed events live here. None have been announced yet, so the list is
 * intentionally empty — the site shows an honest empty state instead of
 * fabricated events or registration links.
 */
export const CONFIRMED_EVENTS: EventItem[] = [];
