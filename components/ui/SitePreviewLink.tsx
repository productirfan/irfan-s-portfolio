"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type SitePreviewLinkProps = {
  href: string;
  label: string;
  previewSrc: string;
  icon?: ReactNode;
  domain?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const MAX_TILT = 12;
const MAX_SHIFT = 5;

export function SitePreviewLink({
  href,
  label,
  previewSrc,
  icon,
  domain = "scryai.com",
}: SitePreviewLinkProps) {
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 340,
    height: 220,
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 160, damping: 16, mass: 0.35 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const rotateY = useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const translateX = useTransform(x, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const translateY = useTransform(y, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const glareX = useTransform(x, [-0.5, 0.5], [18, 82]);
  const glareY = useTransform(y, [-0.5, 0.5], [18, 82]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 52%)`,
  );

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => setMounted(true), []);

  const clearTimers = () => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  };

  const measure = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // ~15% viewport area, header/widescreen crop
    const area = vw * vh * 0.15;
    const width = Math.min(420, Math.max(300, Math.round(Math.sqrt(area * 1.7))));
    const height = Math.min(280, Math.max(180, Math.round(width * 0.58)));

    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(16, Math.min(left, vw - width - 16));

    const below = rect.bottom + 16;
    const above = rect.top - height - 16;
    const top =
      below + height <= vh - 16
        ? below
        : above >= 16
          ? above
          : Math.max(16, (vh - height) / 2);

    setCoords({ top, left, width, height });
  }, []);

  const openPreview = useCallback(() => {
    clearTimers();
    measure();
    showTimer.current = window.setTimeout(() => setOpen(true), 100);
  }, [measure]);

  const closePreview = useCallback(() => {
    clearTimers();
    hideTimer.current = window.setTimeout(() => {
      setOpen(false);
      resetTilt();
    }, 120);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => measure();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        resetTilt();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, measure]);

  useEffect(() => () => clearTimers(), []);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-describedby={open ? panelId : undefined}
        className="group/site relative inline-flex items-center gap-1.5 align-middle text-white transition-colors"
        onMouseEnter={openPreview}
        onMouseLeave={closePreview}
        onFocus={openPreview}
        onBlur={closePreview}
      >
        {icon}
        <span className="underline decoration-white/0 decoration-from-font underline-offset-[5px] transition group-hover/site:decoration-white/45">
          {label}
        </span>
      </a>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  id={panelId}
                  role="tooltip"
                  aria-label={`${label} website preview`}
                  className="pointer-events-auto fixed z-[80]"
                  style={{
                    top: coords.top,
                    left: coords.left,
                    width: coords.width,
                    height: coords.height,
                    perspective: 900,
                  }}
                  initial={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 0, y: 12, scale: 0.92 }
                  }
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.3, ease }}
                  onMouseEnter={() => {
                    clearTimers();
                    setOpen(true);
                  }}
                  onMouseLeave={closePreview}
                >
                  <motion.div
                    ref={cardRef}
                    onPointerMove={onMove}
                    onPointerLeave={resetTilt}
                    style={
                      reduce
                        ? undefined
                        : {
                            rotateX,
                            rotateY,
                            x: translateX,
                            y: translateY,
                            transformStyle: "preserve-3d",
                          }
                    }
                    className="relative h-full overflow-hidden rounded-2xl bg-[#121214] shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
                  >
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 bg-[#161618]/92 px-3 py-2 backdrop-blur-md">
                      <div className="flex gap-1.5" aria-hidden>
                        <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
                        <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
                        <span className="size-2.5 rounded-full bg-[#28c840]/90" />
                      </div>
                      <div className="ml-1 flex min-w-0 flex-1 rounded-full bg-black/40 px-3 py-1 text-[11px] text-[#9a9a9a]">
                        <span className="truncate">https://{domain}</span>
                      </div>
                    </div>

                    <div className="relative h-full w-full overflow-hidden pt-9">
                      <Image
                        src={previewSrc}
                        alt={`${label} homepage header`}
                        fill
                        sizes="420px"
                        className="object-cover object-top select-none"
                        draggable={false}
                        priority={false}
                      />
                    </div>

                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                      style={reduce ? undefined : { background: glareBg }}
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
