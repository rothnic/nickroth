import { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, X } from 'lucide-react';

const availableTags = [
  'AI', 'Automation', 'CMS', 'Search', 'Extensions', 
  'Analytics', 'Experiments', 'Design Systems', 'Python', 
  'Product Strategy', 'Technical Architecture'
];

interface WritingFiltersProps {
  selectedTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export function WritingFilters({ selectedTags = [], onTagsChange }: WritingFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    onTagsChange?.(newTags);
  };

  const clearAllTags = () => {
    onTagsChange?.([]);
  };

  return (
    <div className="mb-8" data-cmp="WritingFilters">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Filter Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold ${
            isOpen 
              ? 'bg-black text-white' 
              : 'bg-white text-black hover:-translate-x-1 hover:-translate-y-1'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filter by Topics</span>
          {selectedTags.length > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Clear All Button */}
        {selectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 font-bold"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filter Tags */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
        >
          <h3 className="font-bold mb-4">Filter by Topics:</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold text-sm ${
                    isSelected
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-black hover:bg-gray-100 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                  data-key={tag.toLowerCase().replace(/\s+/g, '-')}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-bold text-gray-600">Active filters:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center space-x-1 bg-purple-500 text-white px-3 py-1 border-2 border-black text-sm font-bold"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="hover:text-red-200"
                  aria-label={`Remove ${tag} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}