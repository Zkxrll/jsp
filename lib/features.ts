/**
 * Feature catalog for Zkx Hub.
 *
 * Every entry here maps to a real tab or groupbox in the script's in-game
 * Obsidian menu. Copy is written from how each feature actually behaves, so
 * the site and the menu never drift apart. Add or change a feature in one
 * place: this file. Nothing renders a feature that the script does not have.
 */

export type FeatureIcon =
  | "crosshair"
  | "shield"
  | "sliders"
  | "eye"
  | "ghost"
  | "pulse"
  | "reticle"
  | "globe"
  | "bolt"
  | "move";

export interface Feature {
  /** Menu-accurate name, matches the tab or groupbox it comes from. */
  title: string;
  /** The tab it lives under in-game, shown as a small kicker. */
  tab: string;
  /** One or two plain sentences describing real behaviour. */
  blurb: string;
  /** Real toggle names from the menu, rendered as chips. */
  tags: readonly string[];
  icon: FeatureIcon;
  /** Leads the grid: rendered wider on large screens. */
  featured?: boolean;
}

export const features: readonly Feature[] = [
  {
    title: "Aimbot",
    tab: "Combat",
    icon: "crosshair",
    featured: true,
    blurb:
      "Silent lands your shots without moving your view. Camera turns for you at a speed you set. Flickbot adds a human looking flick with curvature and humanness sliders, and Triggerbot fires the moment a target is clean.",
    tags: ["Silent", "Camera", "Flickbot", "Triggerbot", "FOV control"],
  },
  {
    title: "Anti-Aim & Voidspam",
    tab: "Defense",
    icon: "shield",
    featured: true,
    blurb:
      "Voidspam throws your replicated root into the void every server tick, so incoming shots resolve against a copy and miss. Anti-Aim spoofs the yaw you replicate with spin, jitter, or a backwards facing, and can forge the server look angle.",
    tags: ["Voidspam", "Spin", "Jitter", "Server Look Forge"],
  },
  {
    title: "Weapon Mods",
    tab: "Combat",
    icon: "sliders",
    blurb:
      "Attack speed, faster reload, no spread, no recoil, faster ADS and equip, plus grenade fuse control. Every slider is capped where it still plays clean.",
    tags: ["No Spread", "No Recoil", "Fast Reload", "Auto Fire"],
  },
  {
    title: "ESP",
    tab: "ESP",
    icon: "eye",
    blurb:
      "Player ESP with a live preview panel next to the options, so you set the look you want before you take it into a match.",
    tags: ["Players", "Live Preview"],
  },
  {
    title: "Chams & Tracers",
    tab: "Client Effects",
    icon: "ghost",
    blurb:
      "Chams on characters, arms, and items with your own material and color. Bullet tracers draw a glowing beam along every shot, with a springy expand you can tune.",
    tags: ["Character", "Arms", "Item", "Tracers"],
  },
  {
    title: "Hit & Kill Feedback",
    tab: "Client Effects",
    icon: "pulse",
    blurb:
      "Sound and chams the moment you damage or eliminate someone. Load your own sound IDs, local files, or URLs, and give headshots and body shots different hitmarkers.",
    tags: ["Hitmarkers", "Custom Sounds", "Kill Chams"],
  },
  {
    title: "Crosshair",
    tab: "Crosshair",
    icon: "reticle",
    blurb:
      "Presets styled after popular shooters, or build your own with outline, spread, rotation, and text. Follow-target mode drags the crosshair toward whoever your aim is resolving.",
    tags: ["Presets", "Custom", "Animated", "Follow"],
  },
  {
    title: "World & Lighting",
    tab: "World",
    icon: "globe",
    blurb:
      "A full lighting desk: bloom, color grading, sun rays, skybox, atmosphere, weather, and lightning. Save what you like as a preset and load it next session.",
    tags: ["Bloom", "Skybox", "Weather", "Lightning"],
  },
  {
    title: "Automation",
    tab: "Automation",
    icon: "bolt",
    blurb:
      "Unlock all, auto queue, auto loadout, auto vote, and reward claiming run in the background while you play instead of asking for your attention.",
    tags: ["Unlock All", "Auto Queue", "Rewards"],
  },
  {
    title: "Movement & Misc",
    tab: "Movement",
    icon: "move",
    blurb:
      "A movement recorder and animation player, plus a device spoof and a staff detector that warns you the moment a moderator loads into the server.",
    tags: ["Recorder", "Device Spoof", "Staff Detector"],
  },
] as const;

export interface Stat {
  value: string;
  label: string;
}

/** Honest numbers only. Counted from the menu, nothing inflated. */
export const stats: readonly Stat[] = [
  { value: "11", label: "Feature tabs" },
  { value: "Silent + Camera", label: "Aim modes" },
  { value: "Lifetime", label: "One key, one payment" },
] as const;

/** The real top-level tabs, in menu order. Listed on the landing page. */
export const menuTabs = [
  "ESP",
  "Combat",
  "Client Effects",
  "Crosshair",
  "World",
  "Core",
  "Defense",
  "Automation",
  "Movement",
  "Misc",
  "Debug",
] as const;
