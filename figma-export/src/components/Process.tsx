import { Lightbulb, Search, Wrench, Rocket, Cog } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: Search,
      title: "DISCOVER",
      description: "Interviews with stakeholders and AI-powered analysis. Understand the business context before building anything.",
      color: "bg-cyan-400",
      number: "01"
    },
    {
      icon: Lightbulb,
      title: "MODEL",
      description: "Map the business with SysML/BPMN diagrams. Visualize workflows, data flows, and system boundaries clearly.",
      color: "bg-yellow-400",
      number: "02"
    },
    {
      icon: Wrench,
      title: "SPECIFY",
      description: "Write a crisp PRD with clear acceptance criteria. Define precisely what success looks like before coding.",
      color: "bg-blue-400",
      number: "03"
    },
    {
      icon: Cog,
      title: "BUILD",
      description: "Leverage automation and developer-agent orchestration. Build with AI assistance and human checkpoints.",
      color: "bg-purple-400",
      number: "04"
    },
    {
      icon: Rocket,
      title: "PROVE",
      description: "Ship measurable slices with A/B tests and KPI tracking. Validate impact with data, not opinions.",
      color: "bg-green-400",
      number: "05"
    }
  ];

  return (
    <section id="process" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            MY <span className="bg-white text-black px-3 py-1 transform rotate-2 inline-block rotate-smooth">APPROACH</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Objective-first delivery with systems engineering rigor and experimentation discipline.
          </p>
        </div>

        {/* Desktop: 2x3 grid + 1 centered, Mobile: stacked */}
        <div className="hidden lg:block">
          {/* First row - 3 steps */}
          <div className="grid grid-cols-3 gap-12 mb-12">
            {steps.slice(0, 3).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="group relative">
                  <div className={`${step.color} border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 transform hover:rotate-1 min-h-[280px] rotate-smooth-hover`}>
                    <div className="flex items-center justify-between mb-6">
                      <Icon className="w-10 h-10 text-black" />
                      <span className="text-3xl font-black text-black">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black mb-6">{step.title}</h3>
                    <p className="text-black leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Second row - 2 steps centered */}
          <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
            {steps.slice(3, 5).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index + 3} className="group relative">
                  <div className={`${step.color} border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 transform hover:rotate-1 min-h-[280px] rotate-smooth-hover`}>
                    <div className="flex items-center justify-between mb-6">
                      <Icon className="w-10 h-10 text-black" />
                      <span className="text-3xl font-black text-black">{step.number}</span>
                    </div>
                    <h3 className="text-2xl font-black text-black mb-6">{step.title}</h3>
                    <p className="text-black leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile and Tablet: single column */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative">
                <div className={`${step.color} border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 transform hover:rotate-1 rotate-smooth-hover`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-black" />
                    <span className="text-2xl font-black text-black">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-black text-black mb-4">{step.title}</h3>
                  <p className="text-black leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white text-black px-8 py-4 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 rotate-smooth">
            <span className="font-black text-xl">RESULT:</span>
            <span className="text-lg">Products that users love and businesses thrive on</span>
          </div>
        </div>
      </div>
    </section>
  );
}