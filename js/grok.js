import { elements } from './dom.js';
import { GROK_API_KEY } from './config.js';
import { extractCredentialsWithRegex } from './regex-extractor.js';

export { GROK_API_KEY };

// Check Grok API connection status and set up periodic checks
export async function checkGrokStatus() {
    // Initial check
    await performGrokStatusCheck();
    
    // Set up periodic checks every 30 seconds
    setInterval(performGrokStatusCheck, 30000);
}

// Actual status check implementation
async function performGrokStatusCheck() {
    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Test connection' }],
                model: 'grok-2-latest',
                stream: false,
                temperature: 0
            })
        });

        const isConnected = response.ok;
        elements.grokStatusLight.classList.toggle('connected', isConnected);
        elements.grokStatusText.textContent = `Grok ${isConnected ? 'Connected' : 'Disconnected'}`;
        return isConnected;
    } catch (error) {
        console.error('Grok API connection check failed:', error);
        elements.grokStatusLight.classList.remove('connected');
        elements.grokStatusText.textContent = 'Grok Disconnected';
        return false;
    }
}

// Extract WiFi credentials using Grok API
export async function extractWifiCredentials(text) {
    if (!text) {
        console.log('No text provided');
        return;
    }

    // First try regex extraction as it's faster and doesn't require API calls
    const regexCredentials = extractCredentialsWithRegex(text);
    if (regexCredentials.network && regexCredentials.password) {
        console.log('Credentials found using regex');
        elements.networkName.value = regexCredentials.network;
        elements.networkPassword.value = regexCredentials.password;
        return regexCredentials;
    }

    // If regex fails and Grok is available, try Grok
    if (!GROK_API_KEY) {
        console.log('No Grok API key available, using regex results');
        elements.networkName.value = regexCredentials.network || '';
        elements.networkPassword.value = regexCredentials.password || '';
        return regexCredentials;
    }

    try {
        console.log('Processing text with Grok:', text);

        const requestBody = {
            messages: [
                {
                    role: 'system',
                    content: 'Extract WiFi credentials from the text and return a JSON object with only "network" and "password" keys. Do not include any additional text, markdown, code blocks, or formatting. Return only the raw JSON string, e.g., {"network":"example","password":"pass"}.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            model: 'grok-2-latest',
            stream: false,
            temperature: 0
        };

        console.log('Sending request to Grok API...');
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.log('Grok API failed, falling back to regex results');
            elements.networkName.value = regexCredentials.network || '';
            elements.networkPassword.value = regexCredentials.password || '';
            return regexCredentials;
        }

        const data = await response.json();
        console.log('Full API response:', data);

        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            console.log('Invalid Grok response, falling back to regex results');
            elements.networkName.value = regexCredentials.network || '';
            elements.networkPassword.value = regexCredentials.password || '';
            return regexCredentials;
        }

        console.log('Raw content:', content);
        const credentials = JSON.parse(content);

        if (!credentials.network || !credentials.password) {
            console.log('Missing credentials in Grok response, falling back to regex results');
            elements.networkName.value = regexCredentials.network || '';
            elements.networkPassword.value = regexCredentials.password || '';
            return regexCredentials;
        }

        elements.networkName.value = credentials.network;
        elements.networkPassword.value = credentials.password;

        console.log('Successfully extracted credentials:', credentials);
        return credentials;

    } catch (error) {
        console.error('Grok extraction failed, using regex results:', error);
        elements.networkName.value = regexCredentials.network || '';
        elements.networkPassword.value = regexCredentials.password || '';
        return regexCredentials;
    }
}
