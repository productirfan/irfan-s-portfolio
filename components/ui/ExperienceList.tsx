import Image from "next/image";
import { site } from "@/content/site";

export function ExperienceList({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ul className={`space-y-10 ${className}`.trim()}>
      {site.about.experience.map((item) => (
        <li
          key={`${item.org}-${item.role}-${item.years}`}
          className="grid grid-cols-1 gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-8"
        >
          <p className="pt-0.5 text-[13px] font-normal tracking-[0.02em] text-[#999999] sm:text-[14px]">
            {item.years}
          </p>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[16px] font-medium leading-6 text-white sm:text-[17px]">
              <span>{item.role}</span>
              <span className="font-normal text-white/70">at</span>
              <span className="inline-flex items-center gap-1.5">
                <Image
                  src={item.logo}
                  alt=""
                  width={22}
                  height={22}
                  className="size-[22px] shrink-0 rounded-[5px]"
                />
                <span>{item.org}</span>
              </span>
            </p>
            <p className="mt-1.5 max-w-[40rem] text-[15px] font-normal leading-6 text-[#888888] sm:text-[16px] sm:leading-7">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
