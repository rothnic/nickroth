import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GraphPaperCardProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  gridSize?: 'sm' | 'md' | 'lg';
  accentColor?: string;
  showGrid?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export function GraphPaperCard({
  title,
  children,
  className = '',
  gridSize = 'md',
  accentColor = 'rgb(59, 130, 246)', // blue-500
  showGrid = true,
  interactive = false,
  onClick
}: GraphPaperCardProps) {
  const gridSizes = {
    sm: '10px',
    md: '20px',
    lg: '30px'
  };

  // Extract RGB values from accentColor for proper opacity handling
  const getRGBAColor = (color: string, opacity: number) => {
    // Convert rgb(r,g,b) to rgba(r,g,b,opacity)
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  };

  const lightGridColor = getRGBAColor(accentColor, 0.2);
  const strongGridColor = getRGBAColor(accentColor, 0.4);

  const gridPattern = showGrid ? {
    backgroundColor: '#ffffff',
    backgroundImage: `
      linear-gradient(${lightGridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${lightGridColor} 1px, transparent 1px),
      linear-gradient(${strongGridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${strongGridColor} 1px, transparent 1px)
    `,
    backgroundSize: `${gridSizes[gridSize]} ${gridSizes[gridSize]}, ${gridSizes[gridSize]} ${gridSizes[gridSize]}, ${parseInt(gridSizes[gridSize]) * 5}px ${parseInt(gridSizes[gridSize]) * 5}px, ${parseInt(gridSizes[gridSize]) * 5}px ${parseInt(gridSizes[gridSize]) * 5}px`,
    backgroundPosition: '0 0, 0 0, 0 0, 0 0'
  } : {
    backgroundColor: '#ffffff'
  };

  const CardComponent = interactive ? motion.button : motion.div;
  const interactiveProps = interactive ? {
    whileHover: { 
      scale: 1.02,
      boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)'
    },
    whileTap: { scale: 0.98 },
    onClick
  } : {};

  return (
    <CardComponent
      className={`
        bg-white 
        border-4 
        border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
        p-6 
        relative
        overflow-hidden
        ${interactive ? 'cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200' : ''}
        ${className}
      `}
      style={gridPattern}
      {...interactiveProps}
    >
      {/* Accent corner triangle */}
      <div 
        className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent"
        style={{ borderBottomColor: accentColor }}
      />
      
      {title && (
        <div className="relative z-10 mb-4">
          <h3 className="font-display font-black text-lg bg-white px-2 py-1 border-2 border-black inline-block transform -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {title}
          </h3>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Grid intersection dots for authentic graph paper look */}
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${getRGBAColor(accentColor, 0.3)} 0.5px, transparent 0.5px)`,
            backgroundSize: `${gridSizes[gridSize]} ${gridSizes[gridSize]}`,
            backgroundPosition: '0 0'
          }}
        />
      )}
    </CardComponent>
  );
}