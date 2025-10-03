import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navigation />
      <main id="main" className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}