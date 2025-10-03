import { motion } from 'motion/react';
import { 
  Search, 
  Zap, 
  Layers, 
  Puzzle, 
  BarChart3, 
  Palette 
} from 'lucide-react';

interface FocusArea {
  id: string;
  title: string;
  outcome: string;
  context: string;
  methods: string[];
  tools: string[];
  deliverables: string[];
  signals: string[];
  tags: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const focusAreas: FocusArea[] = [
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    outcome: 'Reduced manual work, improved decision speed, scalable intelligence.',
    context: 'For teams drowning in repetitive tasks or needing AI-powered features.',
    methods: ['Agent workflows', 'LLM integration', 'Process automation', 'Evaluation frameworks'],
    tools: ['OpenAI/Anthropic APIs', 'LangChain', 'Custom agents', 'Python automation'],
    deliverables: ['Working automations', 'Agent specifications', 'Evaluation dashboards'],
    signals: ['Time saved per task', 'Error reduction', 'User adoption'],
    tags: ['AI', 'Automation', 'Agents'],
    icon: Zap,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'search-vectors',
    title: 'Search, Vectors & E-commerce Faceting',
    outcome: 'Relevant results, discovery, and ecommerce conversion.',
    context: 'For catalogs needing fast facet filters, SEO-friendly URLs, and semantic matching.',
    methods: ['Facet taxonomy design', 'Ranking and evaluation loops', 'Hybrid lexical + vector retrieval'],
    tools: ['Typesense', 'pgvector', 'Shopify Apps'],
    deliverables: ['Facet definitions', 'Index configs', 'Eval dashboards', 'Shopify integrations'],
    signals: ['Facet click-through', 'Search→detail conversion', 'Results latency'],
    tags: ['Search', 'Ecommerce', 'Vectors'],
    icon: Search,
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'headless-cms',
    title: 'Headless CMS & Content Platforms',
    outcome: 'Fast content velocity, editorial efficiency, multichannel publishing.',
    context: 'For teams needing to scale content across multiple touchpoints.',
    methods: ['Content modeling', 'Editorial workflows', 'Preview systems', 'Publishing automation'],
    tools: ['DatoCMS', 'Custom plugins', 'Next.js', 'Webhook systems'],
    deliverables: ['Content models', 'Editorial interfaces', 'Publishing pipelines'],
    signals: ['Content velocity', 'Editorial efficiency', 'Time to publish'],
    tags: ['CMS', 'Content', 'Publishing'],
    icon: Layers,
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'browser-extensions',
    title: 'Browser Extensions & Integrations',
    outcome: 'Seamless workflow integration, enhanced productivity, custom tooling.',
    context: 'For teams needing custom browser tools or third-party integrations.',
    methods: ['Extension architecture', 'Content script injection', 'Background processes', 'API integrations'],
    tools: ['Chrome Extensions API', 'Manifest V3', 'Custom protocols'],
    deliverables: ['Working extensions', 'Integration specs', 'Distribution packages'],
    signals: ['Daily active users', 'Task completion rate', 'User feedback'],
    tags: ['Extensions', 'Integration', 'Productivity'],
    icon: Puzzle,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'experimentation',
    title: 'Experimentation & Analytics',
    outcome: 'Data-driven decisions, validated hypotheses, measurable improvements.',
    context: 'For product teams needing rigorous testing and measurement frameworks.',
    methods: ['A/B test design', 'Statistical analysis', 'Event tracking', 'Conversion optimization'],
    tools: ['PostHog', 'Optimizely', 'Custom analytics', 'Statistical tools'],
    deliverables: ['Test designs', 'Tracking implementations', 'Results dashboards'],
    signals: ['Conversion lift', 'Statistical significance', 'Test velocity'],
    tags: ['A/B Testing', 'Analytics', 'Optimization'],
    icon: BarChart3,
    color: 'from-red-400 to-orange-500'
  },
  {
    id: 'design-build',
    title: 'Design→Build Pipeline',
    outcome: 'Faster design-to-code, consistent implementation, reduced handoff friction.',
    context: 'For design and engineering teams needing streamlined collaboration.',
    methods: ['Design systems', 'Component libraries', 'Figma-to-code workflows', 'Token systems'],
    tools: ['Figma', 'React/TypeScript', 'Storybook', 'Design tokens'],
    deliverables: ['Component libraries', 'Design systems', 'Implementation guides'],
    signals: ['Design-to-code time', 'Consistency scores', 'Developer satisfaction'],
    tags: ['Design Systems', 'Frontend', 'Collaboration'],
    icon: Palette,
    color: 'from-indigo-400 to-purple-500'
  }
];

export function FocusAreasGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-cmp="FocusAreasGrid">
      {focusAreas.map((area, index) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group"
          data-key={area.id}
        >
          <div className={`bg-gradient-to-br ${area.color} p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 h-full`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mr-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                <area.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-black text-white">{area.title}</h3>
            </div>

            <div className="space-y-4 text-white">
              <div>
                <h4 className="font-bold text-sm mb-2">Outcome:</h4>
                <p className="text-sm opacity-90">{area.outcome}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">Context:</h4>
                <p className="text-sm opacity-90">{area.context}</p>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">Key Methods:</h4>
                <div className="flex flex-wrap gap-1">
                  {area.methods.slice(0, 3).map((method, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-black bg-opacity-30 px-2 py-1 border border-white border-opacity-50"
                    >
                      {method}
                    </span>
                  ))}
                  {area.methods.length > 3 && (
                    <span className="text-xs bg-black bg-opacity-30 px-2 py-1 border border-white border-opacity-50">
                      +{area.methods.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">Success Signals:</h4>
                <ul className="space-y-1">
                  {area.signals.slice(0, 2).map((signal, idx) => (
                    <li key={idx} className="flex items-center text-xs">
                      <div className="w-1.5 h-1.5 bg-white mr-2 opacity-80"></div>
                      <span className="opacity-90">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white border-opacity-30">
                <div className="flex flex-wrap gap-1">
                  {area.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-white text-black px-2 py-1 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}