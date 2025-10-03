import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  impact: string;
  tags: string[];
  color: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 'ai-editorial',
    title: 'AI-Assisted Editorial Workflow',
    impact: 'Reduced content production time by 60% while maintaining quality standards',
    tags: ['AI', 'Content', 'Automation'],
    color: 'bg-gradient-to-br from-purple-400 to-blue-500'
  },
  {
    id: 'headless-cms',
    title: 'Platform Modernization & Headless CMS',
    impact: '400% YoY increase in blog revenue through improved content velocity',
    tags: ['CMS', 'Platform', 'Architecture'],
    color: 'bg-gradient-to-br from-green-400 to-blue-500'
  },
  {
    id: 'shopify-search',
    title: 'E-commerce Search & Faceting System',
    impact: '35% improvement in product discovery conversion rates',
    tags: ['Search', 'Ecommerce', 'UX'],
    color: 'bg-gradient-to-br from-blue-400 to-purple-500'
  },
  {
    id: 'extension-automation',
    title: 'Browser Extension for Workflow Automation',
    impact: '$35k/month savings in manual email processing tasks',
    tags: ['Extensions', 'Automation', 'Productivity'],
    color: 'bg-gradient-to-br from-orange-400 to-red-500'
  },
  {
    id: 'experimentation-platform',
    title: 'A/B Testing & Analytics Infrastructure',
    impact: '125% YoY mobile revenue growth through systematic optimization',
    tags: ['A/B Testing', 'Analytics', 'Growth'],
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
  },
  {
    id: 'design-system',
    title: 'Component Library & Design System',
    impact: '50% reduction in design-to-development handoff time',
    tags: ['Design Systems', 'Frontend', 'DX'],
    color: 'bg-gradient-to-br from-indigo-400 to-purple-500'
  }
];

export function PreviousProjectsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-cmp="PreviousProjectsSummary">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group"
          data-key={project.id}
        >
          <div className={`${project.color} p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col`}>
            {/* Postcard-style header */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                <div className="w-3 h-3 bg-white"></div>
              </div>
              {project.link && (
                <ExternalLink className="w-5 h-5 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-display text-lg font-black text-white mb-3 leading-tight">
                {project.title}
              </h3>

              <div className="mb-4">
                <div className="bg-black bg-opacity-20 border border-white border-opacity-30 p-3 mb-4">
                  <h4 className="font-bold text-sm text-white mb-2">Impact:</h4>
                  <p className="text-sm text-white opacity-95">{project.impact}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-white text-black px-2 py-1 font-bold border border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Postcard-style bottom decoration */}
            <div className="mt-4 pt-3 border-t border-white border-opacity-30">
              <div className="flex justify-between items-center">
                <div className="text-xs text-white opacity-75 font-mono">
                  PROJECT #{String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-xs text-white opacity-75">
                  ★ Featured Work
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}