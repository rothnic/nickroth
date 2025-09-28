'use client';

import { Menu, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Approach', href: '/approach' },
  { label: 'Background', href: '/background' },
  { label: 'Work', href: '/work' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/contact' },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-secondary-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] w-full max-w-[var(--container-width)] items-center justify-between gap-4 px-5">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-heading text-foreground"
        >
          <span className="flex size-11 items-center justify-center rounded-base border-2 border-border bg-main text-2xl font-heading text-main-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
            NR
          </span>
          <span className="hidden flex-col text-sm leading-tight sm:flex">
            <span className="font-heading uppercase tracking-wide">Nick Roth</span>
            <span className="font-base text-foreground/70">Product systems leader</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <NavigationMenu viewport={false} className="border-none bg-transparent p-0 shadow-none">
            <NavigationMenuList className="gap-2 bg-transparent">
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="rounded-base border-2 border-transparent px-3 py-2 text-sm font-heading text-foreground transition-all hover:border-border hover:bg-main hover:text-main-foreground"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Badge variant="neutral" className="text-xs uppercase">
            Building resilient digital products
          </Badge>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <a href="/contact" className="flex items-center gap-2">
              Start a project
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs border-l-4 border-border bg-secondary-background">
            <SheetHeader className="gap-3">
              <SheetTitle className="text-lg uppercase tracking-wide">Navigate</SheetTitle>
              <p className="font-base text-sm text-foreground/70">
                Explore the systems, case studies, and background that shape Nick&rsquo;s work.
              </p>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-base border-2 border-border bg-background px-4 py-3 text-base font-heading text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
                    item.href === '/contact' && 'bg-main text-main-foreground'
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <SheetFooter className="mt-8">
              <p className="text-sm font-base text-foreground/70">
                New engagements open for Spring 2025. Let&rsquo;s build the next resilient platform together.
              </p>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
