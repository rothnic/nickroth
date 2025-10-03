import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ListItemProps {
  // Basic props
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  
  // Icon props
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  
  // Two-line variant
  subtitle?: string;
  
  // Interactive states
  active?: boolean;
  hover?: boolean;
  
  // Collapsible functionality
  collapsible?: boolean;
  defaultExpanded?: boolean;
  expandedContent?: ReactNode;
  
  // Visual variants
  variant?: 'default' | 'highlighted' | 'muted';
}

interface ListSeparatorProps {
  className?: string;
}

interface ListHeadingProps {
  children: ReactNode;
  className?: string;
}

export function ListItem({
  children,
  className = '',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
  subtitle,
  active = false,
  hover = true,
  collapsible = false,
  defaultExpanded = false,
  expandedContent,
  variant = 'default'
}: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    if (disabled) return;
    
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
    
    if (onClick) {
      onClick();
    }
  };

  // Simplified styling like the nav dropdown
  const getItemStyles = () => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed bg-white border-transparent';
    }
    
    if (active) {
      return 'bg-black text-white border-black';
    }
    
    // Different background colors for variants, but same hover pattern
    const baseStyles = {
      default: 'bg-white hover:bg-gray-50',
      highlighted: 'bg-lime-50 hover:bg-lime-100',
      muted: 'bg-gray-50 hover:bg-gray-100 text-gray-600'
    };
    
    return `${baseStyles[variant]} border-transparent hover:border-black`;
  };

  return (
    <>
      <button
        className={`
          w-full text-left p-3 border-2 transition-all duration-200
          flex items-center gap-3 group
          ${getItemStyles()}
          ${className}
        `}
        onClick={handleClick}
        disabled={disabled}
      >
        {/* Left icon */}
        {icon && iconPosition === 'left' && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        
        {/* Collapsible arrow */}
        {collapsible && (
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="font-medium">
            {children}
          </div>
          {subtitle && (
            <div className="text-sm opacity-75 mt-1 font-mono">
              {subtitle}
            </div>
          )}
        </div>
        
        {/* Right icon */}
        {icon && iconPosition === 'right' && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
      </button>
      
      {/* Expanded content */}
      {collapsible && isExpanded && expandedContent && (
        <div className="bg-gray-50 px-4 py-3 ml-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
          {expandedContent}
        </div>
      )}
    </>
  );
}

export function ListSeparator({ className = '' }: ListSeparatorProps) {
  return (
    <div className={`border-t border-gray-300 ${className}`} />
  );
}

export function ListHeading({ children, className = '' }: ListHeadingProps) {
  return (
    <div className={`px-3 py-2 bg-gray-100 border-b-2 border-black font-bold text-sm uppercase tracking-wide ${className}`}>
      {children}
    </div>
  );
}

// Container component for organizing lists
interface ListContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function ListContainer({ children, className = '', title }: ListContainerProps) {
  return (
    <div className={`border-2 border-black bg-white ${className}`}>
      {title && (
        <div className="bg-black text-white px-4 py-2 font-bold text-sm">
          {title}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}