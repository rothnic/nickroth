import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from '../utils/router';
import { SectionContainer } from './SectionContainer';
import { Text } from './demo/Text';
import { NeoButton } from './demo/NeoButton';

interface CTAStripProps {
  text: string;
  cta: {
    label: string;
    href: string;
  };
  background?: 'gradient-blue-purple' | 'gradient-purple-blue' | 'gradient-yellow-orange' | 'gradient-gray-blue' | 'white' | 'black' | 'none';
  borderTop?: boolean | 'black' | 'white';
}

export function CTAStrip({ 
  text, 
  cta, 
  background = 'gradient-gray-blue',
  borderTop = 'black'
}: CTAStripProps) {
  const { navigate } = useNavigate();

  const handleCTAClick = () => {
    navigate(cta.href);
  };

  return (
    <SectionContainer 
      variant="cta"
      background={background}
      borderTop={borderTop}
      data-cmp="CTAStrip"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        <Text size="lg" className="text-gray-700 mb-6 max-w-2xl mx-auto">
          {text}
        </Text>
        <NeoButton
          variant="white"
          size="md"
          onClick={handleCTAClick}
          className="inline-flex items-center space-x-2"
        >
          <span>{cta.label}</span>
          <ArrowRight className="w-4 h-4" />
        </NeoButton>
      </motion.div>
    </SectionContainer>
  );
}