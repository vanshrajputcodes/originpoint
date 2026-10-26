/**
 * Find a Collaborator — a local, interactive prototype. Nothing is stored or
 * transmitted by this site: the finished request hands off to WhatsApp, where
 * the community does the actual matching today. Real in-app matching needs a
 * shared backend later — noted honestly on the page.
 */

export const COLLAB_SKILLS: string[] = [
  "Web development",
  "Mobile apps",
  "AI / ML",
  "Backend & APIs",
  "UI/UX design",
  "Graphic design",
  "Video production",
  "Content writing",
  "Marketing",
  "Business & strategy",
  "Finance",
  "Data analysis",
  "Research",
  "Product management",
  "Public speaking",
  "Operations",
];

export const TEAMMATE_TYPES: string[] = [
  "Developer",
  "Designer",
  "Marketer / content",
  "Business / product",
  "Video / creative",
  "Researcher",
  "Anyone complementary",
];

export const COMMITMENT_LEVELS: string[] = [
  "Hackathon sprint",
  "Ongoing project",
  "Open-source contribution",
  "Just exploring",
];

export interface CollaboratorRequest {
  name: string;
  skills: string[];
  idea: string;
  teammateTypes: string[];
  commitment: string;
}

/** Compose a readable WhatsApp message from the collaborator request. */
export function buildCollaboratorMessage(data: CollaboratorRequest): string {
  const lines = [
    "Collaboration request — ORIGIN POINT",
    "",
    `Name: ${data.name}`,
    `My skills: ${data.skills.join(", ")}`,
    `Project idea: ${data.idea}`,
    `Looking for: ${data.teammateTypes.join(", ")}`,
  ];
  if (data.commitment) lines.push(`Commitment: ${data.commitment}`);
  lines.push("", "Found via the Find a Collaborator page on the OP website.");
  return lines.join("\n");
}

/** Validation for the prototype form. Returns an error string or null. */
export function validateCollaboratorRequest(
  data: Pick<CollaboratorRequest, "name" | "skills" | "idea" | "teammateTypes">,
): string | null {
  if (!data.name.trim()) return "Add your name so members know who is asking.";
  if (data.skills.length === 0) return "Select at least one skill you bring.";
  if (!data.idea.trim()) return "Describe your project idea — even one line helps.";
  if (data.teammateTypes.length === 0) return "Select the kind of teammate you need.";
  return null;
}
