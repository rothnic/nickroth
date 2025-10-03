import { Calendar, Clock, User, Tag } from 'lucide-react';
import { StickerBadge } from '../StickerBadge';

interface BlogMetaProps {
  publishDate: string;
  readingTime: number;
  author: string | { name: string; avatar?: string };
  tags: string[];
  lastUpdated?: string;
}

const tagColors = [
  "bg-lime-400",
  "bg-cyan-400", 
  "bg-yellow-300",
  "bg-fuchsia-400",
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-rose-400",
  "bg-purple-400"
];

export function BlogMeta({ publishDate, readingTime, author, tags, lastUpdated }: BlogMetaProps) {
  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
      {/* Meta info grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Publish date */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="font-mono text-sm">
            {new Date(publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Reading time */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="font-mono text-sm">
            {readingTime} min read
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-600" />
          <span className="font-mono text-sm font-bold">
            {typeof author === 'string' ? author : author.name}
          </span>
        </div>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <div className="mb-4 p-2 bg-yellow-100 border-2 border-black inline-block transform -rotate-1">
          <span className="font-mono text-xs">
            Updated: {new Date(lastUpdated).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Tags */}
      <div className="flex items-start gap-2 flex-wrap">
        <div className="flex items-center gap-1 mr-2">
          <Tag className="w-4 h-4 text-gray-600" />
          <span className="font-mono text-sm font-bold">Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <StickerBadge
              key={tag}
              color={tagColors[index % tagColors.length]}
              size="sm"
              className="font-mono"
            >
              {tag}
            </StickerBadge>
          ))}
        </div>
      </div>
    </div>
  );
}