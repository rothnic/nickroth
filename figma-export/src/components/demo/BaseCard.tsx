import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { HoverCard } from '../effects/HoverCard';
import { RotationWrapper } from '../effects/RotationWrapper';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  background?: string;
  borderColor?: string;
  shadowColor?: string;
  rotation?: number;
  hoverEffect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function BaseCard({
  children,
  className = '',
  background = 'bg-white',
  borderColor = 'border-black',
  shadowColor = 'rgba(0,0,0,1)',
  rotation = 0,
  hoverEffect = true,
  size = 'md',
  onClick
}: BaseCardProps) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowSizes = {
    sm: `shadow-[4px_4px_0px_0px_${shadowColor}]`,
    md: `shadow-[6px_6px_0px_0px_${shadowColor}]`,
    lg: `shadow-[8px_8px_0px_0px_${shadowColor}]`
  };

  const hoverShadowSizes = {
    sm: `hover:shadow-[6px_6px_0px_0px_${shadowColor}]`,
    md: `hover:shadow-[8px_8px_0px_0px_${shadowColor}]`,
    lg: `hover:shadow-[12px_12px_0px_0px_${shadowColor}]`
  };

  return (
    <RotationWrapper rotation={rotation}>
      <HoverCard hoverEffect={hoverEffect ? 'lift' : 'none'}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`
            ${background} 
            border-4 ${borderColor} 
            ${shadowSizes[size]} 
            transition-all duration-300 
            ${sizeClasses[size]}
            ${onClick ? 'cursor-pointer' : ''}
            h-full flex flex-col
            ${className}
          `}
          onClick={onClick}
          data-cmp="BaseCard"
        >
          {children}
        </motion.div>
      </HoverCard>
    </RotationWrapper>
  );
}