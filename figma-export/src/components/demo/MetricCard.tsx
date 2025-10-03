import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { StickerBadge } from '../StickerBadge';

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
    period: string;
  };
  icon?: string;
  color?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon = '📊',
  color = 'bg-gradient-to-br from-purple-400 to-pink-400'
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    if (!change) return 'bg-gray-100';
    
    switch (change.trend) {
      case 'up':
        return 'bg-green-100';
      case 'down':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <BaseCard
      background={color}
      rotation={Math.random() > 0.5 ? 2 : -2}
      className="max-w-xs text-center"
      size="lg"
    >
      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="font-display font-black text-lg mb-2 text-black">
        {title}
      </h3>

      {/* Value */}
      <div className="mb-4">
        <span className="text-3xl md:text-4xl font-display font-black text-black">
          {value}
        </span>
      </div>

      {/* Change indicator */}
      {change && (
        <div className="flex items-center justify-center">
          <StickerBadge
            color={getTrendColor()}
            size="sm"
            className="flex items-center space-x-1 font-mono"
          >
            {getTrendIcon()}
            <span>{change.value}</span>
            <span className="text-xs">({change.period})</span>
          </StickerBadge>
        </div>
      )}
    </BaseCard>
  );
}