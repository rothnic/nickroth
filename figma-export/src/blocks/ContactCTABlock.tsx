import { CTASection } from '../components/CTASection';
import { useNavigate } from '../utils/router';

interface ContactCTABlockProps {
  className?: string;
  'data-cmp'?: string;
}

export function ContactCTABlock({ 
  className = '',
  'data-cmp': dataCmp = 'ContactCTABlock'
}: ContactCTABlockProps) {
  const { navigate } = useNavigate();

  return (
    <CTASection
      title="Ready to work together?"
      subtitle="Let's discuss how I can help accelerate your product development."
      button={{
        label: "Contact me",
        onClick: () => navigate('/contact'),
        variant: "white"
      }}
      background="gradient"
      textColor="white"
      className={className}
      data-cmp={dataCmp}
    />
  );
}