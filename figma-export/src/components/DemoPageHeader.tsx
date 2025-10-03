import { motion } from 'motion/react';
import { BackButton } from './BackButton';
import { SplitHeading } from './demo/SplitHeading';
import { Text } from './demo/Text';
import { SectionContainer } from './SectionContainer';

interface DemoPageHeaderProps {
  title: { text: string; variant: 'black' | 'gradient' | 'white' }[];
  description: string;
  onBack: () => void;
  backLabel?: string;
}

export function DemoPageHeader({ 
  title, 
  description, 
  onBack, 
  backLabel = 'Back to Demo' 
}: DemoPageHeaderProps) {
  return (
    <SectionContainer 
      variant="hero" 
      background="gradient-blue-purple"
      className="texture-grain"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BackButton
          onClick={onBack}
          label={backLabel}
          className="mb-8"
        />

        <div className="text-center">
          <SplitHeading
            words={title}
            size="4xl"
            className="mb-6"
          />
          
          <Text size="lg" className="text-gray-700 max-w-3xl mx-auto">
            {description}
          </Text>
        </div>
      </motion.div>
    </SectionContainer>
  );
}