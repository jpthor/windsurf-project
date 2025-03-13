/**
 * Get environment variables in a way that works in both:
 * 1. Local development (using .env file)
 * 2. Vercel deployment (using environment variables)
 *
 * Note: For React apps, all client-side environment variables must be prefixed with REACT_APP_
 */
function getEnvVar(name) {
    // For Vercel deployment
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
        return process.env[name];
    }

    // For local development
    if (typeof window !== 'undefined' && window.__ENV && window.__ENV[name]) {
        return window.__ENV[name];
    }

    console.warn(`Environment variable ${name} not found`);
    return null;
}

// Export environment variables
export const GROK_API_KEY = getEnvVar('REACT_APP_GROK_API_KEY');
