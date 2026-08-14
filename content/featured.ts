export type FeaturedProject = {
  id: string;
  title: string;
  headline: string;
  /** Short editorial blurb for the stacked case-study deck */
  description: string;
  href: string;
  logo: string;
  image: string;
  badge?: string;
  clones: string;
  delivers: string;
  builtBy: string;
  tools: string[];
};

/** Home showcase cards — dummy copy/logos/metrics for now */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "auriga",
    title: "Auriga",
    headline: "Turn enterprise knowledge into a permissioned workspace people can actually ask.",
    description:
      "A permissioned knowledge workspace that turns enterprise data into answers people can trust.",
    href: "/work/auriga",
    logo: "/org/auriga-card.svg",
    image: "/work/arstelio.png",
    badge: "Most Recommended",
    clones: "214",
    delivers: "2.4× faster setup",
    builtBy: "Scry AI",
    tools: ["figma", "cursor", "chatgpt"],
  },
  {
    id: "calling",
    title: "AI Calling",
    headline: "Design voice agents around interruption, latency, and recovery — not chat on a phone.",
    description:
      "Voice agents designed for interruption, latency, and recovery — not chat bolted onto a phone.",
    href: "/work/ai-calling",
    logo: "/org/calling-card.svg",
    image: "/work/darcy.png",
    badge: "Featured",
    clones: "98",
    delivers: "1.2s reply latency",
    builtBy: "Studio",
    tools: ["figma", "framer", "claude"],
  },
  {
    id: "concentio",
    title: "Concentio",
    headline: "Make dense ops workflows feel like clear daily actions your team can ship against.",
    description:
      "Dense ops workflows simplified into clear daily actions your team can ship against.",
    href: "/work/concentio",
    logo: "/org/concentio-card.svg",
    image: "/work/adsly.png",
    clones: "156",
    delivers: "3× throughput",
    builtBy: "Concentio",
    tools: ["figma", "notion", "linear"],
  },
  {
    id: "pulse",
    title: "Pulse Board",
    headline: "Start each morning with the SaaS signals that actually need your attention.",
    description:
      "A morning board of SaaS signals that actually need attention — nothing else.",
    href: "/#projects",
    logo: "/org/scry.svg",
    image: "/work/arstelio.png",
    badge: "New",
    clones: "67",
    delivers: "12 live signals",
    builtBy: "Twin",
    tools: ["figma", "slack", "github"],
  },
  {
    id: "northstar",
    title: "Northstar",
    headline: "Ship the first product surface for an early-stage AI workflow without drowning in settings.",
    description:
      "The first product surface for an early-stage AI workflow — without drowning in settings.",
    href: "/#projects",
    logo: "/org/studio.svg",
    image: "/work/darcy.png",
    clones: "41",
    delivers: "6 wks to beta",
    builtBy: "Studio",
    tools: ["cursor", "claude", "framer"],
  },
];

export const stackTools = [
  { id: "figma", name: "Figma", color: "#F24E1E" },
  { id: "framer", name: "Framer", color: "#0055FF" },
  { id: "cursor", name: "Cursor", color: "#8B5CF6" },
  { id: "chatgpt", name: "ChatGPT", color: "#10A37F" },
  { id: "claude", name: "Claude", color: "#D97757" },
  { id: "github", name: "GitHub", color: "#E6EDF3" },
  { id: "notion", name: "Notion", color: "#FFFFFF" },
  { id: "arc", name: "Arc", color: "#F2644E" },
  { id: "slack", name: "Slack", color: "#E01E5A" },
  { id: "linear", name: "Linear", color: "#5E6AD2" },
  { id: "spotify", name: "Spotify", color: "#1DB954" },
  { id: "midjourney", name: "Midjourney", color: "#A0B4FF" },
] as const;
