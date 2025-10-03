import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'caption' | 'mono' | 'label';
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent' | 'destructive';
  className?: string;
  as?: 'p' | 'span' | 'div' | 'label';
}

export function Text({
  children,
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color = 'default',
  className = '',
  as = 'p'
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    accent: 'text-accent-foreground',
    destructive: 'text-destructive'
  };

  const variantClasses = {
    body: '',
    caption: 'text-muted-foreground',
    mono: 'font-mono',
    label: 'font-medium'
  };

  const baseClasses = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${weightClasses[weight]}
    ${colorClasses[color]}
    ${className}
  `;

  const Tag = as;

  return (
    <Tag className={baseClasses}>
      {children}
    </Tag>
  );
}