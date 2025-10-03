import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';

interface ContentCardProps {
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  category?: string;
  onClick?: () => void;
}

export function ContentCard({
  title,
  excerpt,
  readTime,
  publishDate,
  category,
  onClick
}: ContentCardProps) {
  return (
    <BaseCard
      background="bg-white"
      rotation={0}
      className="max-w-md"
      onClick={onClick}
    >
      <CardHeader
        title={title}
        subtitle={excerpt}
        badge={
          category ? (
            <div className="px-2 py-1 bg-gray-100 border border-gray-300 text-xs font-mono font-bold uppercase tracking-wide">
              {category}
            </div>
          ) : undefined
        }
      />

      <CardFooter variant="actions">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="font-mono">{publishDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{readTime}</span>
          </div>
        </div>

        {onClick && (
          <button className="flex items-center space-x-1 px-3 py-1 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 text-sm font-bold">
            <span>Read</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </CardFooter>
    </BaseCard>
  );
}