import { ReactNode } from 'react';

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'actions' | 'stats';
}

export function CardFooter({ 
  children, 
  className = '', 
  variant = 'default' 
}: CardFooterProps) {
  const variantClasses = {
    default: 'mt-4 pt-4',
    actions: 'mt-6 pt-4 border-t-2 border-black flex items-center justify-between',
    stats: 'mt-4 pt-4 border-t-2 border-gray-200 flex items-center justify-center space-x-6'
  };

  return (
    <div 
      className={`${variantClasses[variant]} ${className}`} 
      data-cmp="CardFooter"
    >
      {children}
    </div>
  );
}