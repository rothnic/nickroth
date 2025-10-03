import { useState } from 'react';
import { Menu, X, Target, User, FileText, Home, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useNavigate } from '../utils/router';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { currentPath } = useRouter();
  const { toHome, navigate } = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/focus', label: 'Focus', icon: Target },
    { path: '/background', label: 'Background', icon: User },
    { path: '/writing', label: 'Writing', icon: FileText },
  ];

  const demoItems = [
    { path: '/demo/cards', label: 'Cards', description: 'Card component showcase' },
    { path: '/demo/typography', label: 'Typography', description: 'Text and heading components' },
    { path: '/demo/buttons', label: 'Buttons', description: 'Interactive button components' },
    { path: '/demo/ui-elements', label: 'UI Elements', description: 'Badges, dividers, and form elements' },
    { path: '/demo/list-components', label: 'List Components', description: 'Navigation lists and dropdowns' },
    { path: '/demo/blog-components', label: 'Blog Components', description: 'Callouts, quotes, and rich content' },
  ];

  const handleNavClick = (path: string) => {
    if (path === '/') {
      toHome();
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  // Normalize current path for comparison (handle blog posts and contact)
  const getActivePath = () => {
    if (currentPath === '/blog/:postId' || currentPath.startsWith('/writing/')) return '/writing';
    if (currentPath === '/contact') return ''; // No active state for contact
    if (currentPath.startsWith('/demo')) return '/demo';
    return currentPath;
  };

  const activePath = getActivePath();

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] z-50 cursor-pointer"
      >
        Skip to main content
      </a>
      
      <nav 
        className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] z-50"
        role="navigation"
        aria-label="Main navigation"
        data-cmp="Navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('/')}
                aria-label="Go to homepage"
                className="cursor-pointer"
              >
                <Logo />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center space-x-2 px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold cursor-pointer ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:-translate-x-1 hover:-translate-y-1'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Demo Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDemoOpen(true)}
                onMouseLeave={() => setIsDemoOpen(false)}
              >
                <button
                  className={`flex items-center space-x-2 px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold cursor-pointer ${
                    activePath === '/demo'
                      ? 'bg-lime-400 text-black'
                      : 'bg-white text-black hover:-translate-x-1 hover:-translate-y-1'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Demo</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDemoOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDemoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50"
                    >
                      <div className="p-2">
                        {demoItems.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setIsDemoOpen(false);
                            }}
                            className="w-full text-left p-3 hover:bg-cyan-100 border-2 border-transparent hover:border-black transition-all duration-200 group cursor-pointer"
                          >
                            <div className="font-bold group-hover:text-black">{item.label}</div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-800">{item.description}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t-2 border-black bg-white overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center space-x-2 px-4 py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer ${
                          isActive
                            ? 'bg-black text-white'
                            : 'bg-white text-black'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  
                  {/* Demo section in mobile */}
                  <div className="pt-2 border-t-2 border-gray-200">
                    <div className="space-y-2">
                      {demoItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-4 py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer ${
                            currentPath === item.path
                              ? 'bg-lime-400 text-black'
                              : 'bg-white text-black'
                          }`}
                        >
                          <Zap className="w-4 h-4" />
                          <span>Demo • {item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}