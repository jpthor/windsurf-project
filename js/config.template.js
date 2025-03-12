// config.template.js - Copy this file to config.js and add your API key
// This file shows the structure - DO NOT add real API keys here

// For local development, replace with your actual API key
const LOCAL_API_KEY = 'your_api_key_here';

// This handles both local development and Vercel deployment
export const GROK_API_KEY = 
    // Check if we're in a Node.js environment (Vercel)
    typeof process !== 'undefined' && process.env.GROK_API_KEY
        ? process.env.GROK_API_KEY
        // Use local key for development
        : LOCAL_API_KEY;
