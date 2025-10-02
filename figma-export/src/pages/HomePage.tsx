import { PageLayout } from '../components/PageLayout';
import { SectionContainer } from '../components/SectionContainer';
import { SectionHeader } from '../components/SectionHeader';
import { Hero } from '../components/Hero';
import { CapabilitiesMarqueeBlock } from '../blocks/CapabilitiesMarqueeBlock';
import { RecentPosts } from '../components/RecentPosts';
import { CTAStrip } from '../components/CTAStrip';

export function HomePage() {
  return (
    <PageLayout className="" data-cmp="HomePage">
      {/* Hero Section */}
      <Hero />
      
      {/* Full-Stack Capabilities Section */}
      <CapabilitiesMarqueeBlock />

      {/* Recent Posts Section */}
      <SectionContainer 
        background="gradient-blue-purple" 
        borderTop="black"
        data-cmp="RecentPostsSection"
      >
        <SectionHeader 
          title="Recent Writing"
          highlight={{ text: "Writing", color: "blue" }}
          subtitle="Latest thoughts on product development, AI implementation, and technical strategy."
        />
        <RecentPosts limit={2} />
      </SectionContainer>

      {/* Quiet CTA Strip */}
      <CTAStrip 
        text="Looking for career details and specific achievements?"
        cta={{
          label: "See my background",
          href: "/background"
        }}
      />
    </PageLayout>
  );
}