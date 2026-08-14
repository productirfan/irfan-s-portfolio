"use client";

import Link from "next/link";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const items = [
  { href: "/", label: "Home", icon: "/figma/nav-home.svg" },
  { href: "/#experience", label: "Work", icon: "/figma/nav-work.svg" },
  { href: "/#about", label: "About", icon: "/figma/nav-about.svg" },
] as const;

const MAX_TILT = 12;
const MAX_SHIFT = 3;

function isActive(pathname: string, href: string) {
  // Home only when on `/`. Case studies: no dock item active.
  if (href === "/") return pathname === "/";
  return false;
}

function scrollToHash(hash: string) {
  if (!hash || hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}

function DockItem({
  href,
  label,
  icon,
  active,
  itemRef,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
  itemRef: (node: HTMLDivElement | null) => void;
  onNavigate: (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const reduce = useReducedMotion();
  const hitRef = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 200, damping: 14, mass: 0.28 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const rotateY = useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const translateX = useTransform(x, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const translateY = useTransform(y, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const el = hitRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={itemRef}
      className="relative z-10 [perspective:500px]"
    >
      <Link
        href={href}
        ref={hitRef}
        onClick={(e) => onNavigate(e, href)}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`group relative flex w-[76px] flex-col items-center gap-2 rounded-[12px] px-3 py-2.5 outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-white/40 ${
          active ? "hover:brightness-110" : "hover:bg-white/[0.1]"
        }`}
        aria-current={active ? "page" : undefined}
      >
        <motion.span
          className="flex w-full flex-col items-center gap-2"
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
        >
          <span
            className={`relative block size-[18px] overflow-hidden transition-opacity duration-150 ${
              active
                ? "opacity-100"
                : "opacity-45 group-hover:opacity-90"
            }`}
            style={{ filter: "brightness(0) invert(1)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon}
              alt=""
              width={18}
              height={18}
              className="size-full"
            />
          </span>
          <span
            className={`relative text-[13px] leading-none tracking-[-0.01em] transition-colors duration-150 ${
              active
                ? "font-medium text-white"
                : "font-normal text-white/40 group-hover:text-white/70"
            }`}
          >
            {label}
          </span>
        </motion.span>
      </Link>
    </div>
  );
}

export function FloatingDock() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false });

  const activeIndex = items.findIndex((item) => isActive(pathname, item.href));
  const hasActive = activeIndex >= 0;

  const onNavigate = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIdx = href.indexOf("#");
      const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";

      // Already on home: smooth-scroll instead of full navigation
      if (pathname === "/") {
        if (href === "/" || href === "/#") {
          e.preventDefault();
          scrollToHash("#");
          return;
        }
        if (hash) {
          e.preventDefault();
          scrollToHash(hash);
          if (typeof window !== "undefined" && window.history.replaceState) {
            window.history.replaceState(null, "", hash);
          }
        }
      }
    },
    [pathname],
  );

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!hasActive) {
      setPill((p) => ({ ...p, ready: false }));
      return;
    }
    const el = itemRefs.current[activeIndex];
    if (!track || !el) return;
    setPill({ x: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [activeIndex, hasActive]);

  useLayoutEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, pathname]);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3"
    >
      <div
        ref={trackRef}
        className="pointer-events-auto relative flex gap-1.5 rounded-[16px] border border-white/10 bg-[#141416]/92 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1.5 bottom-1.5 z-0 rounded-[12px] border border-[#6e6e6e] bg-linear-to-b from-[#8a8a8a] to-[#5a5a5c] will-change-transform"
          initial={false}
          animate={
            pill.ready && hasActive
              ? { x: pill.x, width: pill.width, opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 480, damping: 38, mass: 0.55 }
          }
          style={{ left: 0 }}
        />

        {items.map((item, index) => (
          <DockItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={hasActive && index === activeIndex}
            onNavigate={onNavigate}
            itemRef={(node) => {
              itemRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </nav>
  );
}
