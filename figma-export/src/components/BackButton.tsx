import { ArrowLeft } from 'lucide-react';
import { IconButton } from './demo/IconButton';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'black' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BackButton({ 
  onClick, 
  label = 'Back to Demo',
  variant = 'black',
  size = 'md',
  className = ''
}: BackButtonProps) {
  return (
    <IconButton
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </IconButton>
  );
}