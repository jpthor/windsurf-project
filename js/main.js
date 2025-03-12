import './init.js';
import { elements } from './dom.js';
import { showScreen } from './navigation.js';
import { handleFileSelect } from './fileHandling.js';
import { performOCR } from './ocr.js';
import { checkGrokStatus } from './grok.js';
import { saveCredentials, loadCredentials } from './credentials.js';
import { generateQRCode } from './qrcode.js';

// Event Listeners for Camera and Gallery
elements.cameraButton.addEventListener('click', () => {
    elements.cameraInput.click();
});

elements.galleryButton.addEventListener('click', () => {
    elements.galleryInput.click();
});

// Initialize file handlers for both inputs
elements.cameraInput.addEventListener('change', handleFileSelect);
elements.galleryInput.addEventListener('change', handleFileSelect);

elements.backButton.addEventListener('click', () => {
    showScreen('home-screen');
});

elements.backToReviewButton.addEventListener('click', () => {
    showScreen('review-screen');
});

elements.continueButton.addEventListener('click', () => {
    showScreen('final-screen');
    performOCR();
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
    loadCredentials();
    await checkGrokStatus();
}

initApp();
