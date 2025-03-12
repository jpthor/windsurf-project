import { elements } from './dom.js';
import { showScreen } from './navigation.js';
import { initFileHandlers, currentFileData } from './fileHandling.js';
import { performOCR } from './ocr.js';
import { checkGrokStatus } from './grok.js';
import { saveCredentials, loadCredentials } from './credentials.js';
import { generateQRCode } from './qrcode.js';

// Handle review screen navigation
elements.backToReviewButton.addEventListener('click', () => {
    if (currentFileData) {
        elements.imagePreview.src = currentFileData;
        showScreen('review-screen');
    }
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
    loadCredentials();
    await checkGrokStatus();
    console.log('App initialized');
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting app...');
    initApp();
});
