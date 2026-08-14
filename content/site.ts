export const site = {
  name: "Irfan Khan",
  role: "Product Designer",
  company: "Scry AI",
  updatedDate: "Aug 2026",
  available: true,
  location: "New Delhi, IN",
  locationFull: "New Delhi, India",
  greeting: "Hey there! I’m Irfan Khan",
  bio: "I’m a product designer based in New Delhi, working on AI, enterprise, and SaaS. I design 0→1 products and systems that make complex workflows feel simple.",
  contact: {
    email: "irfan.designs@gmail.com",
    linkedin: "https://www.linkedin.com/in/irfan",
    resume: "/resume.pdf",
    booking: "https://cal.com/irfan",
    whatsapp: "https://wa.me/",
    phone: "tel:",
  },
  worksIntro:
    "Below are some select projects, full walkthroughs on request",
  playground: [
    {
      title: "Agent setup, as a surface",
      note: "A motion study for revealing permissions without a settings dump.",
    },
  ],
  testimonials: [
    {
      id: "priya",
      quote:
        "Irfan made the system visible without making it heavier. Engineering finally had a picture we could ship against — his attention to detail ensured a smooth rollout.",
      name: "Priya Mehta",
      role: "Product Manager",
      company: "Auriga",
      initials: "PM",
      avatarTone: "#D4A574",
      companyLogo: "/org/auriga.svg",
    },
    {
      id: "arjun",
      quote:
        "The voice work wasn’t pretty screens — it was interruption, latency, and recovery. That’s why the product felt real on a call.",
      name: "Arjun Rao",
      role: "Founding Engineer",
      company: "Calling",
      initials: "AR",
      avatarTone: "#7C9CBF",
      companyLogo: "/org/concentio.svg",
    },
    {
      id: "meera",
      quote:
        "Working with Irfan on our enterprise admin surfaces set a new standard. He designs systems people can actually operate under pressure.",
      name: "Meera Shah",
      role: "Design Lead",
      company: "Concentio",
      initials: "MS",
      avatarTone: "#C4A0A8",
      companyLogo: "/org/concentio.svg",
    },
    {
      id: "dev",
      quote:
        "Collaborating with Irfan on 0→1 AI workflows was a game-changer. He kept the complex model honest without drowning the interface.",
      name: "Dev Kapoor",
      role: "Engineering Manager",
      company: "Scry AI",
      initials: "DK",
      avatarTone: "#8FA88A",
      companyLogo: "/org/scry.svg",
    },
  ],
  about: {
    headline: "Thank you for visiting my little corner of the internet",
    who: [
      "I’m Irfan, a product designer in New Delhi. I work where the workflow is too heavy for the interface it currently lives in.",
      "Most of my work sits in AI, enterprise, and 0→1 SaaS — products that have to feel simple without hiding the system underneath.",
    ],
    photos: [
      { label: "Studio" },
      { label: "Desk" },
      { label: "Workshop" },
      { label: "Walks" },
    ],
    academics: [
      {
        title: "B.Des, Interaction Design",
        years: "2018 — 2022",
        place: "National Institute of Design, India",
      },
      {
        title: "Product design intensive",
        years: "2022",
        place: "Independent / studio mentorship",
      },
    ],
    software: ["Figma", "Notion", "Claude", "ChatGPT", "Cursor", "FigJam"],
    hardware: [
      "LG UltraFine 27\"",
      "MacBook Pro 14\"",
      "iPhone 15 Pro",
      "Sony WH-1000XM5",
    ],
    favorites: [
      { label: "Figma", filled: true },
      { label: "", filled: false },
      { label: "Cricket", filled: true },
      { label: "", filled: false },
      { label: "", filled: false },
      { label: "Espresso", filled: true },
      { label: "", filled: false },
      { label: "", filled: false },
      { label: "", filled: false },
      { label: "Systems", filled: true },
      { label: "", filled: false },
      { label: "", filled: false },
      { label: "Delhi", filled: true },
      { label: "", filled: false },
      { label: "", filled: false },
      { label: "", filled: false },
    ],
    experience: [
      {
        role: "Product designer",
        org: "Scry AI",
        years: "2024 — NOW",
        logo: "/org/scry.svg",
        description:
          "Designing AI enterprise workflows and 0→1 product surfaces that turn complex systems into clear, shippable interfaces.",
      },
      {
        role: "Product designer",
        org: "Concentio",
        years: "2022 — 2024",
        logo: "/org/concentio.svg",
        description:
          "Led product design for SaaS and ops tooling, shipping end-to-end flows used daily by growing customer teams.",
      },
      {
        role: "Product designer",
        org: "Auriga",
        years: "2021 — 2022",
        logo: "/org/auriga.svg",
        description:
          "Designed agent and workflow surfaces that made permissions, state, and recovery visible without overwhelming the UI.",
      },
      {
        role: "Product designer",
        org: "Studio",
        years: "2019 — 2021",
        logo: "/org/studio.svg",
        description:
          "Built 0→1 product interfaces across early-stage SaaS, from first flows through polished handoff-ready systems.",
      },
    ],
  },
} as const;
