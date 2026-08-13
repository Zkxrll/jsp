"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const key = useMemo(() => pathname, [pathname]);

  return (
    <div key={key} className="page-transition">
      {children}
    </div>
  );
}
