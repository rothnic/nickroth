import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useNavigate } from '../utils/router';
import { ArrowLeft, BookOpen, Code, MessageSquare, Image, Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

// Reusable Components
import { SplitHeading } from '../components/demo/SplitHeading';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';
import { IconButton } from '../components/demo/IconButton';
import { StickerBadge } from '../components/StickerBadge';

// Blog Components
import { Callout } from '../components/blog/Callout';
import { Quote } from '../components/blog/Quote';
import { CodeBlock } from '../components/blog/CodeBlock';
import { ImageWithCaption } from '../components/blog/ImageWithCaption';
import { BlogMeta } from '../components/blog/BlogMeta';
import { TableOfContents } from '../components/blog/TableOfContents';

export function BlogComponentsPage() {
  const { navigate } = useNavigate();

  const sampleCode = `function createNeobrutalistButton(text: string) {
  return {
    className: 'bg-yellow-400 text-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 font-bold',
    children: text,
    onClick: () => console.log('Clicked!')
  };
}`;

  const tocItems = [
    { 
      title: 'Callouts & Alerts', 
      href: '#callouts',
      level: 2,
      children: [
        { title: 'Info Callouts', href: '#info-callouts', level: 3 },
        { title: 'Warning Messages', href: '#warnings', level: 3 },
        { title: 'Success States', href: '#success', level: 3 }
      ]
    },
    { title: 'Quotes & Citations', href: '#quotes', level: 2 },
    { title: 'Code Blocks', href: '#code', level: 2 },
    { title: 'Images & Media', href: '#images', level: 2 },
    { title: 'Blog Metadata', href: '#metadata', level: 2 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main id="main" className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-white via-green-50 to-blue-50 relative texture-grain">
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
                    { text: "BLOG", variant: "black" },
                    { text: "COMPONENTS", variant: "gradient" }
                  ]}
                  size="4xl"
                  className="mb-6"
                />
                
                <Text size="xl" className="max-w-3xl mx-auto mb-8">
                  Specialized components for rich blog content including callouts, quotes, code blocks, 
                  and interactive elements that enhance the reading experience.
                </Text>

                <div className="flex flex-wrap gap-4 justify-center">
                  <StickerBadge color="bg-green-300" rotation={-8}>
                    <BookOpen className="w-4 h-4 mr-1" />
                    Content Rich
                  </StickerBadge>
                  <StickerBadge color="bg-blue-300" rotation={5}>
                    <Code className="w-4 h-4 mr-1" />
                    Developer Friendly
                  </StickerBadge>
                  <StickerBadge color="bg-purple-300" rotation={-3}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Interactive
                  </StickerBadge>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents Demo */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-gray-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Table of Contents
                </DisplayHeading>
                <Text className="mb-8">
                  Auto-generated navigation for long-form content with smooth scrolling and active section highlighting.
                </Text>
                
                <div className="max-w-md mx-auto">
                  <TableOfContents items={tocItems} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Callouts Section */}
        <section id="callouts" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Callouts & Alerts
                </DisplayHeading>
                <Text className="mb-8">
                  Eye-catching callout boxes for important information, warnings, tips, and success messages.
                </Text>
                
                <div className="space-y-8">
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Information Callouts
                    </Text>
                    <div className="space-y-4">
                      <Callout type="info" title="Good to Know">
                        This is an informational callout that provides helpful context or additional details about the topic being discussed.
                      </Callout>
                      
                      <Callout type="note">
                        This is a simple note without a custom title. It uses default styling and icon for the note type.
                      </Callout>
                    </div>
                  </div>

                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Warnings & Alerts
                    </Text>
                    <div className="space-y-4">
                      <Callout type="warning" title="Important Notice">
                        This is a warning callout that draws attention to important information that users should be aware of before proceeding.
                      </Callout>
                      
                      <Callout type="danger" title="Breaking Change">
                        This is a danger callout for critical information, breaking changes, or potential issues that require immediate attention.
                      </Callout>
                    </div>
                  </div>

                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Success & Tips
                    </Text>
                    <div className="space-y-4">
                      <Callout type="success" title="Well Done!">
                        This is a success callout that confirms completed actions or highlights positive outcomes and achievements.
                      </Callout>
                      
                      <Callout type="tip" title="Pro Tip">
                        This is a tip callout that provides helpful advice, best practices, or insider knowledge to improve the user experience.
                      </Callout>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quotes Section */}
        <section id="quotes" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Quotes & Citations
                </DisplayHeading>
                <Text className="mb-8">
                  Stylized quote blocks with author attribution and multiple size options for different emphasis levels.
                </Text>
                
                <div className="space-y-8">
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Quote Sizes
                    </Text>
                    <div className="space-y-6">
                      <Quote size="sm" author="Small Quote" title="Compact Format">
                        This is a small quote perfect for inline citations or brief testimonials.
                      </Quote>
                      
                      <Quote size="md" author="Medium Quote" title="Standard Format">
                        This is a medium quote with balanced sizing, perfect for most use cases and standard testimonials.
                      </Quote>
                      
                      <Quote size="lg" author="Large Quote" title="Hero Format">
                        This is a large quote that commands attention and works great for featured testimonials or impactful statements.
                      </Quote>
                    </div>
                  </div>

                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Attribution Options
                    </Text>
                    <div className="space-y-6">
                      <Quote author="Jane Doe">
                        Quote with author only - perfect for personal testimonials or individual perspectives.
                      </Quote>
                      
                      <Quote title="CEO, Tech Company">
                        Quote with title only - great when the position or company is more important than the individual name.
                      </Quote>
                      
                      <Quote author="John Smith" title="Lead Developer, StartupCo">
                        Quote with both author and title - provides complete context and credibility for professional testimonials.
                      </Quote>
                      
                      <Quote>
                        Anonymous quote without attribution - useful for sensitive feedback or general wisdom.
                      </Quote>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Code Blocks Section */}
        <section id="code" className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-white text-black border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] p-8 transform rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Code Blocks
                </DisplayHeading>
                <Text className="mb-8">
                  Syntax-highlighted code blocks with copy functionality, line numbers, and language indicators.
                </Text>
              </div>
              
              <div className="space-y-8 mt-12">
                <div>
                  <Text variant="mono" size="sm" className="mb-4 text-gray-300">
                    Basic Code Block
                  </Text>
                  <CodeBlock
                    code={sampleCode}
                    language="typescript"
                    title="Neobrutalist Button Factory"
                  />
                </div>

                <div>
                  <Text variant="mono" size="sm" className="mb-4 text-gray-300">
                    With Line Numbers and Filename
                  </Text>
                  <CodeBlock
                    code={`// Component with hooks
import { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
                    language="typescript"
                    filename="Counter.tsx"
                    showLineNumbers={true}
                  />
                </div>

                <div>
                  <Text variant="mono" size="sm" className="mb-4 text-gray-300">
                    Plain Text Code Block
                  </Text>
                  <CodeBlock
                    code={`npm install @types/react @types/react-dom
yarn add tailwindcss postcss autoprefixer
pnpm install motion/react lucide-react`}
                    language="bash"
                    title="Installation Commands"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Images & Media Section */}
        <section id="images" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Images & Media
                </DisplayHeading>
                <Text className="mb-8">
                  Enhanced image components with captions, alt text, and responsive sizing for rich media content.
                </Text>
                
                <div className="space-y-8">
                  <div>
                    <Text variant="mono" size="sm" color="muted" className="mb-4">
                      Images with Captions
                    </Text>
                    <div className="space-y-6">
                      <ImageWithCaption
                        src="https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTkxMzUxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Modern office workspace with computers"
                        caption="A modern development workspace showcasing clean design and productivity tools"
                        className="max-w-2xl"
                      />
                      
                      <ImageWithCaption
                        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHN8fGRlciUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5MDk3MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Team collaboration meeting"
                        caption="Cross-functional teams collaborating on product strategy and implementation"
                        className="max-w-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Metadata Section */}
        <section id="metadata" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
                <DisplayHeading level={2} size="2xl" weight="black" className="mb-6">
                  Blog Metadata
                </DisplayHeading>
                <Text className="mb-8">
                  Article metadata display with publication dates, reading time, categories, and author information.
                </Text>
                
                <div className="space-y-6">
                  <div className="bg-white border-2 border-black p-6">
                    <BlogMeta
                      publishDate="2024-03-15"
                      readingTime={8}
                      author="Alex Chen"
                      tags={['React', 'TypeScript', 'Design Systems', 'Development']}
                    />
                  </div>
                  
                  <div className="bg-white border-2 border-black p-6">
                    <BlogMeta
                      publishDate="2024-02-28"
                      readingTime={12}
                      lastUpdated="2024-03-01"
                      author="Jordan Rivera"
                      tags={['Product Management', 'AI', 'Innovation', 'Strategy']}
                    />
                  </div>
                  
                  <div className="bg-white border-2 border-black p-6">
                    <BlogMeta
                      publishDate="2024-01-20"
                      readingTime={5}
                      author="Tutorial Bot"
                      tags={['Quick Start', 'Beginner Friendly', 'Tutorial']}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}