import { motion } from 'motion/react';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number; // 1-5
  lastUsed: string;
  category: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'product-strategy',
    name: 'Product Strategy',
    color: 'bg-blue-400',
    skills: [
      { name: 'Product Discovery', level: 5, lastUsed: '2024', category: 'product-strategy' },
      { name: 'Roadmap Planning', level: 5, lastUsed: '2024', category: 'product-strategy' },
      { name: 'User Research', level: 4, lastUsed: '2024', category: 'product-strategy' },
      { name: 'A/B Testing', level: 5, lastUsed: '2024', category: 'product-strategy' },
      { name: 'Analytics & Metrics', level: 5, lastUsed: '2024', category: 'product-strategy' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    color: 'bg-purple-400',
    skills: [
      { name: 'LangChain', level: 4, lastUsed: '2024', category: 'ai-automation' },
      { name: 'OpenAI/Anthropic APIs', level: 5, lastUsed: '2024', category: 'ai-automation' },
      { name: 'Agent Workflows', level: 4, lastUsed: '2024', category: 'ai-automation' },
      { name: 'Vector Databases', level: 3, lastUsed: '2024', category: 'ai-automation' },
      { name: 'Prompt Engineering', level: 5, lastUsed: '2024', category: 'ai-automation' }
    ]
  },
  {
    id: 'development',
    name: 'Development',
    color: 'bg-green-400',
    skills: [
      { name: 'TypeScript/JavaScript', level: 5, lastUsed: '2024', category: 'development' },
      { name: 'React/Next.js', level: 5, lastUsed: '2024', category: 'development' },
      { name: 'Python', level: 4, lastUsed: '2024', category: 'development' },
      { name: 'Node.js', level: 4, lastUsed: '2024', category: 'development' },
      { name: 'SQL/PostgreSQL', level: 4, lastUsed: '2024', category: 'development' }
    ]
  },
  {
    id: 'platforms',
    name: 'Platforms & Tools',
    color: 'bg-orange-400',
    skills: [
      { name: 'Shopify Apps', level: 4, lastUsed: '2024', category: 'platforms' },
      { name: 'DatoCMS', level: 5, lastUsed: '2024', category: 'platforms' },
      { name: 'Typesense', level: 4, lastUsed: '2024', category: 'platforms' },
      { name: 'Chrome Extensions', level: 5, lastUsed: '2024', category: 'platforms' },
      { name: 'Figma API', level: 3, lastUsed: '2024', category: 'platforms' }
    ]
  },
  {
    id: 'systems',
    name: 'Systems & Architecture',
    color: 'bg-red-400',
    skills: [
      { name: 'API Design', level: 4, lastUsed: '2024', category: 'systems' },
      { name: 'System Architecture', level: 4, lastUsed: '2024', category: 'systems' },
      { name: 'Webhook Systems', level: 4, lastUsed: '2024', category: 'systems' },
      { name: 'Docker/Containers', level: 3, lastUsed: '2023', category: 'systems' },
      { name: 'Cloud Platforms', level: 3, lastUsed: '2024', category: 'systems' }
    ]
  }
];

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getLevelText = (level: number) => {
    const levels = ['Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Expert'];
    return levels[level - 1];
  };

  const getLevelColor = (level: number) => {
    const colors = ['bg-gray-300', 'bg-yellow-300', 'bg-blue-300', 'bg-purple-300', 'bg-green-300'];
    return colors[level - 1];
  };

  const getRecencyColor = (lastUsed: string) => {
    if (lastUsed === '2024') return 'text-green-600';
    if (lastUsed === '2023') return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-8" data-cmp="SkillsMatrix">
      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skillCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${category.color} p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 text-center ${
              activeCategory === category.id ? 'bg-black text-white' : 'text-black'
            }`}
            data-key={category.id}
          >
            <div className="font-bold text-sm">{category.name}</div>
            <div className="text-xs mt-1">{category.skills.length} skills</div>
          </motion.button>
        ))}
      </div>

      {/* Skills Detail */}
      {activeCategory ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6"
        >
          {(() => {
            const category = skillCategories.find(c => c.id === activeCategory);
            if (!category) return null;

            return (
              <div>
                <h3 className="font-display text-xl font-black mb-6">{category.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 border-2 border-black p-4"
                      data-key={skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm">{skill.name}</h4>
                        <span className={`text-xs font-bold ${getRecencyColor(skill.lastUsed)}`}>
                          {skill.lastUsed}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-center space-x-1 mb-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 border border-black ${
                                level <= skill.level ? getLevelColor(skill.level) : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-600">
                          {getLevelText(skill.level)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Click on a category above to see detailed skills breakdown</p>
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-100 border-2 border-black p-4">
        <h4 className="font-bold mb-3">Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold mb-2">Skill Levels:</div>
            <div className="space-y-1">
              {['Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Expert'].map((level, idx) => (
                <div key={level} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 border border-black ${getLevelColor(idx + 1)}`}></div>
                  <span>{level}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Last Used:</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">2024</span>
                <span>Current/Recent</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 font-bold">2023</span>
                <span>Last Year</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-bold">Older</span>
                <span>2+ Years Ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}