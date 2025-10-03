import { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  variant?: 'hero' | 'content' | 'cta' | 'full-width';
  background?: 'gradient-blue-purple' | 'gradient-purple-blue' | 'gradient-yellow-orange' | 'gradient-gray-blue' | 'white' | 'black' | 'none';
  borderTop?: boolean | 'black' | 'white';
  borderBottom?: boolean | 'black' | 'white';
  minHeight?: 'none' | 'auto' | 'screen' | 'section';
  className?: string;
  id?: string;
  'data-cmp'?: string;
}

export function SectionContainer({ 
  children, 
  variant = 'content',
  background = 'none',
  borderTop,
  borderBottom,
  minHeight = 'auto',
  className = '',
  id,
  'data-cmp': dataCmp
}: SectionContainerProps) {
  // Base padding classes
  const paddingClasses = {
    'hero': 'py-16 lg:py-20',
    'content': 'py-16',
    'cta': 'py-12',
    'full-width': ''
  };
  
  // Background classes
  const backgroundClasses = {
    'gradient-blue-purple': 'bg-gradient-to-br from-blue-50 to-purple-50',
    'gradient-purple-blue': 'bg-gradient-to-br from-purple-50 to-blue-50',
    'gradient-yellow-orange': 'bg-gradient-to-br from-yellow-50 to-orange-50',
    'gradient-gray-blue': 'bg-gradient-to-br from-gray-50 to-blue-50',
    'white': 'bg-white',
    'black': 'bg-black',
    'none': ''
  };

  // Min height classes
  const minHeightClasses = {
    'none': '',
    'auto': '',
    'screen': 'min-h-screen',
    'section': 'min-h-[70vh]'
  };

  // Border classes
  const getBorderClass = (border: boolean | 'black' | 'white' | undefined, position: 'top' | 'bottom') => {
    if (!border) return '';
    if (border === true || border === 'black') return `border-${position}-4 border-black`;
    if (border === 'white') return `border-${position}-4 border-white`;
    return '';
  };

  const borderTopClass = getBorderClass(borderTop, 'top');
  const borderBottomClass = getBorderClass(borderBottom, 'bottom');
  
  const sectionClasses = [
    paddingClasses[variant],
    backgroundClasses[background],
    minHeightClasses[minHeight],
    borderTopClass,
    borderBottomClass,
    className
  ].filter(Boolean).join(' ');

  const content = variant === 'full-width' ? children : (
    <div className="max-w-7xl mx-auto px-4">
      {children}
    </div>
  );

  return (
    <section 
      className={sectionClasses}
      id={id}
      data-cmp={dataCmp}
    >
      {content}
    </section>
  );
}