'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface CapabilityItem {
  slug: string;
  title: string;
  description: string;
  icon?: string;
}

interface CapabilitiesTabsProps {
  items: CapabilityItem[];
}

export function CapabilitiesTabs({ items }: CapabilitiesTabsProps) {
  if (!items.length) return null;

  const first = items[0]?.slug ?? 'capability-0';

  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Core capability stack
        </Badge>
        <h2 className="text-3xl font-heading sm:text-4xl">Where I create leverage for product teams</h2>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          Six disciplines that connect strategy, craft, and enablement. Explore each to see how engagements align to the outcomes you need most.
        </p>
      </div>
      <Tabs defaultValue={first} className="w-full">
        <TabsList className="flex w-full flex-wrap justify-start gap-2 overflow-x-auto border-2 border-border bg-secondary-background p-2">
          {items.map((item) => (
            <TabsTrigger key={item.slug} value={item.slug} className="min-w-[140px] text-sm">
              {item.icon && <span className="mr-2 text-lg" aria-hidden>{item.icon}</span>}
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((item) => (
          <TabsContent key={item.slug} value={item.slug} className="mt-6">
            <Card>
              <CardHeader className="flex flex-col gap-2">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  {item.icon && <span aria-hidden className="text-3xl">{item.icon}</span>}
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base text-foreground/80">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-foreground/65">
                <p>
                  Engagement types include audits, capability playbooks, roadmapping, and in-flight program leadership. Each capability is anchored in measurable outcomes and cross-functional enablement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
