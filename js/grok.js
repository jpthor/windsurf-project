import { elements } from './dom.js';
import { GROK_API_KEY } from './config.js';
import { extractCredentialsWithRegex } from './regex-extractor.js';

export { GROK_API_KEY };
export let isGrokConnected = false;
export const GROK_MODEL = 'grok-2-latest';

// Backoff configuration
const BACKOFF_CONFIG = {
    initialDelay: 30000,     // 30 seconds initial delay
    maxDelay: 3600000,       // Max delay of 1 hour
    factor: 2,               // Exponential factor
    jitter: 0.1,             // 10% jitter to avoid thundering herd
    retryCount: 0            // Current retry count
};

// Track if we've checked this session
let hasCheckedThisSession = false;
let backoffTimer = null;

// Check Grok API connection status with exponential backoff
export async function checkGrokStatus() {
    // Only do the initial check if we haven't checked this session
    if (!hasCheckedThisSession) {
        console.log('Performing initial Grok status check');
        hasCheckedThisSession = true;
        await performGrokStatusCheck();
    }
}

// Schedule the next check with exponential backoff
function scheduleNextCheck(wasSuccessful) {
    // Clear any existing timer
    if (backoffTimer) {
        clearTimeout(backoffTimer);
    }
    
    if (wasSuccessful) {
        // If successful, reset retry count
        BACKOFF_CONFIG.retryCount = 0;
        // No need to schedule another check if successful
        return;
    }
    
    // Calculate delay with exponential backoff
    const delay = Math.min(
        BACKOFF_CONFIG.initialDelay * Math.pow(BACKOFF_CONFIG.factor, BACKOFF_CONFIG.retryCount),
        BACKOFF_CONFIG.maxDelay
    );
    
    // Add jitter to avoid thundering herd problem
    const jitterAmount = delay * BACKOFF_CONFIG.jitter;
    const jitteredDelay = delay + (Math.random() * 2 - 1) * jitterAmount;
    
    console.log(`Scheduling next Grok check with ${Math.round(jitteredDelay/1000)}s delay (retry #${BACKOFF_CONFIG.retryCount + 1})`);
    
    // Schedule next check
    backoffTimer = setTimeout(async () => {
        BACKOFF_CONFIG.retryCount++;
        await performGrokStatusCheck();
    }, jitteredDelay);
}

// Actual status check implementation
async function performGrokStatusCheck() {
    console.log('Performing Grok status check with:', {
        apiKeyExists: !!GROK_API_KEY,
        apiKeyLength: GROK_API_KEY ? GROK_API_KEY.length : 0,
        apiKeyPrefix: GROK_API_KEY ? GROK_API_KEY.substring(0, 4) : 'none'
    });

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROK_API_KEY}`
        };
        console.log('Request headers:', {
            contentType: headers['Content-Type'],
            authPrefix: headers.Authorization ? headers.Authorization.substring(0, 11) : 'none'
        });

        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Test connection' }],
                model: 'grok-2-latest',
                stream: false,
                temperature: 0
            })
        });

        console.log('API Response:', {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', {
                status: response.status,
                text: errorText,
                parsed: tryParseJson(errorText)
            });
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const isConnected = response.ok;
        isGrokConnected = isConnected;
        elements.grokStatusLight.classList.toggle('connected', isConnected);
        elements.grokStatusText.textContent = `Grok ${isConnected ? 'Connected' : 'Disconnected'}`;
        
        // Update model info in footer
        const modelInfo = document.getElementById('grok-model-info');
        if (modelInfo) {
            modelInfo.textContent = isConnected ? `Using ${GROK_MODEL}` : '';
        }
        
        // Schedule next check based on success
        scheduleNextCheck(true);
        
        return isConnected;
    } catch (error) {
        console.error('Grok API connection check failed:', {
            error: error.toString(),
            stack: error.stack,
            message: error.message
        });
        isGrokConnected = false;
        elements.grokStatusLight.classList.remove('connected');
        elements.grokStatusText.textContent = 'Grok Disconnected';
        
        // Clear model info in footer
        const modelInfo = document.getElementById('grok-model-info');
        if (modelInfo) {
            modelInfo.textContent = '';
        }
        
        // Schedule next check with backoff
        scheduleNextCheck(false);
        
        return false;
    }
}

// Helper function to safely parse JSON
function tryParseJson(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        return { error: 'Failed to parse JSON', text };
    }
}

// Extract WiFi credentials using Grok API
export async function extractWifiCredentials(text) {
    if (!text) {
        console.log('No text provided');
        return;
    }

    // If Grok is connected, try it first
    if (isGrokConnected) {
        try {
            // Update status
            elements.ocrText.textContent = 'Sending to Grok AI for analysis...';
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
                model: GROK_MODEL,
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
                const errorText = await response.text();
                console.error('Grok API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    error: tryParseJson(errorText)
                });
                throw new Error(`API request failed (${response.status}): ${errorText}`);
            }

            elements.ocrText.textContent = 'Processing Grok response...';
            const data = await response.json();
            console.log('Full API response:', data);

            const content = data.choices?.[0]?.message?.content;
            if (!content) {
                throw new Error('Invalid API response structure');
            }

            console.log('Raw content:', content);
            const credentials = JSON.parse(content);

            if (!credentials.network || !credentials.password) {
                throw new Error('Missing required credentials in response');
            }

            elements.networkName.value = credentials.network;
            elements.networkPassword.value = credentials.password;

            // Show the extracted text with a success message
            elements.ocrText.textContent = `Found text:\n\n${text}\n\nSuccessfully extracted WiFi credentials!`;
            console.log('Successfully extracted credentials with Grok:', credentials);
            return credentials;

        } catch (error) {
            console.log('Grok extraction failed, falling back to regex:', error);
        }
    }

    // Try regex extraction as fallback
    console.log('Using regex extraction');
    elements.ocrText.textContent = 'Analyzing text with backup method...';
    const regexCredentials = extractCredentialsWithRegex(text);
    elements.networkName.value = regexCredentials.network || '';
    elements.networkPassword.value = regexCredentials.password || '';
    
    // Show final results
    elements.ocrText.textContent = `Found text:\n\n${text}\n\n${regexCredentials.network ? 'Successfully extracted WiFi credentials!' : 'Could not find WiFi credentials in the text.'}`;

    return regexCredentials;
}
