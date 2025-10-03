import { ReactNode } from 'react';

interface DisplayHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'mono' | 'glitch';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  className?: string;
}

export function DisplayHeading({
  children,
  level = 1,
  variant = 'default',
  size = 'xl',
  weight = 'bold',
  className = ''
}: DisplayHeadingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  };

  const variantClasses = {
    default: 'font-display',
    mono: 'font-mono',
    glitch: 'font-glitch'
  };

  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${weightClasses[weight]}
    ${className}
  `;

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  if (variant === 'glitch') {
    return (
      <Tag 
        className={`${baseClasses} glitch-effect`}
        data-text={typeof children === 'string' ? children : ''}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={baseClasses}>
      {children}
    </Tag>
  );
}