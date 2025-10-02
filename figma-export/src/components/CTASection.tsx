import { ReactNode } from 'react';
import { SectionContainer } from './SectionContainer';
import { NeoButton } from './demo/NeoButton';

interface CTAButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'black' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

interface CTASectionProps {
  title: string;
  subtitle: string | ReactNode;
  button: CTAButtonProps;
  background?: 'white' | 'gray' | 'gradient' | string;
  textColor?: 'black' | 'white';
  subtitleColor?: string;
  className?: string;
  'data-cmp'?: string;
}

export function CTASection({
  title,
  subtitle,
  button,
  background = 'white',
  textColor = 'black',
  subtitleColor,
  className = '',
  'data-cmp': dataCmp
}: CTASectionProps) {
  // Background class mapping
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600'
  };

  // Get background class - use mapping or custom class
  const bgClass = backgroundClasses[background as keyof typeof backgroundClasses] || background;
  
  const titleColorClass = textColor === 'white' ? 'text-white' : '';
  const defaultSubtitleColor = textColor === 'white' ? 'text-purple-100' : 'text-gray-700';
  const finalSubtitleColor = subtitleColor || defaultSubtitleColor;

  return (
    <SectionContainer 
      className={`py-16 ${bgClass} border-t-4 border-black ${className}`}
      data-cmp={dataCmp}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-display text-2xl font-black mb-4 ${titleColorClass}`}>
          {title}
        </h2>
        <div className={`text-lg mb-8 ${finalSubtitleColor}`}>
          {subtitle}
        </div>
        <div className="flex justify-center">
          <NeoButton
            variant={button.variant || 'black'}
            size={button.size || 'lg'}
            onClick={button.onClick}
            className="px-8 py-4"
          >
            {button.label}
          </NeoButton>
        </div>
      </div>
    </SectionContainer>
  );
}