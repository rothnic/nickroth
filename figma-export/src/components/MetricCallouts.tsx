import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

interface Metric {
  id: string;
  value: string;
  label: string;
  context: string;
  icon: React.ComponentType<any>;
  color: string;
}

const metrics: Metric[] = [
  {
    id: 'revenue-growth',
    value: '400%',
    label: 'YoY Blog Revenue Growth',
    context: 'Through platform modernization and content velocity improvements',
    icon: TrendingUp,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'cost-savings',
    value: '$35k/mo',
    label: 'Email Processing Savings',
    context: 'Automated manual workflows with custom browser extension',
    icon: DollarSign,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'time-reduction',
    value: '60%',
    label: 'Content Production Time',
    context: 'AI-assisted editorial workflows while maintaining quality',
    icon: Clock,
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'user-growth',
    value: '150%',
    label: 'Organic User Growth',
    context: 'Search optimization and content discoverability improvements',
    icon: Users,
    color: 'from-purple-400 to-pink-500'
  }
];

export function MetricCallouts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-cmp="MetricCallouts">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="group"
          data-key={metric.id}
        >
          <div className={`bg-gradient-to-br ${metric.color} p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-center h-full flex flex-col`}>
            {/* Icon */}
            <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
              <metric.icon className="w-6 h-6" />
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="font-display text-3xl font-black text-white mb-1">
                {metric.value}
              </div>
              <div className="font-bold text-sm text-white opacity-90">
                {metric.label}
              </div>
            </div>

            {/* Context */}
            <div className="flex-1 flex items-end">
              <p className="text-xs text-white opacity-85 leading-relaxed">
                {metric.context}
              </p>
            </div>

            {/* Badge */}
            <div className="mt-4 pt-3 border-t border-white border-opacity-30">
              <div className="text-xs text-white opacity-75 font-bold">
                ✓ VERIFIED RESULT
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}