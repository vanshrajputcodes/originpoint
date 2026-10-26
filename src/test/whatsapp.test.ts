import { describe, expect, it } from "vitest";

import { buildContactMessage, waMeLink, WHATSAPP } from "@/lib/whatsapp";

// The WhatsApp destinations are fixed by the founders; assert the exact values.
describe("WhatsApp integration", () => {
  it("uses the supplied community invitation link verbatim", () => {
    expect(WHATSAPP.communityUrl).toBe("https://chat.whatsapp.com/G4sGk613psAHPIDpmOq4RE");
  });

  it("targets the supplied contact number via the official click-to-chat format", () => {
    expect(waMeLink("hello")).toBe("https://wa.me/917705993928?text=hello");
  });

  it("encodes contact-form details into a readable handoff message", () => {
    const message = buildContactMessage({
      fullName: "Test Builder",
      phone: "+91 90000 00000",
      email: "test@example.com",
      category: "General inquiry",
      subject: "Saying hi",
      message: "First line with spaces & symbols",
    });
    expect(message).toContain("Name: Test Builder");
    expect(message).toContain("Inquiry category: General inquiry");
    expect(message).toContain("First line with spaces & symbols");
    expect(waMeLink(message)).toMatch(/^https:\/\/wa\.me\/917705993928\?text=/);
    // encodeURIComponent must encode the ampersand
    expect(waMeLink("a&b")).toBe("https://wa.me/917705993928?text=a%26b");
  });
});
