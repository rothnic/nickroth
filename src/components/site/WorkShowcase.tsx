'use client';

import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface WorkItem {
  slug: string;
  title: string;
  description: string;
  company: string;
  role: string;
  tags: string[];
  category?: string;
  impact?: string;
}

interface WorkShowcaseProps {
  items: WorkItem[];
}

export function WorkShowcase({ items }: WorkShowcaseProps) {
  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Recent systems in the wild
        </Badge>
        <h2 className="text-3xl font-heading sm:text-4xl">Work that blends strategy, craft, and enablement</h2>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          A sample of partnerships where we shipped durable product foundations, design systems, and platform improvements that unlocked the next stage of growth.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <Card key={item.slug} className="h-full">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral" className="uppercase tracking-wide">
                  {item.company}
                </Badge>
                {item.category && (
                  <Badge variant="default" className="uppercase tracking-wide">
                    {item.category}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <CardDescription className="text-base text-foreground/80">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-foreground/70">
              <div>
                <span className="font-heading text-xs uppercase tracking-wide text-foreground">Role</span>
                <p>{item.role}</p>
              </div>
              {item.impact && (
                <div>
                  <span className="font-heading text-xs uppercase tracking-wide text-foreground">Impact</span>
                  <p>{item.impact}</p>
                </div>
              )}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 6).map((tag) => (
                    <Badge key={tag} variant="neutral" className="text-[11px] uppercase tracking-wide">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button asChild variant="neutral">
                <a href={`/work/${item.slug}`} className="flex items-center gap-2">
                  Read case study
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg">
          <a href="/work">Browse full portfolio</a>
        </Button>
      </div>
    </section>
  );
}
