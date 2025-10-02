import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'rotate' | 'glow' | 'none';
  disabled?: boolean;
}

export function HoverCard({ 
  children, 
  className = '',
  hoverEffect = 'lift',
  disabled = false
}: HoverCardProps) {
  if (disabled || hoverEffect === 'none') {
    return <div className={className}>{children}</div>;
  }

  const hoverVariants = {
    lift: {
      whileHover: { 
        y: -2,
        x: -2,
        transition: { duration: 0.2 }
      }
    },
    scale: {
      whileHover: { 
        scale: 1.05,
        transition: { duration: 0.2 }
      }
    },
    rotate: {
      whileHover: { 
        rotate: 2,
        y: -2,
        transition: { duration: 0.2 }
      }
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        transition: { duration: 0.2 }
      }
    }
  };

  const variant = hoverVariants[hoverEffect];

  return (
    <motion.div
      className={className}
      {...variant}
    >
      {children}
    </motion.div>
  );
}