import { motion } from 'motion/react';
import { StickerBadge } from './StickerBadge';
import { ArrowRight, Clock, Zap } from 'lucide-react';

interface BackgroundSummaryProps {
  onViewFullTimeline: () => void;
}

export function BackgroundSummary({ onViewFullTimeline }: BackgroundSummaryProps) {
  return (
    <section 
      id="background-summary" 
      className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative texture-grain"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          {/* Main content card */}
          <div className="relative max-w-4xl mx-auto">
            {/* Background decorative elements */}
            <div className="absolute -top-8 -left-8 hidden lg:block">
              <StickerBadge color="bg-lime-400" rotation={15} size="sm">
                <Clock className="w-4 h-4" />
              </StickerBadge>
            </div>
            <div className="absolute -top-4 -right-8 hidden lg:block">
              <StickerBadge color="bg-cyan-400" rotation={-20} size="sm">
                <Zap className="w-4 h-4" />
              </StickerBadge>
            </div>
            
            {/* Main card */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 p-8 md:p-12 relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-5xl font-display font-black mb-4 leading-tight">
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
                </h2>
              </motion.div>

              {/* Journey highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-2">
                    <div className="bg-purple-100 border-2 border-black px-3 py-1 inline-block font-mono font-bold text-sm transform -rotate-1">
                      Auburn → MDA → GT
                    </div>
                    <p className="text-sm leading-relaxed">
                      Systems engineering foundations in defense and missile systems
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-blue-100 border-2 border-black px-3 py-1 inline-block font-mono font-bold text-sm transform rotate-1">
                      Analytics → Product
                    </div>
                    <p className="text-sm leading-relaxed">
                      Scaled A/B testing and led product modernization
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-green-100 border-2 border-black px-3 py-1 inline-block font-mono font-bold text-sm transform -rotate-1">
                      AI × Engineering
                    </div>
                    <p className="text-sm leading-relaxed">
                      Full-stack development with AI automation and agents
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Key achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex flex-wrap justify-center gap-3">
                  <StickerBadge color="bg-green-400" size="sm" className="font-mono">
                    400% blog revenue
                  </StickerBadge>
                  <StickerBadge color="bg-blue-400" size="sm" className="font-mono">
                    $35k/mo savings
                  </StickerBadge>
                  <StickerBadge color="bg-purple-400" size="sm" className="font-mono">
                    10× A/B tests
                  </StickerBadge>
                  <StickerBadge color="bg-yellow-400" size="sm" className="font-mono">
                    NATO interop
                  </StickerBadge>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={onViewFullTimeline}
                  className="group bg-black text-white px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1 font-black text-lg inline-flex items-center gap-3"
                >
                  <Clock className="w-5 h-5" />
                  View Full Background & Progression
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Bottom accent */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 border-2 border-black"></div>
            </div>
          </div>

          {/* Scattered decorative elements */}
          <div className="absolute bottom-8 left-12 hidden lg:block">
            <StickerBadge color="bg-yellow-300" rotation={25} size="sm">🚀</StickerBadge>
          </div>
          <div className="absolute bottom-4 right-16 hidden lg:block">
            <StickerBadge color="bg-rose-400" rotation={-15} size="sm">💡</StickerBadge>
          </div>
        </motion.div>
      </div>
    </section>
  );
}