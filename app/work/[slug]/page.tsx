import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell, SquiggleLink } from "@/components/layout/DocumentShell";
import { Callout, IconRow, PhoneGallery } from "@/components/ui/PhoneMocks";
import { ProjectNavCard } from "@/components/ui/WorkRow";
import { getPrevProject, getProject, getNextProject, projects } from "@/content/projects";
import { caseNav, documentary } from "@/content/projects/documentary";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.oneLiner };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  const doc = documentary[slug];
  if (!project || !doc) notFound();

  const prev = getPrevProject(slug);
  const next = getNextProject(slug);
  const booking = site.contact.booking.startsWith("[") ? "#" : site.contact.booking;
  const mail = site.contact.email.startsWith("[")
    ? "#"
    : `mailto:${site.contact.email}`;

  const meta = [
    ["Role", project.role, false],
    ["Project status", doc.status, true],
    ["Timeline", doc.timeline, false],
    ["Year", project.year, false],
    ["Tools", doc.tools, false],
    ["Collaborator", doc.collaborator, false],
  ] as const;

  return (
    <DocumentShell
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/#experience", label: "Work" },
        { label: project.title },
      ]}
      toc={caseNav}
    >
      <h1 className="font-display text-3xl leading-tight md:text-[2.15rem]">
        {doc.headline}
      </h1>
      <p className="mt-5 text-[17px] leading-7 text-muted">{doc.intro}</p>

      <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-dashed border-black/15 pt-8 sm:grid-cols-2">
        {meta.map(([label, value, accent]) => (
          <div key={label}>
            <dt className="font-mono text-[11px] text-muted">{label}</dt>
            <dd className={`mt-1 font-medium ${accent ? "text-accent" : ""}`}>
              {accent ? <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" /> : null}
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {doc.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-32 lg:scroll-mt-24 mt-16">
          <p className="text-sm text-muted">{section.kicker}</p>
          <h2 className="mt-2 font-display text-[1.85rem] leading-tight">{section.title}</h2>
          {section.subtitle ? (
            <h3 className="mt-3 text-lg font-medium">{section.subtitle}</h3>
          ) : null}
          <div className="mt-4 space-y-4 text-[17px] leading-7 text-muted">
            {section.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {section.callout ? <Callout>{section.callout}</Callout> : null}
          {section.iconRow ? <IconRow caption={section.iconRow} /> : null}
          {section.galleries?.map((gallery) => (
            <PhoneGallery
              key={gallery.caption}
              caption={gallery.caption}
              screens={gallery.screens}
            />
          ))}
        </section>
      ))}

      <p className="mt-12 text-[17px] leading-7 text-muted">
        If you&apos;re building products that require thoughtful design, I&apos;d love to talk.{" "}
        <SquiggleLink href={booking}>Booking a call</SquiggleLink> or{" "}
        <SquiggleLink href={mail}>Message me</SquiggleLink>.
      </p>

      <div className="mt-16 grid gap-4 border-t border-dashed border-black/15 pt-8 sm:grid-cols-2">
        <ProjectNavCard project={prev} label="Previous project" />
        <ProjectNavCard project={next} label="Next project" />
      </div>
    </DocumentShell>
  );
}
