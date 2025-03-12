// Local development API key
const LOCAL_API_KEY = 'xai-ecGtbkZB10eageFi3k1gI7la6rnaUcIO6TbztJdAvYdjXacJCiJVLpNc3Z81bcXEsWoEfO2bpl2jOC3u';

// This handles both local development and Vercel deployment
export const GROK_API_KEY = 
    // Check if we're in a Node.js environment (Vercel)
    typeof process !== 'undefined' && process.env.GROK_API_KEY
        ? process.env.GROK_API_KEY
        // Use local key for development
        : LOCAL_API_KEY;
