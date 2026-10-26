/** The ten-step development lifecycle every community project follows. */
export const BUILD_LIFECYCLE: string[] = [
  "Idea validation",
  "Requirements & planning",
  "UI/UX design",
  "Architecture & implementation",
  "Version control",
  "Testing & debugging",
  "Deployment",
  "Security & performance",
  "Monitoring & maintenance",
  "Documentation & presentation",
];

/** Example project categories — no fabricated projects. */
export const PROJECT_CATEGORIES: { name: string; description: string }[] = [
  {
    name: "Community tools",
    description: "Apps and platforms that serve members directly — event discovery, team matching, learning trackers.",
  },
  {
    name: "Client-style builds",
    description: "Real briefs practiced end-to-end: scoping, delivery, feedback, and maintenance.",
  },
  {
    name: "Open-source initiatives",
    description: "Community-maintained libraries, templates, and starter kits anyone can contribute to.",
  },
  {
    name: "Member startups",
    description: "MVPs and products built by member teams, from validation through first launch.",
  },
];

export const PROJECT_EMPTY_NOTE =
  "No specific community projects have been published yet. The categories above show what teams form around — the first real projects will be listed here as they are confirmed, never invented.";
