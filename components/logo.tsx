interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="zkx-logo" x1="7" y1="5" x2="37" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
      </defs>

      <path
        d="M6 8.5h17.5L9.5 22 24 35.5H6"
        stroke="url(#zkx-logo)"
        strokeWidth="2.8"
        strokeLinejoin="miter"
      />
      <path
        d="M29 8v28M29 22 39 9M29 22l10 13"
        stroke="url(#zkx-logo)"
        strokeWidth="2.8"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <path
        d="M23.5 8.5 20 13.5M23.5 35.5 20 30.5"
        stroke="url(#zkx-logo)"
        strokeWidth="2.8"
        strokeLinecap="square"
      />
    </svg>
  );
}
