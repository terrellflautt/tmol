/**
 * AWS SSM Parameter Store Configuration Manager
 * Replaces environment file usage with secure parameter management
 */

const AWS = require('aws-sdk');

class SSMConfig {
    constructor() {
        // Initialize AWS SSM client
        this.ssm = new AWS.SSM({
            region: process.env.AWS_REGION || 'us-east-1'
        });

        // Cache for parameters to avoid repeated API calls
        this.parameterCache = new Map();
        this.cacheTimeout = 300000; // 5 minutes
        this.lastCacheUpdate = new Map();
    }

    /**
     * Get a parameter from SSM Parameter Store
     * @param {string} parameterName - The parameter name (without path prefix)
     * @param {boolean} withDecryption - Whether to decrypt SecureString parameters
     * @param {boolean} useCache - Whether to use cached values
     * @returns {Promise<string>} Parameter value
     */
    async getParameter(parameterName, withDecryption = true, useCache = true) {
        const fullParameterName = `/terrellflautt/${process.env.NODE_ENV || 'development'}/${parameterName}`;

        // Check cache first if enabled
        if (useCache && this.isCacheValid(fullParameterName)) {
            console.log(`📋 Using cached parameter: ${parameterName}`);
            return this.parameterCache.get(fullParameterName);
        }

        try {
            console.log(`🔍 Fetching parameter from SSM: ${parameterName}`);
            const params = {
                Name: fullParameterName,
                WithDecryption: withDecryption
            };

            const result = await this.ssm.getParameter(params).promise();
            const value = result.Parameter.Value;

            // Cache the result
            if (useCache) {
                this.parameterCache.set(fullParameterName, value);
                this.lastCacheUpdate.set(fullParameterName, Date.now());
            }

            return value;
        } catch (error) {
            console.error(`❌ Failed to get parameter ${parameterName}:`, error.message);

            // Fallback to environment variables for development
            if (process.env.NODE_ENV !== 'production') {
                const envKey = parameterName.replace(/[-\/]/g, '_').toUpperCase();
                const envValue = process.env[envKey];
                if (envValue) {
                    console.log(`⚠️  Using fallback environment variable: ${envKey}`);
                    return envValue;
                }
            }

            throw new Error(`Parameter ${parameterName} not found and no fallback available`);
        }
    }

    /**
     * Get multiple parameters at once
     * @param {string[]} parameterNames - Array of parameter names
     * @param {boolean} withDecryption - Whether to decrypt SecureString parameters
     * @returns {Promise<Object>} Object with parameter names as keys and values
     */
    async getParameters(parameterNames, withDecryption = true) {
        const environment = process.env.NODE_ENV || 'development';
        const fullParameterNames = parameterNames.map(name =>
            `/terrellflautt/${environment}/${name}`
        );

        try {
            console.log(`🔍 Fetching ${parameterNames.length} parameters from SSM`);
            const params = {
                Names: fullParameterNames,
                WithDecryption: withDecryption
            };

            const result = await this.ssm.getParameters(params).promise();

            // Process valid parameters
            const parameters = {};
            result.Parameters.forEach(param => {
                const shortName = param.Name.split('/').pop();
                parameters[shortName] = param.Value;

                // Cache the result
                this.parameterCache.set(param.Name, param.Value);
                this.lastCacheUpdate.set(param.Name, Date.now());
            });

            // Handle missing parameters
            if (result.InvalidParameters && result.InvalidParameters.length > 0) {
                console.warn('⚠️  Invalid parameters:', result.InvalidParameters);

                // Try fallback for missing parameters in development
                if (process.env.NODE_ENV !== 'production') {
                    result.InvalidParameters.forEach(invalidParam => {
                        const shortName = invalidParam.split('/').pop();
                        const envKey = shortName.replace(/[-\/]/g, '_').toUpperCase();
                        const envValue = process.env[envKey];
                        if (envValue) {
                            console.log(`⚠️  Using fallback environment variable: ${envKey}`);
                            parameters[shortName] = envValue;
                        }
                    });
                }
            }

            return parameters;
        } catch (error) {
            console.error('❌ Failed to get parameters:', error.message);
            throw error;
        }
    }

    /**
     * Initialize configuration by loading all required parameters
     * @returns {Promise<Object>} Configuration object
     */
    async initializeConfig() {
        const requiredParameters = [
            'stripe-publishable-key',
            'stripe-secret-key',
            'stripe-webhook-secret',
            'cors-origins',
            'port',
            'force-https',
            'secure-cookies'
        ];

        try {
            console.log('🚀 Initializing SSM configuration...');
            const config = await this.getParameters(requiredParameters);

            // Transform to expected format
            const formattedConfig = {
                STRIPE_PUBLISHABLE_KEY: config['stripe-publishable-key'],
                STRIPE_SECRET_KEY: config['stripe-secret-key'],
                STRIPE_WEBHOOK_SECRET: config['stripe-webhook-secret'],
                CORS_ORIGINS: config['cors-origins'],
                PORT: config['port'] || '3000',
                FORCE_HTTPS: config['force-https'] === 'true',
                SECURE_COOKIES: config['secure-cookies'] === 'true'
            };

            console.log('✅ SSM configuration loaded successfully');
            console.log('📋 Loaded parameters:', Object.keys(formattedConfig).join(', '));

            return formattedConfig;
        } catch (error) {
            console.error('❌ Failed to initialize SSM configuration:', error.message);

            // In development, allow fallback to environment variables
            if (process.env.NODE_ENV !== 'production') {
                console.log('⚠️  Falling back to environment variables for development');
                return {
                    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
                    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
                    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
                    CORS_ORIGINS: process.env.CORS_ORIGINS,
                    PORT: process.env.PORT || '3000',
                    FORCE_HTTPS: process.env.FORCE_HTTPS === 'true',
                    SECURE_COOKIES: process.env.SECURE_COOKIES === 'true'
                };
            }

            throw error;
        }
    }

    /**
     * Check if cached parameter is still valid
     * @param {string} parameterName - Full parameter name
     * @returns {boolean} Whether cache is valid
     */
    isCacheValid(parameterName) {
        if (!this.parameterCache.has(parameterName)) {
            return false;
        }

        const lastUpdate = this.lastCacheUpdate.get(parameterName);
        return lastUpdate && (Date.now() - lastUpdate) < this.cacheTimeout;
    }

    /**
     * Clear parameter cache
     */
    clearCache() {
        this.parameterCache.clear();
        this.lastCacheUpdate.clear();
        console.log('🗑️  Parameter cache cleared');
    }

    /**
     * Create or update a parameter in SSM
     * @param {string} parameterName - Parameter name
     * @param {string} value - Parameter value
     * @param {string} type - Parameter type (String, StringList, SecureString)
     * @param {string} description - Parameter description
     * @returns {Promise<void>}
     */
    async setParameter(parameterName, value, type = 'SecureString', description = '') {
        const fullParameterName = `/terrellflautt/${process.env.NODE_ENV || 'development'}/${parameterName}`;

        try {
            const params = {
                Name: fullParameterName,
                Value: value,
                Type: type,
                Description: description,
                Overwrite: true
            };

            await this.ssm.putParameter(params).promise();
            console.log(`✅ Parameter ${parameterName} set successfully`);

            // Update cache
            this.parameterCache.set(fullParameterName, value);
            this.lastCacheUpdate.set(fullParameterName, Date.now());
        } catch (error) {
            console.error(`❌ Failed to set parameter ${parameterName}:`, error.message);
            throw error;
        }
    }
}

// Export singleton instance
module.exports = new SSMConfig();