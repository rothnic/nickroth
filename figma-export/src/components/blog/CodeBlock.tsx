import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { StickerBadge } from '../StickerBadge';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
}

// Simple syntax highlighting for TypeScript/JavaScript
function highlightSyntax(code: string, language: string): JSX.Element[] {
  if (language !== 'typescript' && language !== 'javascript') {
    return [<span key="plain">{code}</span>];
  }

  const keywords = /\b(class|interface|function|async|await|const|let|var|return|if|else|for|while|try|catch|throw|new|this|super|export|import|from|default|public|private|protected|static|readonly|type|extends|implements)\b/g;
  const strings = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const numbers = /\b\d+\.?\d*\b/g;
  const operators = /[+\-*/%=<>!&|?:]/g;

  const parts: { text: string; type: string; start: number; end: number }[] = [];
  
  // Find all matches
  const findMatches = (regex: RegExp, type: string) => {
    let match;
    while ((match = regex.exec(code)) !== null) {
      parts.push({
        text: match[0],
        type,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  };

  findMatches(keywords, 'keyword');
  findMatches(strings, 'string');
  findMatches(comments, 'comment');
  findMatches(numbers, 'number');

  // Sort by position
  parts.sort((a, b) => a.start - b.start);

  // Build highlighted JSX
  const result: JSX.Element[] = [];
  let lastEnd = 0;

  parts.forEach((part, index) => {
    // Add text before this part
    if (part.start > lastEnd) {
      result.push(
        <span key={`text-${index}`}>
          {code.slice(lastEnd, part.start)}
        </span>
      );
    }

    // Add highlighted part
    const className = {
      keyword: 'text-purple-400 font-semibold',
      string: 'text-green-400',
      comment: 'text-gray-500 italic',
      number: 'text-blue-400',
      operator: 'text-pink-400'
    }[part.type] || '';

    result.push(
      <span key={`${part.type}-${index}`} className={className}>
        {part.text}
      </span>
    );

    lastEnd = part.end;
  });

  // Add remaining text
  if (lastEnd < code.length) {
    result.push(
      <span key="remaining">
        {code.slice(lastEnd)}
      </span>
    );
  }

  return result;
}

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  title, 
  showLineNumbers = true, 
  highlightLines = [],
  filename 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="my-6 relative group max-w-full">
      {/* Header */}
      {(title || filename || language !== 'typescript') && (
        <div className="bg-gray-900 text-white px-3 sm:px-4 py-2 border-4 border-black border-b-0 flex items-center justify-between flex-wrap gap-2 break-words">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {filename && (
              <span className="font-mono text-xs sm:text-sm text-gray-300 truncate">
                {filename}
              </span>
            )}
            {title && (
              <span className="font-display font-bold text-sm sm:text-base truncate">
                {title}
              </span>
            )}
          </div>
          <StickerBadge color="bg-blue-400" size="xs" className="font-mono flex-shrink-0">
            {language}
          </StickerBadge>
        </div>
      )}

      {/* Code container */}
      <div className="relative bg-gray-900 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 bg-gray-800 hover:bg-gray-700 text-white p-1.5 sm:p-2 border-2 border-gray-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:-translate-x-0.5 hover:-translate-y-0.5 opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
          ) : (
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* Code content */}
        <div className="overflow-x-auto code-scroll">
          <pre className="p-3 sm:p-4 text-xs sm:text-sm min-w-max break-words">
            <code className="font-mono text-gray-100 break-words">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    highlightLines.includes(index + 1) 
                      ? 'bg-yellow-400/20 border-l-4 border-yellow-400 pl-2 -ml-2' 
                      : ''
                  } whitespace-pre break-all`}
                >
                  {showLineNumbers && (
                    <span className="text-gray-500 mr-3 sm:mr-4 select-none inline-block w-6 sm:w-8 text-right flex-shrink-0 break-words">
                      {index + 1}
                    </span>
                  )}
                  <span className="break-all">
                    {highlightSyntax(line, language)}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded font-mono text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {children}
    </code>
  );
}