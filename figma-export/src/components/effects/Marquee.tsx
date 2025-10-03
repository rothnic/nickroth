import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({ 
  children, 
  direction = 'left',
  speed = 'normal',
  className = '',
  pauseOnHover = true 
}: MarqueeProps) {
  const speedMap = {
    slow: '60s',
    normal: '40s', 
    fast: '20s'
  };

  const animationDirection = direction === 'left' ? 'scroll-left' : 'scroll-right';
  const duration = speedMap[speed];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className={`inline-block ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${animationDirection} ${duration} linear infinite`,
          animationPlayState: 'running'
        }}
      >
        {children}
      </div>
    </div>
  );
}