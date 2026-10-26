import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-accent-foreground",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-h2 text-balance text-foreground">{title}</h2>
      {description ? <p className="text-lead mt-4 text-pretty">{description}</p> : null}
    </Reveal>
  );
}
