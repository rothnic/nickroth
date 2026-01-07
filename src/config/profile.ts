// Centralized profile and site configuration
// Use this for consistent information across all pages

export const profile = {
  name: "Nick Roth",
  title: "Director of Product Management",
  location: "Huntsville, AL",
  timezone: "America/Chicago",
  
  // Social links
  linkedin: "https://www.linkedin.com/in/nicholasleeroth/",
  github: "https://github.com/rothnic",
  
  // Email obfuscation parts (assembled client-side for spam protection)
  emailParts: ["nlr06886", "gmail.com"],
  
  // Meta descriptions
  tagline: "Product & Systems Director specializing in automation, AI integration, and platform modernization.",
  
  // Availability
  availability: {
    consulting: true,
    fractional: true,
    remote: true,
  },
} as const;

export type Profile = typeof profile;
