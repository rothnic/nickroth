import { TimelinePage } from '../components/TimelinePage';
import { useNavigate } from '../utils/router';

export function TimelinePageWrapper() {
  const { toHome } = useNavigate();

  const handleBackToHome = () => {
    toHome();
  };

  return (
    <TimelinePage onBack={handleBackToHome} />
  );
}