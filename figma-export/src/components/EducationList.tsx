import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface Education {
  id: string;
  type: 'degree' | 'certification' | 'course';
  school: string;
  degree?: string;
  area?: string;
  end: string;
  description?: string;
  icon: React.ComponentType<any>;
  color: string;
}

const education: Education[] = [
  {
    id: 'msu-degree',
    type: 'degree',
    school: 'Michigan State University',
    degree: 'Bachelor of Arts',
    area: 'Political Science',
    end: '2016',
    description: 'Focused on research methodology, data analysis, and critical thinking—foundational skills that inform my analytical approach to product development.',
    icon: GraduationCap,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'ai-certification',
    type: 'certification',
    school: 'Various Platforms',
    degree: 'AI/ML Certifications',
    area: 'Machine Learning & AI Engineering',
    end: '2023-2024',
    description: 'Ongoing education in LLM development, prompt engineering, and AI system design through courses from fast.ai, Anthropic, and hands-on project work.',
    icon: Award,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'continuous-learning',
    type: 'course',
    school: 'Self-Directed Learning',
    degree: 'Technical Skills',
    area: 'Full-Stack Development & Product Management',
    end: 'Ongoing',
    description: 'Continuous learning through building real projects, contributing to open source, reading technical documentation, and staying current with industry best practices.',
    icon: BookOpen,
    color: 'from-green-400 to-emerald-500'
  }
];

export function EducationList() {
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-cmp="EducationList">
      {education.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="group"
          data-key={item.id}
        >
          <div className={`bg-gradient-to-br ${item.color} border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 p-6`}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Icon and Type */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-white opacity-90 uppercase tracking-wide">
                  {item.type}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="font-display text-xl font-black text-white mb-1">
                      {item.degree}
                    </h3>
                    <div className="text-white opacity-95 font-semibold">
                      {item.school}
                    </div>
                    {item.area && (
                      <div className="text-white opacity-80 text-sm">
                        {item.area}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 lg:mt-0">
                    <span className="bg-black text-white px-3 py-1 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                      {item.end}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <div className="bg-black bg-opacity-20 border border-white border-opacity-30 p-4">
                    <p className="text-white opacity-95 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Note about learning philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center"
      >
        <h3 className="font-display text-lg font-black mb-3">Learning Philosophy</h3>
        <p className="text-gray-700 text-sm max-w-2xl mx-auto">
          I believe the best learning happens through building real solutions to real problems. 
          While formal education provided foundational thinking skills, my technical expertise comes 
          from years of hands-on project work, reading source code, and iterating based on user feedback.
        </p>
      </motion.div>
    </div>
  );
}