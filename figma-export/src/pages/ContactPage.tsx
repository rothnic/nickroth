import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white" data-cmp="ContactPage">
      <Navigation />
      
      <main id="main" className="pt-16">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-blue-50 border-b-4 border-black" data-cmp="ContactHero">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
              Get in <span className="text-green-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ready to discuss your next project? I'd love to learn about your challenges and see how I can help.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16" data-cmp="ContactFormSection">
          <div className="max-w-2xl mx-auto px-4">
            <ContactForm />
          </div>
        </section>

        {/* Direct Contact Info */}
        <section className="py-16 bg-gray-100 border-t-4 border-black" data-cmp="DirectContact">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-black mb-4">
              Prefer to reach out directly?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              You can always send me an email directly.
            </p>
            <a
              href="mailto:nick@nickroth.com"
              className="inline-flex items-center px-8 py-4 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-bold transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
            >
              nick@nickroth.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}