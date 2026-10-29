"use client";

import Link from "next/link";

import { track } from "@/lib/analytics";
import { KeyIcon } from "./icons";

type GetKeyButtonProps = {
  /** Where on the page the click came from, for analytics. */
  source: "header" | "hero" | "community";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASS = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

/** Takes visitors to the Discord step before they can access the key system. */
export function GetKeyButton({ source, size = "md", className = "" }: GetKeyButtonProps) {
  return (
    <Link
      href="/get-key"
      transitionTypes={["nav-forward", "key-morph"]}
      onClick={() => {
        track({ name: "get_key_clicked", props: { source } });
      }}
      className={`btn btn-primary ${SIZE_CLASS[size]} ${className}`}
    >
      <KeyIcon />
      Get Key
    </Link>
  );
}
