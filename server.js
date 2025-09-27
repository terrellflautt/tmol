// Express server for Terrell K. Flautt website
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Initialize SSM configuration
const ssmConfig = require('./config/ssm-config');

const app = express();
let config = {};

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.stripe.com", "https://api.terrellflautt.com", "https://genie.terrellflautt.com", "https://logo.terrellflautt.com", "https://cdn.terrellflautt.com", "https://5tx69uu5k9.execute-api.us-east-1.amazonaws.com", "https://ipapi.co"],
            frameSrc: ["https://js.stripe.com"]
        }
    }
}));

// CORS configuration - will be updated after config initialization
let corsMiddleware;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// More strict rate limiting for payment endpoints
const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 payment requests per windowMs
    message: 'Too many payment requests, please try again later.'
});

// Logging
app.use(morgan('combined'));

// Body parsing - special handling for webhooks
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname), {
    index: 'index.html',
    maxAge: '1d'
}));

// API Routes
app.use('/api/create-payment-intent', paymentLimiter, require('./api/create-payment-intent'));
app.use('/api/webhooks/stripe', require('./api/webhooks/stripe'));
app.use('/api/users', require('./api/user-profiles'));
app.use('/api/journey', require('./api/journey-analytics'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: require('./package.json').version || '1.0.0'
    });
});

// Serve HTML files for all routes (SPA support)
app.get('*', (req, res) => {
    // Check if it's an API route that doesn't exist
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }

    // For all other routes, serve the appropriate HTML file
    const requestedPath = req.path;
    let filePath = 'index.html';

    if (requestedPath.includes('contribute')) {
        filePath = 'contribute.html';
    } else if (requestedPath.includes('contribuir')) {
        filePath = 'contribuir.html';
    }

    res.sendFile(path.join(__dirname, filePath));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';

    res.status(error.status || 500).json({
        error: isDevelopment ? error.message : 'Internal server error',
        ...(isDevelopment && { stack: error.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Initialize server with SSM configuration
async function initializeServer() {
    try {
        console.log('🔧 Initializing server with SSM configuration...');

        // Load configuration from SSM
        config = await ssmConfig.initializeConfig();

        // Configure CORS with loaded configuration
        const allowedOrigins = config.CORS_ORIGINS
            ? config.CORS_ORIGINS.split(',').map(origin => origin.trim())
            : (process.env.NODE_ENV === 'production'
                ? ['https://terrellflautt.com', 'https://www.terrellflautt.com', 'https://api.terrellflautt.com', 'https://genie.terrellflautt.com', 'https://logo.terrellflautt.com', 'https://cdn.terrellflautt.com']
                : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080']);

        corsMiddleware = cors({
            origin: allowedOrigins,
            credentials: true
        });

        app.use(corsMiddleware);

        // Make config available to other modules
        app.locals.config = config;

        const PORT = config.PORT || 3000;

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`💳 Stripe: ${config.STRIPE_SECRET_KEY ? 'Configured' : 'Missing API key'}`);
            console.log(`🔒 CORS Origins: ${allowedOrigins.join(', ')}`);

            if (process.env.NODE_ENV !== 'production') {
                console.log(`📝 Local URLs:`);
                console.log(`   - Website: http://localhost:${PORT}`);
                console.log(`   - Contribute: http://localhost:${PORT}/contribute.html`);
                console.log(`   - Health: http://localhost:${PORT}/api/health`);
            }
        });

    } catch (error) {
        console.error('❌ Failed to initialize server:', error.message);
        console.log('🔄 Falling back to environment variables...');

        // Fallback to environment variables
        require('dotenv').config();

        corsMiddleware = cors({
            origin: process.env.NODE_ENV === 'production'
                ? ['https://terrellflautt.com', 'https://www.terrellflautt.com']
                : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080'],
            credentials: true
        });

        app.use(corsMiddleware);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT} (fallback mode)`);
            console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Missing API key'}`);
        });
    }
}

// Start the server
initializeServer();

module.exports = app;