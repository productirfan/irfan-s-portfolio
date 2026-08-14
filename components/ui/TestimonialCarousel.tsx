"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/content/site";

const GAP = 14;
const ACTIVE_RATIO = 0.62;
const INACTIVE_RATIO = 0.145;
const CARD_HEIGHT = 360;
const COLLAPSED_CONTENT_W = 320;
const MAX_TILT = 10;
const MAX_SHIFT = 4;

const morph = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1] as const,
};

type Testimonial = (typeof site.testimonials)[number];

function Avatar({ item, muted }: { item: Testimonial; muted?: boolean }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex size-11 items-center justify-center rounded-full text-[12px] font-medium text-white transition-[filter,opacity] duration-500 ease-out ${
          muted ? "grayscale opacity-80" : "grayscale-0 opacity-100"
        }`}
        style={{ backgroundColor: item.avatarTone }}
        aria-hidden
      >
        {item.initials}
      </div>
      <Image
        src={item.companyLogo}
        alt=""
        width={18}
        height={18}
        className={`absolute -bottom-0.5 -right-0.5 size-[18px] rounded-[4px] transition-opacity duration-500 ease-out ${
          muted ? "opacity-35" : "opacity-100"
        }`}
      />
    </div>
  );
}

function TestimonialCard({
  item,
  active,
  width,
  onActivate,
  reduce,
}: {
  item: Testimonial;
  active: boolean;
  width: number;
  onActivate: () => void;
  reduce: boolean | null;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 170, damping: 18, mass: 0.35 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const rotateY = useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const translateX = useTransform(x, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const translateY = useTransform(y, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const glareX = useTransform(x, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(y, [-0.5, 0.5], [20, 80]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 55%)`,
  );

  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduce || !active) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const padX = 28;
  const innerW = active
    ? Math.max(width - padX * 2, 200)
    : COLLAPSED_CONTENT_W;

  return (
    <motion.div
      className="relative shrink-0"
      initial={false}
      animate={{ width }}
      transition={reduce ? { duration: 0 } : morph}
      style={{
        height: CARD_HEIGHT,
        perspective: reduce ? undefined : 900,
      }}
    >
      <motion.button
        ref={cardRef}
        type="button"
        aria-label={`View testimonial from ${item.name}`}
        aria-pressed={active}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
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
        className={`relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[24px] text-left outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white/25 ${
          active ? "bg-[#18181b]" : "bg-[#141416]"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          aria-hidden
        />

        <motion.div
          className="relative z-[1] flex h-full flex-col justify-between px-7 py-7 sm:px-8 sm:py-8"
          initial={false}
          animate={{ width: innerW }}
          transition={reduce ? { duration: 0 } : morph}
        >
          <p
            className={`text-[17px] font-normal leading-[1.55] transition-[color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[19px] sm:leading-[1.5] ${
              active ? "text-[#E8E8E8] opacity-100" : "text-[#7A7A7A] opacity-45"
            }`}
          >
            “{item.quote}”
          </p>

          <div
            className={`flex items-center gap-3 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "opacity-100" : "opacity-45"
            }`}
          >
            <Avatar item={item} muted={!active} />
            <div className="min-w-0">
              <p
                className={`truncate text-[14px] font-semibold leading-5 transition-colors duration-500 ${
                  active ? "text-white" : "text-[#8A8A8A]"
                }`}
              >
                {item.name}
              </p>
              <p
                className={`truncate text-[12px] leading-5 transition-colors duration-500 ${
                  active ? "text-[#818181]" : "text-[#5C5C5C]"
                }`}
              >
                {item.role} at {item.company}
              </p>
            </div>
          </div>
        </motion.div>

        {!reduce ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
            style={{ background: glareBg, opacity: active ? 1 : 0 }}
          />
        ) : null}
      </motion.button>
    </motion.div>
  );
}

export function TestimonialCarousel() {
  const items = site.testimonials;
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const next = el.clientWidth;
      setViewportW((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activate = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? current : index));
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(items.length - 1, i + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(items.length - 1);
    }
  };

  const { widths, trackX } = useMemo(() => {
    if (viewportW <= 0) {
      return { widths: items.map(() => 0), trackX: 0 };
    }

    if (isMobile) {
      return {
        widths: items.map(() => viewportW),
        trackX: -(activeIndex * (viewportW + GAP)),
      };
    }

    const activeW = Math.max(COLLAPSED_CONTENT_W + 56, viewportW * ACTIVE_RATIO);
    const inactiveW = Math.max(88, viewportW * INACTIVE_RATIO);
    const widths = items.map((_, i) =>
      i === activeIndex ? activeW : inactiveW,
    );

    let before = 0;
    for (let i = 0; i < activeIndex; i += 1) before += inactiveW + GAP;
    const peek = activeIndex > 0 ? inactiveW * 0.92 + GAP : 0;
    let x = -(before - peek);

    const total =
      widths.reduce((sum, w) => sum + w, 0) + GAP * Math.max(0, items.length - 1);
    const minX = Math.min(0, viewportW - total);
    x = Math.max(minX, Math.min(0, x));

    return { widths, trackX: x };
  }, [activeIndex, isMobile, items, viewportW]);

  return (
    <section
      id="testimonials"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className="scroll-mt-24"
      onKeyDown={onKeyDown}
    >
      <h2 className="font-display text-[22px] text-white sm:text-[24px]">
        Testimonials
      </h2>

      <div
        ref={viewportRef}
        className="carousel-viewport mt-6 overflow-hidden [contain:layout] py-2"
      >
        <motion.div
          className="flex will-change-transform"
          style={{ gap: GAP }}
          initial={false}
          animate={{ x: trackX }}
          transition={reduce ? { duration: 0 } : morph}
          drag={isMobile ? "x" : false}
          dragConstraints={
            isMobile && viewportW > 0
              ? {
                  left: -((items.length - 1) * (viewportW + GAP)),
                  right: 0,
                }
              : undefined
          }
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (!isMobile || viewportW <= 0) return;
            const offset = info.offset.x + info.velocity.x * 0.15;
            if (offset < -40) {
              setActiveIndex((i) => Math.min(items.length - 1, i + 1));
            } else if (offset > 40) {
              setActiveIndex((i) => Math.max(0, i - 1));
            }
          }}
        >
          {items.map((item, index) => (
            <TestimonialCard
              key={item.id}
              item={item}
              active={index === activeIndex}
              width={
                widths[index] ||
                (index === 0
                  ? Math.max(
                      COLLAPSED_CONTENT_W + 56,
                      viewportW * ACTIVE_RATIO || COLLAPSED_CONTENT_W,
                    )
                  : Math.max(88, viewportW * INACTIVE_RATIO || 88))
              }
              onActivate={() => activate(index)}
              reduce={reduce}
            />
          ))}
        </motion.div>
      </div>

      {isMobile ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                index === activeIndex
                  ? "w-5 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
