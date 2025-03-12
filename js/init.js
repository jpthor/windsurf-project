// Add smooth iOS-like touch interactions
document.addEventListener('touchstart', function() {}, {passive: true});

// Handle iOS PWA status bar appearance
if (window.navigator.standalone) {
    document.documentElement.style.setProperty(
        '--safe-area-inset-top',
        `${window.screen.height - document.documentElement.clientHeight}px`
    );
}
