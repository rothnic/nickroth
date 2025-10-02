import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface NeoButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shadowSize?: 'sm' | 'md' | 'lg';
  rotation?: number;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function NeoButton({
  children,
  variant = 'primary',
  size = 'md',
  shadowSize = 'md',
  rotation = 0,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: NeoButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-black text-white border-black',
    secondary: 'bg-white text-black border-black',
    outline: 'bg-transparent text-black border-black',
    destructive: 'bg-red-500 text-white border-red-600',
    ghost: 'bg-transparent text-black border-transparent hover:bg-gray-100'
  };

  const shadowClasses = {
    sm: 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    md: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    lg: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
  };

  const hoverShadowClasses = {
    sm: 'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    md: 'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    lg: 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${variant !== 'ghost' ? shadowClasses[shadowSize] : ''}
        ${variant !== 'ghost' ? hoverShadowClasses[shadowSize] : ''}
        border-2
        font-bold
        transition-all
        duration-200
        transform
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        active:translate-x-0
        active:translate-y-0
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:transform-none
        disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}