import { motion } from 'motion/react';
import { StickerBadge } from './StickerBadge';
import { timelineData, type TimelineEntry } from '../data/timeline';

const tagColors = [
  "bg-lime-400",
  "bg-cyan-400", 
  "bg-yellow-300",
  "bg-fuchsia-400",
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-rose-400",
  "bg-purple-400",
  "bg-indigo-400",
  "bg-emerald-400"
];

const badgeColors = [
  "bg-green-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-yellow-400"
];

interface TimelineCardProps {
  entry: TimelineEntry;
  index: number;
  isChild?: boolean;
}

function TimelineCard({ entry, index, isChild = false }: TimelineCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`timeline-item ${isChild ? 'ml-4 mb-6' : 'mb-8'} last:mb-0`}
      data-key={entry.id}
    >
      {/* Mobile-first: Stacked layout */}
      <div className="block lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-start">
        
        {/* Timeline Meta - Full width on mobile, left column on desktop */}
        <div className={`timeline-meta mb-3 lg:mb-0 lg:justify-self-end lg:text-right ${isChild ? 'lg:pl-8' : ''}`}>
          <span className={`inline-block bg-black text-white px-3 py-1 font-mono font-bold transform shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] ${isChild ? 'text-xs -rotate-1' : 'text-sm rotate-1'}`}>
            {entry.label}
          </span>
        </div>

        {/* Timeline Rail - Hidden on mobile, visible on desktop */}
        {!isChild && (
          <div 
            className="timeline-rail hidden lg:block w-1 bg-gradient-to-b from-black via-gray-400 to-black min-h-full justify-self-center relative"
            aria-hidden="true"
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black border-2 border-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"></div>
          </div>
        )}

        {/* Card Content */}
        <article 
          className={`timeline-card border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-rotate-1 bg-white ${isChild ? 'border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}`}
          data-cmp="TimelineCard"
        >
          {/* Mobile rail accent - only for main entries */}
          {!isChild && (
            <div className="lg:hidden w-8 h-1 bg-black mb-4"></div>
          )}

          {/* Card Content */}
          <p className={`timeline-blurb text-black leading-relaxed mb-4 ${isChild ? 'text-sm' : ''}`}>
            {entry.blurb}
          </p>

          {/* Badges - if present */}
          {entry.badges && entry.badges.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {entry.badges.map((badge, badgeIndex) => (
                  <StickerBadge 
                    key={badgeIndex}
                    color={badgeColors[badgeIndex % badgeColors.length]}
                    size="sm"
                    className="font-mono font-bold"
                    rotation={badgeIndex % 2 === 0 ? 2 : -2}
                  >
                    {badge}
                  </StickerBadge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <ul className={`timeline-tags flex flex-wrap gap-2 ${isChild ? 'gap-1' : ''}`}>
            {entry.tags.map((tag, tagIndex) => (
              <li key={tagIndex}>
                <StickerBadge 
                  color={tagColors[tagIndex % tagColors.length]}
                  size={isChild ? "xs" : "sm"}
                  className="font-mono"
                >
                  {tag}
                </StickerBadge>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Render children if present */}
      {entry.children && entry.children.length > 0 && (
        <ol className="mt-6 space-y-4">
          {entry.children.map((child, childIndex) => (
            <TimelineCard 
              key={child.id}
              entry={child} 
              index={index + childIndex + 1} 
              isChild={true}
            />
          ))}
        </ol>
      )}
    </motion.li>
  );
}

interface TimelineProps {
  data?: TimelineEntry[];
  title?: string;
  subtitle?: string;
}

export function Timeline({ 
  data = timelineData, 
  title = "BACKGROUND & PROGRESSION",
  subtitle = "From systems thinking foundations to full-stack PM × AI engineering — a progression driven by curiosity and measurable impact."
}: TimelineProps) {
  return (
    <section 
      id="timeline" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative texture-grain"
      aria-labelledby="timeline-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2 
            id="timeline-title" 
            className="text-3xl md:text-5xl font-display font-black mb-6 relative z-10"
          >
            <span className="bg-black text-white px-4 py-2 transform -rotate-2 inline-block mr-2 md:mr-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              BACKGROUND
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-black px-4 py-2 transform rotate-1 inline-block border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              & PROGRESSION
            </span>
          </h2>
          
          {/* Decorative stickers */}
          <div className="absolute top-0 left-1/4 transform -translate-x-1/2 hidden md:block">
            <StickerBadge color="bg-lime-400" rotation={15} size="sm">JOURNEY</StickerBadge>
          </div>
          <div className="absolute top-4 right-1/4 transform translate-x-1/2 hidden md:block">
            <StickerBadge color="bg-cyan-400" rotation={-20} size="sm" className="font-mono">→</StickerBadge>
          </div>
          
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed relative z-10">
            {subtitle}
          </p>
        </motion.div>

        {/* Timeline Container with Container Query Support */}
        <div style={{ containerType: 'inline-size' }} className="w-full">
          <ol 
            className="timeline-container max-w-5xl mx-auto"
            data-cmp="Timeline"
          >
            {data.map((entry, index) => (
              <TimelineCard 
                key={entry.id}
                entry={entry} 
                index={index}
              />
            ))}
          </ol>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative"
        >
          <div className="bg-gradient-to-r from-lime-400 to-cyan-400 text-black border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 inline-block relative z-10">
            <p className="font-black text-base md:text-lg mb-2">
              Ready to see this experience in action?
            </p>
            <div className="bg-black text-white px-4 py-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transform -rotate-1 inline-block font-black hover:scale-105 transition-transform cursor-pointer text-sm md:text-base">
              Explore my work below →
            </div>
          </div>
          
          {/* Scattered decorative elements */}
          <div className="absolute -top-4 left-8 hidden md:block">
            <StickerBadge color="bg-yellow-300" rotation={25} size="sm">💡</StickerBadge>
          </div>
          <div className="absolute -bottom-2 right-12 hidden md:block">
            <StickerBadge color="bg-rose-400" rotation={-15} size="sm">📈</StickerBadge>
          </div>
        </motion.div>
      </div>
    </section>
  );
}