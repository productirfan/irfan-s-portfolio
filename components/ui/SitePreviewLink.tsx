"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type SitePreviewLinkProps = {
  href: string;
  label: string;
  /** Short context under the company name */
  description?: string;
  icon?: ReactNode;
  /** Path to logo shown in the peek panel */
  logoSrc?: string;
  domain?: string;
};

const OPEN_DELAY_MS = 180;
const CLOSE_DELAY_MS = 140;
const PANEL_WIDTH = 300;
const ease = [0.22, 1, 0.36, 1] as const;

function hostFromHref(href: string, fallback?: string) {
  if (fallback) return fallback.replace(/^https?:\/\//, "").replace(/^www\./, "");
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "site";
  }
}

export function SitePreviewLink({
  href,
  label,
  description = "Product design · Enterprise AI",
  icon,
  logoSrc = "/org/scry.svg",
  domain,
}: SitePreviewLinkProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [leftPx, setLeftPx] = useState(0);

  const displayHost = hostFromHref(href, domain);

  const clearTimers = useCallback(() => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  }, []);

  const precomputeLeft = useCallback(() => {
    if (!rootRef.current) return;
    const trigger = rootRef.current.getBoundingClientRect();
    const root = rootRef.current.getBoundingClientRect();
    const pad = 12;
    const width = Math.min(PANEL_WIDTH, window.innerWidth - pad * 2);
    const idealCenter = trigger.left + trigger.width / 2 - root.left;
    const left = idealCenter - width / 2;
    const minLeft = pad - root.left;
    const maxLeft = window.innerWidth - pad - width - root.left;
    setLeftPx(Math.min(Math.max(left, minLeft), maxLeft));
  }, []);

  const openPeek = useCallback(() => {
    clearTimers();
    showTimer.current = window.setTimeout(() => {
      precomputeLeft();
      setOpen(true);
    }, OPEN_DELAY_MS);
  }, [clearTimers, precomputeLeft]);

  const closePeek = useCallback(() => {
    clearTimers();
    hideTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearTimers]);

  const keepOpen = useCallback(() => {
    clearTimers();
    setOpen(true);
  }, [clearTimers]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimers();
        setOpen(false);
        rootRef.current?.querySelector<HTMLElement>("a[data-peek-trigger]")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useLayoutEffect(() => {
    if (!open || !rootRef.current) return;

    const measure = () => {
      const trigger = rootRef.current!.getBoundingClientRect();
      const root = rootRef.current!.getBoundingClientRect();
      const panelH = panelRef.current?.offsetHeight ?? 120;
      const gap = 10;
      const pad = 12;
      const width = Math.min(PANEL_WIDTH, window.innerWidth - pad * 2);

      const spaceBelow = window.innerHeight - trigger.bottom - gap;
      const spaceAbove = trigger.top - gap;
      setPlacement(
        spaceBelow < panelH && spaceAbove > spaceBelow ? "top" : "bottom",
      );

      // Position relative to the root span
      const idealCenter = trigger.left + trigger.width / 2 - root.left;
      let left = idealCenter - width / 2;
      const minLeft = pad - root.left;
      const maxLeft = window.innerWidth - pad - width - root.left;
      left = Math.min(Math.max(left, minLeft), maxLeft);
      setLeftPx(left);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  const onRootBlur = (e: FocusEvent<HTMLSpanElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    closePeek();
  };

  const rise = placement === "bottom" ? 5 : -5;
  const exitY = placement === "bottom" ? 4 : -4;

  return (
    <span
      ref={rootRef}
      className="relative inline-flex align-middle"
      onMouseEnter={openPeek}
      onMouseLeave={closePeek}
      onFocusCapture={openPeek}
      onBlurCapture={onRootBlur}
    >
      <a
        data-peek-trigger
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={open ? panelId : undefined}
        className="group/site relative inline-flex items-center gap-1.5 align-middle text-white transition-colors"
      >
        {icon}
        <span className="underline decoration-white/0 decoration-from-font underline-offset-[5px] transition group-hover/site:decoration-white/45">
          {label}
        </span>
      </a>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="company-peek"
            ref={panelRef}
            id={panelId}
            role="region"
            aria-label={`${label} — company details`}
            className={`absolute z-[60] w-[min(92vw,300px)] ${
              placement === "bottom"
                ? "top-[calc(100%+10px)]"
                : "bottom-[calc(100%+10px)]"
            }`}
            style={{ left: leftPx }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: rise }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: exitY }}
            transition={{ duration: 0.2, ease }}
            onMouseEnter={keepOpen}
            onMouseLeave={closePeek}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/peek block overflow-hidden rounded-2xl border border-white/10 bg-[#18181b]/92 px-3.5 pt-3.5 pb-3 shadow-[0_16px_48px_rgba(0,0,0,0.5)] outline-none backdrop-blur-md transition hover:border-white/[0.14] hover:bg-[#1a1a1c]/95 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                  <Image
                    src={logoSrc}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[14px] font-medium text-white">
                      {label}
                    </span>
                    <ExternalCue />
                  </div>
                  <p className="mt-0.5 truncate text-[12px] leading-4 text-[#8a8a8e]">
                    {description}
                  </p>
                </div>
              </div>

              <span className="mt-3 flex h-9 w-full items-center justify-center rounded-full bg-white text-[13px] font-medium text-[#111] transition group-hover/peek:bg-white/92">
                Visit {displayHost}
              </span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

function ExternalCue() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-white/40"
      fill="none"
    >
      <path
        d="M4.5 2.5H2.75A.75.75 0 0 0 2 3.25v6a.75.75 0 0 0 .75.75h6a.75.75 0 0 0 .75-.75V7.5M7 2h3v3M5.5 6.5 10 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
