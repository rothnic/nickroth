'use client';

import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface WorkArchiveItem {
  slug: string;
  title: string;
  description: string;
  company: string;
  role: string;
  tags: string[];
  impact?: string;
  startDate: string;
  endDate?: string;
}

interface WorkArchiveProps {
  items: WorkArchiveItem[];
}

export function WorkArchive({ items }: WorkArchiveProps) {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Case study archive
        </Badge>
        <h1 className="text-4xl font-heading sm:text-5xl">Systems work across industries</h1>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          A deeper view into the programs I&rsquo;ve led &mdash; spanning AI enablement, design system overhauls, product operations, and go-to-market acceleration.
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
                <Badge variant="default" className="uppercase tracking-wide">
                  {formatTimeframe(item.startDate, item.endDate)}
                </Badge>
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
                  {item.tags.map((tag) => (
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
                  View case study
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function formatTimeframe(start: string, end?: string) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : undefined;
  const format = (date: Date) =>
    date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  return `${format(startDate)} – ${endDate ? format(endDate) : 'Present'}`;
}
