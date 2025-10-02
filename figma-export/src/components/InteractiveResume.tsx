import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  MapPin,
  Mail,
  Eye,
  Star,
  Download
} from 'lucide-react';

export function InteractiveResume() {
  const [activeSection, setActiveSection] = useState('experience');

  const sections = [
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'education', label: 'EDUCATION', icon: GraduationCap },
    { id: 'skills', label: 'SKILLS', icon: Code },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Award }
  ];

  const experience = [
    {
      title: "Full-Stack Product Manager",
      company: "Current Role",
      period: "2023 - Present",
      achievements: [
        "400% YoY blog revenue increase through content platform modernization",
        "150% increase in monthly organic users with headless CMS + search",
        "$35,000/month savings via email platform migration and automation",
        "125% YoY mobile revenue increase through experimentation program",
        "100% improvement in user interactions with AI-powered workflows"
      ],
      color: "bg-yellow-400"
    },
    {
      title: "Product Manager & AI Engineer",
      company: "Previous Leadership Roles",
      period: "2020 - 2023",
      achievements: [
        "Managed up to 11 engineers across multiple product initiatives",
        "10× increase in yearly A/B tests through systematic experimentation",
        "Built AI categorization system with Chrome extension for editorial workflows",
        "Led platform modernization projects with measurable business impact",
        "Implemented systems engineering practices (SysML/BPMN) for product clarity"
      ],
      color: "bg-cyan-400"
    },
    {
      title: "Systems Engineer & Web Developer", 
      company: "Early Career",
      period: "2018 - 2020",
      achievements: [
        "Built web platforms with content-first architectures",
        "Developed automation workflows with n8n and Windmill",
        "Created marketing automation systems with programmatic segmentation",
        "Designed and implemented search & data solutions with Typesense",
        "Established foundations in systems thinking and objective-first delivery"
      ],
      color: "bg-purple-400"
    }
  ];

  const education = [
    {
      degree: "Master of Science",
      field: "Product Management & Systems Engineering (PMASE)",
      school: "Georgia Institute of Technology",
      year: "2022",
      color: "bg-lime-400"
    },
    {
      degree: "Continuing Education",
      field: "AI/ML Engineering & Automation",
      school: "Various Platforms",
      year: "2023-2024",
      color: "bg-fuchsia-500"
    }
  ];

  const skillsMatrix = [
    {
      category: "Product Management",
      skills: [
        { name: "PRD Writing", level: "Expert", lastUsed: "Current" },
        { name: "Systems Modeling (SysML/BPMN)", level: "Advanced", lastUsed: "Current" },
        { name: "A/B Testing & Experimentation", level: "Expert", lastUsed: "Current" },
        { name: "Stakeholder Management", level: "Expert", lastUsed: "Current" }
      ]
    },
    {
      category: "AI/Automation",
      skills: [
        { name: "LangChain/LangGraph", level: "Advanced", lastUsed: "Current" },
        { name: "Agent Evaluation Loops", level: "Advanced", lastUsed: "Current" },
        { name: "n8n/Windmill Workflows", level: "Expert", lastUsed: "Current" },
        { name: "OpenAI API & Prompt Engineering", level: "Advanced", lastUsed: "Current" }
      ]
    },
    {
      category: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: "Advanced", lastUsed: "Current" },
        { name: "TypeScript", level: "Advanced", lastUsed: "Current" },
        { name: "Chrome Extensions", level: "Advanced", lastUsed: "Current" },
        { name: "Tailwind CSS", level: "Advanced", lastUsed: "Current" }
      ]
    },
    {
      category: "Backend/Data",
      skills: [
        { name: "Headless CMS (Directus/Sanity)", level: "Expert", lastUsed: "Current" },
        { name: "Search (Typesense)", level: "Advanced", lastUsed: "Current" },
        { name: "PostgreSQL", level: "Advanced", lastUsed: "Current" },
        { name: "API Design & Integration", level: "Advanced", lastUsed: "Current" }
      ]
    }
  ];

  const achievements = [
    { text: "400% YoY blog revenue increase", color: "bg-red-400" },
    { text: "$35,000/month platform savings", color: "bg-yellow-400" },
    { text: "150% organic user growth", color: "bg-green-400" },
    { text: "125% YoY mobile revenue increase", color: "bg-blue-400" },
    { text: "100% improvement in user interactions", color: "bg-purple-400" },
    { text: "10× increase in yearly A/B tests", color: "bg-cyan-400" },
    { text: "Georgia Tech MS (PMASE)", color: "bg-lime-400" },
    { text: "Up to 11 engineers managed", color: "bg-fuchsia-500" }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'experience':
        return (
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${job.color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 rotate-smooth`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-black">{job.title}</h3>
                    <p className="text-lg font-bold text-black">{job.company}</p>
                  </div>
                  <span className="bg-black text-white px-3 py-1 font-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2 text-black">
                      <Star className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="font-bold">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`${edu.color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 rotate-smooth`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-black">{edu.degree}</h3>
                    <p className="text-lg font-bold text-black">{edu.field}</p>
                    <p className="text-black font-bold">{edu.school}</p>
                  </div>
                  <span className="bg-black text-white px-3 py-1 font-black">
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            {skillsMatrix.map((category, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black mb-4 bg-yellow-300 inline-block px-3 py-1 border-2 border-black">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                      <span className="font-bold text-black">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-black border border-black ${
                          skill.level === 'Expert' ? 'bg-green-400' :
                          skill.level === 'Advanced' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}>
                          {skill.level}
                        </span>
                        <span className="text-xs text-gray-600">{skill.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                className={`${achievement.color} border-4 border-black p-4 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:rotate-3 transition-transform duration-200 rotate-smooth-hover`}
              >
                <Award className="w-8 h-8 mx-auto mb-2 text-black" />
                <p className="font-black text-black">{achievement.text}</p>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6">
            BACKGROUND
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Full-stack Product Manager × AI/Automation Engineer × Web Developer with systems engineering rigor.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 bg-cyan-400 border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Mail className="w-4 h-4" />
            <span className="font-black">nick@roth.com</span>
          </div>
          <div className="flex items-center space-x-2 bg-lime-400 border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <MapPin className="w-4 h-4" />
            <span className="font-black">Remote / US</span>
          </div>
          <button className="flex items-center space-x-2 bg-yellow-300 border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <Download className="w-4 h-4" />
            <span className="font-black">PDF RESUME</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-black text-white translate-x-1 translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}