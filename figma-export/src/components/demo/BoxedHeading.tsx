import { ReactNode } from 'react';

interface BoxedHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'black' | 'white' | 'gradient' | 'colored';
  background?: string;
  textColor?: string;
  rotation?: number;
  shadowSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BoxedHeading({
  children,
  level = 2,
  size = 'xl',
  variant = 'black',
  background,
  textColor,
  rotation = 1,
  shadowSize = 'md',
  className = ''
}: BoxedHeadingProps) {
  const sizeClasses = {
    sm: 'text-sm md:text-base px-2 py-1',
    md: 'text-base md:text-lg px-3 py-1.5',
    lg: 'text-lg md:text-xl px-3 py-2',
    xl: 'text-xl md:text-2xl px-4 py-2',
    '2xl': 'text-2xl md:text-3xl px-4 py-2',
    '3xl': 'text-3xl md:text-4xl px-4 py-2'
  };

  const shadowClasses = {
    sm: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    md: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    lg: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
  };

  const variantClasses = {
    black: 'bg-black text-white border-2 border-black',
    white: 'bg-white text-black border-4 border-black',
    gradient: 'bg-gradient-to-r from-lime-400 to-cyan-400 text-black border-4 border-black',
    colored: `${background || 'bg-gray-800'} ${textColor || 'text-white'} border-4 border-black`
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`font-display font-black inline-block ${className}`}>
      <span
        className={`${sizeClasses[size]} ${variantClasses[variant]} ${shadowClasses[shadowSize]} inline-block`}
        style={{ 
          transform: `rotate(${rotation}deg)`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </span>
    </Tag>
  );
}