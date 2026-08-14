import { stackTools } from "@/content/featured";

type StackTool = (typeof stackTools)[number];
type ToolId = StackTool["id"];

const toolById = Object.fromEntries(stackTools.map((t) => [t.id, t])) as Record<
  ToolId,
  StackTool
>;

const GROUPS: { label: string; ids: ToolId[] }[] = [
  { label: "Design", ids: ["figma", "framer", "notion", "midjourney"] },
  { label: "Build", ids: ["cursor", "github", "linear", "arc"] },
  { label: "AI", ids: ["chatgpt", "claude", "slack", "spotify"] },
];

function ToolGlyph({ id, className = "size-7" }: { id: string; className?: string }) {
  switch (id) {
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill="#F24E1E" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8Z" />
          <path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z" />
          <path fill="#1ABCFE" d="M12 0h4a4 4 0 0 1 0 8h-4V0Z" />
          <path fill="#0ACF83" d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          <path fill="#FF7262" d="M8 0h4v8H8a4 4 0 1 1 0-8Z" />
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill="#0055FF" d="M4 0h16v8H12l8 8H12v8l-8-8V0Z" />
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#1a1a1c" />
          <path fill="#8B5CF6" d="M7 5.5 18 12l-6.2 1.4L9.5 19 7 5.5Z" />
        </svg>
      );
    case "chatgpt":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#10A37F" />
          <path
            fill="#fff"
            d="M12.4 5.2c1.3-.1 2.5.4 3.3 1.3l.1.2c.6-.2 1.3-.2 1.9.1a3.1 3.1 0 0 1 1.6 2.7v.2c.7.5 1.1 1.3 1.1 2.2 0 .9-.4 1.7-1.1 2.2v.2a3.1 3.1 0 0 1-1.6 2.7c-.6.3-1.3.3-1.9.1l-.1.2c-.8.9-2 1.4-3.3 1.3-1.1-.1-2.1-.7-2.7-1.6l-.2-.1c-.6.3-1.3.3-1.9.1A3.1 3.1 0 0 1 5.9 14v-.2A2.8 2.8 0 0 1 4.8 11c0 .9.4-1.7 1.1-2.2V8.6A3.1 3.1 0 0 1 7.5 5.9c.6-.3 1.3-.3 1.9-.1l.2-.1c.6-.9 1.6-1.5 2.8-1.5Zm0 1.6c-.7 0-1.3.3-1.7.9l-.4.6-.7-.2a1.6 1.6 0 0 0-1.9 1.5v.7l-.6.4A1.3 1.3 0 0 0 6.4 11c0 .5.2.9.6 1.2l.6.4v.7c0 .8.5 1.4 1.2 1.6.3.1.6 0 .9-.1l.7-.3.4.6c.4.5 1 .8 1.6.9.7 0 1.3-.3 1.7-.9l.4-.6.7.2c.3.1.6.1.9 0 .7-.2 1.2-.8 1.2-1.6v-.7l.6-.4c.4-.3.6-.7.6-1.2 0-.5-.2-.9-.6-1.2l-.6-.4V8.6c0-.8-.5-1.4-1.2-1.6a1.5 1.5 0 0 0-.9.1l-.7.2-.4-.6a2 2 0 0 0-1.6-.9Z"
          />
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#D97757" />
          <path
            fill="#fff"
            d="M7.2 16.8 10.8 7h2.4l3.6 9.8h-2.3l-.7-2H10.2l-.7 2H7.2Zm3.6-3.8h2.4L12 9.4l-1.2 3.6Z"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#24292F" />
          <path
            fill="#fff"
            d="M12 4.2a7.8 7.8 0 0 0-2.5 15.2c.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-.9-2.5-.9-.3-.8-.8-1-.8-1-.7-.5.1-.5.1-.5.7.1 1.1.8 1.1.8.6 1.1 1.7.8 2.1.6.1-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.5.8-2-.1-.2-.3-1 .1-2s1.1-.3 2.2.8a7.4 7.4 0 0 1 4 0c1.1-1.1 2-.9 2.2-.8.4 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.3.5.7.5 1.4v2.1c0 .2.1.5.5.4A7.8 7.8 0 0 0 12 4.2Z"
          />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="5" fill="#fff" />
          <path
            fill="#000"
            d="M7.2 6.2h7.8c.4 0 .8.1 1.1.4l1.7 1.8c.2.2.3.5.3.8v8.4c0 .6-.5 1.1-1.1 1.1H8.4c-.4 0-.8-.1-1.1-.4L5.8 16.6a1.3 1.3 0 0 1-.3-.8V7.3c0-.6.5-1.1 1.7-1.1Zm1.3 2.2v7.2h6.7V9.8l-1.5-1.4H8.5Z"
          />
        </svg>
      );
    case "arc":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <defs>
            <linearGradient id="arcg-field" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FFB86C" />
              <stop offset="0.5" stopColor="#F2644E" />
              <stop offset="1" stopColor="#7C5CFF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#arcg-field)"
            d="M12 3c4.4 0 8 2.7 8 7.2 0 3.2-1.8 5.5-4.4 6.5L12 21l-3.6-4.3C5.8 15.7 4 13.4 4 10.2 4 5.7 7.6 3 12 3Zm0 2.4c-2.8 0-5 1.6-5 4.8 0 2.1 1.1 3.6 2.9 4.3L12 16.8l2.1-2.3c1.8-.7 2.9-2.2 2.9-4.3 0-3.2-2.2-4.8-5-4.8Z"
          />
        </svg>
      );
    case "slack":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#4A154B" />
          <path
            fill="#fff"
            d="M9.2 14.4a1.5 1.5 0 1 1-1.5 1.5v-1.5h1.5Zm.4-1.9a1.5 1.5 0 1 1 0-3H14v1.5a1.5 1.5 0 0 1-1.5 1.5H9.6Zm4.8 2.3a1.5 1.5 0 1 1 1.5-1.5v1.5h-1.5Zm-2.3.4a1.5 1.5 0 1 1 3 0V10h-1.5a1.5 1.5 0 0 1-1.5 1.5v3.7Zm-2.3-4.8A1.5 1.5 0 1 1 8.2 8.9h1.5v1.5Zm-.4 2.3A1.5 1.5 0 1 1 8.2 14.8H14v-1.5a1.5 1.5 0 0 1-1.5-1.5H9.4Z"
          />
        </svg>
      );
    case "linear":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#5E6AD2" />
          <path
            fill="#fff"
            d="M6.5 14.8 14.8 6.5A7.2 7.2 0 0 0 6.5 14.8Zm1.7 2A7.2 7.2 0 0 0 16.8 8.2L8.2 16.8Z"
          />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="11" fill="#1DB954" />
          <path
            fill="#000"
            d="M17.2 10.4c-2.8-1.7-7.4-1.8-10.1-1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.1-1 8.2-.8 11.4 1.1.4.2.5.7.3 1-.2.4-.7.5-1.2.3Zm-.2 2.5c-.2.3-.6.4-1 .2-2.4-1.5-6-1.9-8.8-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.2-1 7.2-.5 9.9 1.2.4.2.5.6.3 1Zm-1.1 2.4c-.2.2-.4.3-.7.2-2.1-1.3-4.7-1.6-7.8-.9-.3.1-.5-.1-.6-.3-.1-.3.1-.5.3-.6 3.4-.8 6.3-.4 8.6 1 .2.2.3.5.2.6Z"
          />
        </svg>
      );
    case "midjourney":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#111" />
          <path
            fill="#A0B4FF"
            d="M7 16.5 10.5 7h3L17 16.5h-2.4l-.8-2.4H10.2l-.8 2.4H7Zm4-4.2h2L12 9.2l-1 3.1Z"
          />
        </svg>
      );
    default:
      return <span className={`rounded-lg bg-white/20 ${className}`} />;
  }
}

function ToolTile({ tool }: { tool: StackTool }) {
  return (
    <li
      className="group flex w-[60px] flex-col items-center gap-1.5 sm:w-[72px] sm:gap-2"
      style={{ ["--tool-glow" as string]: tool.color }}
    >
      <div className="flex size-[60px] items-center justify-center rounded-[16px] border border-white/[0.06] bg-[#161618] shadow-[0_0_0_transparent] transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-white/[0.14] group-hover:bg-white/[0.04] group-hover:shadow-[0_10px_28px_-14px_color-mix(in_srgb,var(--tool-glow)_55%,transparent)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:size-[72px] sm:rounded-[18px]">
        <span className="grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0 motion-reduce:transition-none">
          <ToolGlyph id={tool.id} className="size-7 sm:size-9" />
        </span>
      </div>
      <span className="max-w-full truncate text-center text-[10px] leading-none text-white/40 transition-colors duration-300 group-hover:text-white/75 motion-reduce:transition-none sm:text-[11px]">
        {tool.name}
      </span>
    </li>
  );
}

function StackGroup({ label, ids }: { label: string; ids: ToolId[] }) {
  return (
    <div>
      <h3 className="text-[12px] font-medium tracking-[0.08em] text-white/35 uppercase">
        {label}
      </h3>
      <ul className="mt-4 flex list-none flex-wrap gap-2.5 sm:mt-5 sm:gap-4">
        {ids.map((id) => (
          <ToolTile key={id} tool={toolById[id]} />
        ))}
      </ul>
    </div>
  );
}

export function StacksBento() {
  return (
    <section id="stack" className="scroll-mt-24">
      <h2 className="font-display text-[22px] text-white sm:text-[24px]">Stack</h2>

      <div className="mt-10 grid gap-12 sm:mt-12 lg:grid-cols-3 lg:gap-10 xl:gap-14">
        {GROUPS.map((group) => (
          <StackGroup key={group.label} label={group.label} ids={group.ids} />
        ))}
      </div>
    </section>
  );
}
