// Initialize DOM elements
const elements = {
    cameraButton: document.getElementById('camera-button'),
    galleryButton: document.getElementById('gallery-button'),
    cameraInput: document.getElementById('camera-input'),
    galleryInput: document.getElementById('gallery-input'),
    imagePreview: document.getElementById('image-preview'),
    fileName: document.getElementById('file-name'),
    fileType: document.getElementById('file-type'),
    homeScreen: document.getElementById('home-screen'),
    reviewScreen: document.getElementById('review-screen'),
    backButton: document.getElementById('back-button'),
    continueButton: document.getElementById('continue-button')
};

// Handle camera button click
elements.cameraButton.addEventListener('click', () => {
    elements.cameraInput.click();
});

// Handle gallery button click
elements.galleryButton.addEventListener('click', () => {
    elements.galleryInput.click();
});

// Handle camera capture
elements.cameraInput.addEventListener('change', handleFileSelect);

// Handle gallery selection
elements.galleryInput.addEventListener('change', handleFileSelect);

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Update file info
    elements.fileName.textContent = file.name;
    elements.fileType.textContent = `Type: ${file.type || 'unknown'}`;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        elements.imagePreview.src = e.target.result;
        elements.homeScreen.classList.remove('active');
        elements.reviewScreen.classList.add('active');
    };
    reader.readAsDataURL(file);
}

// Handle back button
elements.backButton.addEventListener('click', () => {
    elements.reviewScreen.classList.remove('active');
    elements.homeScreen.classList.add('active');
    elements.cameraInput.value = '';
    elements.galleryInput.value = '';
});

// Add smooth iOS-like touch interactions
document.addEventListener('touchstart', function() {}, {passive: true});

// Handle iOS PWA status bar appearance
if (window.navigator.standalone) {
    document.documentElement.style.setProperty(
        '--safe-area-inset-top',
        `${window.screen.height - document.documentElement.clientHeight}px`
    );
}
