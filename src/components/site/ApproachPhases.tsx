'use client';

import { ClipboardCheck, LayoutDashboard, Rocket } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PHASES = [
  {
    key: 'discover',
    title: 'Discover & align',
    icon: ClipboardCheck,
    summary:
      'Clarify the problem space, success metrics, and the true constraints shaping the engagement.',
    steps: [
      'Stakeholder interviews & product audit',
      'Metrics review and success definition',
      'Experience mapping and opportunity framing',
    ],
  },
  {
    key: 'design',
    title: 'Design & prove',
    icon: LayoutDashboard,
    summary:
      'Co-create system foundations, validate assumptions, and deliver the documentation that keeps teams aligned.',
    steps: [
      'Experience architecture & service blueprinting',
      'System design & component documentation',
      'Prototyping with engineering partnership',
    ],
  },
  {
    key: 'activate',
    title: 'Activate & scale',
    icon: Rocket,
    summary:
      'Ensure adoption with enablement programming, rituals, and governance built for your team’s pace.',
    steps: [
      'Playbooks and onboarding workshops',
      'Design ops + product ops instrumentation',
      'Ongoing advisory for roadmap checkpoints',
    ],
  },
];

export function ApproachPhases() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Engagement model
        </Badge>
        <h1 className="text-4xl font-heading sm:text-5xl">How we move from ambiguity to launch</h1>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          Every partnership flexes to your team, but the heartbeat stays the same: orient, co-create, and activate with confidence. Tabs below unpack the deliverables inside each phase.
        </p>
      </div>
      <Tabs defaultValue={PHASES[0].key} className="w-full">
        <TabsList className="flex w-full flex-wrap justify-center gap-2 border-2 border-border bg-secondary-background p-2">
          {PHASES.map((phase) => (
            <TabsTrigger key={phase.key} value={phase.key} className="min-w-[160px]">
              {phase.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {PHASES.map((phase) => (
          <TabsContent key={phase.key} value={phase.key} className="mt-6">
            <Card>
              <CardHeader className="gap-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <phase.icon className="size-6" />
                  {phase.title}
                </CardTitle>
                <CardDescription className="text-base text-foreground/80">
                  {phase.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-foreground/70">
                {phase.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-main" aria-hidden></span>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
