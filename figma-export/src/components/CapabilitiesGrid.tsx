import { motion } from 'motion/react';
import { useNavigate } from '../utils/router';
import { 
  Zap, 
  Search, 
  Layers, 
  Puzzle, 
  BarChart3, 
  Palette,
  ArrowRight
} from 'lucide-react';

interface Capability {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<any>;
  tags: string[];
  color: string;
}

const capabilities: Capability[] = [
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    summary: 'Build intelligent workflows that reduce manual work and scale decision-making.',
    icon: Zap,
    tags: ['AI', 'Agents', 'Automation'],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'search-vectors',
    title: 'Search & Vectors',
    summary: 'Design discovery systems with faceting, semantic search, and conversion optimization.',
    icon: Search,
    tags: ['Search', 'Vectors', 'Ecommerce'],
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'headless-cms',
    title: 'Content Platforms',
    summary: 'Modernize content workflows with headless CMS and publishing automation.',
    icon: Layers,
    tags: ['CMS', 'Content', 'Publishing'],
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'browser-extensions',
    title: 'Extensions & Integrations',
    summary: 'Create custom browser tools and workflow integrations that eliminate friction.',
    icon: Puzzle,
    tags: ['Extensions', 'Integration', 'Productivity'],
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'experimentation',
    title: 'Experimentation & Analytics',
    summary: 'Implement testing frameworks and measurement systems for data-driven decisions.',
    icon: BarChart3,
    tags: ['A/B Testing', 'Analytics', 'Growth'],
    color: 'from-red-400 to-orange-500'
  },
  {
    id: 'design-build',
    title: 'Design→Build Pipeline',
    summary: 'Streamline design-to-code workflows with systems and component libraries.',
    icon: Palette,
    tags: ['Design Systems', 'Frontend', 'DX'],
    color: 'from-indigo-400 to-purple-500'
  }
];

interface CapabilitiesGridProps {
  limit?: number;
  showCTA?: boolean;
}

export function CapabilitiesGrid({ limit, showCTA = true }: CapabilitiesGridProps) {
  const { navigate } = useNavigate();
  
  const displayedCapabilities = limit ? capabilities.slice(0, limit) : capabilities;

  return (
    <div data-cmp="CapabilitiesGrid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedCapabilities.map((capability, index) => (
          <motion.div
            key={capability.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
            data-key={capability.id}
          >
            <div className={`bg-gradient-to-br ${capability.color} p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 h-full`}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mr-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] flex-shrink-0">
                  <capability.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-black text-white leading-tight">
                  {capability.title}
                </h3>
              </div>

              <p className="text-white opacity-90 mb-4 text-sm leading-relaxed">
                {capability.summary}
              </p>

              <div className="flex flex-wrap gap-1">
                {capability.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-white text-black px-2 py-1 font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA to Focus Page */}
      {showCTA && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/focus')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
          >
            <span>Explore my focus</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}