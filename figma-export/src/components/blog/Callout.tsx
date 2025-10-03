import { AlertCircle, Info, CheckCircle, Zap, Lightbulb, AlertTriangle } from 'lucide-react';
import { StickerBadge } from '../StickerBadge';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'danger' | 'tip' | 'note';
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    color: 'bg-blue-50 border-blue-500 text-blue-900',
    iconColor: 'text-blue-500',
    badgeColor: 'bg-blue-400',
    label: 'INFO'
  },
  warning: {
    icon: AlertTriangle,
    color: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    iconColor: 'text-yellow-500',
    badgeColor: 'bg-yellow-400',
    label: 'WARNING'
  },
  success: {
    icon: CheckCircle,
    color: 'bg-green-50 border-green-500 text-green-900',
    iconColor: 'text-green-500',
    badgeColor: 'bg-green-400',
    label: 'SUCCESS'
  },
  danger: {
    icon: AlertCircle,
    color: 'bg-red-50 border-red-500 text-red-900',
    iconColor: 'text-red-500',
    badgeColor: 'bg-red-400',
    label: 'DANGER'
  },
  tip: {
    icon: Lightbulb,
    color: 'bg-purple-50 border-purple-500 text-purple-900',
    iconColor: 'text-purple-500',
    badgeColor: 'bg-purple-400',
    label: 'TIP'
  },
  note: {
    icon: Zap,
    color: 'bg-cyan-50 border-cyan-500 text-cyan-900',
    iconColor: 'text-cyan-500',
    badgeColor: 'bg-cyan-400',
    label: 'NOTE'
  }
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`my-6 p-6 border-l-8 border-4 border-black ${config.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 relative`}>
      {/* Badge */}
      <div className="absolute -top-3 -right-3">
        <StickerBadge color={config.badgeColor} size="sm" rotation={15} className="font-mono font-bold">
          {config.label}
        </StickerBadge>
      </div>

      <div className="flex items-start gap-4">
        <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-1`} />
        <div className="flex-1">
          {title && (
            <h4 className="font-display font-bold text-lg mb-2">
              {title}
            </h4>
          )}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}