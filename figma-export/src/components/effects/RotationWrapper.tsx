import { ReactNode } from 'react';

interface RotationWrapperProps {
  children: ReactNode;
  rotation?: number;
  className?: string;
  hoverRotation?: number;
  randomRotation?: boolean;
  hoverEffect?: 'rotate' | 'scale' | 'both' | 'none';
  display?: 'inline-block' | 'block' | 'inline-flex' | 'flex';
}

export function RotationWrapper({ 
  children, 
  rotation = 0,
  className = '',
  hoverRotation,
  randomRotation = false,
  hoverEffect = 'none',
  display = 'inline-block'
}: RotationWrapperProps) {
  // Generate random rotation if requested
  const finalRotation = randomRotation ? (Math.random() - 0.5) * 10 : rotation;
  
  const transform = `rotate(${finalRotation}deg)`;
  const hoverTransform = hoverRotation ? `rotate(${hoverRotation}deg)` : 
    hoverEffect === 'rotate' ? `rotate(${finalRotation + (Math.random() - 0.5) * 5}deg)` :
    hoverEffect === 'scale' ? `rotate(${finalRotation}deg) scale(1.05)` :
    hoverEffect === 'both' ? `rotate(${finalRotation + (Math.random() - 0.5) * 5}deg) scale(1.05)` :
    undefined;

  // Enhanced anti-aliasing styles for smooth rotation rendering
  const antiAliasingStyles = {
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
    willChange: (hoverTransform || hoverEffect !== 'none') ? 'transform' : 'auto' as const,
    transformStyle: 'preserve-3d' as const,
    // Additional properties for sharper rendering
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    imageRendering: 'crisp-edges' as const
  };

  return (
    <div 
      className={`${display} ${className}`}
      style={{
        transform,
        transition: (hoverTransform || hoverEffect !== 'none') ? 'transform 0.2s ease-in-out' : undefined,
        ...antiAliasingStyles
      }}
      onMouseEnter={hoverTransform || hoverEffect !== 'none' ? (e) => {
        if (hoverTransform) {
          e.currentTarget.style.transform = hoverTransform;
        }
      } : undefined}
      onMouseLeave={hoverTransform || hoverEffect !== 'none' ? (e) => {
        e.currentTarget.style.transform = transform;
      } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Utility function to get anti-aliasing styles for inline use
 * Use this when you can't use RotationWrapper but need smooth rotation
 */
export const getRotationStyles = (rotation: number = 0, includeHover: boolean = false) => ({
  transform: `rotate(${rotation}deg)`,
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
  willChange: includeHover ? 'transform' : 'auto' as const,
  transformStyle: 'preserve-3d' as const,
  WebkitTransform: `rotate(${rotation}deg)`,
  MozTransform: `rotate(${rotation}deg)`,
  msTransform: `rotate(${rotation}deg)`,
  imageRendering: 'crisp-edges' as const,
  transition: includeHover ? 'transform 0.2s ease-in-out' : undefined
});