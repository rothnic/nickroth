import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';

export function Impact() {
  const metrics = [
    {
      icon: TrendingUp,
      value: "400%",
      label: "YoY Blog Revenue Increase",
      description: "Transformed content strategy & SEO optimization",
      color: "bg-cyan-400",
      delay: 0.1
    },
    {
      icon: DollarSign,
      value: "$35K/mo",
      label: "Platform Cost Savings",
      description: "Email migration & infrastructure optimization",
      color: "bg-yellow-300",
      delay: 0.2
    },
    {
      icon: Users,
      value: "150%",
      label: "Organic Growth",
      description: "User acquisition through product improvements",
      color: "bg-lime-400",
      delay: 0.3
    },
    {
      icon: Zap,
      value: "12x",
      label: "Faster Processing",
      description: "AI categorization system implementation",
      color: "bg-fuchsia-400",
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-white border-t-4 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-2">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-black text-white border-4 border-black px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 mb-6 rotate-smooth">
            <h2 className="text-3xl md:text-4xl font-black">VERIFIED IMPACT</h2>
          </div>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Real results from real projects. These aren't vanity metrics — they're 
            bottom-line business impact measured and verified.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{ duration: 0.6, delay: metric.delay }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: index % 2 === 0 ? -3 : 3,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className={`${metric.color} border-4 border-black p-4 lg:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 min-h-[220px] lg:min-h-[300px]`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-black border-2 border-black p-2 lg:p-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)]">
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-center mb-4">
                  <div className="text-3xl lg:text-4xl font-black text-black leading-none">
                    {metric.value}
                  </div>
                </div>

                {/* Label */}
                <div className="text-center mb-3">
                  <div className="font-black text-black text-xs lg:text-sm uppercase tracking-tight lg:tracking-wide leading-tight">
                    {metric.label}
                  </div>
                </div>

                {/* Description */}
                <div className="text-center">
                  <p className="text-black text-xs lg:text-sm leading-tight">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 inline-block rotate-smooth">
            <p className="text-lg font-black text-black">
              Ready to see similar results? Let's build something that moves your business forward.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}