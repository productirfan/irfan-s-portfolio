"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { featuredProjects } from "@/content/featured";
import { easeOut, useFinePointer } from "@/lib/motion";

const projects = featuredProjects.slice(0, 5);

type CardTone = {
  wash: string;
  washHover: string;
  glow: string;
};

const tones: CardTone[] = [
  {
    wash: "radial-gradient(90% 70% at 78% 88%, rgba(95,121,235,0.28), transparent 58%), radial-gradient(55% 50% at 12% 18%, rgba(139,92,246,0.12), transparent 55%)",
    washHover:
      "radial-gradient(95% 75% at 80% 90%, rgba(95,121,235,0.4), transparent 60%), radial-gradient(60% 55% at 10% 16%, rgba(139,92,246,0.2), transparent 55%)",
    glow: "rgba(95,121,235,0.22)",
  },
  {
    wash: "radial-gradient(80% 70% at 50% 100%, rgba(255,122,32,0.22), transparent 55%), radial-gradient(50% 45% at 80% 18%, rgba(139,92,246,0.16), transparent 50%)",
    washHover:
      "radial-gradient(85% 75% at 50% 100%, rgba(255,122,32,0.34), transparent 58%), radial-gradient(55% 50% at 82% 14%, rgba(139,92,246,0.24), transparent 52%)",
    glow: "rgba(255,122,32,0.2)",
  },
  {
    wash: "radial-gradient(75% 70% at 70% 85%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(45% 40% at 20% 20%, rgba(95,121,235,0.14), transparent 50%)",
    washHover:
      "radial-gradient(80% 75% at 72% 88%, rgba(56,189,248,0.26), transparent 58%), radial-gradient(50% 45% at 18% 18%, rgba(95,121,235,0.22), transparent 52%)",
    glow: "rgba(56,189,248,0.18)",
  },
  {
    wash: "radial-gradient(70% 65% at 55% 90%, rgba(167,139,250,0.2), transparent 55%), radial-gradient(40% 40% at 15% 15%, rgba(244,114,182,0.1), transparent 50%)",
    washHover:
      "radial-gradient(75% 70% at 58% 92%, rgba(167,139,250,0.3), transparent 58%), radial-gradient(45% 45% at 12% 12%, rgba(244,114,182,0.16), transparent 52%)",
    glow: "rgba(167,139,250,0.2)",
  },
  {
    wash: "radial-gradient(70% 65% at 60% 88%, rgba(251,191,36,0.14), transparent 55%), radial-gradient(45% 40% at 25% 20%, rgba(95,121,235,0.14), transparent 50%)",
    washHover:
      "radial-gradient(75% 70% at 62% 90%, rgba(251,191,36,0.22), transparent 58%), radial-gradient(50% 45% at 22% 16%, rgba(95,121,235,0.22), transparent 52%)",
    glow: "rgba(251,191,36,0.16)",
  },
];

/**
 * Stripe-style bento:
 *  Mobile: 1-col stack
 *  sm/md (2-col): [0 full-width] then pairs
 *  lg (3-col):
 *    [0 Wide hero ——][1 Tall ]
 *    [2 ][3 ][4     ]
 */
const spans = [
  "min-h-[260px] sm:col-span-2 sm:min-h-[280px] lg:min-h-[340px]",
  "min-h-[250px] sm:min-h-[280px] lg:min-h-[340px]",
  "min-h-[200px] sm:min-h-[210px] lg:min-h-[240px]",
  "min-h-[200px] sm:min-h-[210px] lg:min-h-[240px]",
  "min-h-[200px] sm:min-h-[210px] lg:min-h-[240px]",
] as const;

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductMock({
  src,
  variant,
  priority,
}: {
  src: string;
  variant: "wide" | "tall" | "compact";
  priority?: boolean;
}) {
  if (variant === "wide") {
    return (
      <div className="relative mt-auto flex min-h-0 w-full max-h-[220px] flex-1 items-end justify-center overflow-hidden px-3 pb-3 pt-1 sm:max-h-[260px] sm:px-6 sm:pb-5 sm:pt-2 lg:max-h-none">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] bottom-0 h-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(95,121,235,0.35),transparent_70%)] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Back layer — offset window */}
        <div className="absolute bottom-[18%] right-[8%] hidden w-[48%] max-w-[240px] overflow-hidden rounded-[14px] border border-white/10 bg-[#1a1a1e] opacity-50 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:block lg:right-[10%]">
          <div className="flex h-6 items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-2.5">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={src}
              alt=""
              fill
              sizes="30vw"
              className="object-cover object-top brightness-[0.45] contrast-[1.05]"
            />
          </div>
        </div>
        {/* Front mock */}
        <motion.div
          className="relative z-[1] w-[92%] max-w-[520px] origin-bottom overflow-hidden rounded-[14px] border border-white/12 bg-[#16161a] shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:w-[72%] sm:rounded-[16px] lg:w-[68%]"
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div className="flex h-6 items-center gap-1.5 border-b border-white/8 bg-white/[0.04] px-2.5 sm:h-7 sm:px-3">
            <span className="size-1.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-1.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-1.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-2 h-3 flex-1 rounded-sm bg-white/[0.06]" />
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={src}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 45vw"
              className="object-cover object-top brightness-[0.72] contrast-[1.06] saturate-[0.92]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-[#0f0f12]/55 via-transparent to-black/20"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === "tall") {
    return (
      <div className="relative mt-auto flex min-h-0 w-full max-h-[200px] flex-1 flex-col items-center justify-end gap-2 overflow-hidden px-4 pb-4 pt-2 sm:max-h-[240px] sm:gap-3 sm:px-5 sm:pb-5 sm:pt-3 lg:max-h-none">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,122,32,0.28),transparent_68%)] opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <motion.div
          className="relative z-[1] w-[86%] max-w-[300px] overflow-hidden rounded-[12px] border border-white/12 bg-[#16161a] shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:rounded-[14px]"
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div className="relative aspect-[5/3] w-full">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
              className="object-cover object-top brightness-[0.7] contrast-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-black/25 via-transparent to-[#0f0f12]/4"
            />
          </div>
        </motion.div>
        <motion.div
          className="relative z-[2] -mt-6 w-[72%] max-w-[240px] overflow-hidden rounded-[10px] border border-white/14 bg-[#1a1a1e]/95 shadow-[0_16px_36px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:-mt-8 sm:rounded-[12px]"
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 22vw"
              className="object-cover object-[center_35%] brightness-[0.65] contrast-[1.08]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mt-auto flex min-h-0 w-full max-h-[160px] flex-1 items-end justify-center overflow-hidden px-3 pb-3 pt-1 sm:max-h-[180px] sm:px-4 sm:pb-4 lg:max-h-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[15%] bottom-0 h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        className="relative z-[1] w-[92%] max-w-[360px] origin-bottom overflow-hidden rounded-[12px] border border-white/12 bg-[#16161a] shadow-[0_16px_40px_rgba(0,0,0,0.5)] sm:rounded-[14px]"
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="relative aspect-[16/11] w-full">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
            className="object-cover object-top brightness-[0.68] contrast-[1.06] saturate-[0.9]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#0f0f12]/5 via-transparent to-black/15"
          />
        </div>
      </motion.div>
    </div>
  );
}

function BentoCard({
  project,
  index,
  reduce,
  finePointer,
}: {
  project: (typeof projects)[number];
  index: number;
  reduce: boolean | null;
  finePointer: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const tone = tones[index] ?? tones[0];
  const isWide = index === 0;
  const isTall = index === 1;
  const variant = isWide ? "wide" : isTall ? "tall" : "compact";
  const showCopy = isWide || isTall;

  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduce || !finePointer) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "70%");
    el.style.setProperty("--spot-y", "80%");
  };

  return (
    <motion.div
      role="listitem"
      className={`min-w-0 ${spans[index]}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.55,
        ease: easeOut,
        delay: index * 0.06,
      }}
    >
      <Link
        ref={cardRef}
        href={project.href}
        aria-label={`${project.title} case study`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          {
            "--spot-x": "70%",
            "--spot-y": "80%",
            "--card-glow": tone.glow,
          } as CSSProperties
        }
        className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#0f0f12] outline-none transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012] sm:rounded-[22px]"
      >
        {/* Ambient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: tone.wash }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: tone.washHover }}
        />

        {/* Pointer spotlight */}
        {!reduce && finePointer ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--spot-x) var(--spot-y), var(--card-glow), transparent 55%)",
            }}
          />
        ) : null}

        {/* Soft top vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.04),transparent_45%)]"
        />

        {/* Header */}
        <div className="relative z-[2] flex items-start justify-between gap-3 p-4 sm:p-5 lg:p-6">
          <div className="min-w-0 max-w-[calc(100%-2.75rem)]">
            <h3
              className={`truncate font-display leading-[1.15] tracking-[-0.03em] text-white ${
                isWide
                  ? "text-[20px] sm:text-[24px] lg:text-[27px]"
                  : isTall
                    ? "text-[18px] sm:text-[20px] lg:text-[24px]"
                    : "text-[16px] sm:text-[17px] lg:text-[19px]"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={
                showCopy
                  ? "mt-1.5 line-clamp-3 max-w-[34ch] text-[12.5px] leading-snug text-white/45 sm:mt-2 sm:line-clamp-none sm:text-[13px] lg:text-[13.5px]"
                  : "mt-1 line-clamp-2 text-[12px] leading-snug text-white/40"
              }
            >
              {project.description}
            </p>
          </div>

          <span
            aria-hidden
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-white/12 bg-white/[0.04] text-white/55 transition-[color,border-color,background-color,transform] duration-300 group-hover:border-white/22 group-hover:bg-white/[0.08] group-hover:text-white group-hover:rotate-12 motion-reduce:group-hover:rotate-0"
          >
            <ExpandIcon className="size-3.5" />
          </span>
        </div>

        {/* Visual stage — lifts on hover via group */}
        <div
          className={`relative z-[1] flex min-h-0 flex-1 overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            reduce
              ? ""
              : "group-hover:-translate-y-1 group-hover:scale-[1.02] will-change-transform motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100"
          }`}
        >
          <ProductMock
            src={project.image}
            variant={variant}
            priority={index === 0}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function CaseStudyStack() {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();

  return (
    <div
      role="list"
      aria-label="Selected projects"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-[18px]"
    >
      {projects.map((project, i) => (
        <BentoCard
          key={project.id}
          project={project}
          index={i}
          reduce={reduce}
          finePointer={finePointer}
        />
      ))}
    </div>
  );
}
