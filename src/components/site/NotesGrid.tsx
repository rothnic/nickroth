'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface NoteItem {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
}

interface NotesGridProps {
  items: NoteItem[];
}

export function NotesGrid({ items }: NotesGridProps) {
  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-[var(--container-width)] px-5">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <Badge variant="neutral" className="mx-auto text-xs uppercase tracking-wide">
          Notes and experiments
        </Badge>
        <h2 className="text-3xl font-heading sm:text-4xl">Field notes from the workbench</h2>
        <p className="mx-auto max-w-3xl text-base font-base text-foreground/75">
          Short reads covering systems thinking, enablement patterns, and product leadership lessons gathered while partnering with teams.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.slug} className="h-full">
            <CardHeader className="gap-2">
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription className="text-sm text-foreground/70">
                {new Date(item.publishDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-foreground/75">
              {item.description}
            </CardContent>
            <CardFooter className="mt-auto flex flex-wrap gap-2">
              {item.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="neutral" className="text-[11px] uppercase tracking-wide">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Badge variant="neutral" className="px-4 py-2 text-xs uppercase tracking-wide">
          <a href="/notes" className="no-underline">Browse the full archive →</a>
        </Badge>
      </div>
    </section>
  );
}
