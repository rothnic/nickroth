import { PageLayout } from '../components/PageLayout';
import { SectionContainer } from '../components/SectionContainer';
import { SectionHeader } from '../components/SectionHeader';
import { ContactCTABlock } from '../blocks/ContactCTABlock';
import { ResumeLinksBlock } from '../blocks/ResumeLinksBlock';
import { AboutMe } from '../components/AboutMe';
import { MetricCallouts } from '../components/MetricCallouts';
import { Timeline } from '../components/Timeline';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { EducationList } from '../components/EducationList';

export function BackgroundPage() {
  return (
    <PageLayout data-cmp="BackgroundPage">
      {/* Hero Section with About Me */}
      <SectionContainer 
        variant="hero" 
        background="gradient-blue-purple" 
        data-cmp="AboutSection"
      >
        <SectionHeader 
          title="My Background"
          highlight={{ text: "Background", color: "blue" }}
          subtitle="A comprehensive look at my experience, achievements, and the journey that brought me here."
          size="xl"
        />
        <AboutMe />
      </SectionContainer>

      {/* Metric Callouts */}
      <SectionContainer data-cmp="MetricsSection">
        <SectionHeader 
          title="Key Achievements"
          highlight={{ text: "Achievements", color: "green" }}
          subtitle="Measurable results from recent initiatives."
        />
        <MetricCallouts />
      </SectionContainer>

      {/* Timeline */}
      <SectionContainer 
        background="gradient-gray-blue" 
        className="border-t-4 border-black" 
        data-cmp="TimelineSection"
      >
        <SectionHeader 
          title="Career Timeline"
          highlight={{ text: "Timeline", color: "purple" }}
          subtitle="My professional journey organized into key phases and accomplishments."
        />
        <Timeline />
      </SectionContainer>

      {/* Skills Matrix */}
      <SectionContainer data-cmp="SkillsSection">
        <SectionHeader 
          title="Skills & Technologies"
          highlight={{ text: "Technologies", color: "red" }}
          subtitle="Technical proficiencies with level and recency indicators."
        />
        <SkillsMatrix />
      </SectionContainer>

      {/* Education */}
      <SectionContainer 
        background="gradient-yellow-orange" 
        className="border-t-4 border-black" 
        data-cmp="EducationSection"
      >
        <SectionHeader 
          title="Education & Certifications"
          highlight={{ text: "Certifications", color: "orange" }}
        />
        <EducationList />
      </SectionContainer>

      {/* Links Section */}
      <ResumeLinksBlock />

      {/* Contact CTA */}
      <ContactCTABlock />
    </PageLayout>
  );
}