"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { KeyIcon } from "./icons";

type GetKeyButtonProps = {
  /** Where on the page the click came from, for analytics. */
  source: "header" | "hero" | "community";
  size?: "sm" | "md";
  className?: string;
};

/**
 * The one Get Key call to action, used everywhere it appears so every
 * instance looks and behaves the same. A real <Link>: prefetched, client-side
 * navigation, no full page reload. Deliberately never disabled, because ad
 * scripts can open a separate tab and the page must stay clickable when the
 * user returns.
 */
export function GetKeyButton({ source, size = "md", className = "" }: GetKeyButtonProps) {
  return (
    <Link
      href="/get-key"
      onClick={() => track({ name: "get_key_clicked", props: { source } })}
      className={`btn btn-primary ${size === "sm" ? "btn-sm" : ""} ${className}`}
    >
      <KeyIcon />
      Get Key
    </Link>
  );
}
