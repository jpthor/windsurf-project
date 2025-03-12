import { elements } from './dom.js';
import { showScreen } from './navigation.js';

export let currentFile = null;

// Initialize event listeners for file inputs
export function initFileHandlers() {
    elements.cameraInput.addEventListener('change', handleFileSelect);
    elements.galleryInput.addEventListener('change', handleFileSelect);
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
        elements.imagePreview.src = e.target.result;
        showScreen('review-screen');
    };
    reader.readAsDataURL(file);

    // Clear input value to allow selecting the same file again
    event.target.value = '';
}

// Reset file inputs when going back
export function resetFileInputs() {
    elements.cameraInput.value = '';
    elements.galleryInput.value = '';
    currentFile = null;
}
