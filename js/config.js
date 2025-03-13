/**
 * Get environment variables in a way that works in both:
 * 1. Local development (using .env file)
 * 2. Vercel deployment (using environment variables)
 *
 * Note: For React apps, all client-side environment variables must be prefixed with REACT_APP_
 */
function getEnvVar(name) {
    console.log('Environment check:', {
        isProcessDefined: typeof process !== 'undefined',
        hasProcessEnv: typeof process !== 'undefined' && process.env !== undefined,
        hasWindowEnv: typeof window !== 'undefined' && window.__ENV !== undefined,
        availableProcessEnvKeys: typeof process !== 'undefined' && process.env ? Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')).join(', ') : 'none',
        availableWindowEnvKeys: typeof window !== 'undefined' && window.__ENV ? Object.keys(window.__ENV).join(', ') : 'none'
    });

    // For Vercel deployment
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
        console.log(`Found ${name} in process.env`);
        return process.env[name];
    }

    // For local development
    if (typeof window !== 'undefined' && window.__ENV && window.__ENV[name]) {
        console.log(`Found ${name} in window.__ENV`);
        return window.__ENV[name];
    }

    console.warn(`Environment variable ${name} not found. This will cause API calls to fail.`);
    return null;
}

// Export environment variables
const apiKey = getEnvVar('REACT_APP_GROK_API_KEY');
console.log('API Key status:', {
    isDefined: apiKey !== null && apiKey !== undefined,
    length: apiKey ? apiKey.length : 0,
    prefix: apiKey ? apiKey.substring(0, 4) : 'none'
});

export const GROK_API_KEY = apiKey;
