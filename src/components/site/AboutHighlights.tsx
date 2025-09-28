'use client';

import { Award, Compass, Network } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutHighlights() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Who I partner with
        </Badge>
        <h1 className="text-4xl font-heading sm:text-5xl">Fractional leader for product systems work</h1>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          From Series A startups to Fortune 500 innovation labs, I work with teams navigating pivotal moments &mdash; replatforming, new product launches, or scaling design and product operations so everyone can execute with clarity.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Compass className="size-6" />
              Product direction &amp; discovery
            </CardTitle>
            <CardDescription>
              Ten years of leading product, research, and service design efforts across healthcare, fintech, devtools, and marketplaces.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            Facilitation, qualitative research, and business modeling to frame the right bets and de-risk investments early.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Network className="size-6" />
              Systems &amp; enablement
            </CardTitle>
            <CardDescription>
              Built and scaled design systems, documentation programs, and engineering partnerships for orgs from 15 to 500+.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            I translate systems thinking into practical rituals, tooling, and governance so teams can ship with confidence.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Award className="size-6" />
              Outcomes over output
            </CardTitle>
            <CardDescription>
              Trusted by executives, design leaders, and engineering leads to guide high-stakes programs and launch resilient platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            My work pairs measurable business results with team uplift &mdash; capability building is baked into every engagement.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
