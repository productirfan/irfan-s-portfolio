"use client";

import type { ReactNode } from "react";
import {
  Archive,
  ArrowLeft,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  Folder,
  Globe,
  Image as ImageIcon,
  Info,
  Mic,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Users,
  Workflow,
  X,
} from "lucide-react";

export function PhoneFrame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="phone-hover mx-auto w-full max-w-[220px] origin-center">
      <div
        className={`aspect-[9/17] overflow-hidden rounded-[28px] border ${
          dark ? "border-white/10 bg-[#121212] text-white" : "border-black/8 bg-white text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function PhoneGallery({
  screens,
  caption,
  compact,
}: {
  screens: string[];
  caption?: string;
  compact?: boolean;
}) {
  const cols =
    screens.length >= 5
      ? "sm:grid-cols-3"
      : screens.length === 4
        ? "sm:grid-cols-2"
        : screens.length === 3
          ? "sm:grid-cols-3"
          : "sm:grid-cols-2";
  return (
    <figure className={compact ? "" : "mt-8"}>
      <div className={`rounded-[32px] bg-well ${compact ? "p-2" : "p-5 md:p-8"}`}>
        <div
          className={`grid gap-4 md:gap-6 ${compact ? "grid-cols-1" : `grid-cols-2 ${cols}`}`}
        >
          {screens.map((id) => (
            <Screen key={id} id={id} />
          ))}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Callout({ children }: { children: string }) {
  return (
    <p className="mt-6 flex items-start gap-2 rounded-full bg-well px-4 py-3 text-sm text-muted">
      <Info size={16} className="mt-0.5 shrink-0" />
      {children}
    </p>
  );
}

export function IconRow({ caption }: { caption: string }) {
  const variants = [
    "bg-accent text-white",
    "bg-ink text-white",
    "bg-neutral-700 text-white",
    "bg-ink text-white ring-1 ring-white",
    "bg-white text-ink ring-1 ring-ink",
    "bg-white text-ink ring-1 ring-black/20",
  ];
  return (
    <figure className="mt-8">
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-[32px] bg-well px-6 py-10">
        {variants.map((cls, i) => (
          <div
            key={cls + i}
            className={`phone-hover flex h-16 w-16 items-center justify-center rounded-[18px] ${cls}`}
          >
            <Bookmark size={22} />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

function Screen({ id }: { id: string }) {
  switch (id) {
    case "auriga-workspace":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Workspace" />
            <SearchBar />
            <Row icon={<FileText size={14} />} label="Client request" />
            <Row icon={<Folder size={14} />} label="Documents" />
            <Row icon={<Users size={14} />} label="User group" />
            <Primary>Open agent</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "auriga-sources":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Sources" />
            <Row icon={<FileText size={14} />} label="Requirements.pdf" />
            <Row icon={<Globe size={14} />} label="Connected wiki" />
            <Row icon={<Globe size={14} />} label="Web" muted />
            <Primary>Add source</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "auriga-agent":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Agent setup" action={<X size={14} />} />
            <label className="mt-3 block text-[10px] text-muted">Instructions</label>
            <div className="mt-1 h-16 rounded-xl bg-well" />
            <div className="mt-3 flex flex-wrap gap-1">
              {["Precise", "Cite sources", "Enterprise"].map((t) => (
                <span key={t} className="rounded-full bg-well px-2 py-1 text-[9px]">
                  {t}
                </span>
              ))}
            </div>
            <Primary>Save</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "auriga-ask":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Ask" />
            <div className="mt-3 rounded-2xl bg-well p-3 text-[10px] leading-4">
              Summarize the contract against our internal policy.
            </div>
            <div className="mt-2 rounded-2xl border border-black/8 p-3 text-[10px] leading-4">
              Cited from Requirements.pdf · §3
            </div>
            <div className="mt-auto flex h-9 items-center rounded-full bg-well px-3 text-[10px] text-muted">
              Message…
            </div>
          </Pad>
        </PhoneFrame>
      );
    case "auriga-people":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="People" />
            <Row icon={<Users size={14} />} label="Design" />
            <Row icon={<Users size={14} />} label="Legal" />
            <Row icon={<Users size={14} />} label="Admin" muted />
            <Primary>Invite</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "auriga-settings":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Settings" />
            <Row icon={<Settings size={14} />} label="Appearance" />
            <Row icon={<Bell size={14} />} label="Notifications" />
            <Row icon={<Globe size={14} />} label="Permissions" />
            <Primary ghost>Done</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "call-listen":
      return (
        <PhoneFrame dark>
          <Pad>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/50">LISTENING</p>
            <Mic size={28} className="mx-auto mt-8" />
            <Wave />
            <p className="mt-6 text-center text-[11px] text-white/70">Mic is open</p>
          </Pad>
        </PhoneFrame>
      );
    case "call-think":
      return (
        <PhoneFrame dark>
          <Pad>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/50">THINKING</p>
            <Wave sparse />
            <p className="mt-8 text-center text-[11px] text-white/70">Holding context</p>
          </Pad>
        </PhoneFrame>
      );
    case "call-reply":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Call" />
            <p className="mt-4 text-[11px] leading-4 text-muted">
              Wednesday is a holiday. I’ll look at Thursday instead.
            </p>
            <Primary>Interrupt</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "call-share":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Share" action={<X size={14} />} />
            <Row icon={<Share size={14} />} label="Messages" />
            <Row icon={<Bookmark size={14} />} label="Save to workspace" />
            <Row icon={<Plus size={14} />} label="Add to Home Screen" />
          </Pad>
        </PhoneFrame>
      );
    case "call-preset":
      return (
        <PhoneFrame dark>
          <Pad>
            <Top dark title="Preset time" action={<X size={14} />} />
            <div className="mt-4 rounded-2xl bg-white/8 py-6 text-center font-mono text-sm">
              05:30 PM
            </div>
            <p className="mt-4 text-[10px] text-white/50">Only on certain days?</p>
            <div className="mt-2 flex justify-between text-[9px]">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span
                  key={d}
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    d === "Tu" ? "bg-accent text-white" : "bg-white/10"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mt-auto h-10 w-full rounded-full bg-white text-[12px] font-medium text-ink transition hover:bg-white/90"
            >
              Save
            </button>
          </Pad>
        </PhoneFrame>
      );
    case "call-home":
      return (
        <PhoneFrame>
          <Pad>
            <div className="flex items-center justify-between">
              <Calendar size={14} />
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] text-emerald-800">
                <Check size={10} /> Saved
              </span>
              <span className="flex gap-2">
                <Search size={14} />
                <Bell size={14} />
                <Settings size={14} />
              </span>
            </div>
            <p className="mt-5 text-[13px] font-display">Good morning.</p>
            <p className="mt-1 text-[10px] text-muted">In 24 hours</p>
            <ChevronDown size={14} className="mt-1 text-muted" />
            <NavBar upcoming />
          </Pad>
        </PhoneFrame>
      );
    case "conc-map":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Map" />
            <div className="mt-4 flex flex-wrap gap-1">
              {["User", "Flow", "Product", "Data"].map((n) => (
                <span key={n} className="rounded-full border border-black/10 px-2 py-1 text-[9px]">
                  {n}
                </span>
              ))}
            </div>
            <Row icon={<Workflow size={14} />} label="Handoff at review" />
            <Primary>Inspect node</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "conc-queue":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Queue" />
            <Row icon={<Folder size={14} />} label="Exception #128" />
            <Row icon={<Folder size={14} />} label="Waiting on data" />
            <Row icon={<Folder size={14} />} label="Ready to close" />
          </Pad>
        </PhoneFrame>
      );
    case "conc-node":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Node" action={<ArrowLeft size={14} />} />
            <p className="mt-3 text-[12px] font-display">Agent</p>
            <p className="mt-1 text-[10px] leading-4 text-muted">
              Fired because the threshold was met. Reversible.
            </p>
            <Primary>Open output</Primary>
          </Pad>
        </PhoneFrame>
      );
    case "conc-empty":
      return (
        <PhoneFrame>
          <Pad>
            <Top title="Archive" />
            <SearchBar />
            <Archive size={28} className="mx-auto mt-8 text-accent" />
            <p className="mt-3 text-center text-[12px] font-medium">Nothing tucked away yet</p>
            <p className="mt-1 text-center text-[10px] text-muted">
              Closed operations land here
            </p>
            <Primary>
              <Plus size={12} className="mr-1 inline" />
              Create folder
            </Primary>
            <NavBar archive />
          </Pad>
        </PhoneFrame>
      );
    case "auth":
      return (
        <PhoneFrame>
          <div className="flex h-full flex-col bg-linear-to-b from-accent to-white p-4">
            <Bookmark size={20} className="mt-8 text-white" />
            <p className="mt-auto font-display text-[18px] leading-5">
              Later doesn’t have to mean never.
            </p>
            <p className="mt-2 text-[10px] text-ink/70">
              Save context and bring it back when the time is right.
            </p>
            <button
              type="button"
              className="mt-4 h-9 rounded-full bg-white text-[11px] font-medium transition hover:bg-white/90"
            >
              Continue
            </button>
            <button
              type="button"
              className="mt-2 mb-2 h-9 rounded-full bg-ink text-[11px] font-medium text-white"
            >
              Continue with Google
            </button>
          </div>
        </PhoneFrame>
      );
    case "notify":
      return (
        <PhoneFrame>
          <Pad>
            <p className="font-display text-[16px] leading-5">Never miss an important update</p>
            <p className="mt-2 text-[10px] text-muted">
              We’ll let you know when it’s time to come back.
            </p>
            <div className="mt-6 rounded-2xl border border-black/8 p-3">
              <p className="font-mono text-[9px] text-muted">Mon Jun 22 12:00</p>
              <div className="mt-2 flex items-start gap-2 rounded-xl bg-well p-2">
                <Bell size={12} className="text-accent" />
                <p className="text-[10px]">Your next review is ready…</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-auto h-9 w-full rounded-full bg-well text-[11px]"
            >
              Skip for now
            </button>
            <button
              type="button"
              className="mt-2 h-9 w-full rounded-full bg-accent text-[11px] text-white transition hover:bg-[#e86c12]"
            >
              Allow notification
            </button>
          </Pad>
        </PhoneFrame>
      );
    default:
      return (
        <PhoneFrame>
          <Pad>
            <ImageIcon size={20} className="mx-auto mt-16 text-muted" />
          </Pad>
        </PhoneFrame>
      );
  }
}

function Pad({ children }: { children: ReactNode }) {
  return <div className="flex h-full flex-col p-3">{children}</div>;
}

function Top({
  title,
  action,
  dark,
}: {
  title: string;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className={`text-[13px] font-medium ${dark ? "text-white" : ""}`}>{title}</p>
      <span className={dark ? "text-white/60" : "text-muted"}>{action ?? <MoreHorizontal size={14} />}</span>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="mt-3 flex h-8 items-center gap-2 rounded-full bg-well px-3 text-[10px] text-muted">
      <Search size={12} /> Search...
    </div>
  );
}

function Row({
  icon,
  label,
  muted,
}: {
  icon: ReactNode;
  label: string;
  muted?: boolean;
}) {
  return (
    <div className={`mt-2 flex items-center gap-2 rounded-xl bg-well px-2 py-2 text-[11px] ${muted ? "opacity-50" : ""}`}>
      {icon}
      {label}
    </div>
  );
}

function Primary({
  children,
  ghost,
}: {
  children: ReactNode;
  ghost?: boolean;
}) {
  return (
    <button
      type="button"
      className={`mt-auto h-9 w-full rounded-full text-[11px] font-medium transition ${
        ghost
          ? "bg-well hover:bg-black/5"
          : "bg-accent text-white hover:bg-[#e86c12] active:scale-[0.98]"
      }`}
    >
      {children}
    </button>
  );
}

function Wave({ sparse }: { sparse?: boolean }) {
  return (
    <div className="mt-8 flex h-8 items-end justify-center gap-0.5">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-white"
          style={{
            height: `${6 + ((i * 11) % 18)}px`,
            opacity: sparse && i % 2 === 0 ? 0.25 : 0.9,
          }}
        />
      ))}
    </div>
  );
}

function NavBar({ upcoming, archive }: { upcoming?: boolean; archive?: boolean }) {
  return (
    <div className="mt-auto flex justify-around pt-3 text-[9px] text-muted">
      <span className={upcoming ? "text-accent" : ""}>
        <Calendar size={14} className="mx-auto" />
        Upcoming
      </span>
      <span className={archive ? "text-accent" : ""}>
        <Bookmark size={14} className="mx-auto" />
        Archive
      </span>
    </div>
  );
}
