/** Discord wordmark glyph. Inherits color from `currentColor`. */
export function DiscordGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.54 4.34A16.66 16.66 0 0 0 15.4 3l-.5 1.03a15.2 15.2 0 0 0-5.8 0L8.6 3a16.66 16.66 0 0 0-4.14 1.34C1.84 8.38 1.13 12.32 1.5 16.2a16.77 16.77 0 0 0 5.07 2.58l1.23-1.68a10.68 10.68 0 0 1-1.94-.93l.47-.36a11.88 11.88 0 0 0 10.8 0l.48.36c-.62.36-1.27.67-1.94.93l1.23 1.68a16.77 16.77 0 0 0 5.07-2.58c.43-4.5-.73-8.4-2.43-11.86ZM8.58 14.8c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm6.84 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-1 2.2-2 2.2Z" />
    </svg>
  );
}
