import { ReactNode } from 'react';
import { HoverCard } from '../effects/HoverCard';

interface ListItemComponentProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  hover?: boolean;
  className?: string;
}

export function ListItemComponent({ 
  children, 
  href,
  onClick,
  icon,
  hover = false,
  className = ''
}: ListItemComponentProps) {
  const baseClasses = 'flex items-center gap-3 p-3 rounded-lg border-2 border-black bg-white transition-all duration-200';
  
  const content = (
    <>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1">{children}</div>
    </>
  );

  if (href) {
    return (
      <HoverCard hoverEffect={hover ? 'lift' : 'none'}>
        <a 
          href={href}
          className={`${baseClasses} hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${className}`}
        >
          {content}
        </a>
      </HoverCard>
    );
  }

  if (onClick) {
    return (
      <HoverCard hoverEffect={hover ? 'lift' : 'none'}>
        <button 
          onClick={onClick}
          className={`${baseClasses} hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-left w-full ${className}`}
        >
          {content}
        </button>
      </HoverCard>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {content}
    </div>
  );
}