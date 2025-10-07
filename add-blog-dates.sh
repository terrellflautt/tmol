#!/bin/bash

# Add dates to blog articles - backdate half, post-date half
# Creates appearance of 1 article per day

# Today is Oct 5, 2025 - backdate 9, post-date 10

declare -A DATES=(
    # BACKDATED (Sept 2025)
    ["blog/ai/aws-lambda-api.html"]="Sept 26, 2025"
    ["blog/design/css-backdrop-filters.html"]="Sept 27, 2025"
    ["blog/design/gradient-systems.html"]="Sept 28, 2025"
    ["blog/design/particle-effects.html"]="Sept 29, 2025"
    ["blog/devops/stripe-backend.html"]="Sept 30, 2025"
    ["blog/programming/adaptive-menu.html"]="Oct 1, 2025"
    ["blog/programming/portfolio-magic-system.html"]="Oct 2, 2025"
    ["blog/programming/user-fingerprinting.html"]="Oct 3, 2025"
    ["blog/programming/snapitforms-dev/building-snapitforms-realtime.html"]="Oct 4, 2025"

    # POST-DATED (Oct 2025 onward)
    ["blog/programming/snapitforms-dev/serverless-form-handling.html"]="Oct 6, 2025"
    ["blog/programming/snapitqr-dev/advanced-qr-generation.html"]="Oct 7, 2025"
    ["blog/programming/snapitqr-dev/aws-qr-platform.html"]="Oct 8, 2025"
    ["blog/programming/snapiturl-dev/link-management-system.html"]="Oct 9, 2025"
    ["blog/programming/urlstatuschecker-dev/building-scalable-monitoring.html"]="Oct 10, 2025"
    ["blog/programming/urlstatuschecker-dev/complete-serverless-architecture.html"]="Oct 11, 2025"
    ["blog/programming/urlstatuschecker-dev/project-blueprint.html"]="Oct 12, 2025"
    ["blog/programming/snapitagent-dev/ai-automation-platform.html"]="Oct 13, 2025"
    ["blog/programming/snapitanalytics-dev/realtime-data-pipeline.html"]="Oct 14, 2025"
)

for file in "${!DATES[@]}"; do
    date="${DATES[$file]}"

    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "❌ File not found: $file"
        continue
    fi

    # Check if article-meta already exists
    if grep -q "article-meta" "$file"; then
        echo "✓ Already has date: $file"
        continue
    fi

    # Find the article-header closing div and add date before it
    # Look for pattern like </div> after article-title
    sed -i "/<div class=\"article-title\">/,/<\/div>/ {
        /<\/div>/ a\            <div class=\"article-meta\">$date</div>
    }" "$file"

    echo "✅ Added date '$date' to: $file"
done

echo ""
echo "Done! Added dates to blog articles."
