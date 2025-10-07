// Stripe Configuration
// IMPORTANT: Only use publishable keys in frontend code
// Secret keys should ONLY be used on your secure server

const StripeConfig = {
    // Test Environment
    test: {
        publishableKey: window.STRIPE_PUBLISHABLE_KEY || null,
        // SECRET KEY (sk_test_...) should NEVER be in frontend code
        // Store it securely on your server as an environment variable
    },

    // Production Environment
    production: {
        publishableKey: window.STRIPE_LIVE_PUBLISHABLE_KEY || 'pk_live_51S8n1HIKz9wDf9qXch8jutJX0nSd3j9T2mRC2d9n6ajRspl3cnoRbtEBhgwilHDg5VRE20ehcLOjyOk64GKuSX1P00wwq4KpOQ',
        // SECRET KEY (sk_live_...) should NEVER be in frontend code
        // Store it securely on your server as an environment variable
    },

    // Current environment
    environment: 'test', // Change to 'production' when ready

    // Get current publishable key
    getPublishableKey() {
        return this[this.environment].publishableKey;
    },

    // Webhook endpoint secret (for server-side webhook verification)
    // This should also be stored securely on your server
    webhookSecret: {
        test: 'whsec_...', // Your test webhook secret
        production: 'whsec_...' // Your live webhook secret
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StripeConfig;
} else {
    window.StripeConfig = StripeConfig;
}