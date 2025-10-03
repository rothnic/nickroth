import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WritingCard } from './WritingCard';
import { useNavigate } from '../utils/router';
import { kitchenSinkPost } from '../data/kitchenSinkPost';

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

// Mock recent posts - in a real app, this would come from your CMS or API
const mockRecentPost: BlogPost = {
  id: 'objective-first-discovery',
  title: 'Objective-First Discovery: Beyond Feature Requests',
  excerpt: 'How to start from business outcomes, not tools. A framework for understanding what really drives value in product development and avoiding the feature factory trap.',
  date: '2024-03-15',
  readTime: '6 min read',
  tags: ['Product Strategy', 'Discovery', 'Framework'],
  author: 'Nick Roth'
};

// Combine with kitchen sink post
const allPosts: BlogPost[] = [
  {
    ...kitchenSinkPost,
    date: kitchenSinkPost.publishDate,
    readTime: `${kitchenSinkPost.readingTime} min read`,
    author: kitchenSinkPost.author
  },
  mockRecentPost
];

interface RecentPostsProps {
  limit?: number;
}

export function RecentPosts({ limit = 2 }: RecentPostsProps) {
  const { navigate } = useNavigate();
  
  const displayedPosts = allPosts.slice(0, limit);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/writing/${post.id}`);
  };

  const handleViewAllWriting = () => {
    navigate('/writing');
  };

  return (
    <div data-cmp="RecentPosts">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {displayedPosts.map((post, index) => (
          <WritingCard
            key={post.id}
            post={post}
            index={index}
            onClick={() => handlePostClick(post)}
          />
        ))}
      </div>

      {/* CTA to Writing Page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={handleViewAllWriting}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
        >
          <span>View all writing</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}