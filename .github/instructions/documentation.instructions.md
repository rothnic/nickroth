---
applyTo: '**/*.md'
---
# Documentation authoring guidelines

Use these conventions when creating or editing Markdown files in this repository.

## Quick Reference for Agents

**Before creating ANY documentation file**:

1. ✅ **Check if it already exists** - Search docs/, .github/instructions/, .github/chatmodes/, .github/prompts/
2. ✅ **Determine correct location** - Use folder purpose table below
3. ✅ **Never create in docs/ root** - Only 4 files allowed (README, roadmap, backlog, page-index)
4## Biome Linting (Limited Support)

**Note**: Biome 2.2.4 has limited markdown support. We've implemented custom validation scripts instead.

**Current solution**: `pnpm docs:validate` and `pnpm docs:analyze`

**Biome capabilities**:
- ✅ Can format markdown (basic)
- ❌ No markdown-specific linting rules
- ❌ No file naming enforcement  
- ❌ No link validation

**Future considerations**:
- Monitor Biome updates for improved markdown support
- Consider markdownlint integration if needed
- Add git hooks for pre-commit validation
- Enhance custom scripts with additional checkscriptive filename** - Lowercase with hyphens, specific not generic
5. ✅ **Create folder README if new folder** - Must explain purpose immediately
6. ✅ **Update references** - docs/README.md (if major), AGENTS.md (if agent-critical)
7. ✅ **Run validation** - `pnpm docs:validate` before committing

**Common Mistakes to Avoid**:
- ❌ Creating files in `docs/` root (use subfolders!)
- ❌ Duplicating information from `.github/instructions/`, `.github/chatmodes/`, `.github/prompts/`
- ❌ Generic names like `notes.md`, `temp.md`, `system.md`, `guide.md`, `quick-reference.md`
- ❌ Creating "quick reference" or "system overview" docs (belongs in instructions/modes/prompts)
- ❌ Multiple files on the same topic (consolidate!)

## Core Principle: No Duplication

**Critical Rule**: Never duplicate information across documentation files. Each piece of information should have ONE canonical location.

- **Instructions/conventions** → This file (`.github/instructions/documentation.instructions.md`)
- **Mode behavior/workflow** → `.github/chatmodes/Documentation.chatmode.md`
- **Task procedures** → `.github/prompts/docCleanup.prompt.md`
- **Content** → `docs/` folder with single-purpose files

**Before creating a new doc**: Check if the information already exists. If it does, link to it rather than duplicating.

## Critical Rule: Don't Create Files in docs/ Root

⚠️ **STOP**: Before creating ANY file in `docs/`, determine the correct subfolder.

### docs/ Root is Reserved For
Only these types of files belong in `docs/` root (currently 4 files):
- ✅ `README.md` - Main documentation index
- ✅ High-level project roadmaps (e.g., `site-first-roadmap.md`)
- ✅ Task backlogs (e.g., `component-backlog.md`)
- ✅ Page indexes (e.g., `page-index.md`)

### Everything Else Goes in Subfolders

**Before creating a file**, determine its category:

| Content Type | Folder | Examples |
|--------------|--------|----------|
| Astro patterns/operations | `docs/astro/` | view-transitions.md, auditing.md |
| Design system/theming | `docs/design-system/` | colors.md, guide.md |
| Active work logs | `docs/progress/` | p0-001.md, hero-corrections.md |
| Planning/specs/PRDs | `docs/project/` | prd.md, content-specification.md |
| Tooling/infrastructure | `docs/project/` | tooling-roadmap.md, tooling-doc-validation.md |
| Completed work summaries | `docs/project/completed-work/` | p0-001-quick-reference.md |
| Test strategies | `docs/testing/` | test-strategy.md |
| Historical/obsolete | `docs/archive/` | old-approach.md |
| Issue tracking | `docs/issues/` | documentation-issues.md |

### Decision Tree for New Documentation

```
Creating new documentation?
├─ Is it instructions/conventions? → .github/instructions/
├─ Is it mode behavior? → .github/chatmodes/
├─ Is it a task workflow? → .github/prompts/
├─ Is it a project-wide roadmap? → docs/ (root, RARE)
├─ Is it about Astro? → docs/astro/
├─ Is it about design/theming? → docs/design-system/
├─ Is it active work progress? → docs/progress/
├─ Is it planning/specs/tooling? → docs/project/
├─ Is it a completed task summary? → docs/project/completed-work/
├─ Is it about testing? → docs/testing/
├─ Is it historical? → docs/archive/
└─ If unsure, ask before creating!
```

### Red Flags - Don't Create These
❌ Files with "system", "guide", "reference" in docs/ root
❌ Multiple files on same topic (consolidate!)
❌ "Quick reference" docs (info goes in canonical location)
❌ "Overview" docs that duplicate other docs
❌ Tooling docs in root (use `docs/project/`)

## Folder structure

### Purpose-Based Organization

Each folder has a **specific purpose**. Files must match their folder's purpose or be moved/reorganized.

| Folder | Purpose | What Belongs | What Doesn't |
|--------|---------|--------------|--------------|
| `docs/astro/` | Astro framework patterns, configuration, operational guides | View transitions, auditing, deployment | General performance docs, design system |
| `docs/design-system/` | Visual design, theming, component styling, brand guidelines | Colors, typography, animations, DaisyUI customization | Component implementation code, build processes |
| `docs/progress/` | **Active work logs** for current tasks (dated or task-ID-based) | P0-001.md, hero-corrections.md, badge-refactoring.md | Completed work summaries, planning docs |
| `docs/project/` | High-level planning, specifications, PRDs, tooling strategy | prd.md, content-specification.md, tooling-roadmap.md | Work logs, completed summaries, historical docs |
| `docs/project/completed-work/` | **Validated completion summaries** for finished tasks (reference only) | p0-001-complete.md, migration-summary.md | Active work logs, planning, quick references |
| `docs/archive/` | Historical/obsolete documentation that's no longer relevant | Failed experiments, superseded approaches, old plans | Active work, current approaches, anything still relevant |
| `docs/testing/` | Test strategies, test results, QA procedures | test-strategy.md, accessibility-testing.md | Lighthouse reports (go in `docs/project/`), code coverage |
| `docs/issues/` | Documentation and code issue tracking | documentation-issues.md, resolved-issues.md | GitHub issues (use GitHub), feature requests |

### Folder Guidelines

#### Max 15 Files Per Folder
- If a folder exceeds 15 files, **take action**:
  1. Create subcategories (e.g., `docs/project/performance/`)
  2. Archive historical content to `docs/archive/`
  3. Consolidate related topics into single files
  4. Move misplaced files to correct folders

#### Each Folder MUST Have README.md
When creating a folder, **immediately create** `README.md`:

```markdown
# [Folder Name]

## Purpose
[1-2 sentences: What kind of content belongs here]

## Contents
[Optional: Brief overview if folder is complex]

## Conventions
[Any folder-specific naming or organization rules]

## Related
- [Related folder 1](../other-folder/)
- [Related folder 2](../another-folder/)
```

#### Max 3 Levels Deep
- ✅ Good: `docs/project/performance/mobile.md`
- ❌ Too deep: `docs/project/tech/performance/mobile/initial-audit.md`

#### Clear Purposes
Every file must match its folder's stated purpose:
- **Review regularly** - Does this file belong here?
- **Move when mismatched** - Don't leave files in wrong folders
- **Update references** - Fix all links when moving files

### Creating New Folders

**Before creating a new folder**, ask:
1. **Do we need it?** - Can existing folders accommodate the content?
2. **Is the purpose clear?** - Can you describe it in 1-2 sentences?
3. **Is it specific enough?** - Avoid vague categories like "misc" or "other"
4. **Will it have enough content?** - Need at least 3-5 related files to justify folder

**When creating a folder**:

1. **Create the folder** with descriptive name:
   ```bash
   mkdir docs/[category-name]
   ```

2. **Create README.md immediately**:
   ```markdown
   # [Category Name]
   
   ## Purpose
   [Clear 1-2 sentence description]
   
   ## Contents
   [What types of files belong here]
   
   ## Conventions
   [Naming patterns, organization rules]
   
   ## Related
   [Links to related folders/docs]
   ```

3. **Update `docs/README.md`**:
   - Add folder to appropriate category section
   - Include brief description
   - Link to folder's README

4. **Update validation script** (if needed):
   - Add folder to expected structure in `scripts/validate-docs.mjs`

5. **Consider updating** `AGENTS.md`:
   - If folder contains agent-critical documentation
   - Add reference with purpose description

### File Organization Rules
1. **Keep authored documentation under `docs/`** - Never in root or random locations
2. **Maintain table of contents in `docs/README.md`** - For major folders/docs only (not every file)
3. **Use lowercase, hyphenated filenames** - e.g., `topic-name.md`
4. **When documentation targets agents** - Reference from `AGENTS.md`
5. **If relocating a guide** - Update all references (README, AGENTS.md, stubs, broken links)
6. **One folder per file** - Don't duplicate files across multiple folders

## File naming conventions

### Good Names (Descriptive & Specific)
- ✅ `hero-daisyui-migration.md` - Component + action
- ✅ `scroll-performance-fix.md` - Problem + solution
- ✅ `badge-sizing-update.md` - Component + change
- ✅ `2025-10-07-feature-notes.md` - Date + topic (for logs)

### Bad Names (Generic or Vague)
- ❌ `notes.md` - What notes?
- ❌ `temp.md` - Temporary files don't belong in git
- ❌ `fixes.md` - What fixes?
- ❌ `stuff.md` - No meaning
- ❌ `changes.md` - Too vague
- ❌ `documentation-cleanup-system.md` - Duplicates instruction/mode files

### Naming Pattern
- **Component docs**: `[component]-[action].md` (e.g., `navbar-implementation.md`)
- **Process docs**: `[topic]-[process].md` (e.g., `lighthouse-optimization.md`)
- **Progress logs**: `[task-id].md` or `YYYY-MM-DD-[topic].md`
- **Quick refs**: Avoid - put info in canonical location instead
- **System docs**: Avoid - belongs in `.github/` instructions/modes/prompts

## README expectations

### Root README.md
- Stay concise: overview, quick-start commands, high-level scripts
- Point to documentation/instructions
- Avoid deep tutorials, architecture overviews, content trees
- Keep it under 200 lines

### Folder READMEs
Each major folder should have a README explaining:
```markdown
# [Folder Name]

## Purpose
[1-2 sentences: What kind of content belongs here]

## Contents
[Optional: Brief overview of major topics/files]

## Conventions
[Any folder-specific naming or organization rules]

## Related
[Links to related documentation folders]
```

## Content validation rules

### Verify Against Implementation
Documentation must match current code:
1. **Extract claims** - What does doc say happens?
2. **Read code** - Does implementation match?
3. **Check paths** - Do referenced files exist?
4. **Validate commands** - Do documented commands work?

### Determine What Works
1. **Completion markers** - ✅ in docs = validated approach
2. **`completed-work/` folder** - Validated solutions
3. **Archive folder** - Failed experiments, superseded approaches
4. **Git history** - Were documented changes kept or reverted?

### Handle Outdated Content
- **Archive** - Failed experiments, superseded approaches
- **Delete** - Duplicates, temporary notes, obsolete content
- **Update** - Still relevant but needs corrections
- **Flag** - Unclear status, needs verification

## Updating documentation

### When Making Changes
- Update affected guides in `docs/` when dependencies/frameworks/tooling change
- Add release notes or migration tips when relevant
- Link related resources together for discoverability
- Use step-by-step lists and checklists for operational topics
- Include references to official docs where useful

### Avoid Creating
- ❌ "Quick reference" docs (put info in canonical location)
- ❌ "System overview" docs (belongs in mode/prompt files)
- ❌ Multiple docs on same topic (consolidate)
- ❌ Summary docs that duplicate instructions
- ❌ Helper docs that rehash existing content

## Issue tracking system

### GitHub Issues (Code Problems)
When documentation review discovers **code problems**:
1. Agent prompts: "Found [N] code issues. Create GitHub issues?"
2. If yes → Create issues with `documentation-review` label
3. If no → Document in `docs/issues/documentation-issues.md`

**Code issue examples**:
- Code doesn't match documentation claims
- Missing features that docs describe
- Configuration mismatches
- API inconsistencies

### Local Issues (Documentation Problems)
Document in `docs/issues/documentation-issues.md`:
- Typos, formatting problems
- Broken internal links
- Files needing reorganization
- Missing documentation
- Duplicate content

## Instructions for agents

### Available Documentation Scripts

**Before starting documentation work**, familiarize yourself with these tools:

#### `pnpm docs:analyze`
Comprehensive discovery and analysis script (`scripts/analyze-docs.sh`):
- Shows recently changed/unstaged/untracked markdown files
- Displays complete folder structure
- Counts files per folder (flags >15)
- Validates docs/ root (should be exactly 4 files)
- Detects missing README.md files
- Identifies file naming issues
- Suggests organization improvements
- Provides internal link sample
- **Use at start of docCleanup workflow**

#### `pnpm docs:validate`
Validation and enforcement script (`scripts/validate-docs.mjs`):
- Validates file naming conventions
- Detects broken internal links
- Checks for generic file names
- Verifies folder file counts
- Confirms README.md presence
- **Exits 1 on errors** (CI-friendly)
- **Use before committing changes**

### Discovery Without TOC Maintenance
- Use clear folder purposes (agents can understand structure)
- Use semantic file names (grep/find works)
- Create folder READMEs (explains what's inside)
- Update `docs/README.md` only for major docs
- Reference agent-critical docs from `AGENTS.md`

### Documentation Cleanup Workflow
- Use **Documentation mode** with `docCleanup.prompt.md` workflow
- **Start with** `pnpm docs:analyze` to understand current state
- Reviews changed/added files via git
- Validates content against code
- Creates GitHub issues for code problems (with user approval)
- Documents documentation issues locally
- Reorganizes files into proper folders
- Fixes broken links
- **End with** `pnpm docs:validate` to verify all changes

### Preventing Duplication
**Before creating documentation**, check these locations:
1. `.github/instructions/*.md` - Conventions, rules, patterns
2. `.github/chatmodes/*.md` - Mode behaviors, workflows
3. `.github/prompts/*.md` - Task procedures, detailed workflows
4. `docs/README.md` - Existing documentation index
5. `AGENTS.md` - Agent-focused documentation

**If information exists**: Link to it. Don't duplicate.

### When Creating Instruction Files
- Add to `.github/instructions/` for conventions/rules
- Reference from `AGENTS.md` with purpose description
- Don't create overlapping docs in `docs/`

## Reorganization workflow

When documentation needs reorganization (too many files, misplaced files, unclear structure):

### 1. Assess Current State
```bash
# Count files per folder
find docs -type f -name "*.md" | sed 's|/[^/]*$||' | sort | uniq -c

# Identify folders with >15 files
find docs -mindepth 1 -type d -exec sh -c 'echo "$(find "$1" -maxdepth 1 -name "*.md" | wc -l | xargs) $1"' _ {} \; | awk '$1 > 15'

# Find files in docs/ root (should only be 4)
ls -1 docs/*.md | wc -l
```

### 2. Determine Actions
For each problematic folder/file:

**If folder has >15 files**:
1. Group by topic/theme
2. Create subcategory folders
3. Move files to subcategories
4. Update all references

**If file is misplaced**:
1. Identify correct folder using purpose table
2. Check if similar content exists (consolidate?)
3. Move file with `git mv` (preserves history)
4. Update all links to file

**If file is in docs/ root**:
1. Determine category from content
2. Move to appropriate subfolder
3. Update `docs/README.md` if it was linked

### 3. Update References
After moving/reorganizing files:

1. **Update `docs/README.md`**:
   - Fix any broken links
   - Update folder descriptions if structure changed
   - Remove references to deleted/moved files

2. **Update `AGENTS.md`**:
   - Fix links to moved files
   - Update descriptions if folder purposes changed

3. **Search for broken links**:
   ```bash
   # Find all markdown links in docs
   grep -r "\[.*\]([^)]*\.md)" docs/
   
   # Search for references to moved file
   grep -r "old-filename.md" .
   ```

4. **Update folder READMEs**:
   - If folder structure changed
   - If new subcategories were created

### 4. Validation
Run validation script to catch issues:
```bash
pnpm docs:validate
```

Fix any errors before committing.

## Review checklist

**Before Committing Documentation**:
- [ ] Run `pnpm docs:analyze` to check overall structure
- [ ] Run `pnpm docs:validate` and fix all errors
- [ ] All relative links resolve correctly
- [ ] Referenced files exist at specified paths
- [ ] File name is descriptive and specific
- [ ] Content doesn't duplicate existing docs
- [ ] File is in appropriate folder for its purpose
- [ ] Folder has README.md if it's a new category
- [ ] `docs/README.md` updated if it's a major doc
- [ ] Tone is concise and task-oriented
- [ ] Code blocks have language hints
- [ ] No generic/temporary file names
- [ ] Validated against current implementation (if technical)

## Validation Scripts

### Current Implementation

Two complementary scripts handle documentation validation:

#### `pnpm docs:analyze` - Discovery & Analysis
- **Purpose**: Generate comprehensive human-readable report
- **Script**: `scripts/analyze-docs.sh` (bash)
- **Exit code**: Always 0 (informational)
- **Use case**: Start of cleanup workflow, understanding current state
- **Output**: Colored, formatted report with suggestions

#### `pnpm docs:validate` - CI/CD Validation  
- **Purpose**: Enforce conventions and catch errors
- **Script**: `scripts/validate-docs.mjs` (Node.js)
- **Exit code**: 1 on errors, 0 on success/warnings
- **Use case**: Pre-commit checks, CI/CD pipelines
- **Output**: Machine-parseable error/warning list

### Validation Checks Performed

Both scripts check different aspects:

**docs:analyze provides**:
- Git status (changed/unstaged/untracked)
- Folder structure visualization
- File count per folder
- Root directory validation
- Missing READMEs
- Naming issue detection
- Organization suggestions

**docs:validate provides**:
- File naming convention enforcement
- Broken internal link detection
- Generic name detection
- Folder file count limits
- README.md presence validation

### CI/CD Integration

To add to CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Validate documentation
  run: pnpm docs:validate
```

The validation script will fail the build if errors are found.

## Biome Linting (Future Enhancement)

**Note**: Biome 2.2.4 has limited markdown support. Consider:
- Custom scripts for validation (link checking, naming conventions)
- Git hooks for pre-commit checks
- CI/CD validation steps
- Markdown linters (markdownlint) if needed

**Planned checks**:
- File naming conventions
- Broken internal links
- Duplicate content detection
- Folder organization rules