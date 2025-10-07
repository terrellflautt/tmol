#!/bin/bash

# Production Deployment Script for Terrell K. Flautt Website
# This script handles the complete production deployment process

set -e  # Exit on any error

echo "🚀 Starting Production Deployment for Terrell K. Flautt Website"
echo "=================================================="

# Configuration
PROJECT_NAME="terrellflautt-website"
PRODUCTION_PORT=3000
BACKUP_DIR="./backups/$(date +%Y%m%d-%H%M%S)"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Pre-deployment checks
log "1. Running pre-deployment checks..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js first."
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    error "npm is not installed. Please install npm first."
fi

# Check if required environment files exist
if [ ! -f ".env.production" ]; then
    error ".env.production file not found. Please create production environment configuration."
fi

log "✅ Pre-deployment checks passed"

# Create backup
log "2. Creating backup..."
mkdir -p "$BACKUP_DIR"
cp -r . "$BACKUP_DIR/" 2>/dev/null || true
log "✅ Backup created at $BACKUP_DIR"

# Install dependencies
log "3. Installing production dependencies..."
npm ci --only=production
log "✅ Dependencies installed"

# Run security audit
log "4. Running security audit..."
npm audit --audit-level moderate
if [ $? -ne 0 ]; then
    warning "Security audit found issues. Please review and fix before deploying."
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Deployment cancelled due to security concerns."
    fi
fi
log "✅ Security audit completed"

# Environment setup
log "5. Setting up production environment..."
if [ ! -f ".env" ]; then
    cp .env.production .env
    log "✅ Production environment file copied"
else
    warning ".env file already exists. Using existing configuration."
fi

# File permissions
log "6. Setting file permissions..."
find . -type f -name "*.js" -exec chmod 644 {} \;
find . -type f -name "*.html" -exec chmod 644 {} \;
find . -type f -name "*.css" -exec chmod 644 {} \;
chmod +x deploy-production.sh
log "✅ File permissions set"

# Test application
log "7. Testing application..."
timeout 10 npm start &
SERVER_PID=$!
sleep 5

# Check if server is responding
if curl -s http://localhost:$PRODUCTION_PORT/api/health > /dev/null; then
    log "✅ Application health check passed"
    kill $SERVER_PID 2>/dev/null || true
else
    error "Application health check failed. Server is not responding."
fi

# Production optimizations
log "8. Applying production optimizations..."

# Remove development files
rm -rf tests/ 2>/dev/null || true
rm -rf backup-* 2>/dev/null || true
rm -f voting-system-backup.js 2>/dev/null || true

# Set production environment
export NODE_ENV=production

log "✅ Production optimizations applied"

# Start production server
log "9. Starting production server..."
echo "Production server will start on port $PRODUCTION_PORT"
echo "Use 'npm start' to run the server"
echo "Use 'pm2 start server.js --name $PROJECT_NAME' for process management"

log "🎉 Production deployment completed successfully!"
echo "=================================================="
echo "🌐 Website URLs:"
echo "   - English: http://localhost:$PRODUCTION_PORT/contribute.html"
echo "   - Spanish: http://localhost:$PRODUCTION_PORT/contribuir.html"
echo "   - API Health: http://localhost:$PRODUCTION_PORT/api/health"
echo ""
echo "📋 Next Steps:"
echo "   1. Configure your reverse proxy (nginx/apache)"
echo "   2. Set up SSL certificates"
echo "   3. Configure monitoring and logging"
echo "   4. Test all functionality in production environment"
echo ""
echo "🔧 Production Management Commands:"
echo "   npm start                    - Start server normally"
echo "   pm2 start server.js          - Start with PM2 process manager"
echo "   pm2 restart $PROJECT_NAME    - Restart application"
echo "   pm2 logs $PROJECT_NAME       - View logs"
echo "   pm2 stop $PROJECT_NAME       - Stop application"
echo ""
echo "✨ Deployment completed! Your website is production-ready."