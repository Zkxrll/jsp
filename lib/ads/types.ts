/**
 * Provider-agnostic ad-slot contract.
 *
 * The rest of the app only ever imports `AdSlot` from `./ad-slot` and
 * never talks to a specific network directly. See ./README.md for how
 * to register a provider.
 */

export type AdSlotId = "footer" | "interstitial";

export interface AdProvider {
  /** Internal id, e.g. "example-network". Used only for logging/debugging. */
  id: string;
  /** Script tag `src`. Omit for providers that self-inject via an inline snippet instead. */
  scriptSrc?: string;
  /** Called once the script tag has loaded, if the provider needs a manual init call. */
  onLoad?: () => void;
}

export interface AdSlotProps {
  slot: AdSlotId;
  className?: string;
}
