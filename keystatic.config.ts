import { config } from "@keystatic/core";

const repo = {
        owner: "rothnic",
        name: "nickroth",
} as const;

export default config({
        storage: {
                kind: "github",
                repo,
                branchPrefix: "draft/keystatic",
                pathPrefix: "content",
        },
        ui: {
                brand: {
                        name: "Nick Roth",
                },
        },
});
