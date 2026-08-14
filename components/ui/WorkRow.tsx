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
