/**
 * Unified environment variable handling for both local development and Vercel deployment.
 * 
 * For local development:
 * - Uses window.__ENV from .env file
 * 
 * For Vercel:
 * - Uses window.ENV_VARS injected at build time
 */

// Initialize environment variables
window.ENV_VARS = window.ENV_VARS || {
    REACT_APP_GROK_API_KEY: '{{REACT_APP_GROK_API_KEY}}'
};

// Get environment variable with logging
export function getEnvVar(name) {
    // Check Vercel injected variables first
    if (window.ENV_VARS?.[name]) {
        return window.ENV_VARS[name];
    }

    // Then check local development variables
    if (window.__ENV?.[name]) {
        return window.__ENV[name];
    }

    console.warn(`Environment variable ${name} not found. This will cause API calls to fail.`);
    return null;
}

// Export commonly used environment variables
export const GROK_API_KEY = getEnvVar('REACT_APP_GROK_API_KEY');
