"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical } from "lucide-react";

export function Breadcrumb({
  items,
}: {
  items: { href?: string; label: string }[];
  compact?: boolean;
}) {
  const router = useRouter();
  const wrap = useRef<HTMLElement>(null);
  const measure = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const parent = [...items].reverse().find((item) => item.href)?.href ?? "/";
  const current = items[items.length - 1];
  const middle = items.slice(0, -1);

  const back = () => {
    if (typeof window !== "undefined") {
      const idx = (window.history.state as { idx?: number } | null)?.idx;
      if (typeof idx === "number" && idx > 0) {
        router.back();
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }
    router.push(parent);
  };

  useEffect(() => {
    const check = () => {
      if (!wrap.current || !measure.current) return;
      const available = wrap.current.clientWidth - 52;
      const overflows = measure.current.scrollWidth > available;
      const narrow = window.innerWidth < 1024;
      setCollapsed(overflows || narrow || items.length > 2);
    };
    check();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(check) : null;
    if (wrap.current) ro?.observe(wrap.current);
    window.addEventListener("resize", check);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [items]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const showCollapsed = collapsed && middle.length > 0;

  return (
    <nav
      ref={wrap}
      aria-label="Breadcrumb"
      className="relative flex min-w-0 max-w-full items-center gap-1.5 text-[13px] text-white sm:gap-2 sm:text-[14px]"
    >
      <button
        type="button"
        onClick={back}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/5 sm:h-9 sm:w-auto sm:justify-start sm:gap-2 sm:rounded-md sm:px-1"
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
        <span aria-hidden className="hidden text-white/25 sm:inline">
          |
        </span>
      </button>

      <div
        ref={measure}
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] top-0 flex whitespace-nowrap opacity-0"
      >
        {items.map((item) => (
          <span key={item.label} className="flex items-center">
            <span className="px-1 text-white/35">/</span>
            <span className="px-0.5">{item.label}</span>
          </span>
        ))}
      </div>

      {showCollapsed ? (
        <div ref={menuRef} className="relative flex min-w-0 flex-1 items-center">
          <span className="shrink-0 px-0.5 text-white/35 sm:px-1">/</span>
          <button
            type="button"
            aria-label="More path segments"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className="inline-flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-[#818181] transition hover:bg-white/5 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            onPointerEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                setMenuOpen(true);
              }
            }}
          >
            <MoreVertical size={16} strokeWidth={2.25} />
          </button>
          {menuOpen ? (
            <div
              id={menuId}
              role="menu"
              className="absolute top-full left-0 z-50 mt-1 min-w-44 overflow-hidden rounded-xl border border-dashed border-white/15 bg-[#1a1a1c] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              onPointerLeave={() => {
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  setMenuOpen(false);
                }
              }}
            >
              {middle.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    className="block px-3 py-2.5 text-sm text-white hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    className="block px-3 py-2.5 text-sm text-muted"
                  >
                    {item.label}
                  </span>
                ),
              )}
            </div>
          ) : null}
          <span className="shrink-0 px-0.5 text-white/35 sm:px-1">/</span>
          <span className="min-w-0 truncate font-medium">{current?.label}</span>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 items-center overflow-hidden">
          {items.map((item, i) => (
            <span key={item.label} className="flex min-w-0 items-center">
              <span className="shrink-0 px-0.5 text-white/35 sm:px-1">/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="shrink-0 whitespace-nowrap px-0.5 transition hover:opacity-70"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`min-w-0 truncate px-0.5 ${
                    i === items.length - 1 ? "font-medium" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}
