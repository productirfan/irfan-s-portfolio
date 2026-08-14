import type { Metadata } from "next";
import { DocumentShell } from "@/components/layout/DocumentShell";

export const metadata: Metadata = { title: "Thoughts" };

export default function ThoughtsPage() {
  return (
    <DocumentShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Thoughts" }]}
      toc={[{ id: "soon", label: "Soon" }]}
    >
      <section id="soon">
        <h1 className="font-display text-3xl">Thoughts</h1>
        <p className="mt-4 text-[17px] leading-7 text-muted">
          Writing will live here when there is something worth sharing.
        </p>
      </section>
    </DocumentShell>
  );
}
