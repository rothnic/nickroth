import { motion } from 'motion/react';
import { CTASection } from '../components/CTASection';

interface BackgroundCTABlockProps {
  className?: string;
}

export function BackgroundCTABlock({ className = '' }: BackgroundCTABlockProps) {
  return (
    <div className={className}>
      <CTASection
        title="Want to know more about my background?"
        subtitle="Explore my professional journey, education, and the experiences that shaped my approach to building AI-powered products."
        button={{
          label: "View my background",
          href: "/background",
          variant: "black"
        }}
        background="white"
        textColor="black"
      />
    </div>
  );
}