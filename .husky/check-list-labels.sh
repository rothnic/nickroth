#!/bin/bash
# Pre-commit hook to detect short paragraph labels before lists
# This catches patterns like "**Pros:**" or short text followed immediately by a list

MAX_CHARS=50
STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(md|mdx)$' || true)

if [ -z "$STAGED_MD_FILES" ]; then
    exit 0
fi

found_issues=0

for file in $STAGED_MD_FILES; do
    # Skip if file doesn't exist (deleted)
    [ -f "$file" ] || continue
    
    # Get staged content of the file
    git show :"$file" > /tmp/staged_content.md 2>/dev/null || continue
    
    # Check for short paragraphs followed by lists
    # Pattern: paragraph with <= MAX_CHARS, followed by blank line, then list
    awk -v max_chars="$MAX_CHARS" -v file="$file" '
        BEGIN { prev_line = ""; prev_blank = 0; line_num = 0 }
        {
            line_num++
            # Check if current line is a list item
            is_list = ($0 ~ /^[ \t]*[-*+][ \t]/ || $0 ~ /^[ \t]*[0-9]+\.[ \t]/)
            
            # Check if previous line was a short paragraph (not a heading, not empty)
            if (is_list && prev_blank && prev_line != "") {
                # Check if prev_line is not a heading
                if (prev_line !~ /^#/) {
                    char_count = length(prev_line)
                    if (char_count <= max_chars) {
                        # It looks like a label - flag it
                        print file ":" prev_line_num ": Short paragraph (" char_count " chars) followed by list:"
                        print "  '" prev_line "'"
                        print ""
                        found++
                    }
                }
            }
            
            # Track blank lines
            if ($0 ~ /^[ \t]*$/) {
                prev_blank = 1
            } else {
                prev_blank = 0
                prev_line = $0
                prev_line_num = line_num
            }
        }
        END { exit found }
    ' /tmp/staged_content.md
    
    if [ $? -ne 0 ]; then
        found_issues=1
    fi
done

rm -f /tmp/staged_content.md

if [ $found_issues -ne 0 ]; then
    echo "⚠️  WARNING: Found short paragraphs that appear to be list labels."
    echo ""
    echo "Consider converting these to proper headings (### or ####) or h4 elements"
    echo "instead of bold/italic paragraphs. This improves semantic structure and"
    echo "prevents spacing issues."
    echo ""
    echo "Example fix:"
    echo '  Change: **Pros:**'
    echo '  To:     #### Pros'
    echo '  Or:     <h4>Pros</h4>'
    echo ""
    echo "To bypass this check, use: git commit --no-verify"
    exit 1
fi

exit 0
