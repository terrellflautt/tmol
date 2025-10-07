#!/bin/bash

# IONOS Deployment Script for terrellflautt.com
# This script helps deploy updated files to IONOS hosting

echo "🚀 terrellflautt.com - IONOS Deployment Helper"
echo "=============================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Prepare files for deployment${NC}"
echo "--------------------------------------"

# List of files that were updated
FILES_TO_DEPLOY=(
    "index.html"
    "js/features/user-evolution.js"
    "js/features/memory-palace.js"
    "js/features/logo-evolution.js"
    "js/features/rpg-dialogue.js"
    "js/features/deep-user-profiler.js"
    "js/core/consciousness-sync.js"
    "genie-animations.js"
    "voting-api/user-profile.js"
    "voting-api/serverless.yml"
)

echo "Files to deploy:"
for file in "${FILES_TO_DEPLOY[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file (NOT FOUND)"
    fi
done

echo ""
echo -e "${YELLOW}Step 2: Choose deployment method${NC}"
echo "--------------------------------------"
echo "1) Manual FTP Upload (Recommended)"
echo "2) IONOS File Manager (Web Interface)"
echo "3) Git Deploy (if configured)"
echo ""

read -p "Choose method (1-3): " method

case $method in
    1)
        echo ""
        echo -e "${GREEN}Manual FTP Upload Instructions:${NC}"
        echo "1. Open FileZilla or WinSCP"
        echo "2. Connect to IONOS FTP:"
        echo "   Host: ftp.terrellflautt.com"
        echo "   Port: 21 (or 22 for SFTP)"
        echo "   Username: [Your IONOS FTP username]"
        echo "   Password: [Your IONOS FTP password]"
        echo ""
        echo "3. Navigate to web root (public_html or htdocs)"
        echo ""
        echo "4. Upload these files:"
        for file in "${FILES_TO_DEPLOY[@]}"; do
            echo "   - $file"
        done
        echo ""
        echo "5. After upload, go to IONOS Control Panel → Performance → Clear Cache"
        ;;

    2)
        echo ""
        echo -e "${GREEN}IONOS File Manager Instructions:${NC}"
        echo "1. Login to IONOS Control Panel"
        echo "2. Go to Websites & Domains"
        echo "3. Click File Manager"
        echo "4. Navigate to your website root"
        echo "5. Upload the files listed above"
        echo "6. Go to Performance → Clear Cache"
        ;;

    3)
        echo ""
        echo -e "${YELLOW}Git Deploy:${NC}"
        read -p "Enter your IONOS Git remote URL: " git_remote

        if [ -z "$git_remote" ]; then
            echo -e "${RED}No remote URL provided${NC}"
            exit 1
        fi

        echo "Adding changes..."
        git add .

        echo "Committing..."
        git commit -m "Deploy v5 fixes - JavaScript error corrections"

        echo "Pushing to IONOS..."
        git push "$git_remote" main

        echo -e "${GREEN}✓ Deployed!${NC}"
        ;;

    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}Step 3: Deploy API to AWS${NC}"
echo "--------------------------------------"
echo "The voting-api needs to be deployed to AWS Lambda"
echo ""
read -p "Deploy API now? (y/n): " deploy_api

if [ "$deploy_api" = "y" ]; then
    echo "Deploying to AWS..."
    cd voting-api
    npx serverless deploy --stage prod
    cd ..
    echo -e "${GREEN}✓ API Deployed!${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: SSL Certificate Reminder${NC}"
echo "--------------------------------------"
echo "⚠️  SSL certificate for logo.terrellflautt.com needs to be fixed:"
echo ""
echo "IONOS Control Panel:"
echo "1. Go to Domains & SSL"
echo "2. Select terrellflautt.com"
echo "3. Add Wildcard SSL Certificate (*.terrellflautt.com)"
echo "   OR"
echo "   Add individual SSL for logo.terrellflautt.com"
echo ""

echo ""
echo -e "${GREEN}Deployment checklist:${NC}"
echo "--------------------------------------"
echo "□ Upload updated JavaScript files"
echo "□ Clear IONOS cache"
echo "□ Deploy AWS Lambda API"
echo "□ Set AWS Parameter Store secrets (OpenAI, GitHub)"
echo "□ Fix SSL certificate for subdomains"
echo "□ Test on live site with hard refresh (Ctrl+Shift+F5)"
echo ""
echo -e "${GREEN}After deployment:${NC}"
echo "1. Visit https://terrellflautt.com"
echo "2. Hard refresh: Ctrl + Shift + F5"
echo "3. Open DevTools (F12)"
echo "4. Check console - should see v=4 or v=5 in script URLs"
echo "5. Should see NO errors"
echo ""
echo "✨ Deployment helper complete!"
