"use client";

import { useEffect } from "react";

/**
 * PopAds loader, injected on the client.
 *
 * The original markup put this inline blob inside a <Script> in the document
 * <head>. Under Next 16 / Turbopack that path threw
 * "Failed to execute 'appendChild' on 'Node': Unexpected token ')'" on every
 * page load. Injecting a plain <script> element ourselves runs the exact same
 * loader with no framework wrapper in the way. Same behaviour, no crash.
 */
const POPADS_SRC = `(function(){var j=window,u="a946ec030fb2a368a1b60d68ac78edb3",c=[["siteId",944*942-330+4426463],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],l=["d3d3LnByZW1pdW12ZXJ0aXNpbmcuY29tL0R2ZC9kaXZhLm1pbi5qcw==","ZDJqMDQyY2oxNDIxd2kuY2xvdWRmcm9udC5uZXQvVkVnVnYvcC93aW50ZXJjb29sZXIubWluLmNzcw=="],d=-1,v,g,z=function(){clearTimeout(g);d++;if(l[d]&&!(1813774913000<(new Date).getTime()&&1<d)){v=j.document.createElement("script");v.type="text/javascript";v.async=!0;var y=j.document.getElementsByTagName("script")[0];v.src="https://"+atob(l[d]);v.crossOrigin="anonymous";v.onerror=z;v.onload=function(){clearTimeout(g);j[u.slice(0,16)+u.slice(0,16)]||z()};g=setTimeout(z,5E3);y.parentNode.insertBefore(v,y)}};if(!j[u]){try{Object.freeze(j[u]=c)}catch(e){}z()})();`;

export function PopAdsScript() {
  useEffect(() => {
    if (document.getElementById("popads-inline")) return;

    const script = document.createElement("script");
    script.id = "popads-inline";
    script.type = "text/javascript";
    script.dataset.cfasync = "false";
    script.text = POPADS_SRC;
    document.body.appendChild(script);
  }, []);

  return null;
}
