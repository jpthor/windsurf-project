import { elements } from './dom.js';
import { showScreen } from './navigation.js';

export let currentFile = null;

export function handleFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
        currentFile = event.target.files[0];
        
        // Display file info
        elements.fileName.textContent = currentFile.name;
        elements.fileType.textContent = `Type: ${currentFile.type || 'Unknown'}`;
        
        // Preview image
        const reader = new FileReader();
        reader.onload = (e) => {
            elements.imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(currentFile);
        
        // Navigate to review screen
        showScreen('review-screen');
    }
}
