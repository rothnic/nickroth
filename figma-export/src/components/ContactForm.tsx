import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Mock form submission - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just log the form data
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or send an email directly.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto" data-cmp="ContactForm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-bold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all duration-200 bg-white"
            placeholder="Your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-bold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all duration-200 bg-white"
            placeholder="your@email.com"
          />
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block font-bold mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all duration-200 bg-white"
            placeholder="Your company or organization"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block font-bold mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all duration-200 bg-white resize-none"
            placeholder="Tell me about your project, challenges, or how I can help..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
            className={`w-full flex items-center justify-center space-x-2 px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-bold transition-all duration-200 ${
              status === 'submitting'
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1'
            }`}
          >
            {status === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-600 border-t-2 border-t-white rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border-4 border-green-500 p-4 flex items-center space-x-3"
          >
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-green-800">Message sent successfully!</div>
              <div className="text-green-700 text-sm">I'll get back to you within 24 hours.</div>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-4 border-red-500 p-4 flex items-center space-x-3"
          >
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-red-800">Error sending message</div>
              <div className="text-red-700 text-sm">{errorMessage}</div>
            </div>
          </motion.div>
        )}
      </form>

      {/* Alternative Contact Methods */}
      <div className="mt-12 pt-8 border-t-4 border-gray-200">
        <h3 className="font-display text-lg font-black mb-4 text-center">
          Other ways to reach me
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 border-2 border-black">
            <div className="font-bold mb-1">Email</div>
            <a 
              href="mailto:nick@nickroth.com"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              nick@nickroth.com
            </a>
          </div>
          <div className="text-center p-4 bg-gray-50 border-2 border-black">
            <div className="font-bold mb-1">Response Time</div>
            <div className="text-gray-700 text-sm">Usually within 24 hours</div>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          Your information will only be used to respond to your inquiry. 
          I don't share contact details or use them for marketing purposes.
        </p>
      </div>
    </div>
  );
}