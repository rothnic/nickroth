import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Quote({ children, author, title, size = 'md' }: QuoteProps) {
  const sizeClasses = {
    sm: 'text-lg p-4',
    md: 'text-xl p-6',
    lg: 'text-2xl p-8'
  };

  return (
    <blockquote className={`my-8 bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative ${sizeClasses[size]}`}>
      {/* Quote icon */}
      <QuoteIcon className="absolute -top-3 -left-3 w-8 h-8 bg-black text-white p-1 border-2 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]" />
      
      <div className="relative z-10">
        <div className="font-display italic leading-relaxed text-gray-900">
          {children}
        </div>
        
        {(author || title) && (
          <footer className="mt-4 pt-4 border-t-2 border-gray-200">
            {author && (
              <cite className="font-bold text-gray-800 not-italic">
                {author}
              </cite>
            )}
            {title && (
              <div className="text-gray-600 text-sm mt-1">
                {title}
              </div>
            )}
          </footer>
        )}
      </div>
    </blockquote>
  );
}