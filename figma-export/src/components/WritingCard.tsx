import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  publishDate?: string;
  date?: string;
  readingTime?: number;
  readTime?: string;
  tags: string[];
  author: string | { name: string; avatar: string };
}

interface WritingCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

export function WritingCard({ post, index, onClick }: WritingCardProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getReadTime = () => {
    if (post.readTime) return post.readTime;
    if (post.readingTime) return `${post.readingTime} min read`;
    return '5 min read';
  };

  const getDate = () => {
    return post.date || post.publishDate || '';
  };

  const getAuthorName = () => {
    if (typeof post.author === 'string') return post.author;
    return post.author.name;
  };

  // Color variations for cards
  const colors = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-orange-500',
    'from-indigo-400 to-purple-500'
  ];
  
  const cardColor = colors[index % colors.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer"
      data-key={post.id}
      data-vt={post.id}
    >
      <div className={`bg-gradient-to-br ${cardColor} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 p-6 h-full flex flex-col`}>
        
        {/* Header with meta info */}
        <div className="flex items-center justify-between mb-4 text-white text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="font-bold">{formatDate(getDate())}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="font-bold">{getReadTime()}</span>
            </div>
          </div>
          <div className="opacity-75">
            <span className="text-xs font-bold">{getAuthorName()}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="font-display text-xl font-black text-white mb-3 leading-tight group-hover:text-yellow-200 transition-colors duration-300"
          data-vt={`title-${post.id}`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white opacity-90 mb-6 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs bg-black bg-opacity-30 text-white px-2 py-1 border border-white border-opacity-50 font-bold"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs bg-black bg-opacity-30 text-white px-2 py-1 border border-white border-opacity-50 font-bold">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Read More CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-30">
          <span className="text-white font-bold text-sm group-hover:text-yellow-200 transition-colors duration-300">
            Read Full Post
          </span>
          <ArrowRight className="w-5 h-5 text-white group-hover:text-yellow-200 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </motion.article>
  );
}