import { ReactNode } from 'react';
import { RotationWrapper } from '../effects/RotationWrapper';

interface SplitHeadingProps {
  words: Array<{
    text: string;
    variant?: 'black' | 'gradient' | 'colored';
    background?: string;
    textColor?: string;
    rotation?: number;
  }>;
  level?: 1 | 2 | 3;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  className?: string;
}

export function SplitHeading({
  words,
  level = 1,
  size = '4xl',
  className = ''
}: SplitHeadingProps) {
  const sizeClasses = {
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-6xl',
    '5xl': 'text-5xl md:text-7xl',
    '6xl': 'text-6xl md:text-8xl'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${sizeClasses[size]} font-display font-black ${className}`}>
      {words.map((word, index) => {
        const rotation = word.rotation || (index % 2 === 0 ? -2 : 1);
        
        if (word.variant === 'black') {
          return (
            <RotationWrapper key={index} rotation={rotation} className="mr-2">
              <span className="bg-black text-white px-4 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                {word.text}
              </span>
            </RotationWrapper>
          );
        }
        
        if (word.variant === 'gradient') {
          return (
            <RotationWrapper key={index} rotation={rotation} className="mr-2">
              <span className={`${word.background || 'bg-gradient-to-r from-lime-400 to-cyan-400'} text-black px-4 py-2 inline-block border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                {word.text}
              </span>
            </RotationWrapper>
          );
        }
        
        if (word.variant === 'colored') {
          return (
            <RotationWrapper key={index} rotation={rotation} className="mr-2">
              <span className={`${word.background || 'bg-gray-800'} ${word.textColor || 'text-white'} px-4 py-2 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                {word.text}
              </span>
            </RotationWrapper>
          );
        }
        
        // Default style - just text
        return (
          <span key={index} className="mr-2">
            {word.text}
          </span>
        );
      })}
    </Tag>
  );
}