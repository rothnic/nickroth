import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Github, Star, Users, Zap } from 'lucide-react';
import { StickerBadge } from './StickerBadge';
import { OrganicDivider } from './OrganicDivider';

export function Projects() {
  const projects = [
    {
      title: "Platform Modernization",
      description: "Headless content + typed data + search architecture for faster authoring and SEO gains. Improved content velocity and organic reach.",
      tech: ["Directus", "TypeScript", "Typesense", "Next.js", "PostgreSQL"],
      color: "bg-purple-400",
      accent: "bg-purple-600",
      stats: [
        { icon: Users, value: "150%", label: "Organic Growth" },
        { icon: Zap, value: "400%", label: "Blog Revenue" },
        { icon: Star, value: "SEO", label: "Optimized" }
      ]
    },
    {
      title: "Email Platform Migration",
      description: "Programmatic email system with advanced segmentation. Delivered $35K/month savings while improving deliverability and user targeting.",
      tech: ["n8n", "Windmill", "Node.js", "PostgreSQL", "SendGrid"],
      color: "bg-cyan-400",
      accent: "bg-cyan-600",
      stats: [
        { icon: Users, value: "$35K", label: "Monthly Savings" },
        { icon: Zap, value: "125%", label: "Mobile Revenue" },
        { icon: Star, value: "Auto", label: "Segmentation" }
      ]
    },
    {
      title: "AI Categorization + Chrome Extension",
      description: "Structured data extraction tool for editorial acceleration. Chrome extension with AI categorization for workflow optimization.",
      tech: ["Chrome Extensions", "OpenAI API", "LangChain", "TypeScript", "React"],
      color: "bg-lime-400",
      accent: "bg-lime-600",
      stats: [
        { icon: Users, value: "100%", label: "User Interactions" },
        { icon: Zap, value: "10x", label: "A/B Tests YoY" },
        { icon: Star, value: "AI", label: "Categorization" }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-white via-lime-50 to-cyan-50 relative texture-grain">
      <OrganicDivider color="bg-black" position="top" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-display font-black text-black mb-6 relative z-10">
            FEATURED <span className="bg-gradient-to-r from-black to-gray-800 text-white px-3 py-1 transform -rotate-2 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-smooth">WORK</span>
          </h2>
          
          {/* Chaotic sticker elements */}
          <div className="absolute top-2 left-8">
            <StickerBadge color="bg-fuchsia-400" rotation={-25} size="sm">HOT!</StickerBadge>
          </div>
          <div className="absolute -top-4 right-12">
            <StickerBadge color="bg-cyan-400" rotation={30} size="sm" className="font-mono">$$</StickerBadge>
          </div>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Real products, real impact. Here are some of the AI-powered solutions I've built from concept to production.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${project.color} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300 rotate-smooth-hover`}
            >
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className="bg-black text-white px-3 py-1 font-black text-sm">
                        PROJECT {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-black leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg text-black leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <StickerBadge
                          key={techIndex}
                          color="bg-black"
                          textColor="text-white"
                          size="sm"
                          className="font-mono"
                        >
                          {tech}
                        </StickerBadge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {project.stats.map((stat, statIndex) => {
                        const Icon = stat.icon;
                        return (
                          <div key={statIndex} className="text-center">
                            <Icon className="w-6 h-6 mx-auto mb-2 text-black" />
                            <div className="font-black text-xl text-black">{stat.value}</div>
                            <div className="text-sm text-black">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold">
                        <ExternalLink className="w-4 h-4" />
                        <span>VIEW LIVE</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-white text-black border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 font-bold">
                        <Github className="w-4 h-4" />
                        <span>CODE</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className={`${project.accent} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-3 overflow-hidden rotate-smooth`}>
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NTkwMDU0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={`${project.title} preview`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 relative">
          <button className="px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white border-4 border-black font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:rotate-1 relative z-10 rotate-smooth-hover">
            VIEW ALL PROJECTS
          </button>
          
          {/* Overlapping decorative elements */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-12">
            <StickerBadge color="bg-lime-400" rotation={-15} size="sm">MORE</StickerBadge>
          </div>
          <div className="absolute -bottom-2 right-1/2 transform translate-x-8">
            <StickerBadge color="bg-fuchsia-400" rotation={25} size="sm">SOON</StickerBadge>
          </div>
        </div>
      </div>
      
      {/* Organic divider at bottom */}
      <OrganicDivider color="bg-black" position="bottom" className="mt-20" />
    </section>
  );
}