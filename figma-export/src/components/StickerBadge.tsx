import { motion } from 'motion/react';
import { RotationWrapper } from './effects/RotationWrapper';

interface StickerBadgeProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rotation?: number;
  className?: string;
}

export function StickerBadge({ 
  children, 
  color = "bg-yellow-300", 
  textColor = "text-black",
  size = "md",
  rotation,
  className = "" 
}: StickerBadgeProps) {
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm", 
    lg: "px-4 py-3 text-base"
  };

  return (
    <RotationWrapper
      rotation={rotation}
      randomRotation={rotation === undefined}
      hoverEffect="both"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        className={`
          sticker font-black border-2 border-black 
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] 
          hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
          transition-all duration-200 cursor-default
          whitespace-nowrap
          ${color} ${textColor} ${sizeClasses[size]} ${className}
        `}
      >
        {children}
      </motion.div>
    </RotationWrapper>
  );
}