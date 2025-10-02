import { ReactNode } from 'react';

interface ColoredTextPart {
  text: string;
  color?: string;
  className?: string;
}

interface ColoredHeadingProps {
  parts: Array<string | ColoredTextPart>;
  level?: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'medium' | 'semibold' | 'bold' | 'black';
  className?: string;
}

export function ColoredHeading({
  parts,
  level = 2,
  size = 'xl',
  weight = 'black',
  className = ''
}: ColoredHeadingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl',
    '5xl': 'text-5xl md:text-6xl'
  };

  const weightClasses = {
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`font-display ${sizeClasses[size]} ${weightClasses[weight]} ${className}`}>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <span key={index}>{part}</span>;
        }
        
        return (
          <span
            key={index}
            className={part.className || `text-${part.color || 'purple'}-600`}
          >
            {part.text}
          </span>
        );
      })}
    </Tag>
  );
}