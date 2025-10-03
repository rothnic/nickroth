import type { LucideIconName } from "../icons/lucide";

type StickerPosition =
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right"
        | "top-center"
        | "bottom-center"
        | "middle-left"
        | "middle-right";

export type HeroSticker = {
        label: string;
        position: StickerPosition;
        rotation: number;
        colorClass: string;
        textClass?: string;
        size?: "sm" | "md" | "lg";
};

export type HeroCtaVariant = "primary" | "secondary";

export type HeroCta = {
        label: string;
        href: string;
        variant: HeroCtaVariant;
};

export type HeroFloatingBadge = {
        label: string;
        icon: LucideIconName;
        rotation: number;
        colorClass: string;
        textClass?: string;
};

export type HeroContent = {
        name: {
                first: string;
                last: string;
        };
        floatingBadges: HeroFloatingBadge[];
        stickers: HeroSticker[];
        ctas: HeroCta[];
        statement: {
                leading: string;
                highlight: string;
                trailing: string;
        };
        scrollCta: {
                label: string;
                href: string;
        };
        portraitAlt: string;
};

export const heroContent: HeroContent = {
        name: {
                first: "NICK",
                last: "ROTH",
        },
        floatingBadges: [
                {
                        label: "FULL-STACK PM",
                        icon: "zap",
                        rotation: -8,
                        colorClass: "bg-lime-300",
                        textClass: "text-black",
                },
                {
                        label: "AI ENGINEER",
                        icon: "brain",
                        rotation: 5,
                        colorClass: "bg-cyan-300",
                        textClass: "text-black",
                },
                {
                        label: "AUTOMATION",
                        icon: "code",
                        rotation: -3,
                        colorClass: "bg-yellow-300",
                        textClass: "text-black",
                },
        ],
        stickers: [
                {
                        label: "PRODUCT",
                        position: "top-right",
                        rotation: 12,
                        colorClass: "bg-fuchsia-500",
                        textClass: "text-white",
                        size: "lg",
                },
                {
                        label: "ENGINEER",
                        position: "bottom-left",
                        rotation: -12,
                        colorClass: "bg-yellow-300",
                        textClass: "text-black",
                        size: "lg",
                },
                {
                        label: "AI",
                        position: "middle-right",
                        rotation: 90,
                        colorClass: "bg-lime-400",
                        textClass: "text-black",
                },
                {
                        label: "GT MS",
                        position: "top-left",
                        rotation: -6,
                        colorClass: "bg-black",
                        textClass: "text-white font-mono",
                },
        ],
        ctas: [
                { label: "View my work", href: "/work", variant: "primary" },
                { label: "Let's talk", href: "/contact", variant: "secondary" },
        ],
        statement: {
                leading: "I turn business objectives into",
                highlight: "shippable systems",
                trailing: "— model the business, specify precisely, and build only what moves the needle.",
        },
        scrollCta: {
                label: "Scroll to process",
                href: "#process",
        },
        portraitAlt: "Nick Roth",
};
