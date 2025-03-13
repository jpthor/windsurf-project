// Load environment variables for local development
async function loadEnv() {
    try {
        const response = await fetch('/.env');
        const text = await response.text();
        
        // Parse .env file
        const env = {};
        text.split('\n').forEach(line => {
            const [key, ...values] = line.split('=');
            if (key && values.length > 0) {
                env[key.trim()] = values.join('=').trim();
            }
        });
        
        // Make env variables available globally
        window.__ENV = env;
        
        console.log('Environment variables loaded successfully');
    } catch (error) {
        console.error('Failed to load environment variables:', error);
    }
}

// Load environment variables immediately
loadEnv();
