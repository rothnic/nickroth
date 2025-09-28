'use client';

import { ArrowUpRight, PenTool, Workflow } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HomeHero() {
  return (
    <section className="relative mx-auto mt-12 flex w-full max-w-[var(--container-width)] flex-col gap-10 px-5 pb-16">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <Badge variant="neutral" className="text-xs uppercase tracking-wide">
            Product systems, delivered end-to-end
          </Badge>
          <h1 className="text-4xl font-heading leading-tight sm:text-5xl">
            Orchestrating resilient product platforms that scale with your team
          </h1>
          <p className="max-w-2xl text-lg font-base text-foreground/75">
            I partner with founders and product leaders to translate ambiguous problems into clear systems &mdash; aligning strategy, experience, and the design system so teams can ship faster with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="/work" className="flex items-center gap-2">
                See recent work
                <ArrowUpRight className="size-5" />
              </a>
            </Button>
            <Button asChild variant="neutral" size="lg">
              <a href="/approach">View the engagement playbook</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Workflow className="size-6" />
                End-to-end product leadership
              </CardTitle>
              <CardDescription>
                Discovery through launch: strategy, research, service design, product management, and delivery orchestration.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <PenTool className="size-6" />
                Systems that empower teams
              </CardTitle>
              <CardDescription>
                Design systems, front-end architecture, and enablement programs that keep multi-disciplinary teams moving in sync.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
