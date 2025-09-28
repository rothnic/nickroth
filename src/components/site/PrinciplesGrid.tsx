'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PRINCIPLES = [
  {
    title: 'Systems over heroics',
    description: 'Programs and rituals that survive leadership changes, with documentation and automation built in.',
  },
  {
    title: 'Evidence-led decisions',
    description: 'Mixed-method research and analytics instrumentation so strategy is grounded in signal, not noise.',
  },
  {
    title: 'Teams as the multiplier',
    description: 'Coaching and enablement make outcomes stick. Every engagement includes capability building and playbooks.',
  },
];

export function PrinciplesGrid() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Operating principles
        </Badge>
        <h2 className="text-3xl font-heading sm:text-4xl">How I show up in every partnership</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-foreground/75">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
