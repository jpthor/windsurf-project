/**
 * Unified environment variable handling for both local development and Vercel deployment.
 * 
 * For local development:
 * - Uses window.__ENV from .env file
 * 
 * For Vercel:
 * - Uses window.ENV_VARS injected at build time via env-vars.js
 */

// Get environment variable with logging
export function getEnvVar(name) {
    // Check Vercel injected variables first
    if (window.ENV_VARS?.[name]) {
        console.log(`Using ${name} from Vercel environment`);
        return window.ENV_VARS[name];
    }

    // Then check local development variables
    if (window.__ENV?.[name]) {
        console.log(`Using ${name} from local environment`);
        return window.__ENV[name];
    }

    console.warn(`Environment variable ${name} not found. This will cause API calls to fail.`);
    return null;
}

// Export commonly used environment variables
export const GROK_API_KEY = getEnvVar('REACT_APP_GROK_API_KEY');
