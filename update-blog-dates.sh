#!/bin/bash

# Update blog article dates to spread them out over time
# Make it look like consistent daily posting

declare -A NEW_DATES=(
    # Backdate to late September 2025
    ["blog/ai/aws-lambda-api.html"]="Sept 26, 2025"
    ["blog/design/css-backdrop-filters.html"]="Sept 27, 2025"
    ["blog/design/gradient-systems.html"]="Sept 28, 2025"
    ["blog/design/particle-effects.html"]="Sept 29, 2025"
    ["blog/devops/stripe-backend.html"]="Sept 30, 2025"
    ["blog/programming/adaptive-menu.html"]="Oct 1, 2025"
    ["blog/programming/logo-evolution.html"]="Oct 2, 2025"  # Already has date
    ["blog/programming/portfolio-magic-system.html"]="Oct 3, 2025"
    ["blog/programming/user-fingerprinting.html"]="Oct 4, 2025"

    # Current/future dates
    ["blog/programming/snapitforms-dev/building-snapitforms-realtime.html"]="Oct 5, 2025"  # Today
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

for file in "${!NEW_DATES[@]}"; do
    new_date="${NEW_DATES[$file]}"

    if [ ! -f "$file" ]; then
        echo "❌ File not found: $file"
        continue
    fi

    # Replace the date in article-meta div
    # Handle both with and without "• X min read"
    if grep -q "article-meta" "$file"; then
        # Replace existing date
        sed -i "s|<div class=\"article-meta\">[^<]*</div>|<div class=\"article-meta\">$new_date</div>|g" "$file"
        echo "✅ Updated to '$new_date': $file"
    else
        echo "⚠️  No article-meta found in: $file"
    fi
done

echo ""
echo "Done! Updated all blog article dates."
