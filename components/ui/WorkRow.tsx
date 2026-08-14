"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { documentary } from "@/content/projects/documentary";

const tones: Record<string, { shell: string; nav: string }> = {
  peach: {
    shell: "from-[#e8f4fb] via-[#f3ebe6] to-[#efe8f2]",
    nav: "from-[#f7d7c8] via-[#f3e4dc] to-[#f0ebe8]",
  },
  mint: {
    shell: "from-[#e7f5ef] via-[#eef3f0] to-[#e8edf2]",
    nav: "from-[#cfe8d8] via-[#e4f0ea] to-[#eef2ef]",
  },
  lavender: {
    shell: "from-[#e7f2fb] via-[#eef0f6] to-[#e8e6f0]",
    nav: "from-[#d9d6f2] via-[#e8e6f5] to-[#f0eff6]",
  },
};

export function FeaturedWorkCard({ project }: { project: Project }) {
  const doc = documentary[project.slug];
  if (!doc) return null;
  const tone = tones[doc.cardTone] ?? tones.lavender;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative isolate flex aspect-auto flex-col overflow-hidden rounded-[28px] border border-dashed border-black/20 bg-linear-to-br ${tone.shell} shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] sm:rounded-[32px] lg:aspect-[16/10] lg:flex-row`}
    >
      {/* Diagonal stripe frame accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.035) 10px, rgba(0,0,0,0.035) 11px)",
        }}
      />

      {/* Left copy ~35% */}
      <div className="relative z-10 flex w-full flex-col p-6 sm:p-8 lg:w-[35%] lg:min-w-[280px] lg:max-w-[420px] lg:p-9 lg:pr-4">
        <div className="flex items-start gap-3">
          <h3 className="min-w-0 font-sans text-[1.85rem] font-bold leading-none tracking-[-0.04em] text-ink uppercase sm:text-[2.15rem] lg:text-[2.4rem]">
            {project.title}
          </h3>
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </span>
        </div>

        <p className="mt-3 text-[14px] font-medium text-ink/55 sm:mt-4">
          {doc.subtitle}
        </p>

        <h4 className="mt-5 max-w-[22ch] font-sans text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.02em] text-ink sm:mt-6 sm:text-[1.55rem] lg:text-[1.75rem]">
          {doc.cardHeadline}
        </h4>

        <p className="mt-4 max-w-md text-[15px] leading-7 text-ink/55 sm:text-[16px] lg:text-[17px]">
          {doc.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-ink shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right product window ~65%, bleeding off edge */}
      <div className="relative z-10 h-[240px] w-full flex-1 overflow-hidden sm:h-[320px] lg:h-auto lg:min-h-0">
        <div className="absolute inset-x-4 top-2 bottom-0 transition duration-500 ease-out group-hover:-translate-y-1.5 sm:inset-x-6 sm:top-3 lg:inset-y-8 lg:right-[-6%] lg:left-2 lg:top-8 lg:bottom-[-14%] lg:w-[106%]">
          <div className="relative h-full overflow-hidden rounded-t-[18px] border border-dashed border-black/10 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.14)] sm:rounded-t-[22px] lg:rounded-[22px] lg:border-r-0 lg:rounded-br-none lg:rounded-tr-none">
            <Image
              src={doc.cardImage}
              alt={`${project.title} product interface`}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-left-top transition duration-700 ease-out group-hover:scale-[1.02]"
              priority={project.index === 1}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectNavCard({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  const doc = documentary[project.slug];
  const tone = tones[doc?.cardTone ?? "mint"] ?? tones.mint;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block w-full overflow-hidden rounded-[22px] border border-dashed border-black/15 bg-linear-to-br ${tone.nav} p-5 text-left transition hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.08em] text-ink/50">{label}</p>
          <p className="mt-1 font-display text-xl uppercase">{project.title}</p>
          <p className="mt-1 text-sm text-ink/65">{doc?.subtitle}</p>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:scale-105">
          <ArrowUpRight size={14} />
        </span>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-5 text-ink/70">
        {doc?.summary}
      </p>
    </Link>
  );
}
