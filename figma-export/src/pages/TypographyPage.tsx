import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { ArrowLeft, Type, Hash } from 'lucide-react';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';
import { SplitHeading } from '../components/demo/SplitHeading';
import { BoxedHeading } from '../components/demo/BoxedHeading';
import { ColoredHeading } from '../components/demo/ColoredHeading';
import { StickerBadge } from '../components/StickerBadge';

export function TypographyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate('/demo')}
              className="flex items-center space-x-2 mb-6 text-sm font-mono hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Demo</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black text-white border-2 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Type className="w-6 h-6" />
              </div>
              <div>
                <DisplayHeading level={1} size="3xl" weight="black">
                  Typography System
                </DisplayHeading>
                <Text variant="mono" color="muted">
                  Neobrutalist typography components for consistent text styling
                </Text>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StickerBadge color="bg-purple-300" size="sm">
                Space Grotesk
              </StickerBadge>
              <StickerBadge color="bg-green-300" size="sm">
                JetBrains Mono
              </StickerBadge>
              <StickerBadge color="bg-red-300" size="sm">
                Rubik Glitch
              </StickerBadge>
            </div>
          </motion.div>

          {/* Display Headings Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Hash className="w-6 h-6" />
                <DisplayHeading level={2} size="2xl" weight="black">
                  Display Headings
                </DisplayHeading>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-2">
                    Default (Space Grotesk)
                  </Text>
                  <DisplayHeading level={1} size="3xl" weight="black">
                    Extra Large Heading
                  </DisplayHeading>
                  <DisplayHeading level={2} size="2xl" weight="bold">
                    Large Heading
                  </DisplayHeading>
                  <DisplayHeading level={3} size="xl" weight="semibold">
                    Medium Heading
                  </DisplayHeading>
                  <DisplayHeading level={4} size="lg" weight="medium">
                    Small Heading
                  </DisplayHeading>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-2">
                    Mono (JetBrains Mono)
                  </Text>
                  <DisplayHeading level={2} variant="mono" size="2xl" weight="bold">
                    Monospace Display Heading
                  </DisplayHeading>
                  <DisplayHeading level={3} variant="mono" size="xl" weight="medium">
                    Technical Documentation Style
                  </DisplayHeading>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-2">
                    Glitch (Rubik Glitch) - Hover for effect
                  </Text>
                  <DisplayHeading level={2} variant="glitch" size="2xl" weight="bold">
                    ERROR_SYSTEM_OVERLOAD
                  </DisplayHeading>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Specialized Headings Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-pink-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-2 mb-8">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Specialized Headings
              </DisplayHeading>
              
              <div className="space-y-8">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Split Headings - Multi-word titles with different backgrounds
                  </Text>
                  <div className="space-y-4">
                    <SplitHeading
                      words={[
                        { text: "DEMO", variant: "black" },
                        { text: "SHOWCASE", variant: "gradient" }
                      ]}
                      size="4xl"
                      className="text-center"
                    />
                    <SplitHeading
                      words={[
                        { text: "CARD", variant: "black" },
                        { text: "SHOWCASE", variant: "gradient" }
                      ]}
                      level={2}
                      size="3xl"
                      className="text-center"
                    />
                    <SplitHeading
                      words={[
                        { text: "NEUTRAL", variant: "colored", background: "bg-gray-800" },
                        { text: "CARDS", variant: "colored", background: "bg-gray-800" }
                      ]}
                      level={2}
                      size="2xl"
                      className="text-center"
                    />
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Boxed Headings - Single phrases in styled containers
                  </Text>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <BoxedHeading variant="black" size="xl" rotation={-2}>
                      BLACK STYLE
                    </BoxedHeading>
                    <BoxedHeading variant="gradient" size="xl" rotation={1}>
                      GRADIENT BOX
                    </BoxedHeading>
                    <BoxedHeading 
                      variant="colored" 
                      background="bg-purple-600" 
                      size="lg" 
                      rotation={-1}
                    >
                      CUSTOM COLOR
                    </BoxedHeading>
                    <BoxedHeading variant="white" size="md" rotation={2}>
                      WHITE VARIANT
                    </BoxedHeading>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Colored Headings - Regular text with colored spans
                  </Text>
                  <div className="space-y-3">
                    <ColoredHeading
                      parts={[
                        "Full-Stack ",
                        { text: "Capabilities", color: "purple" }
                      ]}
                      size="4xl"
                      className="text-center"
                    />
                    <ColoredHeading
                      parts={[
                        "Recent ",
                        { text: "Writing", color: "blue" }
                      ]}
                      size="3xl"
                      className="text-center"
                    />
                    <ColoredHeading
                      parts={[
                        "Interactive ",
                        { text: "Components", className: "text-emerald-600" },
                        " & ",
                        { text: "Design", className: "text-orange-600" }
                      ]}
                      size="2xl"
                      className="text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Body Text Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 mb-8">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Body Text Variants
              </DisplayHeading>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-2">
                    Body Text
                  </Text>
                  <Text size="lg" weight="normal">
                    Large body text for important content and introductions.
                  </Text>
                  <Text size="base" weight="normal" className="mt-2">
                    Regular body text for most content. This is the default size and weight used throughout the application.
                  </Text>
                  <Text size="sm" weight="normal" className="mt-2">
                    Small body text for secondary information and captions.
                  </Text>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-2">
                    Specialized Text
                  </Text>
                  <Text variant="mono" size="base" weight="medium">
                    Monospace text for code snippets and technical content
                  </Text>
                  <Text variant="label" size="base" weight="medium" className="mt-2">
                    Label text for form fields and UI elements
                  </Text>
                  <Text variant="caption" size="sm" className="mt-2">
                    Caption text with muted color for descriptions
                  </Text>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Colors & Weights Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-lime-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Colors & Weights
              </DisplayHeading>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Font Weights
                  </Text>
                  <div className="space-y-2">
                    <Text weight="normal">Normal weight text</Text>
                    <Text weight="medium">Medium weight text</Text>
                    <Text weight="semibold">Semibold weight text</Text>
                    <Text weight="bold">Bold weight text</Text>
                    <DisplayHeading level={4} weight="black">Black weight heading</DisplayHeading>
                  </div>
                </div>

                <div>
                  <Text variant="mono" size="sm" color="muted" className="mb-4">
                    Text Colors
                  </Text>
                  <div className="space-y-2">
                    <Text color="default">Default text color</Text>
                    <Text color="muted">Muted text color</Text>
                    <Text color="accent">Accent text color</Text>
                    <Text color="destructive">Destructive text color</Text>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Usage Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="bg-fuchsia-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
              <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                Real-World Usage
              </DisplayHeading>
              
              <div className="bg-white border-2 border-black p-6 mb-6">
                <DisplayHeading level={3} size="xl" weight="bold" className="mb-2">
                  Article Title
                </DisplayHeading>
                <Text variant="caption" className="mb-4">
                  Published on March 15, 2024 • 5 min read
                </Text>
                <Text className="mb-4">
                  This is a sample article paragraph demonstrating how our typography components work together to create a cohesive reading experience. The spacing and sizing create a natural hierarchy.
                </Text>
                <Text variant="mono" size="sm" className="bg-gray-100 p-2 border border-gray-300">
                  Code example: const example = "typography system";
                </Text>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-black p-4">
                  <DisplayHeading level={4} weight="semibold" className="mb-2">
                    Card Title
                  </DisplayHeading>
                  <Text size="sm" className="mb-3">
                    Card description with balanced typography.
                  </Text>
                  <Text variant="mono" size="xs" color="muted">
                    metadata
                  </Text>
                </div>

                <div className="bg-white border-2 border-black p-4">
                  <Text variant="label" className="mb-1">
                    Form Label
                  </Text>
                  <div className="border border-gray-300 p-2 mb-2">
                    <Text size="sm" color="muted">
                      Input placeholder text
                    </Text>
                  </div>
                  <Text variant="caption" color="muted">
                    Helper text for the form field
                  </Text>
                </div>
              </div>

              {/* Specialized Heading Examples */}
              <div className="mt-8 space-y-6">
                <div className="bg-white border-2 border-black p-6">
                  <SplitHeading
                    words={[
                      { text: "DESIGN", variant: "black" },
                      { text: "SYSTEM", variant: "gradient" }
                    ]}
                    size="3xl"
                    className="text-center mb-4"
                  />
                  <Text className="text-center">
                    Hero sections using split headings create dramatic visual impact.
                  </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-black p-4">
                    <ColoredHeading
                      parts={[
                        "Our ",
                        { text: "Latest", color: "blue" },
                        " Work"
                      ]}
                      size="2xl"
                      className="mb-3"
                    />
                    <Text size="sm">
                      Section headers with colored spans provide visual hierarchy.
                    </Text>
                  </div>

                  <div className="bg-white border-2 border-black p-4">
                    <div className="mb-3">
                      <BoxedHeading variant="colored" background="bg-purple-600" size="md" rotation={-1}>
                        FEATURED
                      </BoxedHeading>
                    </div>
                    <Text size="sm">
                      Boxed headings work great for category labels.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}