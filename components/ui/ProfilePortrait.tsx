"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { X } from "lucide-react";
import { site } from "@/content/site";

const MAX_TILT = 12;
const MAX_SHIFT = 6;
const IMG_SHIFT = 16;
const META_SHIFT = 10;

export function ProfilePortrait() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const spring = { stiffness: 160, damping: 16, mass: 0.35 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const rotateY = useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const translateX = useTransform(x, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const translateY = useTransform(y, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);

  // Image parallax — moves opposite + farther than the card shell
  const imgX = useTransform(x, [-0.5, 0.5], [IMG_SHIFT, -IMG_SHIFT]);
  const imgY = useTransform(y, [-0.5, 0.5], [IMG_SHIFT * 0.85, -IMG_SHIFT * 0.85]);

  // Foreground meta — slight follow (closer layer)
  const metaX = useTransform(x, [-0.5, 0.5], [-META_SHIFT, META_SHIFT]);
  const metaY = useTransform(y, [-0.5, 0.5], [-META_SHIFT * 0.7, META_SHIFT * 0.7]);

  const glareX = useTransform(x, [-0.5, 0.5], [18, 82]);
  const glareY = useTransform(y, [-0.5, 0.5], [18, 82]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.26), transparent 52%)`,
  );

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => {
    if (!open) {
      resetTilt();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
      resetTilt();
    };
  }, [open]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rawX.set(px);
    rawY.set(py);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="View full portrait"
        onClick={() => setOpen(true)}
        className="avatar-wiggle group relative size-[72px] overflow-hidden rounded-2xl border-2 border-[#2a2a2a] outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:size-[82px]"
      >
        <Image
          src="/figma/avatar.png"
          alt=""
          fill
          sizes="82px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          priority
        />
        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="pointer-events-none absolute inset-x-0 bottom-1.5 text-center text-[9px] font-medium tracking-[0.12em] text-white uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          View
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-5 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <motion.button
              type="button"
              aria-label="Close portrait"
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-[min(92vw,440px)] [perspective:1200px]"
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 36, mass: 0.6 }
              }
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
                className="will-change-transform overflow-hidden rounded-[28px] border border-white/12 bg-[#141416] shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0c0c0e] [transform:translateZ(28px)]">
                  <motion.div
                    className="absolute -inset-[4%] will-change-transform"
                    style={
                      reduce
                        ? undefined
                        : { x: imgX, y: imgY, scale: 1.02 }
                    }
                  >
                    <Image
                      src="/figma/avatar.png"
                      alt={`Portrait of ${site.name}`}
                      fill
                      sizes="440px"
                      className="object-cover object-[50%_16%]"
                      priority
                    />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-t from-[#141416] via-[#141416]/50 to-transparent" />
                  {!reduce ? (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
                      style={{ backgroundImage: glareBg }}
                    />
                  ) : null}
                </div>

                <motion.div
                  className="relative flex items-end justify-between gap-4 px-5 pb-5 pt-2 will-change-transform [transform:translateZ(48px)]"
                  style={reduce ? undefined : { x: metaX, y: metaY }}
                >
                  <div className="min-w-0">
                    <p
                      id={titleId}
                      className="font-display text-[22px] text-white"
                    >
                      {site.name}
                    </p>
                    <p className="mt-1 text-[13px] text-[#9a9a9a]">
                      {site.role} · {site.company}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#6f6f6f]">
                      {site.locationFull}
                    </p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:bg-white/10"
                    aria-label="Close"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </motion.div>
              </motion.div>

              <p className="mt-3 text-center text-[12px] text-white/35">
                Esc or tap outside to close
              </p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
