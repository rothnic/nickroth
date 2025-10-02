import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';
import { StickerBadge } from '../StickerBadge';

interface ProfileCardProps {
  name: string;
  role: string;
  company?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  skills?: string[];
  portfolioUrl?: string;
}

export function ProfileCard({
  name,
  role,
  company,
  email,
  phone,
  location,
  avatar,
  skills = [],
  portfolioUrl
}: ProfileCardProps) {
  return (
    <BaseCard
      background="bg-gray-50"
      rotation={0}
      className="max-w-sm"
    >
      <CardHeader
        title={name}
        subtitle={company ? `${role} at ${company}` : role}
        icon={
          avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-display font-black text-white text-xl">
              {name.charAt(0)}
            </div>
          )
        }
      />

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        {email && (
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-4 h-4 text-gray-600" />
            <span className="font-mono">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="font-mono">{phone}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="font-mono">{location}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h4 className="font-bold text-sm mb-2 text-gray-700">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill, index) => (
              <StickerBadge
                key={skill}
                color="bg-blue-100"
                size="xs"
                className="font-mono text-xs"
              >
                {skill}
              </StickerBadge>
            ))}
            {skills.length > 4 && (
              <StickerBadge
                color="bg-gray-200"
                size="xs"
                className="font-mono text-xs"
              >
                +{skills.length - 4}
              </StickerBadge>
            )}
          </div>
        </div>
      )}

      {portfolioUrl && (
        <CardFooter variant="actions">
          <div />
          <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 text-sm font-bold">
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </CardFooter>
      )}
    </BaseCard>
  );
}