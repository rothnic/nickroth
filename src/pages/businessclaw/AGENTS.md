# BusinessClaw OAuth Pages

## Summary
Complete OAuth application pages for Google Cloud Console verification, providing the required home page, privacy policy, and terms of service for the BusinessClaw productivity automation application.

## Files in This Directory

### 1. Home Page: `index.astro`
**URL:** https://www.nickroth.com/businessclaw/

Features:
- "BusinessClaw" branding with turtle logo
- Description: "Personalized and opinionated productivity automation for OpenClaw"
- Links to Privacy Policy and Terms of Service
- Feature cards highlighting core capabilities
- User control section with configurable approval workflows
- Key principles in accent-colored alert box

### 2. Privacy Policy: `privacy-policy.astro`
**URL:** https://www.nickroth.com/businessclaw/privacy-policy/

Content:
- BusinessClaw branding
- Data access and usage explanations
- Privacy and security practices
- Google API compliance
- Links to home page and terms
- Last updated: February 18, 2026

### 3. Terms of Service: `terms-of-service.astro`
**URL:** https://www.nickroth.com/businessclaw/terms-of-service/

Content:
- Application purpose and intended use
- Scope of Google API access
- "Personalized and opinionated" automation explanation
- No warranty and liability disclaimers
- Compliance information
- Links to home page and privacy policy
- Last updated: February 18, 2026

### 4. Logo Image
**Location:** `../../assets/images/businessclaw-logo.png`
- Turtle with briefcase illustration
- Imported via Astro Image component for optimization
- Displayed prominently on home page

## Google Cloud Console Configuration

Use these URLs in your OAuth consent screen:

```
App name: BusinessClaw

Application home page:
https://www.nickroth.com/businessclaw/

Application privacy policy link:
https://www.nickroth.com/businessclaw/privacy-policy/

Application terms of service link:
https://www.nickroth.com/businessclaw/terms-of-service/
```

## Design System

### Components Used
- `BaseLayout` - Page wrapper with meta tags
- `ContentLayout` - Content container with proper spacing
- `PageHeader` - Used on privacy/terms pages for consistent headers

### Styling Patterns
- **Main container:** Single card with `no-hover` class
- **Feature cards:** `bg-base-200 border border-base-300 no-hover` for subtle, non-interactive cards
- **Info alert:** Default alert with info icon and `border-info/20`
- **Key principles:** Accent-colored alert (`bg-accent/10 border-accent/30`) for subtle magenta-pink theming
- **Prose styling:** `prose prose-lg max-w-none` for content readability
- **Theme compatibility:** All colors work in both light and dark mode

### Colors
- **Primary:** Teal-green (`oklch(0.65 0.2 140)`)
- **Accent:** Magenta-pink (`oklch(0.7 0.2 320)`) - used for Key Principles
- **Base colors:** Theme-aware backgrounds and borders

## Purpose

BusinessClaw is positioned as a **personal productivity automation tool** that provides:
- Personalized and opinionated assistance
- Intelligent automation for Google services
- Configurable approval workflows for user control
- Local-only processing with no third-party data sharing

This differs from family/casual automation - it's focused on business productivity with smart, proactive features.

## Deployment

These pages are part of the main Astro site. Changes are deployed automatically via Cloudflare Pages when merged to main branch.

After deployment, update Google Cloud Console OAuth consent screen with the URLs above and submit for verification to eliminate 7-day token expiration.
