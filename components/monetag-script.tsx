"use client";

import { useEffect } from "react";

function isSafari() {
  const ua = navigator.userAgent;

  return (
    /Safari\//.test(ua) &&
    !/Chrome\//.test(ua) &&
    !/Chromium\//.test(ua) &&
    !/CriOS\//.test(ua) &&
    !/FxiOS\//.test(ua) &&
    !/EdgiOS\//.test(ua) &&
    !/OPiOS\//.test(ua) &&
    !/Android/.test(ua)
  );
}

export function MonetagScript() {
  useEffect(() => {
    if (isSafari()) return;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-zones="274201"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://quge5.com/88/tag.min.js";
    script.dataset.zone = "274201";
    script.dataset.zones = "274201";
    script.async = true;
    script.dataset.cfasync = "false";

    document.head.appendChild(script);
  }, []);

  return null;
}
