export interface TimelineEntry {
  id: string;
  label: string;
  blurb: string;
  tags: string[];
  badges?: string[];
  children?: TimelineEntry[];
  resume_ref?: string;
}

export interface TimelinePhase {
  id: string;
  title: string;
  period: string;
  description: string;
  color: string;
  entries: TimelineEntry[];
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: "foundations",
    title: "Systems Engineering Foundations",
    period: "2006-2013",
    description: "Building technical foundations and systems thinking mindset",
    color: "from-purple-400 to-blue-500",
    entries: [
      {
        id: "auburn",
        label: "Auburn University — Wireless EE",
        blurb: "Wireless EE; systems mindset; model before you code.",
        tags: ["foundations", "wireless", "systems"]
      }
    ]
  },
  {
    id: "defense-systems",
    title: "Defense & Missile Systems",
    period: "2009-2017",
    description: "Systems engineering and architecture in mission-critical defense applications",
    color: "from-blue-500 to-indigo-600",
    entries: [
      {
        id: "early-career",
        label: "MDA — Info Systems & Planner (CDP)",
        blurb: "Interfaces, interoperability, and planner workflows; NATO alignment.",
        tags: ["interfaces", "interoperability", "NATO"],
        children: [
          {
            id: "mda-c2bmc-dev",
            label: "C2BMC Development",
            blurb: "Planner Adapter, net-centric ICDs, NATO interoperability; first API for missile-defense data.",
            tags: ["API", "ICD", "NATO", "C2BMC"],
            resume_ref: "Missile Defense Agency — Systems Engineer (C2BMC Development)"
          },
          {
            id: "mda-safety-quality",
            label: "Safety & Quality",
            blurb: "Risk & safety assessments; program sign-offs for net-centric C2.",
            tags: ["safety", "risk", "assurance"],
            resume_ref: "Missile Defense Agency — Systems Engineer (Safety & Quality)"
          },
          {
            id: "mda-advanced-concepts",
            label: "Advanced Concepts",
            blurb: "Bandwidth/latency trade studies; future C2BMC concepts.",
            tags: ["trade-studies", "concepts"],
            resume_ref: "Missile Defense Agency — Systems Engineer (Advanced Concepts)"
          }
        ]
      },
      {
        id: "mda-spiral-arch",
        label: "MDA — Lead Spiral Architecture",
        blurb: "Lead architect; MBSE rollout; US/NATO integration; managed GTRI team on missile-tracking algorithms.",
        tags: ["MBSE", "SysML", "architecture", "GTRI"],
        resume_ref: "Missile Defense Agency — Lead Engineer for Spiral Architecture"
      },
      {
        id: "gt-masters",
        label: "Georgia Tech — MS (PMASE)",
        blurb: "Formal MBSE, requirements, V&V; concurrent with MDA work on global C2BMC.",
        tags: ["SysML", "MBSE", "V&V"],
        resume_ref: "Georgia Institute of Technology — Systems Engineering (MS)"
      }
    ]
  },
  {
    id: "tech-transition",
    title: "Technical Transition",
    period: "2017-2019",
    description: "Bridging systems engineering with modern data and visualization technologies",
    color: "from-indigo-500 to-purple-600",
    entries: [
      {
        id: "nou-systems",
        label: "nou Systems — Systems/Analysis",
        blurb: "MATLAB + Python viz; SBIRs; 50% resource reduction via tooling; interactive flight viz.",
        tags: ["MATLAB", "visualization", "SBIR"],
        resume_ref: "nou Systems — Systems Engineer/Analyst"
      },
      {
        id: "anaconda-viz",
        label: "Anaconda — Open-source Viz",
        blurb: "Python data visualization & graphics; contributed to open-source tooling.",
        tags: ["python", "visualization", "oss"],
        resume_ref: "Anaconda (Contract) — Software Engineer"
      },
      {
        id: "dealnews-analyst",
        label: "DealNews — Data Analyst",
        blurb: "Redshift + Tableau; SQL/Python models; KPI frameworks.",
        tags: ["tableau", "redshift", "analytics"],
        resume_ref: "DealNews — Data Analyst"
      }
    ]
  },
  {
    id: "product-leadership",
    title: "Product Leadership Era",
    period: "2019-2023",
    description: "Scaling experimentation and leading product across web, mobile, and email",
    color: "from-green-500 to-blue-500",
    entries: [
      {
        id: "dealnews-po-web",
        label: "DealNews — Product Owner (Web)",
        blurb: "A/B testing at scale; Optimizely; React Native app consolidation; Sailthru personalization.",
        badges: ["10× A/B tests", "125% YoY mobile revenue", "100% YoY interactions"],
        tags: ["experimentation", "mobile", "email"],
        resume_ref: "DealNews — Product Owner, Web"
      }
    ]
  },
  {
    id: "ai-modernization",
    title: "AI & Platform Modernization",
    period: "2023-Present",
    description: "Modernizing platforms with AI workflows and full-stack engineering",
    color: "from-cyan-400 to-green-500",
    entries: [
      {
        id: "dealnews-director",
        label: "DealNews — Director of Product",
        blurb: "Platform modernization (headless + typed data + search); AI content workflows; self-serve ads; CRM/email migration.",
        badges: ["$35k/mo savings", "400% blog revenue", "150% organic users"],
        tags: ["headless", "search", "AI", "CRM"],
        resume_ref: "DealNews — Director of Product Management"
      },
      {
        id: "today",
        label: "Today — Full-stack PM × AI Engineer",
        blurb: "Objective-first partner: Figma→interactive sites; headless CMS; Typesense; programmatic email; analytics & A/B; Python/ETL.",
        tags: ["prototype-to-prod", "cms", "search", "analytics", "python"]
      }
    ]
  }
];

// Flatten for backwards compatibility
export const timelineData: TimelineEntry[] = timelinePhases.flatMap(phase => phase.entries);