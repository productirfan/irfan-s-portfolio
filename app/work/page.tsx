import type { Metadata } from "next";
import Link from "next/link";
import { DocumentShell, MediaWell, SquiggleLink } from "@/components/layout/DocumentShell";
import { ExperienceList } from "@/components/ui/ExperienceList";
import { PhoneGallery } from "@/components/ui/PhoneMocks";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Works" };

const toc = [
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "experience", label: "Work experience" },
  { id: "testimonial", label: "Testimonial" },
];

const previews: Record<string, string[]> = {
  auriga: ["auriga-workspace", "auriga-ask", "auriga-sources"],
  "ai-calling": ["call-listen", "call-reply", "call-home"],
  concentio: ["conc-map", "conc-empty", "conc-node"],
};

export default function WorkPage() {
  const booking = site.contact.booking.startsWith("[") ? "#" : site.contact.booking;
  const mail = site.contact.email.startsWith("[")
    ? "#"
    : `mailto:${site.contact.email}`;

  return (
    <DocumentShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Works" }]}
      toc={toc}
    >
      <h1 className="font-display text-3xl">Works</h1>
      <p className="mt-4 max-w-xl text-[17px] leading-7 text-muted">{site.worksIntro}</p>

      <section id="projects" className="scroll-mt-32 lg:scroll-mt-24 mt-16">
        <p className="text-sm text-muted">Projects</p>
        <div className="mt-6 space-y-14">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="block">
              <PhoneGallery screens={previews[project.slug] ?? ["auriga-workspace"]} />
              <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-muted">
                  {project.year} | {project.oneLiner}
                </p>
                <p className="font-medium">{project.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="playground" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <p className="text-sm text-muted">Playground</p>
        <div className="mt-6 space-y-8">
          {site.playground.map((item) => (
            <div key={item.title}>
              <MediaWell caption={item.title}>
                <div className="phone-hover flex min-h-40 items-center justify-center rounded-2xl bg-white text-sm text-muted">
                  {item.note}
                </div>
              </MediaWell>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <p className="text-sm text-muted">Experience</p>
        <ExperienceList className="mt-8" />
      </section>

      <section id="testimonial" className="scroll-mt-32 lg:scroll-mt-24 mt-20">
        <TestimonialCarousel />
        <p className="mt-12 text-[17px] leading-7 text-muted">
          If you&apos;re building products that require thoughtful design, I&apos;d love to talk.{" "}
          <SquiggleLink href={booking}>Booking a call</SquiggleLink> or{" "}
          <SquiggleLink href={mail}>Message me</SquiggleLink>.
        </p>
      </section>
    </DocumentShell>
  );
}
