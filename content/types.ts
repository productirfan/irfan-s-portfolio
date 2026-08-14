export type CursorKind = "explore" | "play" | "why" | "zoom" | "continue";

export type Metric = {
  value: string;
  label: string;
};

export type NavItem = {
  id: string;
  label: string;
};

export type HeroStyle = "editorial" | "workspace" | "conversation" | "system";

export type DecisionOption = {
  id: string;
  label: string;
  status: "rejected" | "considered" | "selected";
  pros: string[];
  cons: string[];
  constraints: string[];
  why: string;
};

export type ResearchLayer = {
  id: string;
  label: string;
  countLabel: string;
  evidence: string[];
};

export type StickyStep = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  uiState: string;
};

export type Exploration = {
  id: string;
  title: string;
  status: "rejected" | "promising" | "selected";
  tested: string;
  outcome: string;
  learned: string;
  influence: string;
};

export type SystemNode = {
  id: string;
  label: string;
  problem: string;
  decision: string;
  interfaceNote: string;
  rationale: string;
};

export type ConversationBeat = {
  id: string;
  speaker: "user" | "ai" | "system";
  text: string;
  state?: "listening" | "thinking" | "responding";
  reveals?: string;
};

export type Principle = {
  number: string;
  title: string;
  body: string;
};

export type WhyDecision = {
  decision: string;
  context: string;
  tradeoff: string;
  reasoning: string;
  result: string;
};

export type WorkspaceStep = {
  id: string;
  label: string;
  title: string;
  body: string;
};

type SectionBase = {
  id: string;
  nav?: string;
};

export type CaseStudySection =
  | (SectionBase & {
      type: "hero";
      kicker: string;
      title: string;
      statement?: string;
    })
  | (SectionBase & {
      type: "snapshot";
      description: string;
      role: string;
      timeline: string;
      team: string;
      platform: string;
      contribution: string;
    })
  | (SectionBase & {
      type: "impact";
      title?: string;
      metrics: Metric[];
      qualitative: string[];
      before?: string[];
      after?: string[];
      business?: string;
      user?: string;
      product?: string;
      design?: string;
    })
  | (SectionBase & {
      type: "context" | "problem" | "opportunity" | "outcome" | "learnings";
      kicker?: string;
      title: string;
      body: string[];
      statement?: string;
    })
  | (SectionBase & {
      type: "research-evidence";
      title: string;
      layers: ResearchLayer[];
    })
  | (SectionBase & {
      type: "sticky-story";
      title: string;
      steps: StickyStep[];
    })
  | (SectionBase & {
      type: "workflow";
      title: string;
      steps: string[];
    })
  | (SectionBase & {
      type: "system-map";
      title: string;
      intro: string;
      nodes: SystemNode[];
    })
  | (SectionBase & {
      type: "exploration";
      title: string;
      intro: string;
      items: Exploration[];
    })
  | (SectionBase & {
      type: "decision-explorer";
      title: string;
      prompt: string;
      options: DecisionOption[];
    })
  | (SectionBase & {
      type: "before-after";
      title: string;
      beforeLabel: string;
      afterLabel: string;
      beforeNote: string;
      afterNote: string;
    })
  | (SectionBase & {
      type: "design-principles";
      title: string;
      principles: Principle[];
    })
  | (SectionBase & {
      type: "why-this-way";
      title: string;
      intro: string;
      items: WhyDecision[];
    })
  | (SectionBase & {
      type: "workspace-assembly";
      title: string;
      intro: string;
      steps: WorkspaceStep[];
    })
  | (SectionBase & {
      type: "interactive-prototype";
      title: string;
      steps: { id: string; label: string; body: string }[];
    })
  | (SectionBase & {
      type: "conversation";
      title: string;
      intro: string;
      beats: ConversationBeat[];
    })
  | (SectionBase & {
      type: "next-project";
    });

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  role: string;
  team: string;
  platform: string;
  domain: string;
  index: number;
  heroStyle: HeroStyle;
  navItems: NavItem[];
  quickReadSectionIds: string[];
  impactLine: string;
  explorerLabel: string;
  nextProject: string;
  summary?: string;
  loomUrl?: string;
  sections: CaseStudySection[];
};

export type DocMediaKind = "auriga" | "ai-calling" | "concentio";

export type DocSection = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  body: string[];
  callout?: string;
  iconRow?: string;
  galleries?: { caption: string; screens: string[] }[];
};

export type Documentary = {
  headline: string;
  intro: string;
  summary: string;
  subtitle: string;
  cardHeadline: string;
  tags: string[];
  cardTone: "peach" | "mint" | "lavender";
  status: string;
  timeline: string;
  tools: string;
  collaborator: string;
  loomUrl?: string;
  cardImage: string;
  previewScreens: string[];
  sections: DocSection[];
};
