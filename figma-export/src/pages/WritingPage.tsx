import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { WritingFilters } from '../components/WritingFilters';
import { WritingGrid } from '../components/WritingGrid';

export function WritingPage() {
  return (
    <div className="min-h-screen bg-white" data-cmp="WritingPage">
      <Navigation />
      
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50 border-b-4 border-black" data-cmp="WritingHero">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
                My <span className="text-purple-600">Writing</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Thoughts on product development, AI implementation, technical strategy, and lessons learned from building at scale.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Grid */}
        <section className="py-16" data-cmp="WritingContent">
          <div className="max-w-7xl mx-auto px-4">
            <WritingFilters />
            <WritingGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}