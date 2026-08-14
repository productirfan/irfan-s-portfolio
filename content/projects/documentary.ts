import type { Documentary } from "../types";

export const documentary: Record<string, Documentary> = {
  auriga: {
    headline: "An AI knowledge workspace where documents, sources, and the web become one conversation",
    intro:
      "Enterprise knowledge is not a search box. It is a workspace with memory, permissions, and an agent that has to know what it is allowed to see.",
    status: "Shipped",
    timeline: "8 months · 2024–25",
    tools: "Figma · FigJam · Cursor",
    collaborator: "Ananya Shah, PM",
    summary:
      "Turned fragmented enterprise knowledge into a permissioned workspace — sources, agent, and people in one object. Setup completion rose and answers stayed attached to evidence.",
    subtitle: "Customer Support",
    cardHeadline:
      "Turning 40,000 Closed Tickets Into a Self-Service Knowledge System.",
    tags: ["CUSTOMER SERVICE", "KNOWLEDGE BASE", "AI WORKFLOWS"],
    cardTone: "lavender",
    cardImage: "/work/arstelio.png",
    previewScreens: ["auriga-workspace", "auriga-ask", "auriga-sources"],
    sections: [
      {
        id: "overview",
        kicker: "Overview",
        title: "A workspace object, not a prompt",
        body: [
          "Auriga is a knowledge workspace where people ask in natural language across documents, connected sources, and the web.",
          "Setup, sources, people, and asking live on one object — so the agent has a room, not a chat overlay.",
        ],
        iconRow: "Product marks",
      },
      {
        id: "problem",
        kicker: "Problem",
        title: "Understanding the opportunity",
        body: [
          "The existing workflow forced people to jump between surfaces that did not share context.",
          "Questions lived in chat. Evidence lived in files. Permissions lived in IT. The model had no product around it.",
        ],
      },
      {
        id: "approach",
        kicker: "Approach",
        title: "Finding the right solution",
        body: [
          "Treating this as a chatbot would have made the model look clever and the work remain fragmented.",
          "The workspace became the primary object. Request, sources, agent, and user group assemble first. Asking is the last step.",
        ],
        galleries: [
          {
            caption: "Saving context from documents, sources, and the web",
            screens: ["auriga-sources", "auriga-agent", "auriga-ask"],
          },
        ],
      },
      {
        id: "decisions",
        kicker: "Key decisions",
        title: "Designing the experience",
        subtitle: "Setup as a workspace layer",
        body: [
          "Buried settings were rejected: configuration is part of the work, not a preference.",
          "A one-time wizard stayed as a first-run path. Setup as a workspace layer won — the agent is a member of the room.",
        ],
        callout: "Ps. Hover any screen — they lift so you can inspect the interface.",
        galleries: [
          {
            caption: "Agent setup, people, and workspace",
            screens: ["auriga-agent", "auriga-people", "auriga-workspace", "auriga-ask"],
          },
          {
            caption: "Settings",
            screens: ["auriga-settings", "notify"],
          },
        ],
      },
      {
        id: "ui",
        kicker: "UI sample",
        title: "Some UI from the product",
        body: ["If the agent can see it, the user should be able to find it. Answers stay attached to sources."],
        galleries: [
          {
            caption: "Auth and permission screen",
            screens: ["auth", "notify"],
          },
        ],
      },
      {
        id: "conclusion",
        kicker: "Conclusion",
        title: "What was learnt",
        body: [
          "Enterprise AI fails when the interface pretends the system is simple. The work was not to make the model look magical. It was to make the room honest.",
          "Teams could reconstruct how knowledge was allowed to move — without a demo script.",
        ],
        galleries: [
          {
            caption: "Settings and how the workspace is inspected",
            screens: ["auriga-settings", "auriga-workspace"],
          },
        ],
      },
    ],
  },
  "ai-calling": {
    headline: "A real-time voice assistant designed around interruption, latency, and context",
    intro:
      "A chatbot read aloud is not a calling experience. People interrupt. They change their mind. They expect the system to keep up.",
    status: "In-development",
    timeline: "5 months · 2025",
    tools: "Figma · Rive · Voice prototyping",
    collaborator: "Arjun Rao, engineer",
    summary:
      "Designed interruption, latency, and context retention so a voice assistant can be cut off without losing the thread — recovery became the happy path.",
    subtitle: "Creator Marketplace",
    cardHeadline:
      "Helping Creators Manage Brand Campaigns Without Losing the Thread.",
    tags: ["CAMPAIGNS", "CREATOR TOOLS", "MARKETPLACE"],
    cardTone: "peach",
    cardImage: "/work/adsly.png",
    previewScreens: ["call-listen", "call-reply", "call-home"],
    sections: [
      {
        id: "overview",
        kicker: "Overview",
        title: "The product is the dialogue",
        body: [
          "A real-time AI voice assistant for finding, confirming, and acting — while the other party is still speaking.",
        ],
        iconRow: "Voice marks",
      },
      {
        id: "problem",
        kicker: "Problem",
        title: "Understanding the opportunity",
        body: [
          "Voice products fail in the gaps: barge-in, silence, and memory. If those states are invisible, the product feels broken even when the model is correct.",
        ],
      },
      {
        id: "approach",
        kicker: "Approach",
        title: "Finding the right solution",
        body: [
          "Interruption is a happy path. The assistant stops, updates the working context, and resumes without restarting the task.",
        ],
        galleries: [
          {
            caption: "Listening, thinking, responding",
            screens: ["call-listen", "call-think", "call-reply"],
          },
        ],
      },
      {
        id: "decisions",
        kicker: "Key decisions",
        title: "Preset times instead of a date picker",
        body: [
          "Picking a date and time for every action is the kind of friction that makes people abandon a voice product in week one.",
          "Yield, absorb, continue won over finishing the sentence anyway. Stop is necessary. Reset is not.",
        ],
        callout: "Ps. I couldn’t embed live audio here, so the states are shown as screens.",
        galleries: [
          {
            caption: "Creating preset times",
            screens: ["call-preset", "call-home"],
          },
        ],
      },
      {
        id: "ui",
        kicker: "UI sample",
        title: "Some UI from the mobile companion",
        body: ["States you can read with the sound off."],
        galleries: [
          {
            caption: "Share sheet and call UI",
            screens: ["call-share", "call-reply", "call-listen", "notify"],
          },
        ],
      },
      {
        id: "conclusion",
        kicker: "Conclusion",
        title: "What was learnt",
        body: [
          "If you cannot interrupt it, you cannot trust it. Voice design is mostly the design of recovery.",
          "Successful barge-in recovery became the default path, not an edge case.",
        ],
        galleries: [
          {
            caption: "Companion home",
            screens: ["call-home", "call-preset"],
          },
        ],
      },
    ],
  },
  concentio: {
    headline: "An enterprise system for coordinating complex operational work across people, product, and data",
    intro:
      "When the work spans teams and systems, the interface has to be a map — not a thinner version of someone else’s inbox.",
    status: "Shipped",
    timeline: "10 months · 2023–24",
    tools: "Figma · FigJam",
    collaborator: "Ops + engineering pod",
    summary:
      "Replaced ticket queues with a live system map operators can actually run — handoffs, agents, and data in one picture.",
    subtitle: "Stakeholder Relations",
    cardHeadline:
      "Making Property Performance Readable for Every Stakeholder at Once.",
    tags: ["REAL ESTATE", "REPORTING", "FINANCE"],
    cardTone: "mint",
    cardImage: "/work/darcy.png",
    previewScreens: ["conc-map", "conc-empty", "conc-node"],
    sections: [
      {
        id: "overview",
        kicker: "Overview",
        title: "A map of the work, not another queue",
        body: [
          "Concentio moves operational work from people, through product, into data, and back as a decision.",
        ],
        iconRow: "System marks",
      },
      {
        id: "problem",
        kicker: "Problem",
        title: "Understanding the opportunity",
        body: [
          "Operators held the system in their heads. The software only held the tickets. Handoffs lived in chat.",
        ],
      },
      {
        id: "approach",
        kicker: "Approach",
        title: "Finding the right solution",
        body: [
          "The map became the home screen. Local tools still exist — they open as inspections of a node, not as destinations that forget the rest.",
        ],
        galleries: [
          {
            caption: "Map, queue, and node inspection",
            screens: ["conc-map", "conc-queue", "conc-node"],
          },
        ],
      },
      {
        id: "decisions",
        kicker: "Key decisions",
        title: "Folders for the stuff whose time has passed",
        body: [
          "Not everything gets closed on schedule. When a run lapses, the work doesn’t vanish — it moves into archive. You can create folders to categorise that history.",
        ],
        galleries: [
          {
            caption: "Archive empty and list states",
            screens: ["conc-empty", "conc-queue", "conc-node", "conc-map"],
          },
        ],
      },
      {
        id: "ui",
        kicker: "UI sample",
        title: "Some UI from the product",
        body: ["Doing and understanding should not be different apps."],
        galleries: [
          {
            caption: "Auth and permission",
            screens: ["auth", "notify"],
          },
        ],
      },
      {
        id: "conclusion",
        kicker: "Conclusion",
        title: "What was learnt",
        body: [
          "Enterprise UX is often just making the real system undeniable. The map is not a flourish. It is the argument.",
          "New operators could teach the system by pointing at the map in week two.",
        ],
        galleries: [
          {
            caption: "Settings and archive",
            screens: ["auriga-settings", "conc-empty"],
          },
        ],
      },
    ],
  },
};

export const caseNav = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "decisions", label: "Key decisions" },
  { id: "ui", label: "UI sample" },
  { id: "conclusion", label: "Conclusion" },
];
