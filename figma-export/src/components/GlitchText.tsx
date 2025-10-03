interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  triggerOnHover?: boolean;
}

export function GlitchText({ 
  children, 
  className = "",
  triggerOnHover = true 
}: GlitchTextProps) {
  // Extract text content from children, handling React elements
  const extractText = (element: React.ReactNode): string => {
    if (typeof element === 'string') return element;
    if (typeof element === 'number') return element.toString();
    if (Array.isArray(element)) return element.map(extractText).join('');
    if (element && typeof element === 'object' && 'props' in element) {
      return extractText((element as any).props.children);
    }
    return '';
  };

  const text = extractText(children);

  return (
    <span 
      className={`glitch-effect ${className}`}
      data-text={text}
      style={{
        '--glitch-text': `"${text}"`
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}