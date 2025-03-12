import { elements } from './dom.js';
import { showScreen } from './navigation.js';

export let currentFile = null;
export let currentFileData = null;

// Initialize event listeners for file inputs
export function initFileHandlers() {
    // Camera button click handler
    elements.cameraButton.addEventListener('click', () => {
        elements.cameraInput.click();
    });

    // Gallery button click handler
    elements.galleryButton.addEventListener('click', () => {
        elements.galleryInput.click();
    });

    // File selection handlers
    elements.cameraInput.addEventListener('change', handleFileSelect);
    elements.galleryInput.addEventListener('change', handleFileSelect);
    
    // Navigation handlers
    elements.backButton.addEventListener('click', handleBack);

    console.log('File handlers initialized');
}

// Handle file selection from either camera or gallery
export function handleFileSelect(event) {
    console.log('File selection triggered');
    
    const file = event.target.files?.[0];
    if (!file) {
        console.warn('No file selected');
        return;
    }

    console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size
    });

    currentFile = file;
    
    // Display file info
    elements.fileName.textContent = file.name;
    elements.fileType.textContent = `Type: ${file.type || 'Unknown'}`;
    
    // Create image preview
    const reader = new FileReader();
    
    reader.onload = (e) => {
        currentFileData = e.target.result;
        elements.imagePreview.src = currentFileData;
        console.log('Image loaded, showing review screen');
        showScreen('review-screen');
    };

    reader.onerror = () => {
        console.error('Error reading file');
        alert('Error loading image. Please try again.');
    };

    reader.readAsDataURL(file);
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
