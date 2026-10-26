import { useReducedMotion } from "framer-motion";

/** Shared entrance variants. Falls back to no motion when reduced. */
export function useRevealVariants() {
  const reduced = useReducedMotion();
  return {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };
}

export const springSoft = { type: "spring", stiffness: 220, damping: 26 } as const;
