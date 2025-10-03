import { ReactNode } from 'react';

interface ListContainerProps {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'spaced';
  className?: string;
}

export function ListContainer({ 
  children, 
  variant = 'default',
  className = ''
}: ListContainerProps) {
  const variantClasses = {
    default: 'space-y-2',
    compact: 'space-y-1',
    spaced: 'space-y-4'
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}