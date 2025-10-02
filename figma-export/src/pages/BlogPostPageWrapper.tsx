import { useMemo } from 'react';
import { EnhancedBlogPost } from '../components/blog/EnhancedBlogPost';
import { useRouter, useNavigate } from '../utils/router';
import { kitchenSinkPost } from '../data/kitchenSinkPost';

// This would typically come from a data source or API
const getAllPosts = () => {
  return [kitchenSinkPost];
};

export function BlogPostPageWrapper() {
  const { params } = useRouter();
  const { toHome, navigate } = useNavigate();
  const posts = getAllPosts();

  const selectedPost = useMemo(() => {
    return posts.find(post => post.id === params.postId);
  }, [posts, params.postId]);

  const handleBackToBlog = () => {
    navigate('/writing');
  };

  if (!selectedPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-black mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/writing')}
              className="bg-purple-600 text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 font-bold"
            >
              View All Writing
            </button>
            <button  
              onClick={toHome}
              className="bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 font-bold"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EnhancedBlogPost 
      post={selectedPost} 
      onBack={handleBackToBlog}
    />
  );
}