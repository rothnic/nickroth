import { ReactNode } from 'react';

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export function CardHeader({ 
  title, 
  subtitle, 
  icon, 
  badge, 
  className = '' 
}: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} data-cmp="CardHeader">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-black text-lg md:text-xl truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {badge && (
          <div className="flex-shrink-0 ml-3">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}