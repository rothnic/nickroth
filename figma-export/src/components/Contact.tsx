import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { StickerBadge } from './StickerBadge';
import { GlitchText } from './GlitchText';
import { OrganicDivider } from './OrganicDivider';
import { SectionContainer } from './SectionContainer';
import { SectionHeader } from './SectionHeader';
import { NeoButton } from './demo/NeoButton';
import { HoverCard } from './effects/HoverCard';
import { RotationWrapper } from './effects/RotationWrapper';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "hello@pm-ai.dev",
      color: "bg-red-400"
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "+1 (555) 123-4567",
      color: "bg-blue-400"
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "San Francisco, CA",
      color: "bg-green-400"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "#",
      color: "bg-blue-600"
    },
    {
      icon: Github,
      label: "GitHub",
      url: "#",
      color: "bg-gray-800"
    },
    {
      icon: Twitter,
      label: "Twitter",
      url: "#",
      color: "bg-cyan-400"
    }
  ];

  return (
    <SectionContainer 
      id="contact"
      variant="full-width"
      background="gradient-purple-blue"
      className="text-white relative overflow-hidden"
    >
      <OrganicDivider color="bg-white" position="top" />
      
      {/* Chaotic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <RotationWrapper rotation={45}>
          <div className="absolute top-20 left-8 w-32 h-32 bg-fuchsia-500 opacity-20 border-4 border-white"></div>
        </RotationWrapper>
        <RotationWrapper rotation={-12}>
          <div className="absolute bottom-32 right-12 w-24 h-40 bg-cyan-400 opacity-20 border-4 border-white"></div>
        </RotationWrapper>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-lime-400 opacity-20 border-4 border-white rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 py-20">
        {/* Header with Stickers */}
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-display font-black mb-6 relative z-10">
            <GlitchText>LET'S</GlitchText>{' '}
            <RotationWrapper rotation={-2}>
              <span className="bg-gradient-to-r from-white to-gray-200 text-black px-3 py-1 inline-block shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                CONNECT
              </span>
            </RotationWrapper>
          </h2>
          
          {/* Scattered stickers */}
          <div className="absolute -top-8 left-8">
            <StickerBadge color="bg-lime-400" textColor="text-black" rotation={-20} size="sm">FREE</StickerBadge>
          </div>
          <div className="absolute top-4 right-8">
            <StickerBadge color="bg-fuchsia-400" rotation={25} size="sm">FAST</StickerBadge>
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <StickerBadge color="bg-cyan-400" textColor="text-black" rotation={-5} className="font-mono">24H</StickerBadge>
          </div>
          
          <p className="text-xl max-w-3xl mx-auto relative z-10 mt-6">
            Ready to build something amazing together? <span className="font-mono bg-yellow-300 text-black px-1 border border-white">Drop me a line</span> and let's discuss your next AI-powered product.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black mb-8 font-display">GET IN TOUCH</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <HoverCard key={index} hoverEffect="lift">
                      <div className={`${info.color} border-4 border-white p-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transform hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 hover:rotate-1 rotate-smooth-hover`}>
                        <div className="flex items-center space-x-4">
                          <Icon className="w-8 h-8 text-black" />
                          <div>
                            <div className="font-black text-black text-lg font-display">{info.label}</div>
                            <div className="text-black">{info.value}</div>
                          </div>
                        </div>
                      </div>
                    </HoverCard>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black mb-6 font-display">FOLLOW ME</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <HoverCard key={index} hoverEffect="lift">
                      <a
                        href={social.url}
                        className={`${social.color} border-4 border-white p-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 group cursor-pointer`}
                      >
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                      </a>
                    </HoverCard>
                  );
                })}
              </div>
            </div>

            <RotationWrapper rotation={2}>
              <div className="bg-yellow-400 border-4 border-white p-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                <p className="text-black font-bold text-lg font-display">
                  ⚡ Currently available for new projects and collaborations!
                </p>
              </div>
            </RotationWrapper>
          </div>

          {/* Contact Form */}
          <RotationWrapper rotation={-1}>
            <div className="bg-white border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8">
              <h3 className="text-3xl font-black text-black mb-6 font-display">SEND MESSAGE</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black font-bold mb-2 font-display">NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black font-bold"
                      placeholder="Your awesome name"
                    />
                  </div>
                  <div>
                    <label className="block text-black font-bold mb-2 font-display">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black font-bold"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-black font-bold mb-2 font-display">SUBJECT</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black font-bold"
                  >
                    <option value="">Select a topic</option>
                    <option value="project">New Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="consulting">Consulting</option>
                    <option value="speaking">Speaking Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-black font-bold mb-2 font-display">MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-black font-bold resize-none"
                    placeholder="Tell me about your amazing idea..."
                  />
                </div>
                
                <NeoButton
                  type="submit"
                  variant="black"
                  size="lg"
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform hover:rotate-1"
                >
                  <Send className="w-5 h-5" />
                  <span>SEND MESSAGE</span>
                </NeoButton>
              </form>
            </div>
          </RotationWrapper>
        </div>

        <div className="text-center mt-16">
          <RotationWrapper rotation={1}>
            <div className="inline-flex items-center space-x-4 bg-cyan-400 text-black px-8 py-4 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] font-black font-display">
              <span>Response time: Usually within 24 hours</span>
            </div>
          </RotationWrapper>
        </div>
      </div>
    </SectionContainer>
  );
}