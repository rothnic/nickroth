import type { LucideIconName } from "../icons/lucide";

export type NavigationItem = {
        href: string;
        label: string;
        icon: LucideIconName;
};

export type NavigationDemoItem = {
        href: string;
        label: string;
        description: string;
};

export type NavigationData = {
        brand: {
                first: string;
                last: string;
        };
        items: NavigationItem[];
        demoItems: NavigationDemoItem[];
};

export const navigationData: NavigationData = {
        brand: {
                first: "NICK",
                last: "ROTH",
        },
        items: [
                { href: "/", label: "Home", icon: "home" },
                { href: "/focus", label: "Focus", icon: "target" },
                { href: "/background", label: "Background", icon: "user" },
                { href: "/writing", label: "Writing", icon: "file-text" },
        ],
        demoItems: [
                { href: "/demo/cards", label: "Cards", description: "Card component showcase" },
                { href: "/demo/typography", label: "Typography", description: "Text and heading components" },
                { href: "/demo/buttons", label: "Buttons", description: "Interactive button components" },
                { href: "/demo/ui-elements", label: "UI Elements", description: "Badges, dividers, and form elements" },
                { href: "/demo/list-components", label: "Lists", description: "Navigation and list-based components" },
                { href: "/demo/blog-components", label: "Blog", description: "Quotes, callouts, and long-form UI" },
        ],
};
