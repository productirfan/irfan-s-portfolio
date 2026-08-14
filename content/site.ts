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
      quote:
        "Irfan made the system visible without making it heavier. Engineering finally had a picture we could ship against.",
      name: "Priya Mehta",
      title: "PM · Auriga",
      initials: "PM",
    },
    {
      quote:
        "The voice work wasn’t pretty screens — it was interruption, latency, and recovery. That’s why the product felt real on a call.",
      name: "Arjun Rao",
      title: "Founding engineer · Calling",
      initials: "AR",
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
        role: "Product Designer",
        org: "Scry AI",
        years: "2024 — Present",
      },
      {
        role: "Product Designer",
        org: "Concentio",
        years: "2022 — 2024",
      },
      {
        role: "Product Designer",
        org: "Studio / 0→1",
        years: "2021 — 2022",
      },
    ],
  },
} as const;
