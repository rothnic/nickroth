import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { kitchenSinkPost } from '../data/kitchenSinkPost';

interface BlogProps {
  onPostClick: (post: any) => void;
}

export function Blog({ onPostClick }: BlogProps) {
  const posts = [
    // Kitchen Sink Post - showcasing all blog features
    {
      ...kitchenSinkPost,
      color: "bg-gradient-to-br from-purple-400 to-blue-500",
      trending: true,
      // Keep the author as string from kitchenSinkPost
      cardAuthor: {
        name: "Nick Roth",
        avatar: "/api/placeholder/64/64"
      }
    },
    {
      id: 1,
      title: "Objective-First Discovery: Beyond Feature Requests",
      excerpt: "How to start from business outcomes, not tools. A framework for understanding what really drives value.",
      content: "Most product discovery starts with the wrong question. Teams ask 'What features should we build?' instead of 'What business objectives are we trying to achieve?' This fundamental misalignment leads to feature factories that ship outputs without outcomes.\\n\\nObjective-first discovery flips the script. We start by clearly defining the business problem, quantifying the current state, and establishing measurable success criteria. Only then do we explore solutions.\\n\\nThe process begins with stakeholder interviews focused on business context, not feature requests. I use a structured interview format that uncovers the real pain points behind feature requests. What metrics are underperforming? What workflows are broken? What customer behaviors are we trying to change?\\n\\nNext comes the modeling phase. I create SysML diagrams to map current state workflows and identify bottlenecks. BPMN diagrams help visualize process flows and decision points. This isn't academic exercise—it's practical business modeling that reveals opportunities.\\n\\nWith the business context clear, I write a crisp PRD that starts with objectives and constraints before diving into solutions. The acceptance criteria focus on measurable outcomes, not feature completeness.\\n\\nThis approach has consistently delivered better results. The platform modernization project started with the objective 'increase content velocity by 50%' rather than 'implement headless CMS.' The result was a 400% YoY increase in blog revenue because we optimized for the right metrics.\\n\\nObjective-first discovery takes more upfront work but saves months of building the wrong thing. When teams align on outcomes before outputs, magic happens.",
      date: "2024-03-15",
      readTime: "6 min read",
      category: "Product Strategy",
      color: "bg-red-400",
      trending: true,
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzU4OTcwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: {
        name: "Nick Roth",
        avatar: "/api/placeholder/64/64"
      }
    },
    {
      id: 2,
      title: "Agent Evaluation Loops: Beyond Prompt Engineering",
      excerpt: "How to build reliable AI agents with systematic evaluation and continuous improvement workflows.",
      content: "Most AI agent implementations fail because teams focus on prompt engineering instead of evaluation engineering. A good prompt without systematic evaluation is just expensive guesswork.\\n\\nThe key insight: agents need continuous feedback loops, just like any other product. You wouldn't ship a feature without analytics—don't ship an agent without evaluation frameworks.\\n\\nI use a three-layer evaluation approach. First, unit tests for individual agent functions. Can the agent correctly extract structured data from unstructured input? Does it handle edge cases gracefully? These tests run on every deployment.\\n\\nSecond, integration tests for multi-step workflows. Real agent tasks involve multiple decisions and actions. I create test scenarios that mirror production workflows and measure end-to-end success rates.\\n\\nThird, production monitoring with human checkpoints. Every agent action gets logged with context, input, and output. A sample gets reviewed by humans to catch drift and edge cases that automated tests miss.\\n\\nThe evaluation data feeds back into training. Poor performance patterns become new test cases. Edge case failures become training examples. This creates a flywheel where agents get better with every interaction.\\n\\nFor the AI categorization system, this approach improved accuracy from 60% to 92% over six months. The secret wasn't better prompts—it was better evaluation and systematic improvement based on real usage patterns.\\n\\nTreat your AI agents like products, not scripts. Measure, iterate, and improve systematically.",
      date: "2024-03-08",
      readTime: "7 min read",
      category: "AI Engineering",
      color: "bg-blue-400",
      trending: false,
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBhaSUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzU4OTcwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: {
        name: "Nick Roth",
        avatar: "/api/placeholder/64/64"
      }
    },
    {
      id: 3,
      title: "LangChain vs LangGraph: When to Use Each",
      excerpt: "Practical guidance on choosing the right orchestration framework for your AI workflow needs.",
      content: "The AI orchestration landscape is evolving rapidly. LangChain and LangGraph serve different needs, and choosing the wrong one can derail your project.\\n\\nLangChain excels at linear workflows with clear input-output patterns. It's perfect for RAG systems, document processing pipelines, and straightforward agent tasks. The mental model is simple: chain components together in sequence.\\n\\nLangGraph shines for complex, multi-step workflows with conditional logic and loops. When your agent needs to make decisions, backtrack, or handle multiple concurrent tasks, LangGraph's state machine approach is superior.\\n\\nI learned this the hard way. The first version of our content categorization system used LangChain for everything. Simple categorization worked fine, but complex editorial workflows with multiple review stages became unwieldy. The code was full of custom logic to handle state transitions.\\n\\nSwitching to LangGraph for the complex workflows was transformative. The state machine model made conditional logic explicit and debuggable. Agent behavior became predictable and testable.\\n\\nMy decision framework: Use LangChain for linear, stateless workflows where each step has clear inputs and outputs. Use LangGraph when you need state management, conditional execution, or human-in-the-loop workflows.\\n\\nDon't try to force LangChain to handle complex state—you'll end up rebuilding what LangGraph already provides. Pick the right tool for the job and your future self will thank you.\\n\\nThe AI tooling ecosystem moves fast, but understanding the core patterns helps you make better architectural decisions that last.",
      date: "2024-02-28",
      readTime: "5 min read",
      category: "Technical",
      color: "bg-green-400",
      trending: false,
      imageUrl: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTg5NzAwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: {
        name: "Nick Roth",
        avatar: "/api/placeholder/64/64"
      }
    },
    {
      id: 4,
      title: "PRD Acceptance Criteria That Actually Work",
      excerpt: "How to write acceptance criteria that prevent scope creep and ensure teams build the right thing.",
      content: "Most PRDs fail because the acceptance criteria are either too vague ('intuitive user experience') or too specific ('button should be #FF0000 red'). Good acceptance criteria focus on measurable outcomes, not implementation details.\\n\\nI use the GIVEN-WHEN-THEN format with a twist: every criterion must be objectively verifiable. No subjective language allowed. Instead of 'users should find the feature easy to use,' write 'task completion rate should exceed 90% in usability testing.'\\n\\nThe key insight: acceptance criteria should describe the problem you're solving, not the solution you're building. This gives engineering teams flexibility to find the best implementation while ensuring business objectives are met.\\n\\nFor the email platform migration, my acceptance criteria focused on delivery rates, segmentation accuracy, and cost reduction targets. I didn't specify which email service to use or how to implement segmentation logic. The result: engineering chose better solutions than I would have prescribed.\\n\\nStructure matters. I organize acceptance criteria into three categories: Functional (what the system must do), Non-functional (performance, security, scalability), and Business (metrics that matter to stakeholders).\\n\\nEvery criterion gets a verification method: automated test, manual test, or metric measurement. If you can't verify a criterion objectively, it doesn't belong in the PRD.\\n\\nThis approach eliminates most scope creep. When requests arise that aren't covered by acceptance criteria, you can point to the PRD and say 'that's a valid enhancement for the next iteration.'\\n\\nGood acceptance criteria aren't about controlling engineering—they're about aligning the entire team on what success looks like.",
      date: "2024-02-20",
      readTime: "8 min read",
      category: "Product Strategy",
      color: "bg-purple-400",
      trending: true,
      imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHBsYW5uaW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzU4OTcwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: {
        name: "Nick Roth",
        avatar: "/api/placeholder/64/64"
      }
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6">
            LATEST <span className="bg-black text-white px-3 py-1 transform rotate-2 inline-block rotate-smooth">THOUGHTS</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Insights on systems engineering, AI orchestration, and objective-first product delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              layoutId={`post-container-${post.id}`}
              onClick={() => onPostClick(post)}
              className={`${post.color} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:rotate-1 cursor-pointer group overflow-hidden rotate-smooth-hover`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <motion.div
                  layoutId={`post-image-${post.id}`}
                  className="relative"
                >
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>

                {/* Category badge overlay */}
                <motion.div 
                  layoutId={`post-category-${post.id}`}
                  className="absolute top-4 left-4"
                >
                  <span className="bg-black text-white px-3 py-1 font-black text-sm shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                    {post.category}
                  </span>
                </motion.div>
                
                {/* Trending badge */}
                {post.trending && (
                  <motion.div 
                    layoutId={`post-trending-${post.id}`}
                    className="absolute top-4 right-4"
                  >
                    <div className="flex items-center space-x-1 bg-yellow-300 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold">TRENDING</span>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="p-6">
                <motion.h3 
                  layoutId={`post-title-${post.id}`}
                  className="text-2xl font-black text-black mb-3 group-hover:text-white transition-colors duration-300"
                >
                  {post.title}
                </motion.h3>
                
                <p className="text-black mb-4 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-black group-hover:text-white transition-colors duration-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-bold">{new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-bold">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <button className="bg-black text-white px-4 py-2 border-2 border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-white group-hover:text-black transition-all duration-300">
                    READ MORE
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 border-4 border-black font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:rotate-1 rotate-smooth-hover">
            VIEW ALL POSTS
          </button>
        </div>
      </div>
    </section>
  );
}