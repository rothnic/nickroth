import { motion } from 'motion/react';

export function AboutMe() {
  return (
    <div className="max-w-4xl mx-auto" data-cmp="AboutMe">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="relative">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="w-full h-full bg-white border-2 border-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-black text-white border-2 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-3xl font-black">NR</span>
                  </div>
                  <div className="text-sm font-bold">Nick Roth</div>
                  <div className="text-xs text-gray-600">Product Manager<br />& AI Engineer</div>
                </div>
              </div>
            </div>
            
            {/* Sticker-style badges */}
            <div className="absolute -top-2 -right-2 bg-yellow-300 border-2 border-black px-2 py-1 transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-black">5+ YEARS</span>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-red-400 border-2 border-black px-2 py-1 transform -rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-black">FULL STACK</span>
            </div>
          </div>
        </motion.div>

        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="font-display text-2xl font-black mb-4">
              About Me
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                I'm a product manager and AI engineer who bridges the gap between business strategy and technical implementation. 
                My approach is rooted in understanding problems first, then building the smallest useful solution to prove value 
                before scaling.
              </p>
              
              <p className="text-gray-700 mb-4">
                Over the past 5+ years, I've helped teams modernize platforms, implement AI workflows, and build measurement 
                systems that drive real business outcomes. I believe in objective-first discovery, iterative development, 
                and evidence-based decision making.
              </p>
              
              <p className="text-gray-700">
                When I'm not building products, you'll find me writing about the intersection of AI and product development, 
                exploring new automation possibilities, or contributing to open source projects that make developers' lives easier.
              </p>
            </div>

            {/* Values */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <h3 className="font-bold text-lg mb-4">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 border-2 border-black">
                  <div className="font-bold text-sm mb-1">Evidence Over Claims</div>
                  <div className="text-xs text-gray-600">Measure what matters, iterate based on data</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 border-2 border-black">
                  <div className="font-bold text-sm mb-1">Start Small, Scale Smart</div>
                  <div className="text-xs text-gray-600">Prove value first, then expand</div>
                </div>
                <div className="text-center p-3 bg-green-50 border-2 border-black">
                  <div className="font-bold text-sm mb-1">Technical Depth</div>
                  <div className="text-xs text-gray-600">Hands-on implementation, not just strategy</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}