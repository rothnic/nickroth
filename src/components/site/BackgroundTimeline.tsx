'use client';

import { Calendar } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineItem {
  timeframe: string;
  role: string;
  company: string;
  highlights: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    timeframe: '2023 – Present',
    role: 'Fractional product & systems leader',
    company: 'Independent',
    highlights: [
      'Partnering with growth-stage companies to ship AI-assisted tools, marketing automation, and product operations programs.',
      'Building design system foundations and documentation so internal teams can scale delivery.',
    ],
  },
  {
    timeframe: '2021 – 2023',
    role: 'Technical Product Manager & AI Lead',
    company: 'DealNews',
    highlights: [
      'Led migration to a cost-efficient email platform, saving $35k/mo while improving deliverability.',
      'Designed and launched AI-assisted categorization workflow with 94% accuracy and 85% less manual effort.',
    ],
  },
  {
    timeframe: '2016 – 2021',
    role: 'Head of Product & Experience Design',
    company: 'Various startups & studios',
    highlights: [
      'Guided cross-disciplinary teams through zero-to-one product launches in healthcare, fintech, and developer tooling.',
      'Established research programs, experimentation rituals, and continuous discovery cadences.',
    ],
  },
];

export function BackgroundTimeline() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-6">
        <h2 className="text-3xl font-heading sm:text-4xl">Career arc</h2>
        <p className="max-w-3xl text-base font-base text-foreground/75">
          A through-line of systems thinking and cross-functional leadership &mdash; connecting strategy, operations, and execution to help teams ship meaningful change.
        </p>
      </div>
      <div className="grid gap-6">
        {TIMELINE.map((item) => (
          <Card key={item.timeframe}>
            <CardHeader className="gap-2">
              <CardTitle className="flex items-center justify-between text-xl">
                <span>{item.role}</span>
                <span className="flex items-center gap-2 text-sm font-heading text-foreground/70">
                  <Calendar className="size-4" />
                  {item.timeframe}
                </span>
              </CardTitle>
              <CardDescription className="text-sm uppercase tracking-wide text-foreground/70">
                {item.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-foreground/75">
              {item.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-main" aria-hidden></span>
                  <span>{highlight}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
