import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { Zap, ArrowRight } from 'lucide-react';

export function DemoPage() {
  const { navigate } = useNavigate();

  const demoItems = [
    {
      title: 'Cards',
      description: 'Showcase of different card components built with our neobrutalist design system',
      path: '/demo/cards',
      color: 'bg-lime-400',
      icon: '🃏'
    },
    {
      title: 'Typography',
      description: 'Complete typography system with headings, body text, and specialized components',
      path: '/demo/typography',
      color: 'bg-yellow-400',
      icon: '📝'
    },
    {
      title: 'Buttons',
      description: 'Interactive button components with bold shadows, icons, and various states',
      path: '/demo/buttons',
      color: 'bg-cyan-400',
      icon: '🔘'
    },
    {
      title: 'UI Elements',
      description: 'Specialized UI components including badges, dividers, text effects, and form elements',
      path: '/demo/ui-elements',
      color: 'bg-purple-400',
      icon: '✨'
    },
    {
      title: 'Blog Components',
      description: 'Rich content components for blogs including callouts, quotes, code blocks, and media',
      path: '/demo/blog-components',
      color: 'bg-pink-400',
      icon: '📚'
    },
    {
      title: 'List Components',
      description: 'Comprehensive list items for navigation, dropdowns, and hierarchical data display',
      path: '/demo/list-components',
      color: 'bg-orange-400',
      icon: '📋'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main id="main" className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white via-lime-50 to-cyan-50 relative texture-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-3 mb-8">
                <Zap className="w-8 h-8 text-black" />
                <h1 className="text-4xl md:text-6xl font-display font-black">
                  <span className="bg-black text-white px-4 py-2 transform -rotate-2 inline-block mr-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    DEMO
                  </span>
                  <span className="bg-gradient-to-r from-lime-400 to-cyan-400 text-black px-4 py-2 transform rotate-1 inline-block border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    SHOWCASE
                  </span>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                Explore our <strong>neobrutalist design system</strong> components in action. 
                Bold borders, dramatic shadows, and chaotic energy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Demo Items Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:gap-12">
              {demoItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => navigate(item.path)}
                >
                  <div className={`${item.color} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform group-hover:-translate-x-2 group-hover:-translate-y-2 p-8 md:p-12`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl md:text-6xl">{item.icon}</div>
                        <div>
                          <h2 className="text-2xl md:text-4xl font-display font-black mb-2">
                            {item.title}
                          </h2>
                          <p className="text-lg md:text-xl font-medium max-w-2xl">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="hidden md:block">
                        <div className="bg-black text-white p-4 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <ArrowRight className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile arrow */}
                    <div className="md:hidden mt-6 text-center">
                      <div className="bg-black text-white px-6 py-3 inline-flex items-center space-x-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-bold">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}