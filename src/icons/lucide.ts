export type LucideIconDefinition = {
        paths?: string[];
        circles?: Array<{ cx: number; cy: number; r: number }>;
};

export const lucideIcons = {
        home: {
                paths: [
                        "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
                        "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
                ],
        },
        target: {
                circles: [
                        { cx: 12, cy: 12, r: 10 },
                        { cx: 12, cy: 12, r: 6 },
                        { cx: 12, cy: 12, r: 2 },
                ],
        },
        user: {
                paths: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"],
                circles: [{ cx: 12, cy: 7, r: 4 }],
        },
        "file-text": {
                paths: [
                        "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
                        "M14 2v4a2 2 0 0 0 2 2h4",
                        "M10 9H8",
                        "M16 13H8",
                        "M16 17H8",
                ],
        },
        zap: {
                paths: [
                        "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
                ],
        },
        "chevron-down": {
                paths: ["m6 9 6 6 6-6"],
        },
        menu: {
                paths: ["M4 5h16", "M4 12h16", "M4 19h16"],
        },
        x: {
                paths: ["M18 6 6 18", "m6 6 12 12"],
        },
        "arrow-down": {
                paths: ["M12 5v14", "m19 12-7 7-7-7"],
        },
        brain: {
                paths: [
                        "M12 18V5",
                        "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",
                        "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",
                        "M17.997 5.125a4 4 0 0 1 2.526 5.77",
                        "M18 18a4 4 0 0 0 2-7.464",
                        "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",
                        "M6 18a4 4 0 0 1-2-7.464",
                        "M6.003 5.125a4 4 0 0 0-2.526 5.77",
                ],
        },
        code: {
                paths: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
        },
} as const satisfies Record<string, LucideIconDefinition>;

export type LucideIconName = keyof typeof lucideIcons;
