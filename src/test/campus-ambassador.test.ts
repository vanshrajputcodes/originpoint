import { describe, expect, it } from "vitest";

import {
  AMBASSADOR_BENEFITS,
  AMBASSADOR_DUTIES,
  AMBASSADOR_PRIZE_VALUE,
  AMBASSADOR_REWARDS_SUMMARY,
  AMBASSADOR_STEPS,
  CAMPUS_AMBASSADOR_FORM_URL,
} from "@/data/campus-ambassador";

// The registration destination is pinned: ambassadors must land on the
// founders' Google Form, never a placeholder.
describe("Campus Ambassador program", () => {
  it("points registration at the founders' Google Form", () => {
    expect(CAMPUS_AMBASSADOR_FORM_URL).toBe(
      "https://docs.google.com/forms/d/e/1FAIpQLScK1EeHbUGlVWyhk6Kxrjg06lAve7jcHyvNmYtFBy5MwAL4pg/viewform?usp=sharing&ouid=106767916614158468135/",
    );
  });

  it("advertises the rewards exactly as briefed", () => {
    const allCopy = [
      AMBASSADOR_REWARDS_SUMMARY,
      ...AMBASSADOR_BENEFITS.map((b) => `${b.title} ${b.body}`),
    ].join(" ");

    expect(allCopy).toContain(AMBASSADOR_PRIZE_VALUE);
    expect(allCopy).toContain("goodies");
    expect(allCopy).toContain("vouchers");
    expect(allCopy).toContain("coupons");
  });

  it("never mentions cash or money anywhere", () => {
    const allCopy = [
      AMBASSADOR_REWARDS_SUMMARY,
      ...AMBASSADOR_BENEFITS.map((b) => `${b.title} ${b.body}`),
      ...AMBASSADOR_DUTIES.map((d) => `${d.title} ${d.body}`),
      ...AMBASSADOR_STEPS.map((s) => `${s.title} ${s.body}`),
    ].join(" ");

    expect(allCopy).not.toMatch(/cash|money|salary|stipend|paid/i);
  });
});
