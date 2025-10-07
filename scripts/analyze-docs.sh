#!/usr/bin/env bash
#
# Documentation Analysis Script
# Generates a comprehensive report on documentation structure, organization, and issues
#
# This script provides discovery and analysis (Phase 1 of docCleanup workflow).
# For validation checks, use: pnpm docs:validate (runs validate-docs.mjs)
#
# Usage: ./scripts/analyze-docs.sh

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BOLD}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║         Documentation Structure Analysis Report           ║${NC}"
echo -e "${BOLD}║                    $(date +"%Y-%m-%d %H:%M:%S")                    ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

cd "$PROJECT_ROOT"

# ==============================================================================
# SECTION 1: CHANGED FILES
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}1. RECENTLY CHANGED DOCUMENTATION${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}Changed vs main branch:${NC}"
if git diff --name-only main...HEAD -- '*.md' 2>/dev/null | grep -q .; then
    git diff --name-only main...HEAD -- '*.md' 2>/dev/null | sed 's/^/  ✓ /'
else
    echo -e "  ${GREEN}No changes vs main${NC}"
fi
echo ""

echo -e "${BOLD}Unstaged changes:${NC}"
if git diff --name-only -- '*.md' 2>/dev/null | grep -q .; then
    git diff --name-only -- '*.md' 2>/dev/null | sed 's/^/  ⚠ /'
else
    echo -e "  ${GREEN}No unstaged changes${NC}"
fi
echo ""

echo -e "${BOLD}Staged changes:${NC}"
if git diff --name-only --cached -- '*.md' 2>/dev/null | grep -q .; then
    git diff --name-only --cached -- '*.md' 2>/dev/null | sed 's/^/  + /'
else
    echo -e "  ${GREEN}No staged changes${NC}"
fi
echo ""

echo -e "${BOLD}Untracked markdown files:${NC}"
if git ls-files --others --exclude-standard '*.md' 2>/dev/null | grep -q .; then
    git ls-files --others --exclude-standard '*.md' 2>/dev/null | sed 's/^/  ? /'
else
    echo -e "  ${GREEN}No untracked files${NC}"
fi
echo ""

# ==============================================================================
# SECTION 2: FOLDER STRUCTURE
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}2. FOLDER STRUCTURE${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}Directory tree:${NC}"
find docs -type d | sort | sed 's|docs|  docs|'
echo ""

# ==============================================================================
# SECTION 3: FILE COUNT BY FOLDER
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}3. FILE COUNT BY FOLDER${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_FILES=$(find docs -type f -name "*.md" | wc -l | xargs)
echo -e "${BOLD}Total markdown files: ${TOTAL_FILES}${NC}"
echo ""

echo -e "${BOLD}Files per folder (⚠ = >15 files):${NC}"
find docs -type f -name "*.md" | sed 's|/[^/]*$||' | sort | uniq -c | while read count folder; do
    if [ "$count" -gt 15 ]; then
        echo -e "  ${YELLOW}⚠ ${count} files${NC} - ${folder}"
    else
        echo -e "  ${GREEN}✓ ${count} files${NC} - ${folder}"
    fi
done
echo ""

# ==============================================================================
# SECTION 4: ROOT DIRECTORY CHECK
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}4. DOCS ROOT DIRECTORY${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

ROOT_COUNT=$(find docs -maxdepth 1 -name "*.md" -type f | wc -l | xargs)
echo -e "${BOLD}Files in docs/ root: ${ROOT_COUNT} (should be exactly 4)${NC}"

if [ "$ROOT_COUNT" -eq 4 ]; then
    echo -e "  ${GREEN}✓ Correct count${NC}"
else
    echo -e "  ${RED}✗ Expected 4 files (README, roadmap, backlog, page-index)${NC}"
fi
echo ""

echo -e "${BOLD}Root files:${NC}"
find docs -maxdepth 1 -name "*.md" -type f | sort | while read file; do
    filename=$(basename "$file")
    case "$filename" in
        README.md|site-first-roadmap.md|component-backlog.md|page-index.md)
            echo -e "  ${GREEN}✓${NC} $filename"
            ;;
        *)
            echo -e "  ${RED}✗${NC} $filename ${RED}(should be in subfolder)${NC}"
            ;;
    esac
done
echo ""

# ==============================================================================
# SECTION 5: README CHECK
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}5. FOLDER README FILES${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}README.md status:${NC}"
find docs -mindepth 1 -maxdepth 1 -type d | sort | while read dir; do
    dirname=$(basename "$dir")
    if [ -f "$dir/README.md" ]; then
        echo -e "  ${GREEN}✓${NC} docs/${dirname}/ has README.md"
    else
        echo -e "  ${RED}✗${NC} docs/${dirname}/ ${RED}missing README.md${NC}"
    fi
done
echo ""

# ==============================================================================
# SECTION 6: NAMING ISSUES
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}6. FILE NAMING ISSUES${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}Checking for problematic names:${NC}"
PROBLEMATIC_FOUND=false

# Check for generic names (excluding allowed ones)
if find docs -name "*.md" 2>/dev/null | grep -iE "(notes|temp|misc|stuff)\.md$" >/dev/null 2>&1; then
    find docs -name "*.md" | grep -iE "(notes|temp|misc|stuff)\.md$" | while read file; do
        echo -e "  ${YELLOW}⚠${NC} Generic name: $file"
    done
    PROBLEMATIC_FOUND=true
fi

# Check for uppercase in filenames
if find docs -name "*.md" 2>/dev/null | grep -v README.md | grep '[A-Z]' >/dev/null 2>&1; then
    find docs -name "*.md" | grep '[A-Z]' | grep -v README.md | while read file; do
        echo -e "  ${YELLOW}⚠${NC} Uppercase in name: $file"
    done
    PROBLEMATIC_FOUND=true
fi

# Check for underscores instead of hyphens
if find docs -name "*_*.md" 2>/dev/null | grep -q .; then
    find docs -name "*_*.md" | while read file; do
        echo -e "  ${YELLOW}⚠${NC} Underscores instead of hyphens: $file"
    done
    PROBLEMATIC_FOUND=true
fi

if [ "$PROBLEMATIC_FOUND" = false ]; then
    echo -e "  ${GREEN}✓ No naming issues found${NC}"
fi
echo ""

# Special cases that might be questionable but are allowed
echo -e "${BOLD}Files with 'guide', 'system', 'reference', 'quick' in name:${NC}"
if find docs -name "*.md" 2>/dev/null | grep -iE "(guide|system|reference|quick)" >/dev/null 2>&1; then
    find docs -name "*.md" | grep -iE "(guide|system|reference|quick)" | while read file; do
        # Check if in docs root (not allowed there)
        if [[ "$file" =~ ^docs/[^/]+\.md$ ]]; then
            echo -e "  ${RED}✗${NC} In docs root: $file ${RED}(move to subfolder)${NC}"
        else
            echo -e "  ${BLUE}ℹ${NC} $file ${BLUE}(verify if appropriate)${NC}"
        fi
    done
else
    echo -e "  ${GREEN}✓ None found${NC}"
fi
echo ""

# ==============================================================================
# SECTION 7: POTENTIAL ORGANIZATION ISSUES
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}7. POTENTIAL ORGANIZATION ISSUES${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}Performance-related files:${NC}"
PERF_COUNT=$(find docs -name "*.md" | grep -iE "(performance|perf|lighthouse|mobile)" | wc -l | xargs)
echo -e "  Found ${PERF_COUNT} performance-related files"
if [ "$PERF_COUNT" -gt 5 ]; then
    echo -e "  ${YELLOW}⚠${NC} Consider creating ${YELLOW}docs/project/performance/${NC} subfolder"
    find docs -name "*.md" | grep -iE "(performance|perf|lighthouse|mobile)" | sed 's/^/    /'
fi
echo ""

echo -e "${BOLD}Scroll-related files:${NC}"
SCROLL_COUNT=$(find docs -name "*.md" | grep -iE "scroll" | wc -l | xargs)
echo -e "  Found ${SCROLL_COUNT} scroll-related files"
if [ "$SCROLL_COUNT" -gt 0 ]; then
    find docs -name "*.md" | grep -iE "scroll" | sed 's/^/    /'
fi
echo ""

echo -e "${BOLD}Badge-related files:${NC}"
BADGE_COUNT=$(find docs -name "*.md" | grep -iE "badge" | wc -l | xargs)
echo -e "  Found ${BADGE_COUNT} badge-related files"
if [ "$BADGE_COUNT" -gt 3 ]; then
    echo -e "  ${YELLOW}⚠${NC} Multiple badge files - consider consolidation"
    find docs -name "*.md" | grep -iE "badge" | sed 's/^/    /'
fi
echo ""

# ==============================================================================
# SECTION 8: LINK VALIDATION SAMPLE
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}8. INTERNAL LINK SAMPLE${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BOLD}Extracting internal markdown links (first 20):${NC}"
if grep -roh '\[.*\](\.\.*/.*\.md)' docs/ 2>/dev/null | head -20 | grep -q .; then
    grep -roh '\[.*\](\.\.*/.*\.md)' docs/ 2>/dev/null | head -20 | sed 's/^/  /'
else
    echo -e "  ${GREEN}No internal links found or extraction failed${NC}"
fi
echo ""

echo -e "${BLUE}ℹ Run 'pnpm docs:validate' for full link validation${NC}"
echo ""

# ==============================================================================
# SECTION 9: SUMMARY
# ==============================================================================
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${BLUE}9. SUMMARY${NC}"
echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Count issues
ISSUES=0

# Check root file count
if [ "$ROOT_COUNT" -ne 4 ]; then
    ((ISSUES++))
    echo -e "  ${RED}✗${NC} Incorrect number of files in docs/ root"
fi

# Check for missing READMEs
MISSING_READMES=$(find docs -mindepth 1 -maxdepth 1 -type d | while read dir; do
    if [ ! -f "$dir/README.md" ]; then
        echo "1"
    fi
done | wc -l | xargs)

if [ "$MISSING_READMES" -gt 0 ]; then
    ((ISSUES+=MISSING_READMES))
    echo -e "  ${RED}✗${NC} ${MISSING_READMES} folder(s) missing README.md"
fi

# Check for folders with too many files
OVERFULL_FOLDERS=$(find docs -type f -name "*.md" | sed 's|/[^/]*$||' | sort | uniq -c | awk '$1 > 15' | wc -l | xargs)

if [ "$OVERFULL_FOLDERS" -gt 0 ]; then
    ((ISSUES+=OVERFULL_FOLDERS))
    echo -e "  ${YELLOW}⚠${NC} ${OVERFULL_FOLDERS} folder(s) with >15 files"
fi

echo ""
if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✓ No critical issues found!${NC}"
else
    echo -e "${YELLOW}${BOLD}⚠ Found ${ISSUES} issue(s) requiring attention${NC}"
fi
echo ""

echo -e "${BOLD}Next steps:${NC}"
echo -e "  1. Review issues flagged above"
echo -e "  2. Run full validation: ${BLUE}pnpm docs:validate${NC}"
echo -e "  3. Use Documentation mode for cleanup"
echo ""

echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}Report complete at $(date +"%Y-%m-%d %H:%M:%S")${NC}"
echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
