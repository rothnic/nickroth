import { motion } from 'motion/react';
import { PageLayout } from '../components/PageLayout';
import { DemoPageHeader } from '../components/DemoPageHeader';
import { SectionContainer } from '../components/SectionContainer';
import { useNavigate } from '../utils/router';
import { Palette, Code } from 'lucide-react';

// Reusable Components
import { BoxedHeading } from '../components/demo/BoxedHeading';
import { DisplayHeading } from '../components/demo/DisplayHeading';
import { Text } from '../components/demo/Text';

// Card Components
import { ProjectCard } from '../components/demo/ProjectCard';
import { ContentCard } from '../components/demo/ContentCard';
import { MetricCard } from '../components/demo/MetricCard';
import { ProfileCard } from '../components/demo/ProfileCard';
import { FeatureCard } from '../components/demo/FeatureCard';
import { TestimonialCard } from '../components/demo/TestimonialCard';
import { GraphPaperCard } from '../components/demo/GraphPaperCard';
import { StickerBadge } from '../components/StickerBadge';

export function CardsPage() {
  const { navigate } = useNavigate();

  return (
    <PageLayout>
      {/* Header */}
      <DemoPageHeader
        title={[
          { text: "CARD", variant: "black" },
          { text: "SHOWCASE", variant: "gradient" }
        ]}
        description="A collection of card components featuring our neobrutalist design system. Mix colorful and neutral options to create balanced layouts."
        onBack={() => navigate('/demo')}
      />

      {/* Badges */}
      <SectionContainer>
        <div className="text-center mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <StickerBadge color="bg-lime-400" rotation={-8}>
              <Palette className="w-4 h-4 mr-1" />
              Colorful Options
            </StickerBadge>
            <StickerBadge color="bg-gray-200" rotation={5}>
              <Code className="w-4 h-4 mr-1" />
              Neutral Variants
            </StickerBadge>
          </div>
        </div>
      </SectionContainer>

      {/* Colorful Cards Section */}
      <SectionContainer background="white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <BoxedHeading 
            variant="colored" 
            background="bg-gradient-to-r from-fuchsia-400 to-purple-500" 
            textColor="text-white"
            size="2xl" 
            rotation={-1}
            className="mb-4"
          >
            COLORFUL CARDS
          </BoxedHeading>
          <Text size="lg" className="max-w-2xl mx-auto">
            Bold, vibrant cards that demand attention and add energy to your layouts.
          </Text>
        </motion.div>

        <div className="grid gap-8 md:gap-12 lg:gap-16 justify-items-center">
          {/* Project Card Row */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Project Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center items-stretch">
              <ProjectCard
                title="AI Chat Bot"
                description="Intelligent conversational AI with natural language processing"
                technologies={['React', 'Python', 'OpenAI', 'FastAPI']}
                githubUrl="https://github.com"
                liveUrl="https://demo.com"
                stars={234}
                featured={true}
              />
              <ProjectCard
                title="Design System"
                description="Comprehensive component library for modern web applications"
                technologies={['TypeScript', 'Storybook', 'CSS']}
                githubUrl="https://github.com"
                stars={89}
              />
            </div>
          </motion.div>

          {/* Metric Cards Row */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Metric Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <MetricCard
                title="Revenue Growth"
                value="$425k"
                change={{
                  value: "+23%",
                  trend: "up",
                  period: "vs last month"
                }}
                icon="💰"
                color="bg-gradient-to-br from-green-400 to-emerald-500"
              />
              <MetricCard
                title="Active Users"
                value="12.5k"
                change={{
                  value: "+8%",
                  trend: "up",
                  period: "this week"
                }}
                icon="👥"
                color="bg-gradient-to-br from-blue-400 to-indigo-500"
              />
              <MetricCard
                title="Page Views"
                value="89.2k"
                change={{
                  value: "-2%",
                  trend: "down",
                  period: "vs yesterday"
                }}
                icon="📈"
                color="bg-gradient-to-br from-orange-400 to-red-500"
              />
            </div>
          </motion.div>

          {/* Feature Card Row */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Feature Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <FeatureCard
                title="Pro Plan"
                description="Perfect for growing teams and businesses"
                features={[
                  "Unlimited projects",
                  "Advanced analytics",
                  "24/7 priority support",
                  "Custom integrations",
                  "Team collaboration tools"
                ]}
                price="$29/mo"
                popular={true}
                color="bg-gradient-to-br from-yellow-300 to-orange-400"
                onAction={() => console.log('Pro plan selected')}
              />
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Neutral Cards Section */}
      <SectionContainer background="gradient-gray-blue">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <BoxedHeading variant="colored" background="bg-gray-800" size="2xl" className="mb-4">
            NEUTRAL CARDS
          </BoxedHeading>
          <Text size="lg" className="max-w-2xl mx-auto">
            Clean, professional cards that provide balance and readability in busy layouts.
          </Text>
        </motion.div>

        <div className="grid gap-8 md:gap-12 lg:gap-16 justify-items-center">
          {/* Content Cards Row */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Content Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <ContentCard
                title="Building Scalable React Applications"
                excerpt="Learn best practices for structuring large React applications with performance and maintainability in mind."
                readTime="8 min read"
                publishDate="Mar 15, 2024"
                category="Development"
                onClick={() => console.log('Article clicked')}
              />
              <ContentCard
                title="The Future of Design Systems"
                excerpt="Exploring emerging trends and technologies that will shape how we build and maintain design systems."
                readTime="12 min read"
                publishDate="Mar 10, 2024"
                category="Design"
                onClick={() => console.log('Article clicked')}
              />
            </div>
          </motion.div>

          {/* Profile Cards Row */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Profile Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <ProfileCard
                name="Sarah Chen"
                role="Senior UX Designer"
                company="TechCorp"
                email="sarah@techcorp.com"
                location="San Francisco, CA"
                skills={['Figma', 'React', 'User Research', 'Prototyping', 'Design Systems']}
                portfolioUrl="https://sarahchen.design"
              />
              <ProfileCard
                name="Mike Rodriguez"
                role="Full Stack Developer"
                company="StartupCo"
                email="mike@startupco.com"
                location="Austin, TX"
                skills={['TypeScript', 'Node.js', 'AWS', 'GraphQL']}
                portfolioUrl="https://mikedev.com"
              />
            </div>
          </motion.div>

          {/* Testimonial Cards Row */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Testimonial Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <TestimonialCard
                quote="This design system has transformed how our team builds products. The components are incredibly flexible and the documentation is top-notch."
                author="Jessica Park"
                role="Product Manager"
                company="InnovateLab"
                rating={5}
              />
              <TestimonialCard
                quote="The neobrutalist approach really makes our interfaces stand out. Our users love the bold, confident design language."
                author="David Kim"
                role="Creative Director"
                company="BrandStudio"
                rating={5}
              />
            </div>
          </motion.div>

          {/* Graph Paper Cards Row */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <DisplayHeading level={3} size="xl" weight="black" className="mb-6 text-center">Graph Paper Cards</DisplayHeading>
            <div className="flex flex-wrap gap-8 justify-center">
              <GraphPaperCard 
                title="System Metrics"
                accentColor="rgb(34, 197, 94)"
                gridSize="sm"
                className="w-80"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">CPU Usage</span>
                    <span className="font-display font-black text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Memory</span>
                    <span className="font-display font-black text-blue-600">8.2GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm">Storage</span>
                    <span className="font-display font-black text-orange-600">234GB</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-100 border-2 border-black">
                    <div className="font-mono text-xs text-green-700">
                      ▲ System performance optimal
                    </div>
                  </div>
                </div>
              </GraphPaperCard>
              
              <GraphPaperCard 
                title="API Dashboard"
                accentColor="rgb(59, 130, 246)"
                gridSize="md"
                interactive={true}
                onClick={() => console.log('API Dashboard clicked')}
                className="w-80"
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="font-display font-black text-2xl text-blue-600">99.9%</div>
                      <div className="font-mono text-xs">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display font-black text-2xl text-green-600">1.2ms</div>
                      <div className="font-mono text-xs">Avg Response</div>
                    </div>
                  </div>
                  <div className="border-t-2 border-black pt-3">
                    <div className="font-mono text-sm mb-2">Recent Endpoints:</div>
                    <div className="space-y-1 text-xs font-mono">
                      <div>GET /api/users → 200 ✓</div>
                      <div>POST /api/auth → 201 ✓</div>
                      <div>GET /api/metrics → 200 ✓</div>
                    </div>
                  </div>
                </div>
              </GraphPaperCard>

              <GraphPaperCard 
                title="Data Visualization"
                accentColor="rgb(168, 85, 247)"
                gridSize="lg"
                className="w-80"
              >
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-purple-600 mb-2">42.7k</div>
                    <div className="font-mono text-sm">Total Data Points</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-purple-100 border border-black p-2">
                      <div className="font-display font-black text-sm">1.2k</div>
                      <div className="font-mono text-xs">Today</div>
                    </div>
                    <div className="bg-purple-100 border border-black p-2">
                      <div className="font-display font-black text-sm">8.9k</div>
                      <div className="font-mono text-xs">Week</div>
                    </div>
                    <div className="bg-purple-100 border border-black p-2">
                      <div className="font-display font-black text-sm">32.6k</div>
                      <div className="font-mono text-xs">Month</div>
                    </div>
                  </div>
                </div>
              </GraphPaperCard>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Usage Guidelines */}
      <SectionContainer background="white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-black mb-6">
            <span className="bg-black text-white px-4 py-2 transform -rotate-1 inline-block border-4 border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              USAGE TIPS
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-lime-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1">
            <DisplayHeading level={3} size="lg" weight="black" className="mb-3">Colorful Cards</DisplayHeading>
            <ul className="space-y-2 text-sm">
              <li>• Use sparingly for emphasis and CTAs</li>
              <li>• Great for metrics, features, and highlights</li>
              <li>• Consider accessibility with high contrast</li>
              <li>• Mix with neutral cards for balance</li>
            </ul>
          </div>

          <div className="bg-gray-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 transform rotate-1">
            <DisplayHeading level={3} size="lg" weight="black" className="mb-3">Neutral Cards</DisplayHeading>
            <ul className="space-y-2 text-sm">
              <li>• Perfect for content-heavy layouts</li>
              <li>• Excellent readability and focus</li>
              <li>• Use for profiles, articles, and data</li>
              <li>• Pair with colorful accents strategically</li>
            </ul>
          </div>

          <div className="bg-blue-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1">
            <DisplayHeading level={3} size="lg" weight="black" className="mb-3">Graph Paper Cards</DisplayHeading>
            <ul className="space-y-2 text-sm">
              <li>• Ideal for technical data and metrics</li>
              <li>• Adjustable grid sizes for different content</li>
              <li>• Perfect for dashboards and analytics</li>
              <li>• Can be interactive for user engagement</li>
            </ul>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}