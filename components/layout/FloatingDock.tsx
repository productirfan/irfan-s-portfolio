"use client";

import Link from "next/link";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const items = [
  { href: "/", label: "Home", icon: "/figma/nav-home.svg" },
  { href: "/work", label: "Work", icon: "/figma/nav-work.svg" },
  { href: "/about", label: "About", icon: "/figma/nav-about.svg" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FloatingDock() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false });

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => isActive(pathname, item.href)),
  );

  const measure = useCallback(() => {
    const track = trackRef.current;
    const el = itemRefs.current[activeIndex];
    if (!track || !el) return;
    setPill({ x: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [activeIndex]);

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
        className="pointer-events-auto relative flex gap-1.5 rounded-[16px] border border-white/6 bg-[#1a1a1a]/92 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1.5 bottom-1.5 z-0 rounded-[12px] border border-[#6e6e6e] bg-linear-to-b from-[#8a8a8a] to-[#5a5a5c] will-change-transform"
          initial={false}
          animate={
            pill.ready
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

        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="relative z-10 flex w-[76px] flex-col items-center gap-2 rounded-[12px] px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={`relative block size-[18px] overflow-hidden transition-opacity duration-150 ${
                  active ? "opacity-100" : "opacity-45"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
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
                    : "font-normal text-[#8a8a8a]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
