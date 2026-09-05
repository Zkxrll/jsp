"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";

const VERIFY_DURATION = 10000;
const REQUIRED_SERVERS = 2;

const DiscordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.54 4.34A16.66 16.66 0 0 0 15.4 3l-.5 1.03a15.2 15.2 0 0 0-5.8 0L8.6 3a16.66 16.66 0 0 0-4.14 1.34C1.84 8.38 1.13 12.32 1.5 16.2a16.77 16.77 0 0 0 5.07 2.58l1.23-1.68a10.68 10.68 0 0 1-1.94-.93l.47-.36a11.88 11.88 0 0 0 10.8 0l.48.36c-.62.36-1.27.67-1.94.93l1.23 1.68a16.77 16.77 0 0 0 5.07-2.58c.43-4.5-.73-8.4-2.43-11.86ZM8.58 14.8c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm6.84 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

export default function GetKeyPage() {
  const [joinedServers, setJoinedServers] = useState<boolean[]>([false, false]);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const markServerClicked = (index: number) => {
    setJoinedServers((current) => {
      if (current[index]) return current;
      const next = [...current];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    if (joinedServers.filter(Boolean).length !== REQUIRED_SERVERS || started) return;

    setStarted(true);
    setProgress(0);
    setReady(false);

    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / VERIFY_DURATION) * 100)
      );

      setProgress(nextProgress);

      if (elapsed < VERIFY_DURATION) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setReady(true);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [joinedServers, started]);

  const continueToKey = () => {
    if (!ready) return;
    window.location.href = siteConfig.keySystemUrl;
  };

  return (
    <div className="site-shell relative min-h-dvh overflow-hidden">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div
        className="pointer-events-none absolute left-1/2 top-24 z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[18rem] z-0 h-[25rem] w-[25rem] -translate-x-1/2 rounded-full border border-[#8b5cf6]/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[21rem] z-0 h-[19rem] w-[19rem] -translate-x-1/2 rounded-full border border-[#a78bfa]/10"
        aria-hidden="true"
      />

      <SiteHeader />

      <main className="relative z-10 flex min-h-[calc(100dvh-160px)] items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <section className="w-full max-w-2xl">
          <div className="mb-5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6] shadow-[0_0_14px_rgba(139,92,246,0.8)]" />
            Secure access gateway
          </div>

          <div className="animate-rise relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#0c1018]/90 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_35%)]" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/70 to-transparent" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 text-[#a78bfa] shadow-[0_0_30px_rgba(139,92,246,0.12)]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
                      <path d="m9.5 12 1.7 1.7 3.5-3.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a78bfa]">
                      ZKX HUB / ACCESS
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      Verification required
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                  Online
                </div>
              </div>

              <div className="mt-8 max-w-xl">
                <p className="eyebrow">KEY ACCESS</p>
                <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl">
                  Unlock your access
                  <span className="block bg-gradient-to-r from-white via-[#c4b5fd] to-[#8b5cf6] bg-clip-text text-transparent">
                    in two steps.
                  </span>
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-7 text-ink-muted sm:text-base">
                  Join both Discord communities, then keep this page open while your access is prepared.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((index) => {
                  const complete = joinedServers[index];
                  const isSecond = index === 1;

                  return (
                    <a
                      key={index}
                      href={isSecond ? "https://discord.gg/fhpaqqu3f" : siteConfig.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => markServerClicked(index)}
                      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 ${
                        complete
                          ? "border-emerald-400/25 bg-emerald-400/[0.06]"
                          : "border-white/[0.07] bg-white/[0.025] hover:border-[#8b5cf6]/35 hover:bg-[#8b5cf6]/[0.07]"
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
                            complete
                              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                              : "border-[#5865F2]/20 bg-[#5865F2]/10 text-[#8790ff] group-hover:scale-105"
                          }`}
                        >
                          {complete ? <CheckIcon /> : <DiscordIcon />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-display text-sm font-semibold text-ink">
                              {isSecond ? "Partner Discord" : "Zkx Hub Discord"}
                            </p>
                            <span className="rounded-full border border-white/[0.07] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-ink-muted">
                              Step {index + 1}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-xs text-ink-muted">
                            {complete ? "Community opened ✓" : "Open invite in a new tab"}
                          </p>
                        </div>

                        <span className={`text-lg transition-transform duration-300 ${complete ? "text-emerald-300" : "text-[#a78bfa] group-hover:translate-x-1"}`}>
                          {complete ? "✓" : "↗"}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <div className={`h-px flex-1 ${joinedServers[0] ? "bg-[#8b5cf6]/30" : "bg-white/[0.06]"}`} />
                <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.16em] text-ink-muted">
                  <span className="text-[#a78bfa]">{joinedServers.filter(Boolean).length}</span>
                  <span>/</span>
                  <span>{REQUIRED_SERVERS}</span>
                  <span>completed</span>
                </div>
                <div className={`h-px flex-1 ${joinedServers[1] ? "bg-[#8b5cf6]/30" : "bg-white/[0.06]"}`} />
              </div>

              {started ? (
                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                        {ready ? "Access ready" : "Preparing access"}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">
                        {ready
                          ? "Everything is ready. You can continue to the key system."
                          : "Checking your verification window..."}
                      </p>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#a78bfa]">{progress}%</span>
                  </div>

                  <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="relative h-full rounded-full bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#c4b5fd] transition-[width] duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-y-0 right-0 w-16 animate-pulse bg-white/30 blur-sm" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] p-4 text-center">
                  <p className="text-xs text-ink-muted">
                    Complete both Discord steps above to start verification.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={continueToKey}
                disabled={!ready}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display text-sm font-semibold transition-all duration-300 ${
                  ready
                    ? "bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] text-white shadow-[0_10px_35px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(124,58,237,0.4)]"
                    : "cursor-not-allowed border border-white/[0.06] bg-white/[0.04] text-ink-muted"
                }`}
              >
                <span>{ready ? "Continue to Key System" : "Complete the steps above"}</span>
                <span aria-hidden="true">{ready ? "→" : "•"}</span>
              </button>

              <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row">
                <p className="text-center text-[10px] leading-5 text-ink-muted sm:text-left">
                  Discord verification is used to unlock access to the key system.
                </p>
                <Link
                  href="/"
                  className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
                >
                  ← Back to Zkx Hub
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-5 text-[9px] font-mono uppercase tracking-[0.14em] text-ink-muted/70">
            <span>Encrypted session</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Secure gateway</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Zkx Hub</span>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
