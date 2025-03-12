import { elements } from './dom.js';

export let currentScreen = 'home';

export function showScreen(screenId) {
    elements.homeScreen.classList.remove('active');
    elements.reviewScreen.classList.remove('active');
    elements.finalScreen.classList.remove('active');
    
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}
