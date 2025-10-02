import { ReactNode } from 'react';

interface HighlightProps {
  text: string;
  color: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'yellow' | 'cyan' | 'pink';
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  highlight?: HighlightProps;
  alignment?: 'center' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  highlight,
  alignment = 'center',
  size = 'lg',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeaderProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      title: 'text-2xl lg:text-3xl',
      subtitle: 'text-base',
      spacing: 'mb-8'
    },
    md: {
      title: 'text-3xl lg:text-4xl', 
      subtitle: 'text-lg',
      spacing: 'mb-10'
    },
    lg: {
      title: 'text-3xl lg:text-5xl',
      subtitle: 'text-lg',
      spacing: 'mb-12'
    },
    xl: {
      title: 'text-4xl lg:text-6xl',
      subtitle: 'text-xl',
      spacing: 'mb-12'
    }
  };

  // Color mapping for highlights
  const highlightColors = {
    purple: 'text-purple-600',
    blue: 'text-blue-600', 
    green: 'text-green-600',
    red: 'text-red-500',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    cyan: 'text-cyan-600',
    pink: 'text-pink-600'
  };

  const config = sizeConfig[size];
  const alignmentClass = alignment === 'center' ? 'text-center' : 'text-left';
  const subtitleMaxWidth = alignment === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl';

  // Split title and highlight
  const renderTitle = () => {
    if (!highlight) {
      return title;
    }

    const parts = title.split(highlight.text);
    if (parts.length !== 2) {
      // Fallback if highlight text not found in title
      return title;
    }

    return (
      <>
        {parts[0]}
        <span className={highlightColors[highlight.color]}>{highlight.text}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`${alignmentClass} ${config.spacing} ${className}`}>
      <h1 className={titleClassName || `font-display ${config.title} font-black mb-4`}>
        {renderTitle()}
      </h1>
      {subtitle && (
        <div className={subtitleClassName || `${config.subtitle} text-gray-700 ${subtitleMaxWidth}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}