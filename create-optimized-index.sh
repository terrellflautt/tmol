#!/bin/bash
# Extract just the HTML content without all the heavy scripts

# Get everything up to the first <script> tag after the content
sed -n '1,/<script src="script.js/p' index-full-version-backup.html | \
grep -v "emergency-yellow-fix" | \
grep -v "error-handler" | \
grep -v "consciousness-sync" | \
grep -v "deep-user-profiler" | \
grep -v "user-evolution" | \
grep -v "memory-palace" | \
grep -v "persistent-user-system" | \
grep -v "inner-journey" | \
sed '/<script/d' > index-optimized-temp.html

# Add just the essential script
echo '    <script src="script.js?v=5"></script>' >> index-optimized-temp.html
echo '</body>' >> index-optimized-temp.html
echo '</html>' >> index-optimized-temp.html

mv index-optimized-temp.html index.html
echo "✅ Created optimized index with all content"
