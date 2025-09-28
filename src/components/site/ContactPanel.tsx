'use client';

import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactPanel() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Let&rsquo;s collaborate
        </Badge>
        <h1 className="text-4xl font-heading sm:text-5xl">Ready to design the next resilient release?</h1>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          Share a few sentences about your team, product, and current challenge. I&rsquo;ll respond within two business days with next steps or resources that can help.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <MessageSquare className="size-6" />
              Project inquiries
            </CardTitle>
            <CardDescription>
              For new engagements, workshops, or fractional leadership support.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-foreground/75">
            <p>Email a quick summary of your initiative, timeline, and the outcomes you&rsquo;re targeting.</p>
            <Button asChild size="lg">
              <a href="mailto:hello@nickroth.com" className="flex items-center gap-2">
                hello@nickroth.com
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Phone className="size-6" />
              Advisory sessions
            </CardTitle>
            <CardDescription>
              Book a 60-minute working session for rapid feedback or roadmap triage.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-foreground/75">
            <p>We&rsquo;ll review your current artifacts and leave you with prioritized next steps.</p>
            <Button asChild variant="neutral" size="lg">
              <a href="https://cal.com/nickroth/discovery" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                Schedule on Cal.com
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
