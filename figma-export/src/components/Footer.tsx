import { Heart, Code, Coffee, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from '../utils/router';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { navigate } = useNavigate();

  return (
    <footer className="bg-white border-t-4 border-black py-12" data-cmp="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Contact CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h3 className="font-display text-xl font-black mb-3">Ready to work together?</h3>
            <p className="text-gray-700 mb-4">Let's discuss your next product challenge.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-bold transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact me</span>
              </button>
              <a
                href="mailto:nick@nickroth.com"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-bold transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>nick@nickroth.com</span>
              </a>
            </div>
          </div>

          {/* Brand Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-2 text-2xl font-black text-black">
              <span>NICK</span>
              <div className="w-2 h-2 bg-red-500 transform rotate-45 rotate-smooth"></div>
              <span>ROTH</span>
            </div>
            
            <div className="flex justify-center items-center space-x-4 text-black">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span>and</span>
              <Code className="w-5 h-5 text-blue-500" />
              <span>and lots of</span>
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>
            
            <div className="inline-flex items-center space-x-4 bg-black text-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 rotate-smooth">
              <span className="font-bold">© {currentYear} - Building AI-powered products that matter</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}