import { elements } from './dom.js';

export let currentScreen = 'home';

export function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    
    // Hide all screens first
    elements.homeScreen.classList.remove('active');
    elements.reviewScreen.classList.remove('active');
    elements.finalScreen.classList.remove('active');
    elements.manualEntryScreen.classList.remove('active');
    
    // Show the requested screen
    const screen = document.getElementById(screenId);
    if (!screen) {
        console.error('Screen not found:', screenId);
        return;
    }
    
    screen.classList.add('active');
    currentScreen = screenId;
    console.log('Current screen:', currentScreen);
}
