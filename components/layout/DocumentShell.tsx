import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { OnThisPage } from "./OnThisPage";

export function DocumentShell({
  crumbs,
  toc,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  toc: { id: string; label: string }[];
  compactCrumb?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#101012] pb-28 text-white">
      <div className="sticky top-0 z-30 border-b border-dashed border-white/10 bg-[#101012]/92 backdrop-blur-md lg:hidden">
        <div className="page-gutter space-y-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <Breadcrumb items={crumbs} />
          {toc.length > 0 ? <OnThisPage items={toc} variant="rail" /> : null}
        </div>
      </div>

      <div className="page-gutter py-6 sm:py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(140px,168px)_minmax(0,1fr)] lg:gap-16 xl:gap-[160px]">
          <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
            <Breadcrumb items={crumbs} />
            {toc.length > 0 ? (
              <div className="mt-5 border-t border-dashed border-white/15 pt-4">
                <OnThisPage items={toc} />
              </div>
            ) : null}
          </aside>
          <div id="content" className="min-w-0 pb-20 sm:pb-24">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MediaWell({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="mt-8">
      <div className="rounded-[24px] bg-well p-3 sm:rounded-[32px] sm:p-4 md:p-8">
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function SquiggleLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href.startsWith("[") ? "#" : href}
      className="link-wave font-medium"
      {...(external ? { rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
