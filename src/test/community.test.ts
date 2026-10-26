import { describe, expect, it } from "vitest";

import { recommendRoute } from "@/data/compass";
import {
  buildCollaboratorMessage,
  validateCollaboratorRequest,
} from "@/data/collaborate";
import { CONFIRMED_EVENTS } from "@/data/events";
import { RADAR_FILTERS, RADAR_PORTALS } from "@/data/radar";

describe("Community Compass", () => {
  it("recommends a different starting route for each goal", () => {
    const goals = ["learn", "build", "compete", "job"];
    const linkSets = goals.map((goal) =>
      recommendRoute("code", "starting", goal).links.map((l) => l.to),
    );
    for (let i = 1; i < linkSets.length; i++) {
      expect(linkSets[i]).not.toEqual(linkSets[0]);
    }
  });

  it("maps the 'compete' goal to the Opportunity & Events Radar", () => {
    const result = recommendRoute("career", "ready", "compete");
    expect(result.links[0]?.to).toBe("/radar");
  });

  it("is deterministic — same answers, same recommendation", () => {
    const a = recommendRoute("design", "learning", "build");
    const b = recommendRoute("design", "learning", "build");
    expect(a).toEqual(b);
  });

  it("falls back safely on unknown answers", () => {
    const result = recommendRoute("unknown", "unknown", "unknown");
    expect(result.headline.length).toBeGreaterThan(0);
    expect(result.firstStep.length).toBeGreaterThan(0);
  });
});

describe("Opportunity & Events Radar", () => {
  it("keeps the confirmed community events list empty — nothing is fabricated", () => {
    expect(CONFIRMED_EVENTS).toEqual([]);
  });

  it("only links to real external https portals with valid filter categories", () => {
    const validCategoryIds = RADAR_FILTERS.map((f) => f.id);
    for (const portal of RADAR_PORTALS) {
      expect(portal.url.startsWith("https://")).toBe(true);
      expect(portal.categories.length).toBeGreaterThan(0);
      for (const category of portal.categories) {
        expect(validCategoryIds).toContain(category);
      }
    }
  });

  it("covers every non-all filter with at least one portal", () => {
    for (const filter of RADAR_FILTERS.filter((f) => f.id !== "all")) {
      expect(
        RADAR_PORTALS.some((p) => p.categories.includes(filter.id)),
        `no portal for filter ${filter.id}`,
      ).toBe(true);
    }
  });
});

describe("Find a Collaborator", () => {
  const validRequest = {
    name: "Aarav Mehta",
    skills: ["Web development", "UI/UX design"],
    idea: "A campus event discovery app",
    teammateTypes: ["Developer"],
  };

  it("rejects incomplete requests with a specific reason", () => {
    expect(validateCollaboratorRequest({ ...validRequest, name: "" })).toMatch(/name/i);
    expect(validateCollaboratorRequest({ ...validRequest, skills: [] })).toMatch(/skill/i);
    expect(validateCollaboratorRequest({ ...validRequest, idea: "  " })).toMatch(/idea/i);
    expect(validateCollaboratorRequest({ ...validRequest, teammateTypes: [] })).toMatch(
      /teammate/i,
    );
    expect(validateCollaboratorRequest(validRequest)).toBeNull();
  });

  it("builds a WhatsApp message that contains every provided field", () => {
    const message = buildCollaboratorMessage({
      ...validRequest,
      commitment: "Hackathon sprint",
    });
    expect(message).toContain("Aarav Mehta");
    expect(message).toContain("Web development, UI/UX design");
    expect(message).toContain("A campus event discovery app");
    expect(message).toContain("Developer");
    expect(message).toContain("Hackathon sprint");
  });

  it("omits the commitment line when the user leaves it empty", () => {
    const message = buildCollaboratorMessage({ ...validRequest, commitment: "" });
    expect(message).not.toContain("Commitment:");
  });
});
