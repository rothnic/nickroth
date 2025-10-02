import { motion } from 'motion/react';
import { 
  Cog, Brain, Search, FileText, Puzzle, Mail, Database, 
  Palette, BarChart3, Chrome, Code2, Zap, Shield, FileCheck 
} from 'lucide-react';
import { StickerBadge } from './StickerBadge';
import { OrganicDivider } from './OrganicDivider';

export function Services() {
  const services = [
    {
      icon: Cog,
      title: "Business Process Automation",
      outcome: "Reduce manual effort and errors, shorten cycle time",
      keyTech: ["n8n", "Windmill.dev", "Flowise", "Webhooks"],
      color: "bg-cyan-400",
      delay: 0.05
    },
    {
      icon: Brain,
      title: "AI-Assisted Workflows & Custom Agents",
      outcome: "Handle variable tasks reliably; accelerate delivery",
      keyTech: ["LangChain", "LangGraph", "Mastra", "OpenAI APIs"],
      color: "bg-lime-400",
      delay: 0.1
    },
    {
      icon: Search,
      title: "Search, Vectors & Personalization",
      outcome: "Relevant results, recommendations, and matching",
      keyTech: ["Typesense", "Supabase pgvector", "Shopify"],
      color: "bg-yellow-300",
      delay: 0.15
    },
    {
      icon: FileText,
      title: "Headless CMS Platforms & Page Builders",
      outcome: "Faster publishing, safer iteration, structured content",
      keyTech: ["DatoCMS", "Directus", "Sanity", "PayloadCMS"],
      color: "bg-fuchsia-400",
      delay: 0.2
    },
    {
      icon: Puzzle,
      title: "Custom DatoCMS Plugins",
      outcome: "Editors move faster with fewer errors",
      keyTech: ["DatoCMS Plugin API", "React", "TypeScript"],
      color: "bg-orange-400",
      delay: 0.25
    },
    {
      icon: Mail,
      title: "Programmatic Email & CRM Automation",
      outcome: "Targeted sends, lower costs, measurable lift",
      keyTech: ["HubSpot", "ESP APIs", "Workflows"],
      color: "bg-blue-400",
      delay: 0.3
    },
    {
      icon: Database,
      title: "Knowledge Management + AI Retrieval",
      outcome: "Institutional memory that answers itself",
      keyTech: ["Fibery.io", "Notion", "ClickUp", "Embeddings"],
      color: "bg-green-400",
      delay: 0.3
    },
    {
      icon: Palette,
      title: "Prototyping → Production",
      outcome: "Ship modern, fast experiences end-to-end",
      keyTech: ["Figma", "Astro", "Next.js", "TanStack Start"],
      color: "bg-rose-400",
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: "Experimentation & Product Analytics",
      outcome: "Prove what works and why",
      keyTech: ["Optimizely", "PostHog", "GrowthBook", "GA"],
      color: "bg-purple-400",
      delay: 0.3
    },
    {
      icon: Chrome,
      title: "Chrome Extensions for Ops & Editorial",
      outcome: "Act where the work happens; capture structured data",
      keyTech: ["Plasmo", "WXT", "Chrome APIs"],
      color: "bg-indigo-400",
      delay: 0.3
    },
    {
      icon: Code2,
      title: "Python, Data & Visualization",
      outcome: "Reliable analysis and pipelines for product decisions",
      keyTech: ["Tableau", "DuckDB", "BigQuery", "Spark"],
      color: "bg-emerald-400",
      delay: 0.3
    }
  ];

  const crossCuttingCapabilities = [
    {
      icon: Zap,
      title: "Systems Thinking",
      description: "Use Cases, diagrams, interface contracts, V&V plans",
      color: "bg-cyan-300"
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description: "Secrets management, retries, circuit breakers, audit logs",
      color: "bg-yellow-300"
    },
    {
      icon: FileCheck,
      title: "Documentation & Handover",
      description: "PRDs, runbooks, architecture notes, onboarding guides",
      color: "bg-lime-300"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-yellow-50 to-pink-50 relative texture-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with overlapping elements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-5xl md:text-7xl font-display font-black mb-6 relative z-10">
            <span className="bg-black text-white px-4 py-2 transform -rotate-2 inline-block mr-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-smooth">SERVICES</span>
            <span className="bg-gradient-to-r from-lime-400 to-cyan-400 text-black px-4 py-2 transform rotate-1 inline-block border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-smooth">& TECH</span>
          </h2>
          
          {/* Overlapping decorative stickers */}
          <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
            <StickerBadge color="bg-fuchsia-400" rotation={15} size="sm">⚡</StickerBadge>
          </div>
          <div className="absolute top-4 right-1/4 transform translate-x-1/2">
            <StickerBadge color="bg-orange-400" rotation={-20} size="sm" className="font-mono">LIVE</StickerBadge>
          </div>
          
          <p className="text-xl max-w-4xl mx-auto leading-relaxed relative z-10">
            A focused catalog of what I build well <strong className="font-mono bg-lime-200 px-1 border border-black">right now</strong> — 
            with the tools I'm fast and efficient with.
            Evidence-oriented services designed to deliver measurable business impact.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.2, delay: service.delay }}
                whileHover={{ 
                  scale: 1.02, 
                  rotate: index % 2 === 0 ? -2 : 2,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className={`group ${service.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform`}
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-black border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] group-hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] transition-all duration-200">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-black text-lg leading-tight mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Outcome */}
                <div className="mb-4">
                  <div className="bg-black text-white px-3 py-1 text-sm font-black inline-block mb-2 transform -rotate-1 rotate-smooth">
                    OUTCOME
                  </div>
                  <p className="text-black text-sm leading-snug">
                    {service.outcome}
                  </p>
                </div>

                {/* Key Tech with sticker badges */}
                <div>
                  <div className="bg-white text-black border-2 border-black px-3 py-1 text-sm font-black inline-block mb-3 transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-smooth">
                    KEY TECH
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.keyTech.map((tech, techIndex) => (
                      <StickerBadge 
                        key={techIndex}
                        color="bg-black" 
                        textColor="text-white" 
                        size="sm"
                        className="font-mono"
                      >
                        {tech}
                      </StickerBadge>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cross-Cutting Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-black text-white border-4 border-black px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 rotate-smooth">
            <h3 className="text-2xl md:text-3xl font-black">CROSS-CUTTING CAPABILITIES</h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {crossCuttingCapabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.05) }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className={`${capability.color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-rotate-1 rotate-smooth-hover`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="w-8 h-8 text-black" />
                  <h4 className="font-black text-black text-lg">{capability.title}</h4>
                </div>
                <p className="text-black text-sm leading-snug">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action with chaotic elements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          <div className="bg-black text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 inline-block relative z-10">
            <p className="text-xl font-black mb-4">
              Ready to build something that moves your business forward?
            </p>
            <div className="bg-gradient-to-r from-lime-400 to-yellow-300 text-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2 inline-block font-black hover:scale-105 transition-transform cursor-pointer">
              Let's discuss your project →
            </div>
          </div>
          
          {/* Scattered decorative elements */}
          <div className="absolute -top-8 left-8">
            <StickerBadge color="bg-cyan-400" rotation={25}>FAST</StickerBadge>
          </div>
          <div className="absolute -bottom-4 right-12">
            <StickerBadge color="bg-fuchsia-400" rotation={-15}>PROVEN</StickerBadge>
          </div>
          <div className="absolute top-2 right-4">
            <StickerBadge color="bg-yellow-300" rotation={45} size="sm">⚡</StickerBadge>
          </div>
        </motion.div>
        
        {/* Organic divider at bottom */}
        <OrganicDivider color="bg-black" position="bottom" className="mt-20" />
      </div>
    </section>
  );
}