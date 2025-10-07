---
mode: Documentation
---

# Documentation Cleanup Task

## Objective
Review, organize, validate, and improve the documentation structure and content, ensuring accuracy, consistency, and discoverability without requiring constant TOC maintenance.

## Success Criteria
- [ ] All documentation is organized into purpose-based folders with clear naming
- [ ] No conflicting or outdated instructions remain in active docs
- [ ] Recently changed/added documentation is reviewed and properly placed
- [ ] Duplicate content is consolidated or removed
- [ ] All internal links are validated and working
- [ ] Documentation accurately reflects current implementation
- [ ] Issues requiring code changes are documented in `docs/issues/documentation-issues.md`
- [ ] Each major folder has a clear `README.md` explaining its purpose
- [ ] Obsolete/experimental documentation is archived appropriately

## Phase 1: Discovery & Analysis

### 1.1 Run Analysis Script

**FIRST STEP**: Run the comprehensive analysis script to generate a complete report:

```bash
pnpm docs:analyze
```

This script (`scripts/analyze-docs.sh`) provides:
- Recently changed/unstaged/untracked markdown files
- Complete folder structure
- File count per folder (flags >15)
- Docs root validation (should be exactly 4 files)
- Missing README.md detection
- File naming issues
- Organization suggestions (performance/badge/scroll files)
- Internal link sample

Review the output to understand the current state before proceeding.

### 1.2 Identify Changed Documentation (Manual if needed)

If you need to investigate specific files beyond the analysis report:

```bash
# Files changed in current branch vs main
git diff --name-only main...HEAD -- '*.md'

# Unstaged changes
git diff --name-only -- '*.md'

# Staged changes  
git diff --name-only --cached -- '*.md'

# Untracked markdown files
git ls-files --others --exclude-standard '*.md'
```

**Action**: Create a list of all markdown files that need review (changed, added, or untracked).

### 1.2 Inventory Current Structure (if needed)

The `pnpm docs:analyze` report already provides this, but for manual investigation:

```bash
# Get folder structure
find docs -type d | sort

# Count files per folder
find docs -type f -name "*.md" | sed 's|/[^/]*$||' | sort | uniq -c

# Identify folders with >15 files
find docs -mindepth 1 -type d -exec sh -c 'echo "$(find "$1" -maxdepth 1 -name "*.md" | wc -l | xargs) $1"' _ {} \; | awk '$1 > 15'

# Check docs/ root (should only have 4 files)
ls -1 docs/*.md
```

**Action**: Document the current state - how many files per folder, which folders exist, file size distribution.

### 1.3 Evaluate Organization
For each folder, determine:
- **Purpose**: What type of content belongs here? (See `.github/instructions/documentation.instructions.md`)
- **Consistency**: Are all files following the stated purpose?
- **Naming**: Are files named descriptively?
- **Discovery**: Can files be found through clear semantic names?
- **Overlaps**: Does content overlap with other folders?

**Red Flags**:
- Folders with >15 files (likely needs subcategories)
- Generic names like `notes.md`, `temp.md`, `fixes.md`
- Multiple files covering the same topic
- Files that don't match their folder's purpose
- **Files in docs/ root** (only 4 allowed: README, roadmap, backlog, page-index)

**Reference**: See folder purpose table in `.github/instructions/documentation.instructions.md` for what belongs where.

## Phase 2: Content Validation

### 2.1 Verify Against Implementation
For each documentation file (prioritize recently changed):

1. **Extract claims**: What does the doc say about how things work?
2. **Find referenced files**: What code/config files does it mention?
3. **Read implementations**: Check if the code matches the documentation
4. **Check file paths**: Verify all referenced paths exist
5. **Validate commands**: Ensure documented commands are accurate

**Create validation matrix**:
```markdown
| Doc File | Claims | Code Reference | Status | Issues |
|----------|--------|----------------|--------|--------|
| hero-migration.md | Uses DaisyUI classes | src/components/Hero.astro | ✅ Match | None |
| setup.md | Requires Node 20 | .node-version | ❌ Mismatch | Shows Node 22 |
```

### 2.2 Detect Conflicts
Cross-reference documentation to find contradictions:

1. **Search for conflicting patterns**:
   ```bash
   # Example: Check for conflicting class naming advice
   grep -r "\.btn-" docs/
   grep -r "override.*\.btn" docs/
   ```

2. **Identify abandoned approaches**:
   - Look for docs describing experiments that failed
   - Check if documented features exist in codebase
   - Find docs about removed dependencies

3. **Compare instruction files**:
   - `.github/instructions/*.md`
   - Check for contradictory rules

**Action**: 
- **Code issues**: Collect for GitHub issue creation (Phase 2.5)
- **Documentation issues**: Document in `docs/issues/documentation-issues.md`

### 2.3 Determine What Worked
Validate which documented approaches are actually in use:

1. **Check completion markers**:
   - Files in `docs/project/completed-work/` = validated
   - Progress logs with ✅ checkmarks = successful
   - Archive folder = historical/abandoned

2. **Git history analysis**:
   ```bash
   # Check if documented changes are in current code
   git log --all --oneline --grep="keyword"
   
   # See if a file mentioned in docs exists
   git ls-files | grep "pattern"
   ```

3. **Cross-reference with code**:
   - If doc says "we use X pattern", grep codebase for X
   - If doc describes component, verify component exists
   - If doc explains config, check config file

**Decision matrix**:
- ✅ **Keep**: In use, verified in code, completion markers
- 📦 **Archive**: Failed experiment, superseded approach, historical
- 🗑️ **Delete**: Duplicate, temporary notes, obsolete
- ⚠️ **Flag**: Needs verification, potential conflict, unclear status

### 2.4 Deduplicate Content
Find and resolve duplicate content:

1. **Semantic search for similar topics**:
   - Search for key terms across docs
   - Identify files covering the same ground

2. **Comparison strategy**:
   - Which version is more complete?
   - Which is more recent?
   - Which is referenced by other docs?

3. **Resolution**:
   - Keep canonical version
   - Add cross-references from moved/merged locations
   - Archive older versions if historically significant

### 2.5 Create GitHub Issues for Code Problems

**IMPORTANT**: After completing validation (2.1-2.4), collect all **code issues** discovered.

#### Code Issue Types
Issues that require **code changes** (not documentation changes):
- ❌ Code doesn't match what documentation claims
- ❌ Missing features that documentation describes
- ❌ Incorrect behavior in implementation
- ❌ Configuration mismatch (e.g., wrong Node version)
- ❌ Broken imports or missing dependencies
- ❌ API changes not reflected in code
- ❌ Security vulnerabilities mentioned in docs

#### Workflow

1. **Present Summary**:
   ```markdown
   ## Code Issues Found
   
   I discovered [N] code issue(s) during documentation review:
   
   1. **[Issue Title]** (Priority: High/Medium/Low)
      - File: `path/to/code.ts`
      - Problem: [Brief description]
      
   2. **[Issue Title]** (Priority: High/Medium/Low)
      - File: `path/to/code.ts`
      - Problem: [Brief description]
   
   Would you like me to create GitHub issues for these?
   ```

2. **If User Says Yes**: Create GitHub issues using this format:

   **Title**: `[Component/Area] Brief description of problem`
   
   **Labels**: 
   - `documentation-review`
   - `priority:high` | `priority:medium` | `priority:low`
   - Additional relevant labels (e.g., `bug`, `enhancement`)
   
   **Body**:
   ```markdown
   ## Problem
   [Clear description of what's wrong with the code]
   
   ## Found During
   Documentation review on YYYY-MM-DD
   
   ## Evidence
   - **Documentation**: `path/to/doc.md` (line XX) claims:
     > [Quote from documentation]
   
   - **Code**: `path/to/code.ts` (lines XX-YY) actually does:
     ```typescript
     [Relevant code snippet]
     ```
   
   - **Expected**: [What should happen]
   - **Actual**: [What actually happens]
   
   ## Impact
   - Documentation is misleading/incorrect
   - [Any other impacts]
   
   ## Recommended Fix
   [Specific, actionable steps to resolve]
   
   ## Related Documentation
   - `path/to/doc1.md`
   - `path/to/doc2.md`
   
   ## Related Code
   - `path/to/related/file1.ts`
   - `path/to/related/file2.astro`
   ```

3. **If User Says No**: Document all code issues in `docs/issues/documentation-issues.md` with a note that they weren't filed as GitHub issues.

4. **Track Created Issues**: In your final report, include links to all created GitHub issues.

#### Example GitHub Issues

**Example 1 - Configuration Mismatch**:
```
Title: [Config] Update Node version to match .node-version file

Labels: documentation-review, priority:medium, configuration

Problem:
The documentation in `docs/setup.md` states we require Node 20, but the actual configuration specifies Node 22.

Found During:
Documentation review on 2025-10-07

Evidence:
- **Documentation**: `docs/setup.md` (line 15) claims:
  > This project requires Node.js version 20.x
  
- **Code**: `.node-version` shows:
  ```
  22.16.0
  ```

- **Expected**: Documentation should reflect actual Node version
- **Actual**: Documentation is outdated

Impact:
- New contributors may install wrong Node version
- CI/CD pipelines may use incorrect version

Recommended Fix:
1. Update `docs/setup.md` line 15 to state "Node.js 22.x"
2. Update any other documentation referencing Node version
3. Verify `package.json#volta` matches `.node-version`

Related Documentation:
- `docs/setup.md`
- `docs/project/tooling-roadmap.md`
```

**Example 2 - Missing Feature**:
```
Title: [Hero] Implement rotation classes documented in design system

Labels: documentation-review, priority:high, enhancement

Problem:
Design system documentation describes rotation utility classes that don't exist in the codebase.

Found During:
Documentation review on 2025-10-07

Evidence:
- **Documentation**: `docs/design-system/guide.md` (line 145) claims:
  > Use `.rotate-slight` for -8deg rotation and `.rotate-moderate` for 12deg
  
- **Code**: `src/styles/global.css` has no rotation utility classes
  
- **Expected**: Rotation classes should be defined in global CSS
- **Actual**: Classes don't exist, will break if used

Impact:
- Following documentation will result in unstyled components
- Design system is incomplete

Recommended Fix:
1. Add rotation utilities to `src/styles/global.css`:
   ```css
   .rotate-slight { transform: rotate(-8deg); }
   .rotate-moderate { transform: rotate(12deg); }
   ```
2. Consider adding more rotation variants if needed
3. Update design system docs if implementation differs

Related Documentation:
- `docs/design-system/guide.md`
- `docs/design-system/implementation.md`

Related Code:
- `src/styles/global.css`
```

## Phase 3: Reorganization

**CRITICAL**: Follow folder organization rules from `.github/instructions/documentation.instructions.md`

### 3.1 Define Folder Structure
Ensure each folder has a clear, documented purpose (see instructions for complete table):

```
docs/
├── README.md                          # Main navigation & quick start
├── site-first-roadmap.md             # Project roadmap (root exception)
├── component-backlog.md              # Task backlog (root exception)
├── page-index.md                     # Page index (root exception)
├── archive/                          # Historical/obsolete docs
│   └── README.md                     # What goes here & why
├── astro/                            # Astro-specific patterns
│   └── README.md                     # Astro docs index
├── design-system/                    # Design philosophy & theming
│   ├── README.md                     # Design system overview
│   └── screenshots/                  # Visual references
├── progress/                         # Active work logs
│   └── README.md                     # Running progress notes
├── project/                          # Planning & specifications
│   ├── README.md                     # Project docs index
│   └── completed-work/               # Validated completion summaries
│       └── README.md                 # Completed work quick refs
├── testing/                          # Test strategies & results
│   └── README.md                     # Testing documentation
└── issues/                           # Tracked issues & problems
    ├── README.md                     # Issue tracking system
    └── documentation-issues.md       # Current doc issues
```

**Important**: 
- Only 4 files allowed in `docs/` root (README + 3 project-wide docs)
- Everything else goes in subfolders
- See `.github/instructions/documentation.instructions.md` for full folder purpose table

### 3.2 Move Misplaced Files
For each file that doesn't fit its current location:

1. **Determine correct location** using folder purpose table in instructions
2. **Check for duplicates**: Does similar content already exist?
3. **Check for links** to the file:
   ```bash
   grep -r "path/to/file.md" .
### 3.4 Improve File Naming
Rename files with generic or unclear names (see instructions for conventions):

**Bad**: `notes.md`, `temp.md`, `fixes-2025-10-02.md`, `stuff.md`
**Good**: `hero-daisyui-migration.md`, `badge-sizing-update.md`, `scroll-performance-fix.md`

**Naming conventions** (from `.github/instructions/documentation.instructions.md`):
- Descriptive: Indicates content at a glance
- Specific: References feature/component/topic
- Lowercase: Use hyphens not underscores
- Date-prefixed (optional): For chronological logs `YYYY-MM-DD-topic.md`

### 3.5 Create Missing READMEs
Each folder MUST have a `README.md` (see instructions for template):

```markdown
# [Folder Name]

## Purpose
[1-2 sentences: What kind of content belongs here]

## Contents
[Optional: Brief overview of major topics/files if folder is complex]

## Conventions
[Any folder-specific naming or organization rules]

## Related
[Links to related documentation folders/files]
```

**After creating folder README**:
1. Update `docs/README.md` to reference the new folder
2. Consider updating `AGENTS.md` if agent-critical
3. Run validation: `pnpm docs:validate`reate README
cat > docs/project/performance/README.md << 'EOF'
# Performance Documentation

## Purpose
Performance optimization guides, benchmarks, and monitoring strategies.
EOF
# Move related files
git mv docs/project/mobile-performance.md docs/project/performance/
git mv docs/project/lighthouse-*.md docs/project/performance/
```

### 3.4 Improve File Naming
Rename files with generic or unclear names:

**Bad**: `notes.md`, `temp.md`, `fixes-2025-10-02.md`, `stuff.md`
**Good**: `hero-daisyui-migration.md`, `badge-sizing-update.md`, `scroll-performance-fix.md`

**Naming conventions**:
- Descriptive: Indicates content at a glance
- Specific: References feature/component/topic
- Lowercase: Use hyphens not underscaces
- Date-prefixed (optional): For chronological logs `YYYY-MM-DD-topic.md`

### 3.4 Create Missing READMEs
Each folder should have a `README.md` that explains:

```markdown
# [Folder Name]

## Purpose
[1-2 sentences: What kind of content belongs here]

## Contents
[Optional: Brief overview of major topics/files if folder is complex]

## Conventions
[Any folder-specific naming or organization rules]

## Related
[Links to related documentation folders/files]
```

## Phase 4: Link Validation & Cleanup

### 4.1 Run Validation Script

**Run the validation script** to check for broken links and other issues:

```bash
pnpm docs:validate
```

This script (`scripts/validate-docs.mjs`) checks:
- File naming conventions (lowercase, hyphens)
- Broken internal links
- Generic file names
- Missing README.md files
- Folder file counts (>15 warning)
- Potential duplicate filenames

The script will exit with code 1 if errors are found, 0 if only warnings or success.

### 4.2 Validate All Links Manually (if needed)

For manual link checking beyond the validation script:

For manual link checking beyond the validation script:

```bash
# Find all markdown links
grep -roh '\[.*\]([^)]*\.md)' docs/

# Extract just the paths
grep -roh '([^)]*\.md)' docs/ | sed 's/[()]//g'
```

For each link:
1. Verify target file exists
2. Check if target moved (update reference)
3. Fix relative path if broken

### 4.3 Update Key Navigation Files
After all moves/renames, update:

1. **`docs/README.md`**: 
   - Update links to moved files
   - Add new major documents
   - Remove deleted files
   - Group by category

2. **`AGENTS.md`**:
   - Update references to moved docs
   - Ensure critical files are linked
   - Keep "Start Here" section current

3. **`.github/instructions/documentation.instructions.md`**:
   - Update any folder structure references
   - Add new conventions discovered during cleanup

### 4.3 Update Key Navigation Files
After all moves/renames, update:

1. **`docs/README.md`**: 
   - Update links to moved files
   - Add new major documents
   - Remove deleted files
   - Group by category

2. **`AGENTS.md`**:
   - Update references to moved docs
   - Ensure critical files are linked
   - Keep "Start Here" section current

3. **`.github/instructions/documentation.instructions.md`**:
   - Update any folder structure references
   - Add new conventions discovered during cleanup

### 4.4 Clean Up Dead References
Remove or update:
- Links to deleted files
- References to obsolete tools/patterns
- Outdated file path examples
- Broken external links

**Final validation**: Run `pnpm docs:validate` again to ensure all fixes worked.

## Phase 5: Issue Documentation

### 5.1 GitHub Issues Created
If code issues were found and user approved GitHub issue creation:

1. **List all created issues** in your report:
   ```markdown
   ## GitHub Issues Created
   
   - #123: [Component] Brief description
   - #124: [Config] Brief description
   - #125: [Feature] Brief description
   ```

2. **Update documentation** to reference GitHub issues where appropriate:
   ```markdown
   > **Note**: This feature is not yet implemented. See issue #123 for tracking.
   ```

### 5.2 Documentation Issues File
For **documentation-only issues** (not code problems), update `docs/issues/documentation-issues.md`:

**Documentation Issue Types**:
- 📝 Typos or formatting problems
- 🔗 Broken internal links
- 📦 Files needing reorganization
- 📄 Missing documentation
- 🔄 Duplicate content
- 🗑️ Outdated content that needs removal

```markdown
# Documentation Issues

Issues discovered during documentation review that require documentation changes only.

**Last Updated**: YYYY-MM-DD

---

## High Priority

### Issue: [Title]
**File**: `path/to/doc.md`
**Type**: Outdated|Conflicting|Missing|Incorrect|Broken-Link
**Found**: YYYY-MM-DD

**Description**: [What's wrong]

**Current State**: [What doc says now]

**Expected State**: [What it should say]

**Recommended Action**: [Steps to fix]

**Related Files**:
- `file1.md`
- `file2.md`

---

## Medium Priority
[Same format]

## Low Priority  
[Same format]
```

### 5.3 Issue Distinction

**Use GitHub Issues When**:
- ❌ Code doesn't match documentation
- ❌ Missing features/functionality
- ❌ Incorrect behavior in implementation
- ❌ Configuration problems
- ❌ API mismatches

**Use Local Documentation Issues When**:
- 📝 Documentation has typos
- 🔗 Internal links are broken
- 📦 Files need reorganizing
- 📄 Documentation is missing/incomplete
- 🔄 Content is duplicated
- 🗑️ Content is outdated but code is fine

## Phase 6: Final Report

### 6.1 Summary of Changes
Create a summary document `docs/cleanup-YYYY-MM-DD.md`:

```markdown
# Documentation Cleanup - YYYY-MM-DD

## Overview
[Brief description of scope and goals]

## Changes Made

### Files Moved
- `old/path.md` → `new/path.md` (Reason)

### Files Renamed
- `generic-name.md` → `specific-name.md`

### Files Archived
- `old-approach.md` → `archive/old-approach.md` (Superseded by X)

### Files Deleted
- `temp-notes.md` (Duplicate of Y)

### New Files Created
- `folder/README.md` (Folder purpose documentation)

### Content Updates
- `file.md`: Updated to reflect current implementation
- `other.md`: Removed conflicting instructions

## Organization Improvements
- [Describe structural changes]
- [Explain folder consolidations]
- [Note any new categories]

## GitHub Issues Created
[If user approved creating issues]
- #XXX: [Component] Brief description (Priority: High)
- #XXX: [Config] Brief description (Priority: Medium)
- Total: [N] code issues filed

## Documentation Issues Identified
- [Summary of documentation-only issues]
- See `docs/issues/documentation-issues.md` for details

## Validation Results
- [X] All internal links verified
- [X] Recently changed docs reviewed
- [X] Conflicts resolved or documented
- [X] Duplicate content consolidated
- [X] Folder structure improved

## Recommendations
[Any suggestions for future documentation maintenance]
```

### 6.2 Verification Checklist
Before completing:

- [ ] Run `pnpm docs:analyze` - review final state
- [ ] Run `pnpm docs:validate` - all errors fixed
- [ ] All moved files have updated references
- [ ] All folders have README.md files
- [ ] `docs/README.md` reflects current structure
- [ ] `AGENTS.md` updated with any new critical docs
- [ ] No broken internal links
- [ ] All identified issues are documented
- [ ] Archive contains only historical/obsolete content
- [ ] No duplicate content in active docs
- [ ] File names are descriptive and consistent
- [ ] Git status clean (all changes committed)

## Constraints & Reminders

### What This Task DOES
✅ Review and organize documentation files
✅ Validate content against current implementation
✅ Identify code issues and document them
✅ Move, rename, delete markdown files
✅ Update documentation content
✅ Create organizational structures
✅ Fix broken links within documentation

### What This Task DOES NOT DO
❌ Modify code files (`.ts`, `.tsx`, `.astro`, `.css`, etc.)
❌ Fix code issues (document them instead)
❌ Run builds or tests
❌ Install dependencies
❌ Modify package.json or config files (except README.md)
❌ Make changes outside of documentation

### Key Principles
1. **Evidence-based**: Verify claims by reading code
2. **Systematic**: Follow phases in order
3. **Thorough**: Don't skip validation steps
4. **Conservative**: When in doubt, archive rather than delete
5. **Discoverable**: Optimize for finding docs without extensive TOCs
6. **Accurate**: Documentation must match implementation
7. **Organized**: Clear folder purposes, consistent naming