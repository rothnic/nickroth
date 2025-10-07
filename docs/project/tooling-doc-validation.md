# Documentation Validation & Biome Limitations

## Biome's Markdown Support (v2.2.4)

Biome currently has **limited markdown support**:

### What Biome CAN Do
- ✅ Basic markdown formatting
- ✅ Recognize `.md` files

### What Biome CANNOT Do
- ❌ Custom lint rules for markdown
- ❌ File naming enforcement
- ❌ Link validation (internal/external)
- ❌ Frontmatter validation
- ❌ Content structure checking
- ❌ Duplicate content detection
- ❌ Folder organization rules

## Our Solution: Custom Validation Script

Since Biome can't enforce documentation conventions, we use `scripts/validate-docs.mjs`.

### Run Validation
```bash
pnpm docs:validate
```

### What It Checks
1. **File Naming Conventions**
   - Lowercase with hyphens
   - No generic names (`notes.md`, `temp.md`, etc.)
   - Warns about potential duplicates

2. **Internal Links**
   - Verifies all internal links resolve
   - Reports broken links with file location

3. **Folder Organization**
   - Warns if folder has >15 files
   - Checks for README.md in folders

4. **Potential Duplicates**
   - Warns about files with "cleanup", "system", "quick-reference" in docs/
   - These likely duplicate `.github/` instructions/modes/prompts

### Exit Codes
- `0` - All checks passed (warnings OK)
- `1` - Errors found (broken links, bad naming)

## Conventions Enforced

See `.github/instructions/documentation.instructions.md` for complete rules.

### Key Rules
- Lowercase, hyphenated filenames
- Descriptive names (no `notes.md`, `temp.md`)
- Max 15 files per folder
- README.md in each folder
- No duplication of `.github/` content in `docs/`

## Future Enhancements

Possible additions to validation script:
- [ ] Duplicate content detection (similarity scoring)
- [ ] Frontmatter validation
- [ ] Orphaned file detection (not linked from anywhere)
- [ ] Max file size warnings
- [ ] Nesting depth checking (max 3 levels)
- [ ] External link validation (with rate limiting)
- [ ] Auto-fix mode (`--fix` flag)
- [ ] Git pre-commit hook integration

## Alternative: markdownlint

If more sophisticated markdown linting is needed, consider [`markdownlint`](https://github.com/DavidAnson/markdownlint):

```bash
pnpm add -D markdownlint-cli2
```

Then configure `.markdownlint.json` for rules. However, our custom script handles project-specific conventions that markdownlint can't.

## Why Not Use Biome?

We'd love to use Biome for everything, but:
1. Markdown support is experimental/limited in v2.x
2. Custom lint rules require plugin system (not yet available)
3. File naming and organization rules are project-specific
4. Link validation requires file system access

**Decision**: Use custom validation script until Biome gains markdown lint capabilities or plugin support.
