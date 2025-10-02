import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowDown, Zap, Brain, Code } from 'lucide-react';
import { StickerBadge } from '../components/StickerBadge';
import { GlitchText } from '../components/GlitchText';
import { OrganicDivider } from '../components/OrganicDivider';
import { NeoButton } from '../components/demo/NeoButton';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';
import { HoverCard } from '../components/effects/HoverCard';
import { RotationWrapper } from '../components/effects/RotationWrapper';
import nickHeadshot from 'figma:asset/f550368b5270867b8168a4f592a5b48b0b649970.png';

export function HeroBlock() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[85vh] max-h-screen bg-gradient-to-br from-white via-cyan-50 to-lime-50 pt-8 relative overflow-hidden texture-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 h-full flex flex-col justify-center">
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Floating Sticker Badges */}
          <div className="flex justify-center flex-wrap gap-4 mb-20">
            <RotationWrapper rotation={-8}>
              <StickerBadge color="bg-lime-300">
                <Zap className="w-4 h-4 inline mr-1" />
                FULL-STACK PM
              </StickerBadge>
            </RotationWrapper>
            <RotationWrapper rotation={5}>
              <StickerBadge color="bg-cyan-300">
                <Brain className="w-4 h-4 inline mr-1" />
                AI ENGINEER
              </StickerBadge>
            </RotationWrapper>
            <RotationWrapper rotation={-3}>
              <StickerBadge color="bg-yellow-300">
                <Code className="w-4 h-4 inline mr-1" />
                AUTOMATION
              </StickerBadge>
            </RotationWrapper>
          </div>

          {/* Name & Headshot */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Name */}
            <div className="order-2 lg:order-1">
              <DisplayHeading 
                level={1} 
                size="6xl" 
                weight="black" 
                className="text-7xl md:text-9xl font-display leading-none"
              >
                <GlitchText>NICK</GlitchText>
                <br />
                <RotationWrapper rotation={-2}>
                  <span className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
                    <GlitchText>ROTH</GlitchText>
                  </span>
                </RotationWrapper>
              </DisplayHeading>
            </div>
            
            {/* Large Headshot */}
            <div className="order-1 lg:order-2 relative group">
              {/* Fun animated background shapes */}
              <div className="absolute -inset-8 pointer-events-none">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-0 left-0 w-20 h-20 bg-fuchsia-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-70"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute bottom-4 right-4 w-16 h-16 bg-cyan-400 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] opacity-70"
                />
                <motion.div
                  animate={{ 
                    rotate: [0, -180, 0],
                    x: [0, 15, 0]
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-1/2 right-0 w-12 h-24 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-70 transform rotate-45"
                />
              </div>

              <HoverCard hoverEffect="scale">
                <RotationWrapper rotation={2} hoverRotation={5}>
                  <div className="relative bg-gradient-to-br from-cyan-400 via-lime-400 to-yellow-300 border-6 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] p-3 transition-all duration-300">
                    <RotationWrapper rotation={-1}>
                      <div className="bg-white border-4 border-black">
                        <img
                          src={nickHeadshot}
                          alt="Nick Roth"
                          className="w-72 h-72 md:w-96 md:h-96 object-cover border-3 border-black"
                        />
                      </div>
                    </RotationWrapper>
                  </div>
                </RotationWrapper>
              </HoverCard>
              
              {/* Floating Sticker Elements */}
              <div className="absolute -top-8 -right-8">
                <RotationWrapper rotation={12}>
                  <StickerBadge color="bg-fuchsia-500" textColor="text-white" size="lg">
                    PRODUCT
                  </StickerBadge>
                </RotationWrapper>
              </div>
              <div className="absolute -bottom-8 -left-8">
                <RotationWrapper rotation={-12}>
                  <StickerBadge color="bg-yellow-300" size="lg">
                    ENGINEER
                  </StickerBadge>
                </RotationWrapper>
              </div>
              <div className="absolute top-1/2 -right-12">
                <RotationWrapper rotation={90}>
                  <StickerBadge color="bg-lime-400">
                    AI
                  </StickerBadge>
                </RotationWrapper>
              </div>
              
              {/* Georgia Tech badge with mono font */}
              <div className="absolute -top-6 left-12">
                <RotationWrapper rotation={-6}>
                  <StickerBadge color="bg-black" textColor="text-white" className="font-mono">
                    GT MS
                  </StickerBadge>
                </RotationWrapper>
              </div>
            </div>
          </div>
          
          {/* Value Proposition with overlapping elements */}
          <div className="max-w-4xl mx-auto relative">
            <RotationWrapper rotation={-1}>
              <HoverCard hoverEffect="lift">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <Text size="lg" className="text-2xl md:text-3xl text-black leading-relaxed font-black">
                    I turn business objectives into <span className="font-mono bg-lime-200 px-2 border border-black">shippable systems</span> — 
                    model the business, specify precisely, and build only what moves the needle.
                  </Text>
                </div>
              </HoverCard>
            </RotationWrapper>
            
            {/* Overlapping decorative elements */}
            <RotationWrapper rotation={12}>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-0"></div>
            </RotationWrapper>
            <RotationWrapper rotation={-6}>
              <div className="absolute -bottom-6 -left-6 w-16 h-24 bg-gradient-to-t from-fuchsia-400 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0"></div>
            </RotationWrapper>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <RotationWrapper hoverRotation={1}>
              <NeoButton 
                variant="colored"
                size="lg"
                onClick={() => scrollToSection('#projects')}
                className="px-10 py-5 bg-cyan-400 text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                VIEW MY WORK
              </NeoButton>
            </RotationWrapper>
            <RotationWrapper hoverRotation={-1}>
              <NeoButton 
                variant="white"
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="px-10 py-5 text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                LET'S TALK
              </NeoButton>
            </RotationWrapper>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <HoverCard hoverEffect="lift">
            <NeoButton 
              variant="white"
              size="sm"
              onClick={() => scrollToSection('#process')}
              className="p-3"
            >
              <ArrowDown className="w-6 h-6" />
            </NeoButton>
          </HoverCard>
        </div>
      </div>
    </section>
  );
}