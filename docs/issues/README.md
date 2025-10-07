# Documentation Issues

This folder tracks issues discovered during documentation review that require attention.

## Purpose

When reviewing and organizing documentation, we often discover:
- **Code issues** that need fixing (but are outside doc-cleanup scope)
- **Missing documentation** that should be written
- **Outdated content** that needs updating based on implementation
- **Conflicting instructions** across multiple files
- **Broken references** to removed/changed code

Rather than letting these findings get lost, we document them here with enough detail for future action.

## Contents

- **`documentation-issues.md`** - Active documentation problems discovered during reviews
- **`resolved-issues.md`** - Archive of fixed issues (for reference)

## Issue Format

Each issue should include:
- **File**: Path to the problematic documentation
- **Type**: Outdated | Conflicting | Missing | Incorrect | Broken-Link
- **Severity**: High | Medium | Low
- **Found**: Date discovered
- **Description**: What's wrong
- **Current State**: What the doc says now
- **Expected State**: What it should say (with evidence)
- **Related Files**: Other docs and code files involved
- **Recommended Action**: Specific steps to resolve

## Workflow

1. **Discovery**: During doc cleanup, issues are logged here
2. **Triage**: Review and prioritize documented issues
3. **Resolution**: Fix issues (code changes if needed)
4. **Cleanup**: Move resolved issues to `resolved-issues.md`

## Related Documentation

- [Documentation Instructions](../../.github/instructions/documentation.instructions.md)
- [Documentation Mode](../../.github/chatmodes/Documentation.chatmode.md)
- [Doc Cleanup Prompt](../../.github/prompts/docCleanup.prompt.md)
