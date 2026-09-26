"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { KeyIcon } from "./icons";

type GetKeyButtonProps = {
  /** Where on the page the click came from, for analytics. */
  source: "header" | "hero" | "community";
  size?: "sm" | "md" | "lg";
  className?: string;
  /**
   * The hero button is the origin of the Get Key card: on navigation it
   * grows into the card, and "Back" shrinks the card back into it. Only one
   * button per page may carry this, or the browser can't pair them.
   */
  morph?: boolean;
};

const SIZE_CLASS = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

/**
 * The one Get Key call to action. A real <Link>: prefetched, client-side,
 * no full reload. Never disabled, because ad scripts can open a separate tab
 * and the page must stay clickable when the user returns.
 */
export function GetKeyButton({ source, size = "md", className = "", morph = false }: GetKeyButtonProps) {
  const link = (
    <Link
      href="/get-key"
      transitionTypes={morph ? ["nav-forward", "key-morph"] : ["nav-forward"]}
      onClick={() => track({ name: "get_key_clicked", props: { source } })}
      className={`btn btn-primary ${SIZE_CLASS[size]} ${className}`}
    >
      <KeyIcon />
      Get Key
    </Link>
  );

  if (!morph) return link;

  return (
    <ViewTransition name="get-key" share={{ "key-morph": "key-morph", default: "none" }} default="none">
      {link}
    </ViewTransition>
  );
}
