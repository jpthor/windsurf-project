import { elements } from './dom.js';
import { currentFile } from './fileHandling.js';
import { extractWifiCredentials, GROK_API_KEY } from './grok.js';

export let recognizedText = '';

// Update status message in the OCR text area
function updateStatus(message) {
    elements.ocrText.textContent = `${message}\n\nPlease wait while we process your image...`;
}

export async function performOCR() {
    if (!currentFile) {
        console.error('No file selected');
        return;
    }
    
    console.log('Starting OCR process for file:', currentFile.name);
    updateStatus('Preparing image for processing...');
    elements.networkName.value = '';
    elements.networkPassword.value = '';
    
    try {
        // Initialize OCR worker
        updateStatus('Initializing OCR engine...');
        console.log('Creating Tesseract worker...');
        const worker = await Tesseract.createWorker('eng', 1);
        
        // Load and initialize worker
        updateStatus('Loading OCR models...');
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        // Start text recognition
        updateStatus('Reading text from image...');
        console.log('Worker initialized, starting recognition...');
        const { data } = await worker.recognize(currentFile);
        console.log('Recognition completed, text:', data.text);
        
        // Store recognized text
        recognizedText = data.text;
        updateStatus('Analyzing text with AI...');
        
        // Extract WiFi credentials using Grok API
        await extractWifiCredentials(recognizedText);
        
        // Show final text
        elements.ocrText.textContent = recognizedText;
        
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


