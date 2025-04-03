import { elements } from './dom.js';
import { showScreen } from './navigation.js';
import { initFileHandlers, currentFileData } from './fileHandling.js';
import { performOCR } from './ocr.js';
import { checkGrokStatus } from './grok.js';
import { saveCredentials, loadCredentials } from './credentials.js';
import { generateQRCode, initWiFiHandlers } from './qrcode.js';

// Handle review screen navigation
elements.backToReviewButton.addEventListener('click', () => {
    if (currentFileData) {
        elements.imagePreview.src = currentFileData;
        showScreen('review-screen');
    }
});

// Manual entry button event listeners are added in the DOMContentLoaded event

// Handle back button from manual entry screen
elements.backFromManualButton.addEventListener('click', () => {
    showScreen('home-screen');
});

// Handle manual entry QR code generation
elements.generateQrButton.addEventListener('click', () => {
    const network = elements.manualNetworkName.value.trim();
    const password = elements.manualNetworkPassword.value.trim();
    
    if (!network) {
        alert('Please enter a network name');
        return;
    }
    
    // Set the values in the main form fields to reuse the existing QR generation
    elements.networkName.value = network;
    elements.networkPassword.value = password;
    
    // Generate the QR code using the existing function
    generateQRCode();
});

// Handle OCR and final screen
elements.continueButton.addEventListener('click', () => {
    if (currentFileData) {
        showScreen('final-screen');
        performOCR();
    }
});

// Save input values on typing
elements.networkName.addEventListener('input', saveCredentials);
elements.networkPassword.addEventListener('input', saveCredentials);
elements.manualNetworkName.addEventListener('input', (e) => {
    // Sync the value with the main form field to save credentials
    elements.networkName.value = e.target.value;
    saveCredentials();
});
elements.manualNetworkPassword.addEventListener('input', (e) => {
    // Sync the value with the main form field to save credentials
    elements.networkPassword.value = e.target.value;
    saveCredentials();
});

// QR Code Generation
elements.exportButton.addEventListener('click', generateQRCode);

// Modal close button
elements.closeModal.addEventListener('click', () => {
    elements.qrModal.style.display = 'none';
});

// Initialize app
async function initApp() {
    console.log('Initializing app...');
    initFileHandlers(); // Initialize file handling
    initWiFiHandlers(); // Initialize WiFi functionality
    loadCredentials();
    await checkGrokStatus();
    console.log('App initialized');
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting app...');
    // Debug DOM elements
    console.log('Manual Entry Button:', elements.manualEntryButton);
    console.log('Manual Entry Screen:', elements.manualEntryScreen);
    
    // Re-initialize event listeners after DOM is fully loaded
    if (elements.manualEntryButton) {
        console.log('Adding manual entry button click listener');
        elements.manualEntryButton.addEventListener('click', () => {
            console.log('Manual entry button clicked');
            showScreen('manual-entry-screen');
        });
    } else {
        console.error('Manual entry button not found in DOM');
    }
    
    if (elements.backFromManualButton) {
        elements.backFromManualButton.addEventListener('click', () => {
            console.log('Back from manual button clicked');
            showScreen('home-screen');
        });
    }
    
    if (elements.generateQrButton) {
        elements.generateQrButton.addEventListener('click', () => {
            console.log('Generate QR button clicked');
            const network = elements.manualNetworkName.value.trim();
            const password = elements.manualNetworkPassword.value.trim();
            
            if (!network) {
                alert('Please enter a network name');
                return;
            }
            
            // Set the values in the main form fields to reuse the existing QR generation
            elements.networkName.value = network;
            elements.networkPassword.value = password;
            
            // Generate the QR code using the existing function
            generateQRCode();
        });
    }
    
    initApp();
});
