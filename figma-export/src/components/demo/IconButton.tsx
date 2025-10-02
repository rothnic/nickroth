import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'circle';
  tooltip?: string;
}

export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  shape = 'square',
  tooltip,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const variantClasses = {
    primary: 'bg-black text-white border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]',
    secondary: 'bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    outline: 'bg-transparent text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    destructive: 'bg-red-500 text-white border-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
  };

  const hoverShadowClasses = {
    primary: 'hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]',
    secondary: 'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    outline: 'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    destructive: 'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
  };

  const shapeClasses = {
    square: '',
    circle: 'rounded-full'
  };

  return (
    <motion.button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${hoverShadowClasses[variant]}
        ${shapeClasses[shape]}
        border-2
        transition-all
        duration-200
        transform
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        active:translate-x-0
        active:translate-y-0
        disabled:opacity-50
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      {icon}
    </motion.button>
  );
}