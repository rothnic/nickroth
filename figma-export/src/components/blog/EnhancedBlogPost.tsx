import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { BlogMeta } from './BlogMeta';
import { TableOfContents } from './TableOfContents';
import { CodeBlock, InlineCode } from './CodeBlock';
import { Callout } from './Callout';
import { Quote } from './Quote';
import { ImageWithCaption } from './ImageWithCaption';
import { StickerBadge } from '../StickerBadge';

interface BlogPostProps {
  post: any;
  onBack: () => void;
}

// Process inline formatting (bold, italic, inline code)
function processInlineFormatting(text: string): (string | JSX.Element)[] {
  const result: (string | JSX.Element)[] = [];
  let currentText = text;
  let keyCounter = 0;

  // Handle inline code first
  const codeRegex = /`([^`]+)`/g;
  const codeParts = currentText.split(codeRegex);
  
  codeParts.forEach((part, index) => {
    if (index % 2 === 1) {
      // This is inline code
      result.push(<InlineCode key={`code-${keyCounter++}`}>{part}</InlineCode>);
    } else {
      // Process bold and italic in regular text
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const boldParts = part.split(boldRegex);
      
      boldParts.forEach((boldPart, boldIndex) => {
        if (boldIndex % 2 === 1) {
          result.push(<strong key={`bold-${keyCounter++}`} className="font-black">{boldPart}</strong>);
        } else {
          // Could add italic processing here if needed
          if (boldPart) result.push(boldPart);
        }
      });
    }
  });

  return result;
}

// Custom markdown-like parser for our enhanced content
function parseContent(content: string) {
  const sections = content.split('\n---\n');
  
  return sections.map((section, index) => {
    const lines = section.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeContent = '';
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <motion.ul
            key={`list-${index}-${elements.length}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 space-y-2 ml-6"
          >
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="list-disc pl-2 text-gray-800">
                {processInlineFormatting(item)}
              </li>
            ))}
          </motion.ul>
        );
        listItems = [];
      }
      inList = false;
    };

    lines.forEach((line, lineIndex) => {
      // Code blocks
      if (line.startsWith('```')) {
        flushList(); // Close any open list
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || 'typescript';
          codeContent = '';
        } else {
          inCodeBlock = false;
          elements.push(
            <CodeBlock
              key={`code-${index}-${lineIndex}`}
              code={codeContent.trim()}
              language={codeLanguage}
              showLineNumbers={true}
            />
          );
          codeContent = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Headers with IDs
      if (line.match(/^#{1,6}\s/)) {
        flushList(); // Close any open list
        const level = line.match(/^#+/)?.[0].length || 1;
        const match = line.match(/^#+\s+(.+?)(?:\s+\{#([^}]+)\})?$/);
        const text = match?.[1] || '';
        const id = match?.[2] || '';
        
        elements.push(
          <motion.div
            key={`header-${index}-${lineIndex}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id={id}
            className={`scroll-mt-24 ${level === 1 ? 'mb-8 mt-12' : 'mb-6 mt-8'}`}
          >
            {level === 1 && (
              <h1 className="text-4xl md:text-5xl font-display font-black mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                {text}
              </h1>
            )}
            {level === 2 && (
              <h2 className="text-2xl md:text-3xl font-display font-black mb-3 relative">
                <span className="bg-black text-white px-3 py-1 transform -rotate-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {text}
                </span>
              </h2>
            )}
            {level === 3 && (
              <h3 className="text-xl md:text-2xl font-display font-bold mb-3">
                {text}
              </h3>
            )}
            {level > 3 && (
              <h4 className="text-lg md:text-xl font-display font-bold mb-2">
                {text}
              </h4>
            )}
          </motion.div>
        );
        return;
      }

      // List items
      if (line.match(/^-\s+/)) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(line.slice(2).trim());
        return;
      }

      // If we were in a list and this line doesn't continue it, flush the list
      if (inList && !line.match(/^-\s+/) && line.trim()) {
        flushList();
      }

      // Empty lines
      if (!line.trim()) {
        if (inList) {
          flushList();
        }
        return;
      }

      // Regular paragraphs
      if (line.trim() && !line.startsWith('#') && !line.startsWith('```') && !line.startsWith('-')) {
        flushList(); // Close any open list
        elements.push(
          <motion.p
            key={`para-${index}-${lineIndex}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: lineIndex * 0.05 }}
            viewport={{ once: true }}
            className="mb-4 leading-relaxed text-gray-800"
          >
            {processInlineFormatting(line)}
          </motion.p>
        );
      }
    });

    // Flush any remaining list
    flushList();

    return (
      <div key={`section-${index}`} className="mb-8">
        {elements}
      </div>
    );
  });
}

export function EnhancedBlogPost({ post, onBack }: BlogPostProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 50);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const renderedContent = parseContent(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 texture-grain">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 bg-blue-400 text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                  isBookmarked ? 'bg-yellow-400' : 'bg-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-3 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-x-0.5 hover:-translate-y-0.5 font-mono text-sm ${
                  isLiked ? 'bg-red-400' : 'bg-white'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {likes}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <TableOfContents items={post.tableOfContents} />
              
              {/* Sample callouts */}
              <div className="mt-8 space-y-6">
                <Callout type="tip" title="Pro Tip">
                  Use the table of contents to jump between sections quickly!
                </Callout>
                
                <Callout type="info">
                  This is a comprehensive technical guide with real code examples you can use in production.
                </Callout>
              </div>
            </div>

            {/* Article Content */}
            <article className="lg:col-span-3 order-1 lg:order-2">
              {/* Hero Image */}
              <ImageWithCaption
                src={post.image}
                alt={post.title}
                caption="AI-powered product development workflow visualization"
                className="mb-8"
              />

              {/* Article Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-5xl font-display font-black mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {post.subtitle && (
                  <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
                    {post.subtitle}
                  </p>
                )}

                <BlogMeta
                  publishDate={post.publishDate}
                  readingTime={post.readingTime}
                  author={post.author}
                  tags={post.tags}
                  lastUpdated={post.lastUpdated}
                />
              </motion.header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {renderedContent}
              </div>

              {/* Sample enhanced elements */}
              <div className="mt-12 space-y-8">
                {/* Quote example */}
                <Quote 
                  author="Nick Roth" 
                  title="Product Manager & AI Engineer"
                  size="lg"
                >
                  The teams that succeed will be those that focus not just on the technology, 
                  but on creating genuine value for users while building sustainable, scalable systems.
                </Quote>

                {/* Warning callout */}
                <Callout type="warning" title="Cost Consideration">
                  AI API costs can escalate quickly. Always implement proper monitoring and caching strategies before going to production.
                </Callout>

                {/* Success callout */}
                <Callout type="success" title="Performance Win">
                  By implementing the caching strategy outlined above, we reduced our AI API costs by 65% while maintaining response quality.
                </Callout>
              </div>

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t-4 border-black">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <h3 className="font-display font-black text-xl mb-4">
                    Found this helpful?
                  </h3>
                  <p className="mb-4">
                    I write about AI, product management, and engineering. Subscribe for more insights like this.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <StickerBadge color="bg-purple-400" size="sm">
                      Follow for more
                    </StickerBadge>
                    <StickerBadge color="bg-blue-400" size="sm">
                      Share with your team
                    </StickerBadge>
                    <StickerBadge color="bg-green-400" size="sm">
                      Try the code examples
                    </StickerBadge>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}