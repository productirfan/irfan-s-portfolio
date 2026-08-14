"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Minus } from "lucide-react";

export function OnThisPage({
  items,
  variant = "sidebar",
}: {
  items: { id: string; label: string }[];
  variant?: "sidebar" | "rail";
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id);
        },
        { rootMargin: "-30% 0px -55% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  if (variant === "rail") {
    return (
      <nav aria-label="On this page" className="min-w-0">
        <ul className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className={`inline-flex h-9 items-center rounded-full px-3 text-[13px] transition-colors ${
                    isActive
                      ? "bg-white font-medium text-[#101012]"
                      : "bg-white/8 text-[#818181] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="On this page">
      <p className="mb-2 text-[11px] tracking-[0.04em] text-muted">On this page</p>
      <ul className="flex flex-col gap-0 text-[13px]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                className={`inline-flex min-h-8 items-center gap-1.5 transition-colors ${
                  isActive ? "font-medium text-white" : "text-[#818181] hover:text-white"
                }`}
              >
                {isActive ? (
                  <Minus size={10} strokeWidth={3} />
                ) : (
                  <span className="w-2.5" />
                )}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
