import { ArrowRight, Check } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';
import { StickerBadge } from '../StickerBadge';

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  ctaText?: string;
  popular?: boolean;
  color?: string;
  onAction?: () => void;
}

export function FeatureCard({
  title,
  description,
  features,
  price,
  ctaText = 'Get Started',
  popular = false,
  color = 'bg-gradient-to-br from-orange-300 to-red-400',
  onAction
}: FeatureCardProps) {
  return (
    <BaseCard
      background={color}
      rotation={popular ? 3 : -1}
      className="max-w-sm"
      size="lg"
    >
      <CardHeader
        title={title}
        subtitle={description}
        badge={
          popular ? (
            <StickerBadge color="bg-red-500" className="text-white" size="sm" rotation={-15}>
              🔥 POPULAR
            </StickerBadge>
          ) : undefined
        }
      />

      {/* Price */}
      {price && (
        <div className="mb-6 text-center">
          <div className="bg-black text-white px-4 py-2 inline-block border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transform -rotate-2">
            <span className="text-2xl font-display font-black">{price}</span>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-black" />
              </div>
              <span className="text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {onAction && (
        <CardFooter>
          <button
            onClick={onAction}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 font-bold transform hover:scale-105"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </CardFooter>
      )}
    </BaseCard>
  );
}