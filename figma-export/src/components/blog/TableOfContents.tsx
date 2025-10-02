import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronRight } from 'lucide-react';
import { StickerBadge } from '../StickerBadge';
import { ListContainer } from '../lists/ListContainer';
import { ListItemComponent } from '../lists/ListItemComponent';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  currentSection?: string;
}

export function TableOfContents({ items, currentSection }: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState(currentSection || '');

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-24 z-40 mb-8">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 p-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5" />
            <h3 className="font-display font-bold">Table of Contents</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* TOC Badge */}
        <div className="absolute -top-2 -right-2">
          <StickerBadge color="bg-purple-400" size="xs" rotation={20}>
            {items.length}
          </StickerBadge>
        </div>

        {/* TOC Items */}
        {!isCollapsed && (
          <ListContainer variant="compact">
            {items.map((item) => (
              <ListItemComponent
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                hover={true}
                className={`text-left transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-yellow-100 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'border-transparent hover:border-black'
                }`}
                style={{ 
                  paddingLeft: `${(item.level - 1) * 16 + 8}px`,
                  fontSize: item.level === 1 ? '0.9rem' : '0.8rem'
                }}
              >
                <span className={`${item.level === 1 ? 'font-bold' : 'font-medium'}`}>
                  {item.title}
                </span>
              </ListItemComponent>
            ))}
          </ListContainer>
        )}
      </div>
    </nav>
  );
}