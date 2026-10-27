"use client";

import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";
import { KeyIcon } from "./icons";

type GetKeyButtonProps = {
  /** Where on the page the click came from, for analytics. */
  source: "header" | "hero" | "community";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASS = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

/** Sends visitors directly to the key system; Discord is optional. */
export function GetKeyButton({ source, size = "md", className = "" }: GetKeyButtonProps) {
  return (
    <a
      href={siteConfig.keySystemUrl}
      onClick={() => {
        track({ name: "get_key_clicked", props: { source } });
        track({ name: "get_key_redirected", props: { destination: siteConfig.keySystemUrl } });
      }}
      className={`btn btn-primary ${SIZE_CLASS[size]} ${className}`}
    >
      <KeyIcon />
      Get Key
    </a>
  );
}
