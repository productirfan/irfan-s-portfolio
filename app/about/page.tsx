import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Headphones,
  Laptop,
  MessageCircle,
  Monitor,
  Notebook,
  PenTool,
  Smartphone,
  Sparkles,
  SquareCode,
} from "lucide-react";
import { DocumentShell, SquiggleLink } from "@/components/layout/DocumentShell";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About me" };

const toc = [
  { id: "bio", label: "Bio" },
  { id: "academics", label: "Academics" },
  { id: "tools", label: "What I use" },
  { id: "favorites", label: "Favorite things" },
];

export default function AboutPage() {
  const booking = site.contact.booking.startsWith("[") ? "#" : site.contact.booking;
  const mail = site.contact.email.startsWith("[")
    ? "#"
    : `mailto:${site.contact.email}`;

  return (
    <DocumentShell
      crumbs={[{ href: "/", label: "Home" }, { label: "About me" }]}
      toc={toc}
    >
      <section id="bio" className="scroll-mt-32 lg:scroll-mt-24">
        <h1 className="font-display text-2xl text-muted md:text-3xl">
          {site.about.headline}
        </h1>
        <div className="mt-6 space-y-4 text-[17px] leading-7">
          {site.about.who.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {site.about.photos.map((photo, i) => (
            <div
              key={`${photo.label}-${i}`}
              className="phone-hover aspect-[3/4] rounded-md border border-dashed border-black/15 bg-well p-2"
              style={{ transform: `rotate(${[-3, 2, -1.5, 3][i]}deg)` }}
            >
              <div className="flex h-[78%] items-center justify-center bg-white text-xs text-muted">
                {photo.label}
              </div>
              <p className="mt-2 text-center text-[11px] text-muted">{photo.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="academics" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <p className="text-sm text-muted">Academics</p>
        <h2 className="mt-2 font-display text-2xl">
          What was my education like
        </h2>
        <ul className="mt-8">
          {site.about.academics.map((item) => (
            <li key={item.title} className="dotted py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted">{item.years}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{item.place}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <p className="text-sm text-muted">What I use</p>
        <h2 className="mt-2 font-display text-2xl">
          The tools, apps, and gear I use to bring ideas to life.
        </h2>
        <p className="mt-8 text-sm text-muted">Software</p>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              [PenTool, "Figma"],
              [Notebook, "Notion"],
              [Globe, "Arc Browser"],
              [Sparkles, "Claude"],
              [MessageCircle, "ChatGPT"],
              [SquareCode, "Cursor"],
            ] as [LucideIcon, string][]
          ).map(([Icon, label]) => (
            <li key={label} className="flex min-h-11 items-center gap-2 text-[15px]">
              <Icon size={16} />
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">Hardware</p>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              [Monitor, site.about.hardware[0]],
              [Laptop, site.about.hardware[1]],
              [Smartphone, site.about.hardware[2]],
              [Headphones, site.about.hardware[3]],
            ] as [LucideIcon, string][]
          ).map(([Icon, label]) => (
            <li key={label} className="flex min-h-11 items-center gap-2 text-[15px]">
              <Icon size={16} />
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section id="favorites" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <p className="text-sm text-muted">Favorite things</p>
        <h2 className="mt-2 font-display text-2xl">Wall of favorites</h2>
        <div className="mt-8 grid grid-cols-4 border border-dashed border-black/15 sm:grid-cols-8">
          {site.about.favorites.map((cell, i) => (
            <div
              key={`${cell.label}-${i}`}
              className="aspect-square border-r border-b border-dashed border-black/15 last:border-r-0"
            >
              {cell.filled ? (
                <div className="phone-hover flex h-full items-center justify-center bg-well text-[9px] text-muted">
                  {cell.label}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-12 text-[17px] leading-7 text-muted">
          If you&apos;re building products that require thoughtful design, I&apos;d love to talk.{" "}
          <SquiggleLink href={booking}>Booking a call</SquiggleLink> or{" "}
          <SquiggleLink href={mail}>Message me</SquiggleLink>.
        </p>
      </section>
    </DocumentShell>
  );
}
