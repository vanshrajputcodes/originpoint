import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { BRAND } from "@/data/site";
import { NAV_CENTER, FOOTER_GROUPS, LEGAL_LINKS } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import { WHATSAPP } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

const JOIN_REL = "noopener noreferrer";

function JoinButton({ className, small }: { className?: string; small?: boolean }) {
  return (
    <a
      href={WHATSAPP.communityUrl}
      target="_blank"
      rel={JOIN_REL}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        small ? "h-9 px-4 text-xs" : "h-10 px-5 text-sm",
        className,
      )}
    >
      Join Community
      <ArrowUpRight aria-hidden className="size-4" />
    </a>
  );
}

function ProgramsMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 z-50 mt-2 w-[38rem] -translate-x-1/2 rounded-2xl border border-border bg-popover p-4 shadow-op"
    >
      <div className="mb-3 px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        The ecosystem
      </div>
      <div className="grid grid-cols-2 gap-1">
        {PROGRAMS.map((p) => (
          <Link
            key={p.key}
            to="/programs"
            onClick={onNavigate}
            className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              {p.name}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  p.status === "Active"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                {p.status}
              </span>
            </span>
            <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
              {p.headline}
            </span>
          </Link>
        ))}
      </div>
      <Link
        to="/programs"
        onClick={onNavigate}
        className="mt-3 flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent"
      >
        Explore all programs <ArrowUpRight aria-hidden className="size-3.5" />
      </Link>
    </motion.div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcedDismissed, setAnnouncedDismissed] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const location = useLocation();
  const programsRef = useRef<HTMLDivElement>(null);

  // Close overlays on route change.
  useEffect(() => {
    setMobileOpen(false);
    setProgramsOpen(false);
  }, [location.pathname]);

  // Escape + outside click for the mega menu.
  useEffect(() => {
    if (!programsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProgramsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [programsOpen]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      {!announcedDismissed ? (
        <div className="relative bg-foreground px-4 py-2 text-center text-xs text-white sm:text-sm">
          <p>
            ORIGIN POINT is open —{" "}
            <a
              href={WHATSAPP.communityUrl}
              target="_blank"
              rel={JOIN_REL}
              className="font-semibold underline decoration-primary underline-offset-2 hover:text-primary"
            >
              join the community
            </a>{" "}
            to help shape our first programs and events.
          </p>
          <button
            type="button"
            onClick={() => setAnnouncedDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-white/70 hover:text-white"
          >
            <X aria-hidden className="size-3.5" />
          </button>
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="ORIGIN POINT home">
            <img
              src={logoUrl}
              alt={`${BRAND.name} logo`}
              width={192}
              height={64}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop center nav */}
          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV_CENTER.map((link) =>
              link.label === "Programs" ? (
                <div key={link.to} ref={programsRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={programsOpen}
                    aria-haspopup="true"
                    onClick={() => setProgramsOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                      isActive(link.to) ? "text-accent-foreground" : "text-foreground",
                    )}
                  >
                    Programs
                    <ChevronDown
                      aria-hidden
                      className={cn("size-3.5 transition-transform", programsOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {programsOpen ? <ProgramsMegaMenu onNavigate={() => setProgramsOpen(false)} /> : null}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive(link.to)
                      ? "text-accent-foreground"
                      : "text-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/op-ai"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              OP AI
            </Link>
            <JoinButton small />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="ml-auto rounded-lg p-2 text-foreground hover:bg-secondary lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </nav>

        {/* Mobile navigation panel */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-border bg-background px-4 pt-6 pb-10 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_CENTER.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "rounded-xl px-4 py-3 text-lg font-semibold transition-colors",
                      isActive(link.to)
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {(FOOTER_GROUPS[0]?.links ?? [])
                  .filter((l) => l.to !== "/about" && l.to !== "/community")
                  .map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        "rounded-xl px-4 py-3 text-lg font-semibold transition-colors",
                        isActive(link.to)
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-secondary",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                <Link
                  to="/op-ai"
                  className={cn(
                    "rounded-xl px-4 py-3 text-lg font-semibold transition-colors",
                    isActive("/op-ai") ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-secondary",
                  )}
                >
                  OP AI
                </Link>
              </div>
              <div className="mt-6 border-t border-border pt-6">
                <JoinButton className="w-full" />
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Opens the WhatsApp community in a new tab.
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <img src={logoUrl} alt={`${BRAND.name} logo`} width={192} height={64} className="h-9 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{BRAND.mission}</p>
            <p className="mt-4 text-sm font-semibold text-foreground">{BRAND.supporting}</p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) =>
                  link.to.startsWith("http") ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel={JOIN_REL}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Community WhatsApp:{" "}
              <a href={WHATSAPP.communityUrl} target="_blank" rel={JOIN_REL} className="font-medium text-foreground hover:underline">
                Join the group
              </a>
            </p>
            <p>
              Contact:{" "}
              <a
                href={`https://wa.me/${WHATSAPP.contactNumber}`}
                target="_blank"
                rel={JOIN_REL}
                className="font-medium text-foreground hover:underline"
              >
                {WHATSAPP.displayNumber}
              </a>
            </p>
            <p>
              Founders:{" "}
              {FOUNDERS_LINKS().map((f, i) => (
                <span key={f.name}>
                  {i > 0 ? " · " : ""}
                  <a href={f.linkedin} target="_blank" rel={JOIN_REL} className="font-medium text-foreground hover:underline">
                    {f.name}
                  </a>
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm sm:items-end">
            <div className="flex gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-muted-foreground">© {year} ORIGIN POINT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FOUNDERS_LINKS() {
  return [
    { name: "Vansh Raj Singh", linkedin: "https://www.linkedin.com/in/linkvansh/" },
    { name: "Dishank Singh", linkedin: "https://www.linkedin.com/in/dishanksingh29/" },
  ];
}
