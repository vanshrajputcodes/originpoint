import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const expectPageFor = (path: string) => {
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  };

  it("matches a page for / instead of falling back to not found", () => {
    expectPageFor("/");
  });

  it("matches pages for the new /join and /faq routes", () => {
    expectPageFor("/join");
    expectPageFor("/faq");
  });

  it("matches pages for the five community-feature routes", () => {
    expectPageFor("/compass");
    expectPageFor("/radar");
    expectPageFor("/collaborate");
    expectPageFor("/spotlight");
    expectPageFor("/guide");
  });

  it("matches the campus ambassador page", () => {
    expectPageFor("/campus-ambassador");
  });
});
