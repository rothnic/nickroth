import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';

export function Logo() {
  return (
    <motion.div 
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Full name logo with hero-inspired styling */}
      <div className="flex items-center gap-1">
        {/* NICK in regular black */}
        <span className="text-xl font-display font-black text-black">
          <GlitchText>NICK</GlitchText>
        </span>
        
        {/* ROTH with purple background like in hero */}
        <span className="text-xl font-display font-black bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-2 py-1 transform -rotate-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
          <GlitchText>ROTH</GlitchText>
        </span>
      </div>
      
      {/* Small decorative elements */}
      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-lime-400 border border-black rounded-full"></div>
      <div className="absolute -bottom-1 -left-1 w-1 h-2 bg-cyan-400 border border-black transform rotate-45"></div>
    </motion.div>
  );
}