interface OrganicDividerProps {
  color?: string;
  position?: 'top' | 'bottom' | 'both';
  className?: string;
}

export function OrganicDivider({ 
  color = "bg-black", 
  position = "bottom",
  className = "" 
}: OrganicDividerProps) {
  const clipClass = position === 'top' ? 'organic-top' : 
                   position === 'bottom' ? 'organic-bottom' : 
                   'organic-both';

  return (
    <div className={`w-full h-8 ${color} ${clipClass} ${className}`} />
  );
}