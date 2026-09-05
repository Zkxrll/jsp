"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";

const VERIFY_DURATION = 10000;
const REQUIRED_SERVERS = 2;

type ServerState = "idle" | "loading" | "complete";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M19.54 4.34A16.66 16.66 0 0 0 15.4 3l-.5 1.03a15.2 15.2 0 0 0-5.8 0L8.6 3a16.66 16.66 0 0 0-4.14 1.34C1.84 8.38 1.13 12.32 1.5 16.2a16.77 16.77 0 0 0 5.07 2.58l1.23-1.68a10.68 10.68 0 0 1-1.94-.93l.47-.36a11.88 11.88 0 0 0 10.8 0l.48.36c-.62.36-1.27.67-1.94.93l1.23 1.68a16.77 16.77 0 0 0 5.07-2.58c.43-4.5-.73-8.4-2.43-11.86ZM8.58 14.8c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm6.84 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const Spinner = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
    <path d="M20 12a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function GetKeyPage() {
  const [serverState, setServerState] = useState<ServerState[]>(["idle", "idle"]);
  const [serverProgress, setServerProgress] = useState<number[]>([0, 0]);
  const startTimes = useRef<(number | null)[]>([null, null]);

  const startServerVerification = (index: number) => {
    if (serverState[index] !== "idle") return;

    startTimes.current[index] = performance.now();

    setServerState((current) => {
      const next = [...current];
      next[index] = "loading";
      return next;
    });

    setServerProgress((current) => {
      const next = [...current];
      next[index] = 0;
      return next;
    });
  };

  useEffect(() => {
    const activeIndexes = serverState
      .map((state, index) => (state === "loading" ? index : -1))
      .filter((index) => index !== -1);

    if (activeIndexes.length === 0) return;

    let frame = 0;

    const update = (now: number) => {
      const nextProgress = [...serverProgress];

      activeIndexes.forEach((index) => {
        const startedAt = startTimes.current[index];
        if (startedAt === null) return;

        const elapsed = now - startedAt;
        nextProgress[index] = Math.min(100, Math.round((elapsed / VERIFY_DURATION) * 100));
      });

      setServerProgress(nextProgress);

      const finishedIndexes = activeIndexes.filter((index) => {
        const startedAt = startTimes.current[index];
        return startedAt !== null && now - startedAt >= VERIFY_DURATION;
      });

      if (finishedIndexes.length > 0) {
        setServerState((current) => {
          const next = [...current];
          finishedIndexes.forEach((index) => {
            next[index] = "complete";
            startTimes.current[index] = null;
          });
          return next;
        });
      }

      if (activeIndexes.some((index) => startTimes.current[index] !== null)) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [serverState, serverProgress]);

  const completedServers = serverState.filter((state) => state === "complete").length;
  const ready = completedServers === REQUIRED_SERVERS;

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

      <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[18rem] z-0 h-[25rem] w-[25rem] -translate-x-1/2 rounded-full border border-[#8b5cf6]/10" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-[21rem] z-0 h-[19rem] w-[19rem] -translate-x-1/2 rounded-full border border-[#a78bfa]/10" aria-hidden="true" />

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
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
                      <path d="m9.5 12 1.7 1.7 3.5-3.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#a78bfa]">ZKX HUB / ACCESS</p>
                    <p className="mt-1 text-xs text-ink-muted">Verification required</p>
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
                  <span className="block bg-gradient-to-r from-white via-[#c4b5fd] to-[#8b5cf6] bg-clip-text text-transparent">in two steps.</span>
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-7 text-ink-muted sm:text-base">
                  Open both Discord communities. Each step runs its own 10-second verification timer.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((index) => {
                  const state = serverState[index] ?? "idle";
                  const progress = serverProgress[index] ?? 0;
                  const isSecond = index === 1;
                  const isComplete = state === "complete";
                  const isLoading = state === "loading";
                  const radius = 15;
                  const circumference = 2 * Math.PI * radius;
                  const dashOffset = circumference - (progress / 100) * circumference;

                  return (
                    <a
                      key={index}
                      href={isSecond ? "https://discord.gg/fhpaqqu3f" : siteConfig.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => startServerVerification(index)}
                      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                        isComplete
                          ? "border-emerald-400/25 bg-emerald-400/[0.06]"
                          : isLoading
                            ? "border-[#8b5cf6]/30 bg-[#8b5cf6]/[0.06]"
                            : "border-white/[0.07] bg-white/[0.025] hover:-translate-y-1 hover:border-[#8b5cf6]/35 hover:bg-[#8b5cf6]/[0.07]"
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-center gap-3">
                        <div className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
                          isComplete
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : isLoading
                              ? "border-[#8b5cf6]/25 bg-[#8b5cf6]/10 text-[#a78bfa]"
                              : "border-[#5865F2]/20 bg-[#5865F2]/10 text-[#8790ff] group-hover:scale-105"
                        }`}>
                          {isLoading ? (
                            <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90 drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]" aria-hidden="true">
                              <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2.5" />
                              <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
                            </svg>
                          ) : isComplete ? (
                            <CheckIcon />
                          ) : (
                            <DiscordIcon />
                          )}

                          {isLoading && (
                            <span className="absolute inset-0 grid place-items-center text-[8px] font-mono font-bold text-[#c4b5fd]">
                              {progress}%
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-display text-sm font-semibold text-ink">{isSecond ? "Partner Discord" : "Zkx Hub Discord"}</p>
                            <span className="rounded-full border border-white/[0.07] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-ink-muted">Step {index + 1}</span>
                          </div>
                          <p className="mt-1 truncate text-xs text-ink-muted">
                            {isComplete ? "Verification complete ✓" : isLoading ? "Verifying access..." : "Open invite in a new tab"}
                          </p>
                        </div>

                        <span className={`shrink-0 text-lg transition-transform duration-300 ${isComplete ? "text-emerald-300" : isLoading ? "text-[#a78bfa]" : "text-[#a78bfa] group-hover:translate-x-1"}`}>
                          {isComplete ? "✓" : isLoading ? <Spinner /> : "↗"}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-7 flex items-center gap-3">
                <div className={`h-px flex-1 ${serverState[0] !== "idle" ? "bg-[#8b5cf6]/30" : "bg-white/[0.06]"}`} />
                <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.16em] text-ink-muted">
                  <span className="text-[#a78bfa]">{completedServers}</span>
                  <span>/</span>
                  <span>{REQUIRED_SERVERS}</span>
                  <span>verified</span>
                </div>
                <div className={`h-px flex-1 ${serverState[1] !== "idle" ? "bg-[#8b5cf6]/30" : "bg-white/[0.06]"}`} />
              </div>

              <button
                type="button"
                onClick={continueToKey}
                disabled={!ready}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display text-sm font-semibold transition-all duration-300 ${
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
