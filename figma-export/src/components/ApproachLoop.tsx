import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ApproachStage {
  id: string;
  title: string;
  blurb: string;
  outputs: string[];
}

const stages: ApproachStage[] = [
  {
    id: 'understand',
    title: 'Understand',
    blurb: 'Goals, customers, pain points—listen first.',
    outputs: ['Goals & constraints', 'Top pain points', 'Open questions']
  },
  {
    id: 'map',
    title: 'Map',
    blurb: 'Break work into steps and handoffs; spot bottlenecks.',
    outputs: ['Process map', 'Risks & dependencies', 'Quick wins']
  },
  {
    id: 'define',
    title: 'Define',
    blurb: 'Agree on success criteria and a safe first slice.',
    outputs: ['Success criteria', 'Scope for v0', 'Guardrails']
  },
  {
    id: 'prototype',
    title: 'Prototype',
    blurb: 'Smallest useful version to prove the idea.',
    outputs: ['Working slice', 'Demo', 'Rollback plan']
  },
  {
    id: 'measure',
    title: 'Measure',
    blurb: 'Real usage: time saved, errors avoided, conversion changes.',
    outputs: ['Metrics & notes', 'What worked/what didn\'t', 'Next candidates']
  },
  {
    id: 'iterate',
    title: 'Iterate',
    blurb: 'Keep, fix, or expand—and loop back to understand.',
    outputs: ['Updated plan', 'Follow-ups', 'New questions']
  }
];

export function ApproachLoop() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [reducedMotion] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return (
    <div className="max-w-6xl mx-auto" data-cmp="ApproachLoop">
      {/* Visual Loop */}
      <div className="relative mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="relative"
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              onHoverStart={() => setActiveStage(stage.id)}
              onHoverEnd={() => setActiveStage(null)}
            >
              {/* Stage Card */}
              <div
                className={`p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer ${
                  activeStage === stage.id
                    ? 'bg-yellow-300 transform -translate-x-1 -translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-blue-50'
                }`}
                data-key={stage.id}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-black text-white border-2 border-black font-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-sm mb-2">{stage.title}</h3>
                  <p className="text-xs text-gray-700">{stage.blurb}</p>
                </div>
              </div>

              {/* Connection Arrow */}
              {index < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="bg-white border-2 border-black p-1">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Loop back arrow for last item */}
              {index === stages.length - 1 && (
                <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center">
                    <div className="w-8 border-t-2 border-dashed border-gray-400"></div>
                    <div className="bg-white border-2 border-black p-1 mx-2">
                      <ChevronRight className="w-4 h-4 transform rotate-180" />
                    </div>
                    <div className="w-8 border-t-2 border-dashed border-gray-400"></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-bold text-gray-600">Loop back</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stage Details */}
      {activeStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6"
        >
          {(() => {
            const stage = stages.find(s => s.id === activeStage);
            if (!stage) return null;
            
            return (
              <div>
                <h3 className="font-display text-xl font-black mb-3">{stage.title}</h3>
                <p className="text-gray-700 mb-4">{stage.blurb}</p>
                <div>
                  <h4 className="font-bold mb-2">Key Outputs:</h4>
                  <ul className="space-y-1">
                    {stage.outputs.map((output, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-black mr-3"></div>
                        <span className="text-sm">{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Mobile-friendly explanation */}
      <div className="lg:hidden mt-8 space-y-4">
        <h3 className="font-display text-xl font-black text-center mb-6">
          The Process in Detail
        </h3>
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
            data-key={stage.id}
          >
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black text-white border-2 border-black font-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">{stage.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{stage.blurb}</p>
                <div className="text-xs">
                  <span className="font-bold">Outputs: </span>
                  {stage.outputs.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}