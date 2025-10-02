import { PageLayout } from '../components/PageLayout';
import { SectionContainer } from '../components/SectionContainer';
import { SectionHeader } from '../components/SectionHeader';
import { BackgroundCTABlock } from '../blocks/BackgroundCTABlock';
import { ContactCTABlock } from '../blocks/ContactCTABlock';
import { ApproachLoop } from '../components/ApproachLoop';
import { FocusAreasGrid } from '../components/FocusAreasGrid';
import { PreviousProjectsSummary } from '../components/PreviousProjectsSummary';

export function FocusPage() {
  return (
    <PageLayout data-cmp="FocusPage">
      {/* Approach Loop Section */}
      <SectionContainer 
        variant="hero" 
        background="gradient-blue-purple" 
        data-cmp="ApproachSection"
      >
        <SectionHeader 
          title="My Focus"
          highlight={{ text: "Focus", color: "purple" }}
          subtitle="An iterative approach to building AI-powered product experiences that deliver measurable business outcomes."
          size="xl"
        />
        <ApproachLoop />
      </SectionContainer>

      {/* Focus Areas Grid */}
      <SectionContainer data-cmp="FocusAreasSection">
        <SectionHeader 
          title="Areas of Expertise"
          highlight={{ text: "Expertise", color: "red" }}
          subtitle="Deep experience across the full stack of modern product development, from strategy to implementation."
        />
        <FocusAreasGrid />
      </SectionContainer>

      {/* Previous Projects Summary */}
      <SectionContainer 
        background="gradient-yellow-orange" 
        className="border-t-4 border-black" 
        data-cmp="ProjectsSection"
      >
        <SectionHeader 
          title="Recent Projects"
          highlight={{ text: "Projects", color: "orange" }}
          subtitle="Key initiatives that demonstrate the approach in action."
        />
        <PreviousProjectsSummary />
      </SectionContainer>

      {/* Background CTA */}
      <BackgroundCTABlock />

      {/* Contact CTA */}
      <ContactCTABlock />
    </PageLayout>
  );
}