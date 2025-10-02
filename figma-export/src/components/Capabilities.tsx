import { motion } from 'motion/react';
import { Code, Brain, Zap, Database, Chrome, LineChart, Cog, Globe } from 'lucide-react';
import { SectionContainer } from './SectionContainer';
import { SectionHeader } from './SectionHeader';

export function Capabilities() {
  const capabilities = [
    { icon: Database, label: "HEADLESS CMS", color: "bg-cyan-400" },
    { icon: Brain, label: "AI & AUTOMATION", color: "bg-lime-400" },
    { icon: Chrome, label: "CHROME EXTENSIONS", color: "bg-yellow-300" },
    { icon: Globe, label: "WEB PLATFORMS", color: "bg-fuchsia-400" },
    { icon: Zap, label: "MARKETING AUTOMATION", color: "bg-cyan-400" },
    { icon: Code, label: "SYSTEMS & PRD", color: "bg-lime-400" },
    { icon: LineChart, label: "SEARCH & DATA", color: "bg-yellow-300" },
    { icon: Cog, label: "A/B TESTING", color: "bg-fuchsia-400" }
  ];

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "OpenAI", "Supabase", "Stripe", "Figma", "Linear",
    "Framer", "Tailwind", "Headless CMS", "Chrome APIs"
  ];

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

        {/* Scrolling Capabilities */}
        <div className="relative -mx-6 lg:-mx-8 xl:-mx-12 overflow-hidden">
          {/* First Row - Left to Right */}
          <div className="overflow-hidden mb-8">
            <motion.div
              animate={{ x: [0, -50 + '%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex gap-6 w-max pl-6 lg:pl-8 xl:pl-12"
            >
              {[...capabilities, ...capabilities].map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <div
                    key={`row1-${index}`}
                    className={`${capability.color} border-4 border-white px-6 py-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center space-x-3 whitespace-nowrap transform rotate-1 rotate-smooth`}
                  >
                    <IconComponent className="w-6 h-6 text-black" />
                    <span className="font-black text-black text-lg font-display">{capability.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-50 + '%', 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              className="flex gap-6 w-max pl-6 lg:pl-8 xl:pl-12"
            >
              {[...capabilities, ...capabilities].reverse().map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <div
                    key={`row2-${index}`}
                    className={`${capability.color} border-4 border-white px-6 py-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center space-x-3 whitespace-nowrap transform -rotate-1 rotate-smooth`}
                  >
                    <IconComponent className="w-6 h-6 text-black" />
                    <span className="font-black text-black text-lg font-display">{capability.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Technology Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-white border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transform rotate-1 rotate-smooth">
            <h3 className="text-2xl font-black text-black mb-6 font-display">TECH STACK</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  viewport={{ once: true }}
                  className="bg-black text-white border-2 border-black px-3 py-1 font-black text-sm shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] font-display rotate-smooth-hover"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}