interface LogoProps {
  className?: string;
}

/**
 * Frame-corner mark with a keyframe diamond at center — a nod to
 * "rFrame" and to the crop-frame / keyframe-diamond vocabulary used
 * throughout animation software. Pure inline SVG: no image asset to
 * host, optimize, or keep in sync with the favicon.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M2 10V4a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M30 10V4a2 2 0 0 0-2-2h-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M2 22v6a2 2 0 0 0 2 2h6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M30 22v6a2 2 0 0 1-2 2h-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <rect x="12.5" y="12.5" width="7" height="7" fill="currentColor" transform="rotate(45 16 16)" />
    </svg>
  );
}
