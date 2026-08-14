import Image from "next/image";
import type { ReactNode } from "react";
import { ExperienceList } from "@/components/ui/ExperienceList";
import { CaseStudyStack } from "@/components/ui/CaseStudyStack";
import { ProfilePortrait } from "@/components/ui/ProfilePortrait";
import { SitePreviewLink } from "@/components/ui/SitePreviewLink";
import { StacksBento } from "@/components/ui/StacksBento";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { site } from "@/content/site";

const socials = [
  { label: "LinkedIn", href: site.contact.linkedin, external: true },
  { label: "Gmail", href: `mailto:${site.contact.email}`, external: false },
  { label: "Whatsapp", href: site.contact.whatsapp, external: true },
  { label: "Resume", href: site.contact.resume, external: false },
] as const;

const reach = [
  { label: "Phone call,", href: site.contact.phone, icon: "/figma/phone.png" },
  { label: "Email,", href: `mailto:${site.contact.email}`, icon: "/figma/email.png" },
  { label: "Schedule", href: site.contact.booking, icon: "/figma/calendar.png" },
  { label: "WhatsApp.", href: site.contact.whatsapp, icon: "/figma/whatsapp.png" },
] as const;

function DotBand() {
  return <div aria-hidden className="dot-band diagonal-hatch" />;
}

function Content({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-8 md:px-10 lg:px-14">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#101012] text-white">
      <div
        aria-hidden
        className="dot-rail dot-pattern pointer-events-none absolute inset-y-0 left-0 z-0 hidden border-r border-[#1b1b1b] md:block"
      />
      <div
        aria-hidden
        className="dot-rail dot-pattern pointer-events-none absolute inset-y-0 right-0 z-0 hidden border-l border-[#1b1b1b] md:block"
      />

      <div className="relative z-10 pb-32 pt-12 md:mx-[72px] md:pt-16">
        <Content>
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <ProfilePortrait />
            {site.available ? (
              <p className="flex min-w-0 max-w-[58%] items-center gap-2 pt-1 text-[12px] leading-5 sm:max-w-none sm:gap-2.5 sm:text-[14px] sm:leading-7">
                <span className="status-dot shrink-0" aria-hidden />
                <span className="status-flash text-right sm:text-left">
                  Looking for a Remote Role
                </span>
              </p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_176px] lg:gap-16">
            <div>
              <h1 className="font-display text-[22px] text-white sm:text-[26px] lg:text-[28px]">
                {site.greeting}
              </h1>
              <p className="mt-4 max-w-[688px] text-[15px] font-light leading-6 text-white/60 sm:text-[17px] sm:leading-7 lg:text-[18px]">
                <span>A </span>
                <span className="text-white">Product Designer</span>
                <span> at </span>
                <SitePreviewLink
                  href="https://www.scryai.com"
                  label={site.company}
                  domain="scryai.com"
                  logoSrc="/org/scry.svg"
                  description="Product design · Enterprise AI"
                  icon={
                    <Image
                      src="/figma/scry.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="inline-block size-[18px]"
                    />
                  }
                />
                <span> based in </span>
                <span className="inline-flex items-center gap-1.5 align-middle">
                  <Image
                    src="/figma/india.png"
                    alt=""
                    width={18}
                    height={18}
                    className="inline-block size-[18px] rounded-full object-cover"
                  />
                  <span className="text-white">{site.locationFull}</span>
                </span>
                <span>
                  {" "}
                  where I specialize in crafting polished web interfaces with a
                  strong focus on accessibility, web animation, and product
                  design.
                </span>
              </p>

              <p className="mt-10 flex max-w-[640px] flex-wrap items-center gap-x-1.5 gap-y-2 text-[15px] font-light leading-6 text-white/60 sm:mt-[62px] sm:text-[17px] sm:leading-7 lg:text-[18px]">
                <span>Reach out to me via a</span>
                {reach.map((item, i) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="size-[18px] object-contain"
                    />
                    <a
                      href={item.href}
                      className="text-white transition hover:opacity-80"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </a>
                    {i === 2 ? (
                      <span className="text-white/60"> or</span>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>

            <ul className="flex flex-row flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3 lg:pt-1">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex min-w-[140px] items-center justify-between gap-4 text-[16px] font-light text-white/60 transition hover:text-white lg:w-full"
                    {...(item.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {item.label}
                    <Image
                      src="/figma/arrow.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 opacity-70"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Content>

        <div className="mt-24 sm:mt-28">
          <DotBand />
        </div>

        <Content>
          <section id="projects" className="mt-24 scroll-mt-24 sm:mt-28">
            <h2 className="font-display text-[22px] text-white sm:text-[24px]">
              Selected Projects
            </h2>
            <div className="mt-10">
              <CaseStudyStack />
            </div>
          </section>
        </Content>

        <div className="mt-24 sm:mt-28">
          <DotBand />
        </div>

        <Content>
          <section id="experience" className="mt-24 scroll-mt-24 pb-8 sm:mt-28">
            <h2 className="font-display text-[22px] text-white sm:text-[24px]">
              Experience
            </h2>
            <ExperienceList className="mt-10" />
          </section>
        </Content>

        <div className="mt-24 sm:mt-28">
          <DotBand />
        </div>

        <Content>
          <div className="mt-24 pb-8 sm:mt-28">
            <TestimonialCarousel />
          </div>
        </Content>

        <div className="mt-24 sm:mt-28">
          <DotBand />
        </div>

        <Content>
          <div className="mt-24 pb-8 sm:mt-28">
            <StacksBento />
          </div>
        </Content>

        {/* Dock “About” lands at page end (above floating dock padding) */}
        <div id="about" className="h-px w-full scroll-mt-24" aria-hidden />
      </div>
    </div>
  );
}
