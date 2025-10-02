import { SectionContainer } from '../components/SectionContainer';
import { NeoButton } from '../components/demo/NeoButton';
import { useNavigate } from '../utils/router';

interface ResumeLinksBlockProps {
  className?: string;
  'data-cmp'?: string;
}

export function ResumeLinksBlock({ 
  className = '',
  'data-cmp': dataCmp = 'ResumeLinksBlock'
}: ResumeLinksBlockProps) {
  const { navigate } = useNavigate();

  return (
    <SectionContainer 
      background="white"
      className={`bg-gray-100 border-t-4 border-black ${className}`}
      data-cmp={dataCmp}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Download */}
          <div className="text-center">
            <h3 className="font-display text-xl font-black mb-4">
              Formal Resume
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Download a traditional PDF version of my resume for your records.
            </p>
            <div className="flex justify-center">
              <NeoButton
                variant="black"
                size="lg"
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="px-6 py-3"
              >
                Download Resume (PDF)
              </NeoButton>
            </div>
          </div>

          {/* Writing Link */}
          <div className="text-center">
            <h3 className="font-display text-xl font-black mb-4">
              Recent Thinking
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Read my latest posts about product development, AI, and technical strategy.
            </p>
            <div className="flex justify-center">
              <NeoButton
                variant="colored"
                size="lg"
                onClick={() => navigate('/writing')}
                className="px-6 py-3 bg-purple-600 text-white"
              >
                View Writing
              </NeoButton>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}