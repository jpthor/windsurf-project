import { elements } from './dom.js';
import { GROK_API_KEY } from './config.js';
import { currentFile } from './fileHandling.js';

export let recognizedText = '';

export async function performOCR() {
    if (!currentFile) {
        console.error('No file selected');
        return;
    }
    
    console.log('Starting OCR process for file:', currentFile.name);
    elements.ocrText.textContent = 'Processing...';
    elements.networkName.value = '';
    elements.networkPassword.value = '';
    
    try {
        console.log('Creating Tesseract worker...');
        const worker = await Tesseract.createWorker('eng', 1);
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        console.log('Worker initialized, starting recognition...');
        const { data } = await worker.recognize(currentFile);
        console.log('Recognition completed, text:', data.text);
        
        recognizedText = data.text;
        elements.ocrText.textContent = recognizedText;
        
        // Extract WiFi credentials using Grok API
        await extractWifiCredentials(recognizedText);
        
        console.log('Terminating worker...');
        await worker.terminate();
    } catch (error) {
        console.error('OCR Error:', error);
        console.error('Error stack:', error.stack);
        
        // Show a more specific error message to the user
        let errorMessage = 'Error processing image. ';
        if (error.message.includes('API request failed')) {
            errorMessage += 'Could not connect to the AI service. Please try again later.';
        } else if (error.message.includes('Missing required credentials')) {
            errorMessage += 'Could not find WiFi credentials in the image. Please make sure the image contains both network name and password.';
        } else if (error instanceof SyntaxError) {
            errorMessage += 'Could not understand the AI response. Please try again.';
        } else {
            errorMessage += 'Please try again with a clearer image.';
        }
        
        elements.ocrText.textContent = errorMessage;
        console.log('File details:', {
            type: currentFile.type,
            size: currentFile.size,
            name: currentFile.name
        });
    }
}

async function extractWifiCredentials(text) {
    if (!text) {
        console.log('No text provided');
        return;
    }

    try {
        console.log('Processing text:', text);

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
            const errorBody = await response.text();
            throw new Error(`API request failed (${response.status}): ${errorBody}`);
        }

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

        console.log('Successfully extracted credentials:', credentials);

    } catch (error) {
        console.error('Credential extraction failed:', {
            error: error.message,
            rawResponse: error.message.includes('API') ? null : error
        });
        elements.networkName.value = '';
        elements.networkPassword.value = '';
    }
}
