/**
 * Environment variable handling:
 * - Production: Uses process.env (Vercel)
 * - Development: Uses window.__ENV (local)
 */

// For production (Vercel)
const PROD_API_KEY = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_GROK_API_KEY : null;

// For local development
const DEV_API_KEY = typeof window !== 'undefined' && window.__ENV ? window.__ENV.REACT_APP_GROK_API_KEY : null;

// Use production key if available, otherwise fall back to development
export const GROK_API_KEY = PROD_API_KEY || DEV_API_KEY;

// Log environment status (but not the key itself)
console.log('Environment Status:', {
    isProd: typeof process !== 'undefined' && !!process.env,
    isDev: typeof window !== 'undefined' && !!window.__ENV,
    hasKey: !!GROK_API_KEY
});

if (!GROK_API_KEY) {
    console.error('REACT_APP_GROK_API_KEY not found in environment');
}
