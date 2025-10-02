import { motion } from 'motion/react';
import { SectionContainer } from '../components/SectionContainer';
import { SectionHeader } from '../components/SectionHeader';

export function CapabilitiesMarqueeBlock() {
  // SVG icon definitions from the original HTML
  const iconMap: Record<string, string> = {
    database: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/><path d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6"/></svg>',
    brain: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6a2 2 0 0 1 2-2 3 3 0 0 1 3 3v1h2a2 2 0 0 1 0 4h-1"/><path d="M12 6a2 2 0 0 0-2-2 3 3 0 0 0-3 3v1H5a2 2 0 0 0 0 4h1"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M9 18h1a2 2 0 0 1 2 2v1"/><path d="M15 18h-1a2 2 0 0 0-2 2v1"/></svg>',
    chrome: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.17 8H12"/><path d="M3.95 6.06 8.54 14"/><path d="M10.88 21.94 15.46 14"/></svg>',
    globe: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    zap: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    code: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    "line-chart": '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    cog: '<svg class="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  };

  // Capabilities exactly as in the original
  const capabilities = [
    { icon: "database", label: "HEADLESS CMS", color: "bg-cyan-400" },
    { icon: "brain", label: "AI & AUTOMATION", color: "bg-lime-400" },
    { icon: "chrome", label: "CHROME EXTENSIONS", color: "bg-yellow-300" },
    { icon: "globe", label: "WEB PLATFORMS", color: "bg-fuchsia-400" },
    { icon: "zap", label: "MARKETING AUTOMATION", color: "bg-cyan-400" },
    { icon: "code", label: "SYSTEMS & PRD", color: "bg-lime-400" },
    { icon: "line-chart", label: "SEARCH & DATA", color: "bg-yellow-300" },
    { icon: "cog", label: "A/B TESTING", color: "bg-fuchsia-400" },
  ];

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "OpenAI", "Supabase", "Stripe",
    "Figma", "Linear", "Framer", "Tailwind", "Headless CMS", "Chrome APIs"
  ];

  // Create scrolling capabilities (duplicated for seamless scroll)
  const scrollingCapabilities = [...capabilities, ...capabilities];

  return (
    <SectionContainer 
      id="capabilities"
      variant="full-width"
      background="black"
      borderTop="white"
      borderBottom="white"
      className="overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <SectionHeader
          title="FULL-STACK CAPABILITIES"
          subtitle="From strategy to shipping — I bridge the gap between business objectives and technical execution across the entire product lifecycle."
          size="lg"
          className="text-center mb-16"
          titleClassName="inline-block bg-lime-400 text-black border-4 border-white px-8 py-4 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 mb-6 text-3xl md:text-4xl font-black font-display rotate-smooth"
          subtitleClassName="text-xl text-white max-w-3xl mx-auto leading-relaxed"
        />

        {/* Marquee Rows */}
        <div className="relative -mx-6 lg:-mx-8 xl:-mx-12 overflow-hidden">
          {/* Top row - scrolling left */}
          <div className="overflow-hidden mb-8">
            <div 
              className="flex gap-6 w-max pl-6 lg:pl-8 xl:pl-12"
              style={{
                animation: 'scroll-left 40s linear infinite'
              }}
            >
              {scrollingCapabilities.map((item, index) => (
                <div
                  key={`top-${item.label}-${index}`}
                  className={`${item.color} border-4 border-white px-6 py-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center space-x-3 whitespace-nowrap transform rotate-1 rotate-smooth`}
                >
                  <span 
                    aria-hidden="true" 
                    dangerouslySetInnerHTML={{ __html: iconMap[item.icon] }}
                  />
                  <span className="font-black text-black text-lg font-display">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row - scrolling right */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 w-max pl-6 lg:pl-8 xl:pl-12"
              style={{
                animation: 'scroll-right 40s linear infinite'
              }}
            >
              {[...scrollingCapabilities].reverse().map((item, index) => (
                <div
                  key={`bottom-${item.label}-${index}`}
                  className={`${item.color} border-4 border-white px-6 py-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center space-x-3 whitespace-nowrap transform -rotate-1 rotate-smooth`}
                >
                  <span 
                    aria-hidden="true" 
                    dangerouslySetInnerHTML={{ __html: iconMap[item.icon] }}
                  />
                  <span className="font-black text-black text-lg font-display">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 text-center">
          <div className="bg-white border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transform rotate-1 rotate-smooth">
            <h3 className="text-2xl font-black text-black mb-6 font-display">TECH STACK</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  whileHover={{ 
                    rotate: 6,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-black text-white border-2 border-black px-3 py-1 font-black text-sm shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] font-display cursor-default rotate-smooth-hover"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}