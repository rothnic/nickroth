import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { WritingFilters } from './WritingFilters';
import { WritingCard } from './WritingCard';
import { useNavigate } from '../utils/router';

// Import blog post data
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

// Mock additional posts to demonstrate the grid
const mockPosts: BlogPost[] = [
  {
    id: 'objective-first-discovery',
    title: 'Objective-First Discovery: Beyond Feature Requests',
    excerpt: 'How to start from business outcomes, not tools. A framework for understanding what really drives value in product development.',
    date: '2024-03-15',
    readTime: '6 min read',
    tags: ['Product Strategy', 'Discovery', 'Framework'],
    author: 'Nick Roth'
  },
  {
    id: 'ai-agent-evaluation',
    title: 'Building Reliable AI Agents: A Testing Framework',
    excerpt: 'Learn how to create evaluation systems that ensure your AI agents perform consistently in production environments.',
    date: '2024-02-28',
    readTime: '8 min read',
    tags: ['AI', 'Agents', 'Testing', 'Evaluation'],
    author: 'Nick Roth'
  },
  {
    id: 'chrome-extension-automation',
    title: 'Automating Workflows with Custom Chrome Extensions',
    excerpt: 'A practical guide to building Chrome extensions that eliminate repetitive tasks and integrate seamlessly into existing workflows.',
    date: '2024-02-15',
    readTime: '10 min read',
    tags: ['Extensions', 'Automation', 'Productivity'],
    author: 'Nick Roth'
  },
  {
    id: 'headless-cms-strategy',
    title: 'Content Velocity: Choosing the Right Headless CMS',
    excerpt: 'Strategic considerations for selecting and implementing headless CMS solutions that scale with your content needs.',
    date: '2024-01-30',
    readTime: '7 min read',
    tags: ['CMS', 'Content', 'Architecture'],
    author: 'Nick Roth'
  },
  {
    id: 'search-faceting-ecommerce',
    title: 'E-commerce Search: Faceting for Discovery and SEO',
    excerpt: 'How to design faceted search systems that improve product discovery while maintaining SEO-friendly URL structures.',
    date: '2024-01-15',
    readTime: '12 min read',
    tags: ['Search', 'Ecommerce', 'SEO', 'UX'],
    author: 'Nick Roth'
  }
];

// Combine kitchen sink post with mock posts
const allPosts: BlogPost[] = [
  {
    ...kitchenSinkPost,
    date: kitchenSinkPost.publishDate,
    readTime: `${kitchenSinkPost.readingTime} min read`,
    author: kitchenSinkPost.author
  },
  ...mockPosts
];

export function WritingGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { navigate } = useNavigate();

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return allPosts;
    
    return allPosts.filter(post => 
      selectedTags.some(tag => 
        post.tags.some(postTag => 
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }, [selectedTags]);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/writing/${post.id}`);
  };

  return (
    <div data-cmp="WritingGrid">
      <WritingFilters 
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      {/* Results Summary */}
      <div className="mb-8 text-center">
        <p className="text-gray-600">
          {filteredPosts.length === allPosts.length 
            ? `Showing all ${allPosts.length} posts`
            : `Showing ${filteredPosts.length} of ${allPosts.length} posts`
          }
          {selectedTags.length > 0 && (
            <span className="ml-2 text-purple-600 font-semibold">
              filtered by: {selectedTags.join(', ')}
            </span>
          )}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <WritingCard
            key={post.id}
            post={post}
            index={index}
            onClick={() => handlePostClick(post)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md mx-auto">
            <h3 className="font-display text-xl font-black mb-4">No posts found</h3>
            <p className="text-gray-600 mb-6">
              No posts match your current filter selection. Try removing some filters or explore different topics.
            </p>
            <button
              onClick={() => setSelectedTags([])}
              className="bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 font-bold"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}