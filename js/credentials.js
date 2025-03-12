import { elements } from './dom.js';

export function saveCredentials() {
    localStorage.setItem('wifiNetwork', elements.networkName.value);
    localStorage.setItem('wifiPassword', elements.networkPassword.value);
}

export function loadCredentials() {
    const savedNetwork = localStorage.getItem('wifiNetwork');
    const savedPassword = localStorage.getItem('wifiPassword');
    
    if (savedNetwork) elements.networkName.value = savedNetwork;
    if (savedPassword) elements.networkPassword.value = savedPassword;
}
