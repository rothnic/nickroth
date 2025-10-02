import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { ArrowLeft, Sparkles, Zap, Heart, Star, Code, Palette, Target, Mail, User, Building, MessageSquare } from 'lucide-react';

// Reusable Components
import { SplitHeading } from '../components/demo/SplitHeading';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';
import { NeoButton } from '../components/demo/NeoButton';
import { IconButton } from '../components/demo/IconButton';

// UI Elements
import { StickerBadge } from '../components/StickerBadge';
import { OrganicDivider } from '../components/OrganicDivider';
import { GlitchText } from '../components/GlitchText';
import { CTAStrip } from '../components/CTAStrip';

export function UIElementsPage() {
  const { navigate } = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main id="main" className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-white via-purple-50 to-pink-50 relative texture-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back button */}
              <IconButton
                variant="black"
                size="md"
                onClick={() => navigate('/demo')}
                className="mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Demo
              </IconButton>

              <div className="text-center">
                <SplitHeading
                  words={[
                    { text: "UI", variant: "black" },
                    { text: "ELEMENTS", variant: "gradient" }
                  ]}
                  size="4xl"
                  className="mb-6"
                />
                
                <Text size="xl" className="max-w-3xl mx-auto mb-8">
                  Specialized UI components including badges, dividers, text effects, and interactive elements 
                  that add personality to your neobrutalist designs.
                </Text>

                <div className="flex flex-wrap gap-4 justify-center">
                  <StickerBadge color="bg-yellow-300" rotation={-8}>
                    <Sparkles className="w-4 h-4 mr-1" />
                    Interactive
                  </StickerBadge>
                  <StickerBadge color="bg-pink-300" rotation={5}>
                    <Palette className="w-4 h-4 mr-1" />
                    Colorful
                  </StickerBadge>
                  <StickerBadge color="bg-cyan-300" rotation={-3}>
                    <Zap className="w-4 h-4 mr-1" />
                    Dynamic
                  </StickerBadge>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticker Badges Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 mb-8">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Sticker Badges
                </DisplayHeading>
                <Text className="mb-8">
                  Playful, rotated badges with hover animations. Perfect for tags, labels, and highlighting key information.
                </Text>
                
                <div className="space-y-8">
                  {/* Size Variants */}
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Size Variants
                    </Text>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <StickerBadge size="xs" color="bg-red-300">Extra Small</StickerBadge>
                      <StickerBadge size="sm" color="bg-orange-300">Small</StickerBadge>
                      <StickerBadge size="md" color="bg-yellow-300">Medium</StickerBadge>
                      <StickerBadge size="lg" color="bg-green-300">Large</StickerBadge>
                    </div>
                  </div>

                  {/* Color Variants */}
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Color Options
                    </Text>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <StickerBadge color="bg-lime-300">Success</StickerBadge>
                      <StickerBadge color="bg-blue-300">Info</StickerBadge>
                      <StickerBadge color="bg-purple-300" textColor="text-white">Premium</StickerBadge>
                      <StickerBadge color="bg-pink-300">Popular</StickerBadge>
                      <StickerBadge color="bg-gray-300">Neutral</StickerBadge>
                    </div>
                  </div>

                  {/* With Icons */}
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      With Icons
                    </Text>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <StickerBadge color="bg-yellow-300">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </StickerBadge>
                      <StickerBadge color="bg-red-300">
                        <Heart className="w-4 h-4 mr-1" />
                        Favorite
                      </StickerBadge>
                      <StickerBadge color="bg-cyan-300">
                        <Code className="w-4 h-4 mr-1" />
                        Technical
                      </StickerBadge>
                      <StickerBadge color="bg-green-300">
                        <Target className="w-4 h-4 mr-1" />
                        Goal
                      </StickerBadge>
                    </div>
                  </div>

                  {/* Fixed Rotation */}
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Controlled Rotation
                    </Text>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <StickerBadge color="bg-blue-300" rotation={-15}>Rotate -15°</StickerBadge>
                      <StickerBadge color="bg-purple-300" rotation={0}>No Rotation</StickerBadge>
                      <StickerBadge color="bg-pink-300" rotation={10}>Rotate +10°</StickerBadge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Organic Dividers Section */}
        <section className="py-20 bg-gradient-to-br from-lime-50 to-green-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Organic Dividers
                </DisplayHeading>
                <Text className="mb-8">
                  Natural, flowing dividers that break up sections with organic shapes instead of straight lines.
                </Text>
                
                <div className="space-y-8">
                  <div className="bg-gray-100 border-2 border-black p-6">
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Top Divider
                    </Text>
                    <div className="relative bg-blue-200 h-24 border-2 border-black">
                      <OrganicDivider position="top" color="bg-blue-600" />
                      <div className="flex items-center justify-center h-full">
                        <Text size="sm">Content with organic top border</Text>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 border-2 border-black p-6">
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Bottom Divider
                    </Text>
                    <div className="relative bg-purple-200 h-24 border-2 border-black">
                      <div className="flex items-center justify-center h-full">
                        <Text size="sm">Content with organic bottom border</Text>
                      </div>
                      <OrganicDivider position="bottom" color="bg-purple-600" />
                    </div>
                  </div>

                  <div className="bg-gray-100 border-2 border-black p-6">
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Both Sides
                    </Text>
                    <div className="relative bg-pink-200 h-24 border-2 border-black">
                      <OrganicDivider position="both" color="bg-pink-600" />
                      <div className="flex items-center justify-center h-full">
                        <Text size="sm">Content with organic borders top & bottom</Text>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 border-2 border-black p-6">
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Color Variations
                    </Text>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="relative bg-yellow-100 h-20 border-2 border-black">
                        <OrganicDivider position="bottom" color="bg-black" />
                        <div className="flex items-center justify-center h-full">
                          <Text size="xs">Black</Text>
                        </div>
                      </div>
                      <div className="relative bg-cyan-100 h-20 border-2 border-black">
                        <OrganicDivider position="bottom" color="bg-cyan-600" />
                        <div className="flex items-center justify-center h-full">
                          <Text size="xs">Colored</Text>
                        </div>
                      </div>
                      <div className="relative bg-orange-100 h-20 border-2 border-black">
                        <OrganicDivider position="bottom" color="bg-gradient-to-r from-orange-400 to-red-500" />
                        <div className="flex items-center justify-center h-full">
                          <Text size="xs">Gradient</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Glitch Text Section */}
        <section className="py-20 bg-black text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white text-black border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-8 transform -rotate-1 mb-16">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Glitch Text Effects
                </DisplayHeading>
                <Text className="mb-8">
                  Cyberpunk-inspired text effects that trigger on hover. Perfect for tech-focused content and digital themes.
                </Text>
              </div>
              
              <div className="space-y-12">
                <div className="bg-gray-900 border-4 border-white p-8">
                  <Text variant="mono" size="sm" color="muted" className="mb-6 text-gray-400">
                    Hover over the text below to see the glitch effect
                  </Text>
                  
                  <div className="space-y-6">
                    <div>
                      <DisplayHeading level={1} size="4xl" weight="black" className="text-white">
                        <GlitchText>CYBERPUNK</GlitchText>
                      </DisplayHeading>
                    </div>
                    
                    <div>
                      <DisplayHeading level={2} size="2xl" weight="bold" className="text-cyan-400">
                        <GlitchText>Digital Revolution</GlitchText>
                      </DisplayHeading>
                    </div>
                    
                    <div>
                      <Text size="lg" className="text-purple-300">
                        <GlitchText>Future Technology</GlitchText>
                      </Text>
                    </div>
                    
                    <div>
                      <Text variant="mono" className="text-green-400">
                        <GlitchText>&gt; system.execute("glitch.effect");</GlitchText>
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 border-4 border-white p-8">
                  <Text variant="mono" size="sm" className="mb-4 text-purple-300">
                    Usage Examples in Context
                  </Text>
                  <div className="text-left space-y-4">
                    <Text className="text-white">
                      Welcome to the <GlitchText className="text-cyan-400 font-bold">MATRIX</GlitchText> where reality bends.
                    </Text>
                    <Text className="text-white">
                      Error 404: <GlitchText className="text-red-400 font-bold">REALITY.NOT.FOUND</GlitchText>
                    </Text>
                    <Text className="text-white">
                      Loading <GlitchText className="text-lime-400 font-bold">NEURAL.INTERFACE</GlitchText>...
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 mb-16">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6 text-center">
                  Form Elements
                </DisplayHeading>
                <Text className="text-center mb-8">
                  Neobrutalist form inputs with bold borders and strong shadows for clear, accessible interfaces.
                </Text>
                
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <label className="block font-bold mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <NeoButton variant="black" size="lg" className="flex-1">
                      Submit Form
                    </NeoButton>
                    <NeoButton variant="white" size="lg" className="flex-1">
                      Clear Form
                    </NeoButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Strip Demo */}
        <CTAStrip
          text="Ready to implement these UI elements in your own projects?"
          cta={{
            label: "Explore More Components",
            href: "/demo"
          }}
          background="bg-gradient-to-r from-purple-100 to-pink-100"
        />
      </main>
      
      <Footer />
    </div>
  );
}