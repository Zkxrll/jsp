import type { ReactNode } from "react";

/**
 * Section heading, identical everywhere: label and title on the left; on
 * wide screens the lede moves to the right column, level with the title.
 * As a page title (h1) the title column is wider, for the display size.
 */
export function SectionHeader({
  label,
  title,
  children,
  as: Heading = "h2",
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={`grid gap-4 lg:items-end lg:gap-12 ${
        Heading === "h1" ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "lg:grid-cols-2"
      }`}
      data-reveal
    >
      <div>
        <p className="label label-accent">{label}</p>
        <Heading className={`${Heading === "h1" ? "display" : "section-title"} mt-4`}>{title}</Heading>
      </div>
      {children && <p className="lede max-w-xl">{children}</p>}
    </div>
  );
}
