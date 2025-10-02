import { ExternalLink, Github, Star } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';
import { StickerBadge } from '../StickerBadge';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  stars,
  featured = false
}: ProjectCardProps) {
  const tagColors = [
    'bg-lime-400',
    'bg-cyan-400',
    'bg-fuchsia-400',
    'bg-yellow-300',
    'bg-orange-400',
    'bg-purple-400'
  ];

  return (
    <BaseCard
      background="bg-gradient-to-br from-lime-100 to-cyan-100"
      rotation={featured ? 2 : -1}
      className="max-w-sm"
    >
      <div className="flex flex-col h-full">
        <CardHeader
          title={title}
          subtitle={description}
          icon={
            <div className="w-12 h-12 bg-black text-white border-2 border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-mono font-bold text-lg">
              {title.charAt(0)}
            </div>
          }
          badge={
            featured ? (
              <StickerBadge color="bg-yellow-300" size="sm" rotation={15}>
                ⭐ FEATURED
              </StickerBadge>
            ) : undefined
          }
        />

        {/* Technologies */}
        <div className="mb-4 flex-grow">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <StickerBadge
                key={tech}
                color={tagColors[index % tagColors.length]}
                size="xs"
                className="font-mono"
              >
                {tech}
              </StickerBadge>
            ))}
          </div>
        </div>

        <CardFooter variant="actions">
          <div className="flex items-center space-x-2">
            {stars && (
              <div className="flex items-center space-x-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-mono font-bold">{stars}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {githubUrl && (
              <button className="p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5">
                <Github className="w-4 h-4" />
              </button>
            )}
            {liveUrl && (
              <button className="p-2 bg-blue-500 text-white border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5">
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </CardFooter>
      </div>
    </BaseCard>
  );
}