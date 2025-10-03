import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { StickerBadge } from './StickerBadge';
import { timelinePhases, type TimelineEntry, type TimelinePhase } from '../data/timeline';

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

interface TimelineEntryCardProps {
  entry: TimelineEntry;
  index: number;
  isChild?: boolean;
}

function TimelineEntryCard({ entry, index, isChild = false }: TimelineEntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isChild ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`${isChild ? 'ml-8 mt-4' : 'mb-6'}`}
    >
      <article 
        className={`timeline-card border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-rotate-1 bg-white ${isChild ? 'border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}`}
        data-cmp="TimelineCard"
        data-key={entry.id}
      >
        {/* Entry Label */}
        <div className="mb-4">
          <span className={`inline-block bg-black text-white px-3 py-1 font-mono font-bold transform shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] ${isChild ? 'text-xs -rotate-1' : 'text-sm rotate-1'}`}>
            {entry.label}
          </span>
        </div>

        {/* Entry Content */}
        <p className={`text-black leading-relaxed mb-4 ${isChild ? 'text-sm' : ''}`}>
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
        <div className={`flex flex-wrap gap-2 ${isChild ? 'gap-1' : ''}`}>
          {entry.tags.map((tag, tagIndex) => (
            <StickerBadge 
              key={tagIndex}
              color={tagColors[tagIndex % tagColors.length]}
              size={isChild ? "xs" : "sm"}
              className="font-mono"
            >
              {tag}
            </StickerBadge>
          ))}
        </div>

        {/* Children entries */}
        {entry.children && entry.children.length > 0 && (
          <div className="mt-6 space-y-4 border-t-2 border-gray-200 pt-4">
            {entry.children.map((child, childIndex) => (
              <TimelineEntryCard 
                key={child.id}
                entry={child} 
                index={childIndex} 
                isChild={true}
              />
            ))}
          </div>
        )}
      </article>
    </motion.div>
  );
}

interface TimelinePhaseProps {
  phase: TimelinePhase;
  phaseIndex: number;
}

function TimelinePhaseSection({ phase, phaseIndex }: TimelinePhaseProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: phaseIndex * 0.2 }}
      viewport={{ once: true }}
      className="mb-16 relative"
      id={phase.id}
    >
      {/* Phase Header */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: phaseIndex * 0.2 + 0.2 }}
          viewport={{ once: true }}
          className="inline-block relative"
        >
          <div className={`bg-gradient-to-r ${phase.color} text-white p-6 md:p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 relative z-10`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-mono font-bold text-sm md:text-base">{phase.period}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-black mb-2 leading-tight">
              {phase.title}
            </h2>
            <p className="text-sm md:text-base opacity-90 max-w-md">
              {phase.description}
            </p>
          </div>
          
          {/* Decorative corner badge */}
          <div className="absolute -top-3 -right-3 z-20">
            <StickerBadge color="bg-yellow-300" size="sm" rotation={15}>
              {phaseIndex + 1}
            </StickerBadge>
          </div>
        </motion.div>
      </div>

      {/* Phase Timeline Rail */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-300 hidden md:block" />
        
        {/* Phase Entries */}
        <div className="space-y-8 relative">
          {phase.entries.map((entry, entryIndex) => (
            <div key={entry.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 w-4 h-4 bg-black border-2 border-white rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] z-10 hidden md:block" />
              
              {/* Entry content */}
              <div className="md:ml-16">
                <TimelineEntryCard 
                  entry={entry} 
                  index={entryIndex}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

interface TimelinePageProps {
  onBack: () => void;
}

export function TimelinePage({ onBack }: TimelinePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 texture-grain">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <h1 className="text-xl md:text-2xl font-display font-black">
              Background & Progression
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                Systems Engineer
              </span>
              <br />
              <span className="text-black">to</span>
              <br />
              <span className="bg-gradient-to-r from-green-500 to-cyan-500 text-transparent bg-clip-text">
                AI Product Manager
              </span>
              <br />
              <span className="text-black">& Engineer</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-700">
              A journey through systems thinking, defense technology, data science, and modern AI-driven product development — 
              each phase building on the last to create a unique blend of technical depth and product leadership.
            </p>
          </motion.div>

          {/* Timeline Phases */}
          <div className="space-y-20">
            {timelinePhases.map((phase, phaseIndex) => (
              <TimelinePhaseSection
                key={phase.id}
                phase={phase}
                phaseIndex={phaseIndex}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-20 relative"
          >
            <div className="bg-gradient-to-r from-lime-400 to-cyan-400 text-black border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1 inline-block relative z-10">
              <p className="font-black text-lg md:text-xl mb-4">
                Ready to leverage this unique experience?
              </p>
              <button
                onClick={onBack}
                className="bg-black text-white px-6 py-3 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transform -rotate-1 inline-block font-black hover:scale-105 transition-transform"
              >
                Explore My Current Work →
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}