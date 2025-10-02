import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus, TrendingUp } from 'lucide-react';

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
    color: string;
    trending: boolean;
    imageUrl: string;
    author: {
      name: string;
      avatar: string;
    };
  };
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  useEffect(() => {
    // Delay scroll to top until after animation completes
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Expanding Card Container */}
      <motion.div
        layoutId={`post-container-${post.id}`}
        className="min-h-screen bg-white"
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Navigation - appears after animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black z-50 px-4 py-4"
        >
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>
          </div>
        </motion.div>

        <div className="pt-20">
          {/* Hero Image - expands from card image */}
          <motion.div
            layoutId={`post-image-${post.id}`}
            className="relative mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Category badge - morphs from card */}
            <motion.div 
              layoutId={`post-category-${post.id}`}
              className="absolute top-4 left-4"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <span className={`${post.color} border-2 border-black px-3 py-1 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                {post.category}
              </span>
            </motion.div>
            
            {/* Trending badge */}
            {post.trending && (
              <motion.div 
                layoutId={`post-trending-${post.id}`}
                className="absolute top-4 right-4"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-1 bg-yellow-300 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold">TRENDING</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Title - morphs from card title */}
            <motion.h1
              layoutId={`post-title-${post.id}`}
              className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {post.title}
            </motion.h1>

            {/* Meta information - appears after animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center space-x-6 text-black">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold">{new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-3 bg-cyan-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                  <Share2 className="w-5 h-5 text-black" />
                </button>
                <button className="p-3 bg-lime-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                  <BookmarkPlus className="w-5 h-5 text-black" />
                </button>
              </div>
            </motion.div>

            {/* Article Content - appears after title animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <div className="bg-gray-50 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-1 rotate-smooth">
                <p className="text-xl leading-relaxed text-black font-bold">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>

            {/* Full Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="space-y-8 text-black leading-relaxed"
            >
              {post.content.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="mt-16 bg-yellow-300 border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 rotate-smooth"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <span className="text-2xl font-black text-white">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black">{post.author.name}</h3>
                  <p className="text-black font-bold">Product Manager • AI Engineer</p>
                  <p className="text-black">Building the future, one product at a time.</p>
                </div>
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center space-x-4 bg-black text-white px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 font-black rotate-smooth">
                <span>Enjoyed this post? Let's connect and discuss more!</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}