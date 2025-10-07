/**
 * Graceful Error Handler for Magical Systems
 * Ensures the magic continues even when API endpoints are unavailable
 */

class MagicalErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Override console.error to capture and handle gracefully
        this.setupGracefulDegradation();
        this.setupAPIFallbacks();
    }

    setupGracefulDegradation() {
        // Handle fetch errors gracefully
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);

                // Handle various response statuses gracefully
                if (!response.ok) {
                    const url = args[0];
                    if (response.status === 404) {
                        console.debug('🔮 API endpoint not ready, magical systems continue...', this.getServiceName(url));
                        return { ok: false, status: 404, statusText: 'Service Initializing' };
                    }
                    if (response.status === 403) {
                        console.debug('🔮 API access pending, using local magic...', this.getServiceName(url));
                        return { ok: false, status: 403, statusText: 'Access Pending' };
                    }
                    return response;
                }
                return response;
            } catch (error) {
                const url = args[0];
                const serviceName = this.getServiceName(url);

                // Handle specific error types
                if (error.name === 'TypeError') {
                    if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
                        console.debug(`🔮 CORS policy active for ${serviceName}, using local consciousness...`);
                        return { ok: false, status: 0, error: 'CORS', statusText: 'CORS Policy Active' };
                    }
                    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_FAILED')) {
                        console.debug(`🔮 ${serviceName} offline, magic continues locally...`);
                        return { ok: false, status: 0, error: 'NETWORK', statusText: 'Service Offline' };
                    }
                    if (error.message.includes('ERR_CERT_COMMON_NAME_INVALID')) {
                        console.debug(`🔮 ${serviceName} SSL pending, local magic active...`);
                        return { ok: false, status: 0, error: 'SSL', statusText: 'SSL Configuration Pending' };
                    }
                }

                // For any other errors, return graceful fallback
                console.debug(`🔮 ${serviceName} temporarily unavailable, consciousness adapts...`);
                return { ok: false, status: 0, error: 'UNKNOWN', statusText: 'Service Unavailable' };
            }
        };
    }

    getServiceName(url) {
        if (typeof url !== 'string') return 'API Service';

        if (url.includes('api.terrellflautt.com')) return 'Core API';
        if (url.includes('genie.terrellflautt.com')) return 'AI Genie';
        if (url.includes('logo.terrellflautt.com')) return 'Logo Creator';
        if (url.includes('cdn.terrellflautt.com')) return 'Content Network';
        return 'External Service';
    }

    setupAPIFallbacks() {
        // Provide fallback data for when APIs are unavailable
        window.magicalFallbacks = {
            userProfile: {
                userId: localStorage.getItem('terrellflautt_user_id') || 'offline_user',
                discoveries: JSON.parse(localStorage.getItem('user_discoveries') || '[]'),
                level: localStorage.getItem('user_level') || 'newcomer',
                visitCount: parseInt(localStorage.getItem('terrellflautt_visit_count') || '1')
            },
            votes: JSON.parse(localStorage.getItem('terrellflautt_votes') || '{}'),
            consciousness: {
                level: localStorage.getItem('consciousness_level') || 'newcomer',
                awareness: parseFloat(localStorage.getItem('consciousness_awareness') || '0'),
                evolution: localStorage.getItem('consciousness_evolution') || 'beginning',
                lastSync: Date.now()
            },
            preferences: {
                theme: 'dark',
                animations: true,
                audio: false,
                notifications: true
            }
        };

        // Ensure magical experience continues offline
        console.debug('🔮 Magical fallback systems initialized - consciousness preserved locally');
    }

    handleAPIError(error, context = '') {
        console.debug(`API graceful fallback: ${context}`, error);

        // Don't let API errors break the magical experience
        return {
            success: false,
            fallback: true,
            data: window.magicalFallbacks[context] || null
        };
    }
}

// Initialize error handler
window.magicalErrorHandler = new MagicalErrorHandler();