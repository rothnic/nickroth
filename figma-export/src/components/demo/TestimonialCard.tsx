import { Quote } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { StickerBadge } from '../StickerBadge';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating
}: TestimonialCardProps) {
  return (
    <BaseCard
      background="bg-gradient-to-br from-gray-50 to-blue-50"
      rotation={Math.random() > 0.5 ? 1 : -1}
      className="max-w-md"
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <div className="w-8 h-8 bg-blue-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          <Quote className="w-4 h-4" />
        </div>
      </div>

      {/* Quote Text */}
      <blockquote className="mb-6">
        <p className="text-lg leading-relaxed font-medium italic">
          "{quote}"
        </p>
      </blockquote>

      {/* Rating */}
      {rating && (
        <div className="mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center space-x-3">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-display font-black text-white">
            {author.charAt(0)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="font-bold text-black truncate">{author}</div>
          <div className="text-sm text-gray-600 truncate">
            {role}
            {company && (
              <>
                <span className="mx-1">•</span>
                <span>{company}</span>
              </>
            )}
          </div>
        </div>

        <StickerBadge color="bg-green-300" size="xs" rotation={10}>
          ✓
        </StickerBadge>
      </div>
    </BaseCard>
  );
}