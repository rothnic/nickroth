# Content Specification - Living Resume Portfolio

This is a reference doc after completing a prototype using react. This is to serve as a reference only.

## Content Architecture Overview

This document defines all content structures, data schemas, and content requirements for the living resume portfolio. The content is designed to be framework-agnostic and can be implemented in any modern web framework (React, Vue, Svelte, Astro, etc.).

## Data Structure & Content Types

### Site Metadata
```json
{
  "site": {
    "title": "Nick Roth - Product & Systems",
    "description": "Senior product manager and systems engineer specializing in automation, AI integration, and platform modernization.",
    "url": "https://nickroth.com",
    "author": {
      "name": "Nick Roth",
      "email": "nick@nickroth.com",
      "location": "Huntsville, AL",
      "timezone": "America/Chicago"
    },
    "social": {
      "github": "https://github.com/nickroth",
      "linkedin": "https://linkedin.com/in/nickroth",
      "twitter": "@nickroth"
    }
  }
}
```

### Personal Information
```json
{
  "personal": {
    "name": "Nick Roth",
    "title": "Product & Systems Director",
    "tagline": "Transforming complex requirements into systematic solutions through objective-first discovery and automation-driven execution.",
    "headshot": "/assets/images/nick-roth-headshot.jpg",
    "location": "Huntsville, AL",
    "availability": "Open to consulting and fractional roles",
    "oneLiners": [
      "Systems thinking applied to product and engineering challenges",
      "Proven track record of measurable outcomes through systematic approach",
      "Specialist in automation, AI integration, and platform modernization"
    ]
  }
}
```

### Signature Capabilities
```json
{
  "capabilities": [
    {
      "id": "headless-cms",
      "title": "Headless CMSs & Content Architecture",
      "summary": "Modern content architectures with DatoCMS, Sanity, Strapi; structured content modeling; multi-channel publishing strategies.",
      "tags": ["DatoCMS", "Sanity", "Strapi", "Content Architecture", "API Design"],
      "order": 1,
      "icon": "database"
    },
    {
      "id": "automation-ai",
      "title": "Automation & AI Integration",
      "summary": "Workflow automation with n8n, Windmill; LangChain, LangGraph orchestration; reliable prompt engineering and evaluation frameworks.",
      "tags": ["n8n", "Windmill", "LangChain", "LangGraph", "Mastra", "OpenAI", "Automation"],
      "order": 2,
      "icon": "robot"
    },
    {
      "id": "chrome-extensions",
      "title": "Chrome Extensions & Browser Tools",
      "summary": "Manifest V3 extensions; content script automation; enterprise browser tool development; web scraping and data extraction.",
      "tags": ["Chrome Extensions", "Manifest V3", "Browser Automation", "Web Scraping"],
      "order": 3,
      "icon": "browser"
    },
    {
      "id": "web-platforms",
      "title": "Modern Web Platforms",
      "summary": "React, Astro, Next.js; Tailwind CSS; component libraries; performance optimization; TypeScript applications.",
      "tags": ["React", "Astro", "Next.js", "Tailwind", "TypeScript", "Performance"],
      "order": 4,
      "icon": "code"
    },
    {
      "id": "marketing-automation",
      "title": "Marketing Automation & Analytics",
      "summary": "Email platform optimization; marketing workflow automation; conversion tracking; A/B testing frameworks; analytics implementation.",
      "tags": ["Email Marketing", "Automation", "Analytics", "Conversion Optimization"],
      "order": 5,
      "icon": "chart"
    },
    {
      "id": "systems-prd",
      "title": "Systems Design & PRD Development",
      "summary": "SysML/BPMN modeling; requirements gathering; technical specification writing; stakeholder alignment; systematic problem decomposition.",
      "tags": ["Systems Design", "SysML", "BPMN", "Requirements", "Technical Writing"],
      "order": 6,
      "icon": "diagram"
    }
  ]
}
```

### Verified Metrics
```json
{
  "metrics": [
    {
      "value": "400%",
      "label": "YoY blog revenue increase",
      "category": "revenue",
      "context": "Through content optimization and automation"
    },
    {
      "value": "150%",
      "label": "monthly organic users growth",
      "category": "growth",
      "context": "Platform modernization and SEO improvements"
    },
    {
      "value": "$35k/mo",
      "label": "email platform cost savings",
      "category": "efficiency",
      "context": "Migration to programmatic template system"
    },
    {
      "value": "125%",
      "label": "YoY mobile revenue growth",
      "category": "revenue",
      "context": "Mobile-first platform optimization"
    },
    {
      "value": "90%",
      "label": "reduction in content publishing time",
      "category": "efficiency",
      "context": "Automated workflow implementation"
    }
  ]
}
```

### Work Portfolio
```json
{
  "work": [
    {
      "id": "content-platform-modernization",
      "title": "Content Platform Modernization",
      "impact": "Faster authoring, cleaner architecture, stronger SEO foundations through systematic platform rebuild.",
      "summary": "Complete modernization of legacy content management system serving 2M+ monthly users, focusing on performance, authoring experience, and SEO optimization.",
      "stack": ["Astro", "DatoCMS", "Supabase", "Typesense", "Tailwind CSS"],
      "thumbnail": "/assets/images/work/platform-modernization-thumb.jpg",
      "hero": "/assets/images/work/platform-modernization-hero.jpg",
      "role": "Product & Systems Lead",
      "timeline": "8 months",
      "status": "Completed",
      "links": [
        {"label": "Architecture Overview", "href": "#"},
        {"label": "Performance Results", "href": "#"}
      ],
      "order": 1,
      "tags": ["Platform", "CMS", "Performance", "SEO"],
      "outcomes": [
        "40% improvement in Core Web Vitals scores",
        "60% reduction in content publishing time",
        "25% increase in organic search traffic",
        "90% reduction in deployment time"
      ],
      "content": {
        "context": "Legacy WordPress platform struggling with performance, complex authoring workflows, and scalability issues. Editorial team spending excessive time on technical tasks rather than content creation.",
        "objectives": [
          "Improve site performance and Core Web Vitals scores",
          "Streamline content authoring and publishing workflows",
          "Establish modern, maintainable architecture",
          "Enhance SEO capabilities and search visibility"
        ],
        "constraints": [
          "Zero downtime migration requirement",
          "Preserve existing URL structure and SEO equity",
          "Maintain editorial team productivity during transition",
          "Budget limitations requiring incremental approach"
        ],
        "approach": [
          "Comprehensive audit of existing content and workflows",
          "Selection of modern headless CMS with structured content modeling",
          "Incremental migration strategy with parallel systems",
          "Performance optimization through static generation",
          "Enhanced search capabilities with dedicated search service"
        ],
        "outcome": "Successfully modernized platform serving 2M+ monthly users with significant improvements in performance, authoring experience, and technical maintainability. Editorial team now focuses on content strategy rather than technical workarounds.",
        "lessons": [
          "Incremental migration reduces risk and maintains team confidence",
          "Structured content models improve long-term maintainability",
          "Performance gains compound across user experience and SEO",
          "Modern tooling significantly improves developer and editor experience"
        ]
      }
    },
    {
      "id": "email-platform-migration",
      "title": "Email Platform Cost Optimization",
      "impact": "$35k monthly savings through programmatic template system and workflow automation.",
      "summary": "Strategic migration from expensive legacy email platform to cost-effective modern solution with automated template generation and improved deliverability.",
      "stack": ["Node.js", "Handlebars", "AWS SES", "n8n", "PostgreSQL"],
      "thumbnail": "/assets/images/work/email-migration-thumb.jpg",
      "hero": "/assets/images/work/email-migration-hero.jpg",
      "role": "Technical Product Manager",
      "timeline": "6 months",
      "status": "Completed",
      "links": [
        {"label": "Migration Strategy", "href": "#"},
        {"label": "ROI Analysis", "href": "#"}
      ],
      "order": 2,
      "tags": ["Email", "Cost Optimization", "Automation", "Migration"],
      "outcomes": [
        "$35k monthly cost reduction (85% savings)",
        "50% improvement in email deliverability rates",
        "90% reduction in template creation time",
        "Zero downtime during migration"
      ],
      "content": {
        "context": "High-volume email platform costing $42k/month with limited customization options and declining deliverability rates. Manual template creation process requiring developer resources for simple changes.",
        "objectives": [
          "Reduce email platform costs by 70%+ while maintaining functionality",
          "Improve email deliverability and engagement rates",
          "Automate template creation and management processes",
          "Enable non-technical team members to manage email campaigns"
        ],
        "constraints": [
          "Cannot interrupt ongoing email campaigns",
          "Must maintain compliance with email regulations",
          "Limited development resources for migration",
          "Complex integration with existing CRM and analytics systems"
        ],
        "approach": [
          "Comprehensive analysis of email volume and feature requirements",
          "Evaluation of modern email service providers and cost structures",
          "Development of programmatic template generation system",
          "Automated testing framework for email rendering and deliverability",
          "Phased migration with parallel tracking and validation"
        ],
        "outcome": "Achieved 85% cost reduction while significantly improving deliverability and operational efficiency. Non-technical team members can now create and deploy email campaigns independently.",
        "lessons": [
          "Legacy platform costs often hide inefficiencies in workflow design",
          "Programmatic template generation scales much better than manual processes",
          "Modern email services offer better deliverability at fraction of legacy costs",
          "Automation investments pay dividends in both cost and team productivity"
        ]
      }
    },
    {
      "id": "ai-categorization-system",
      "title": "AI-Assisted Content Categorization",
      "impact": "Automated content classification with 94% accuracy, eliminating manual categorization bottleneck.",
      "summary": "Chrome extension and backend system for automated content categorization using LLM-powered classification with human review workflows.",
      "stack": ["Chrome Extension", "LangChain", "OpenAI GPT-4", "React", "FastAPI"],
      "thumbnail": "/assets/images/work/ai-categorization-thumb.jpg",
      "hero": "/assets/images/work/ai-categorization-hero.jpg",
      "role": "AI Product Lead",
      "timeline": "4 months",
      "status": "In Production",
      "links": [
        {"label": "Extension Demo", "href": "#"},
        {"label": "Accuracy Report", "href": "#"}
      ],
      "order": 3,
      "tags": ["AI", "Chrome Extension", "Automation", "LLM"],
      "outcomes": [
        "94% classification accuracy in production",
        "85% reduction in manual categorization time",
        "Consistent taxonomy application across content",
        "Scalable system handling 1000+ items daily"
      ],
      "content": {
        "context": "Editorial team manually categorizing hundreds of content pieces daily, leading to inconsistent taxonomy application and significant time investment. Need for scalable solution that maintains editorial oversight.",
        "objectives": [
          "Automate initial content categorization with high accuracy",
          "Maintain human oversight for quality control",
          "Ensure consistent taxonomy application",
          "Scale to handle increasing content volume"
        ],
        "constraints": [
          "Must integrate with existing editorial workflows",
          "Cannot sacrifice accuracy for speed",
          "Budget limitations on AI API costs",
          "Team needs easy-to-use interface for review and correction"
        ],
        "approach": [
          "Development of Chrome extension for seamless workflow integration",
          "LLM prompt engineering with few-shot learning examples",
          "Confidence scoring system for automated vs. manual review routing",
          "Feedback loop to improve model performance over time",
          "Cost optimization through intelligent API usage"
        ],
        "outcome": "Successfully automated 85% of categorization work while maintaining high accuracy standards. Editorial team now focuses on strategic content decisions rather than routine classification tasks.",
        "lessons": [
          "Human-in-the-loop design crucial for maintaining quality standards",
          "Confidence scoring helps optimize AI vs. human resource allocation",
          "Chrome extensions provide seamless integration into existing workflows",
          "Continuous learning systems improve over time with proper feedback loops"
        ]
      }
    }
  ]
}
```

### Work Notes (Lightweight Updates)
```json
{
  "workNotes": [
    {
      "id": "langgraph-evaluation",
      "title": "Evaluating LangGraph for Multi-Step Workflows",
      "date": "2024-12-15",
      "tags": ["AI", "LangGraph", "Workflows", "Evaluation"],
      "summary": "Testing LangGraph's state management capabilities for complex, multi-step AI workflows with error handling and human intervention points.",
      "content": "Spent the week evaluating LangGraph for orchestrating complex AI workflows that require multiple LLM calls, external API integrations, and conditional branching. Key findings:\n\n• **State Management**: Excellent persistence across workflow steps, much better than manual state tracking in LangChain\n• **Error Handling**: Built-in retry mechanisms and error routing make workflows more robust\n• **Human-in-Loop**: Easy integration points for human review and intervention\n• **Debugging**: Visual workflow representation helps troubleshoot complex flows\n\n**Next Steps**: Planning pilot implementation for content review workflow that currently requires 3-4 manual steps. Initial tests show 70% automation potential while maintaining quality standards.\n\n**Recommendation**: LangGraph worth the learning curve for any multi-step AI workflows. The state management alone saves significant development time."
    },
    {
      "id": "mastra-framework-review",
      "title": "Mastra Framework for Agent Orchestration",
      "date": "2024-12-10",
      "tags": ["AI", "Mastra", "Agents", "Framework"],
      "summary": "First impressions of Mastra framework for building reliable AI agent systems with built-in observability and error handling.",
      "content": "Exploring Mastra as an alternative to custom LangChain implementations for agent orchestration. Initial impressions:\n\n• **Developer Experience**: Excellent TypeScript support and clear documentation\n• **Observability**: Built-in logging and tracing without additional configuration\n• **Reliability**: Automatic retry logic and graceful degradation patterns\n• **Integration**: Good ecosystem integration with popular AI services\n\n**Use Case**: Testing for automated content analysis pipeline that needs to handle rate limits, API failures, and variable content types.\n\n**Early Results**: 40% less boilerplate code compared to custom LangChain implementation, with better error handling out of the box.\n\n**Concerns**: Relatively new framework, smaller community compared to LangChain. Need to evaluate long-term maintenance and support."
    },
    {
      "id": "n8n-vs-windmill",
      "title": "n8n vs Windmill for Automation Workflows",
      "date": "2024-12-05",
      "tags": ["Automation", "n8n", "Windmill", "Workflows"],
      "summary": "Comparing n8n and Windmill for complex automation workflows involving AI services, data processing, and external integrations.",
      "content": "Evaluating automation platforms for client workflows that combine data processing, AI services, and third-party integrations:\n\n**n8n Strengths**:\n• Visual workflow builder with extensive node library\n• Strong community and third-party integrations\n• Self-hosted option with good documentation\n\n**Windmill Advantages**:\n• TypeScript/Python scripting for complex logic\n• Better performance for data-heavy workflows\n• Built-in secret management and deployment\n\n**Decision Factors**:\n• Team technical skill level (visual vs. code-first)\n• Workflow complexity and data volume\n• Integration requirements and maintenance overhead\n\n**Current Recommendation**: n8n for teams preferring visual workflows, Windmill for developer-heavy teams needing custom logic."
    }
  ]
}
```

### Professional Background

#### Roles & Experience
```json
{
  "roles": [
    {
      "id": "dealnews-director",
      "company": "DealNews",
      "role": "Director of Product Management",
      "start": "2019-07",
      "end": null,
      "location": "Huntsville, AL",
      "employmentType": "Full-time",
      "focus": [
        "Platform modernization and architecture",
        "AI-assisted content workflows",
        "Marketing automation optimization",
        "Team leadership and product strategy"
      ],
      "metrics": [
        "$35k/mo email platform savings",
        "400% YoY blog revenue growth",
        "125% YoY mobile revenue increase",
        "150% monthly organic user growth"
      ],
      "description": "Lead product strategy and execution for content platform serving 2M+ monthly users. Spearhead platform modernization initiatives, implement AI-assisted workflows, and optimize marketing automation systems. Manage cross-functional teams and drive measurable business outcomes through systematic approach to product development.",
      "keyProjects": [
        "Complete platform modernization (WordPress → Astro/DatoCMS)",
        "Email platform migration saving $35k monthly",
        "AI-powered content categorization system",
        "Mobile-first redesign driving 125% revenue growth"
      ]
    },
    {
      "id": "dealnews-senior-pm",
      "company": "DealNews",
      "role": "Senior Product Manager",
      "start": "2017-03",
      "end": "2019-07",
      "location": "Huntsville, AL",
      "employmentType": "Full-time",
      "focus": [
        "Product roadmap development",
        "User experience optimization",
        "A/B testing and conversion optimization",
        "Cross-team collaboration"
      ],
      "metrics": [
        "30% improvement in user engagement",
        "25% increase in conversion rates",
        "50% reduction in support tickets"
      ],
      "description": "Drove product initiatives focused on user experience and conversion optimization. Implemented systematic A/B testing framework and established data-driven product development processes.",
      "keyProjects": [
        "Mobile conversion optimization program",
        "User onboarding flow redesign",
        "A/B testing framework implementation",
        "Customer support ticket reduction initiative"
      ]
    },
    {
      "id": "systems-engineer",
      "company": "Various Defense Contractors",
      "role": "Systems Engineer",
      "start": "2014-01",
      "end": "2017-03",
      "location": "Huntsville, AL",
      "employmentType": "Contract",
      "focus": [
        "Requirements analysis and specification",
        "SysML modeling and system architecture",
        "Technical documentation and process improvement",
        "Stakeholder coordination and communication"
      ],
      "metrics": [
        "20+ successful system specifications delivered",
        "95% stakeholder approval rating",
        "40% reduction in requirement change requests"
      ],
      "description": "Applied systems engineering principles to complex defense and aerospace projects. Specialized in requirements gathering, system modeling with SysML/BPMN, and technical specification development.",
      "keyProjects": [
        "Missile defense system requirements specification",
        "Satellite communication system architecture",
        "Process improvement initiatives across multiple programs",
        "Technical documentation standardization"
      ]
    }
  ]
}
```

#### Education & Certifications
```json
{
  "education": [
    {
      "school": "Georgia Institute of Technology",
      "degree": "Master of Science",
      "area": "Systems Engineering (PMASE Program)",
      "start": "2014-08",
      "end": "2016-12",
      "location": "Atlanta, GA",
      "gpa": "3.8/4.0",
      "thesis": "Application of Model-Based Systems Engineering to Software Product Development",
      "relevantCoursework": [
        "Systems Architecture and Design",
        "Requirements Engineering",
        "Project Management",
        "Systems Integration and Testing"
      ]
    },
    {
      "school": "Auburn University",
      "degree": "Bachelor of Science",
      "area": "Computer Science",
      "start": "2008-08",
      "end": "2012-05",
      "location": "Auburn, AL",
      "gpa": "3.6/4.0",
      "focus": "Software Engineering and Database Systems",
      "relevantCoursework": [
        "Software Engineering",
        "Database Design",
        "Algorithms and Data Structures",
        "Human-Computer Interaction"
      ]
    }
  ],
  "certifications": [
    {
      "name": "Certified SysML Professional",
      "issuer": "OMG (Object Management Group)",
      "date": "2016-03",
      "expiry": null,
      "credential": "SysML-2016-001234"
    },
    {
      "name": "AWS Solutions Architect Associate",
      "issuer": "Amazon Web Services",
      "date": "2020-08",
      "expiry": "2023-08",
      "credential": "AWS-SAA-001234"
    },
    {
      "name": "Google Analytics Individual Qualification",
      "issuer": "Google",
      "date": "2021-02",
      "expiry": "2022-02",
      "credential": "GA-IQ-001234"
    }
  ]
}
```

#### Skills Matrix
```json
{
  "skillCategories": [
    {
      "category": "Product Management",
      "skills": [
        {"name": "Requirements Gathering", "level": 5, "lastUsed": "2024-12"},
        {"name": "Roadmap Planning", "level": 5, "lastUsed": "2024-12"},
        {"name": "Stakeholder Management", "level": 5, "lastUsed": "2024-12"},
        {"name": "A/B Testing", "level": 4, "lastUsed": "2024-11"},
        {"name": "User Research", "level": 4, "lastUsed": "2024-10"},
        {"name": "Competitive Analysis", "level": 4, "lastUsed": "2024-11"}
      ]
    },
    {
      "category": "Technical Systems",
      "skills": [
        {"name": "SysML", "level": 5, "lastUsed": "2024-09"},
        {"name": "BPMN", "level": 4, "lastUsed": "2024-10"},
        {"name": "Technical Writing", "level": 5, "lastUsed": "2024-12"},
        {"name": "Architecture Design", "level": 4, "lastUsed": "2024-11"},
        {"name": "API Design", "level": 4, "lastUsed": "2024-12"},
        {"name": "Database Design", "level": 4, "lastUsed": "2024-11"}
      ]
    },
    {
      "category": "Automation & AI",
      "skills": [
        {"name": "LangChain", "level": 4, "lastUsed": "2024-12"},
        {"name": "LangGraph", "level": 3, "lastUsed": "2024-12"},
        {"name": "OpenAI APIs", "level": 4, "lastUsed": "2024-12"},
        {"name": "n8n", "level": 4, "lastUsed": "2024-11"},
        {"name": "Windmill", "level": 3, "lastUsed": "2024-12"},
        {"name": "Prompt Engineering", "level": 4, "lastUsed": "2024-12"}
      ]
    },
    {
      "category": "Web Development",
      "skills": [
        {"name": "React", "level": 4, "lastUsed": "2024-12"},
        {"name": "TypeScript", "level": 4, "lastUsed": "2024-12"},
        {"name": "Astro", "level": 4, "lastUsed": "2024-11"},
        {"name": "Tailwind CSS", "level": 4, "lastUsed": "2024-12"},
        {"name": "Node.js", "level": 3, "lastUsed": "2024-11"},
        {"name": "Chrome Extensions", "level": 4, "lastUsed": "2024-10"}
      ]
    },
    {
      "category": "Content & Marketing",
      "skills": [
        {"name": "Content Strategy", "level": 4, "lastUsed": "2024-12"},
        {"name": "SEO Optimization", "level": 4, "lastUsed": "2024-11"},
        {"name": "Email Marketing", "level": 4, "lastUsed": "2024-10"},
        {"name": "Marketing Automation", "level": 4, "lastUsed": "2024-11"},
        {"name": "Analytics", "level": 4, "lastUsed": "2024-12"},
        {"name": "Conversion Optimization", "level": 4, "lastUsed": "2024-10"}
      ]
    }
  ]
}
```

### Testimonials
```json
{
  "testimonials": [
    {
      "id": "testimonial-1",
      "quote": "Nick has an exceptional ability to translate complex, messy requirements into clear, actionable plans. His systematic approach to problem-solving and attention to measurable outcomes made him invaluable to our platform modernization efforts.",
      "name": "Sarah Johnson",
      "role": "VP of Engineering",
      "company": "DealNews",
      "relationship": "Direct supervisor",
      "date": "2024-01",
      "logo": "/assets/images/testimonials/dealnews-logo.png"
    },
    {
      "id": "testimonial-2",
      "quote": "Working with Nick on our email platform migration was a masterclass in systematic project execution. He identified cost savings we didn't know were possible and executed the transition flawlessly with zero downtime.",
      "name": "Mike Chen",
      "role": "CTO",
      "company": "DealNews",
      "relationship": "Collaborative peer",
      "date": "2024-03",
      "logo": "/assets/images/testimonials/dealnews-logo.png"
    },
    {
      "id": "testimonial-3",
      "quote": "Nick's background in systems engineering brings a unique perspective to product management. His ability to model complex processes and identify automation opportunities has been transformative for our operations.",
      "name": "Jennifer Lee",
      "role": "Director of Operations",
      "company": "Previous Client",
      "relationship": "Client",
      "date": "2023-11",
      "logo": null
    }
  ]
}
```

### Systematic Approach Framework
```json
{
  "approach": {
    "title": "Objective-First Discovery & Systematic Execution",
    "description": "A proven methodology for transforming complex requirements into systematic solutions through structured discovery, modeling, and iterative delivery.",
    "steps": [
      {
        "id": "discover",
        "title": "Discover",
        "description": "Extract true objectives through stakeholder interviews, requirement analysis, and constraint identification.",
        "icon": "magnifying-glass",
        "activities": [
          "Stakeholder interview sessions",
          "Current state process mapping",
          "Constraint and risk identification",
          "Success criteria definition"
        ],
        "deliverables": [
          "Stakeholder requirements document",
          "Current state analysis",
          "Constraint matrix",
          "Success metrics framework"
        ]
      },
      {
        "id": "model",
        "title": "Model",
        "description": "Create visual models of systems, processes, and interactions using SysML, BPMN, and architectural diagrams.",
        "icon": "diagram-project",
        "activities": [
          "System architecture modeling",
          "Process flow documentation",
          "Integration point mapping",
          "Data flow analysis"
        ],
        "deliverables": [
          "System architecture diagrams",
          "Process flow models (BPMN)",
          "Integration specifications",
          "Data architecture plans"
        ]
      },
      {
        "id": "specify",
        "title": "Specify",
        "description": "Transform models into detailed technical specifications with clear acceptance criteria and implementation guidance.",
        "icon": "document-text",
        "activities": [
          "Technical specification writing",
          "Acceptance criteria definition",
          "Implementation planning",
          "Risk mitigation strategies"
        ],
        "deliverables": [
          "Technical specifications",
          "Implementation roadmap",
          "Testing strategies",
          "Risk mitigation plans"
        ]
      },
      {
        "id": "build",
        "title": "Build",
        "description": "Execute systematic implementation with continuous validation, automated testing, and incremental delivery.",
        "icon": "cog",
        "activities": [
          "Incremental development cycles",
          "Automated testing implementation",
          "Continuous integration setup",
          "Regular stakeholder validation"
        ],
        "deliverables": [
          "Working software increments",
          "Automated test suites",
          "Deployment pipelines",
          "Documentation updates"
        ]
      },
      {
        "id": "prove",
        "title": "Prove",
        "description": "Validate outcomes against original objectives through metrics collection, user feedback, and performance analysis.",
        "icon": "chart-bar",
        "activities": [
          "Metrics collection and analysis",
          "User acceptance testing",
          "Performance benchmarking",
          "Outcome validation"
        ],
        "deliverables": [
          "Performance reports",
          "User feedback analysis",
          "Outcome validation reports",
          "Lessons learned documentation"
        ]
      },
      {
        "id": "operate",
        "title": "Operate",
        "description": "Establish ongoing monitoring, maintenance procedures, and continuous improvement processes.",
        "icon": "arrows-clockwise",
        "activities": [
          "Monitoring system setup",
          "Maintenance procedure documentation",
          "Team training and handoff",
          "Continuous improvement planning"
        ],
        "deliverables": [
          "Monitoring dashboards",
          "Operational procedures",
          "Training materials",
          "Improvement roadmap"
        ]
      }
    ]
  }
}
```

### Writing & Notes

#### Essays (Long-form content)
```json
{
  "essays": [
    {
      "id": "objective-first-discovery",
      "title": "Objective-First Discovery: A Systematic Approach to Requirements Gathering",
      "date": "2024-11-15",
      "summary": "A practical framework for extracting true project objectives before jumping to solutions, reducing scope creep and ensuring stakeholder alignment.",
      "tags": ["Process", "Requirements", "Systems Thinking", "Project Management"],
      "readTime": "8 min",
      "status": "published",
      "content": "Most project failures stem from a fundamental misunderstanding of objectives. Teams rush to solutions before fully understanding the problem space, leading to scope creep, stakeholder misalignment, and suboptimal outcomes...\n\n[Full essay content would continue here with detailed methodology, examples, and practical applications]"
    },
    {
      "id": "systems-modeling-software-teams",
      "title": "Systems Modeling for Software Teams: Beyond UML",
      "date": "2024-10-22",
      "summary": "How SysML and BPMN can improve software architecture decisions and team communication in ways that traditional UML diagrams cannot.",
      "tags": ["Systems Design", "SysML", "BPMN", "Software Architecture", "Team Communication"],
      "readTime": "12 min",
      "status": "published",
      "content": "Traditional UML diagrams often fall short when communicating complex system behaviors and business processes to diverse stakeholders. Systems Modeling Language (SysML) and Business Process Model and Notation (BPMN) offer more expressive alternatives...\n\n[Full essay content would continue here]"
    },
    {
      "id": "prd-to-shipped",
      "title": "From PRD to Shipped: Bridging Strategy and Execution",
      "date": "2024-09-10",
      "summary": "A systematic approach to translating product requirements into successful product launches through thin slices, metrics, and continuous validation.",
      "tags": ["Product Management", "Execution", "Metrics", "Validation"],
      "readTime": "10 min",
      "status": "draft",
      "content": "The gap between product requirements and successful product launches is littered with good intentions and failed executions. This essay outlines a systematic approach to bridging that gap...\n\n[Full essay content would continue here]"
    }
  ]
}
```

### Contact Information
```json
{
  "contact": {
    "email": "nick@nickroth.com",
    "phone": "+1 (256) 555-0123",
    "location": "Huntsville, AL",
    "timezone": "America/Chicago",
    "availability": "Open to consulting, fractional roles, and strategic partnerships",
    "responseTime": "24-48 hours",
    "preferredContact": "email",
    "calendly": "https://calendly.com/nickroth/30min",
    "services": [
      "Product Strategy & Roadmapping",
      "Systems Architecture & Technical Specification",
      "Automation & AI Integration Consulting",
      "Platform Modernization Projects",
      "Fractional Product Management"
    ],
    "rates": {
      "consulting": "$200-300/hour",
      "fractional": "$8-15k/month",
      "project": "Variable based on scope"
    }
  }
}
```

## Content Management Guidelines

### Content Update Workflow
1. **Regular Updates**: Work notes added weekly/bi-weekly
2. **Quarterly Reviews**: Major content updates and metric refreshes
3. **Annual Overhauls**: Complete background and capability reviews
4. **Event-Driven**: Immediate updates for new roles, major achievements

### Content Standards
- **Metrics**: All quantified achievements must be verifiable and context-specific
- **Work Samples**: Focus on outcomes and systematic approach rather than technology lists
- **Professional Tone**: Confident but not arrogant, systematic but approachable
- **Currency**: Dates and "last used" information kept current within 3 months
- **Privacy**: No proprietary information or sensitive client details

### SEO & Discovery Optimization
- **Keywords**: Focus on "systems thinking," "product management," "automation," "AI integration"
- **Meta Descriptions**: Clear value propositions with quantified outcomes
- **Schema Markup**: Person, Organization, and ProfessionalService structured data
- **Internal Linking**: Strategic connections between capabilities, work samples, and approach

### Accessibility Requirements
- **Alt Text**: Descriptive alt text for all images, especially work samples and diagrams
- **Headings**: Proper hierarchy (h1 → h2 → h3) for screen readers
- **Content Structure**: Scannable with clear sections and bullet points
- **Plain Language**: Technical concepts explained clearly for diverse audiences

This content specification provides the complete data structure and content requirements for implementing the living resume portfolio in any framework while maintaining consistency, professionalism, and systematic organization.