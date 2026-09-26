/**
 * Small UI icons. One stroke weight, one 24px grid, all `currentColor`, so
 * they match each other and whatever text they sit next to. Size them from
 * the parent (.btn svg, .step-badge svg) or with a className.
 */

type IconProps = { className?: string };

function Stroke({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2.5 2.5M19 13l2.5 2.5" />
    </Stroke>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m5 12 4 4L19 6" />
    </Stroke>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </Stroke>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Stroke>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Stroke>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </Stroke>
  );
}

export function Spinner({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`spinner ${className ?? ""}`} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M20 12a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
