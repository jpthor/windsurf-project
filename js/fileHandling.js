import { elements } from './dom.js';
import { showScreen } from './navigation.js';

export let currentFile = null;
export let currentFileData = null;

// Initialize event listeners for file inputs
export function initFileHandlers() {
    elements.cameraInput.addEventListener('change', handleFileSelect);
    elements.galleryInput.addEventListener('change', handleFileSelect);
    elements.backButton.addEventListener('click', handleBack);
}

// Handle file selection from either camera or gallery
export function handleFileSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    currentFile = file;
    
    // Display file info
    elements.fileName.textContent = file.name;
    elements.fileType.textContent = `Type: ${file.type || 'Unknown'}`;
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
        currentFileData = e.target.result; // Store the file data
        elements.imagePreview.src = currentFileData;
        showScreen('review-screen');
    };
    reader.readAsDataURL(file);

    // Clear input value to allow selecting the same file again
    event.target.value = '';
}

// Handle back button click
function handleBack() {
    if (currentFile) {
        // Keep the file data but show home screen
        showScreen('home-screen');
    } else {
        resetFileInputs();
        showScreen('home-screen');
    }
}

// Reset file inputs and data
export function resetFileInputs() {
    elements.cameraInput.value = '';
    elements.galleryInput.value = '';
    elements.imagePreview.src = '';
    currentFile = null;
    currentFileData = null;
}
