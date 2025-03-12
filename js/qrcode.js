import { elements } from './dom.js';
import { saveQRToPhotos, joinWiFiNetwork } from './wifi.js';

let currentNetwork = '';
let currentPassword = '';
let currentQRCanvas = null;

// Initialize event listeners for WiFi actions
export function initWiFiHandlers() {
    // Save QR code to photos
    elements.saveQrButton.addEventListener('click', async () => {
        if (!currentQRCanvas) {
            console.error('No QR code available');
            return;
        }
        
        const success = await saveQRToPhotos(currentQRCanvas);
        if (!success) {
            alert('Could not save QR code. Please take a screenshot instead.');
        }
    });

    // Join WiFi network
    elements.joinWifiButton.addEventListener('click', async () => {
        if (!currentNetwork) {
            console.error('No network credentials available');
            return;
        }

        const success = await joinWiFiNetwork(currentNetwork, currentPassword);
        if (!success) {
            alert('Could not automatically join network. Please join manually using your device settings.');
        }
    });
}

export function generateQRCode() {
    const network = elements.networkName.value.trim();
    const password = elements.networkPassword.value.trim();
    
    if (!network) {
        alert('Please enter a network name');
        return;
    }
    
    // Store current credentials
    currentNetwork = network;
    currentPassword = password;
    
    // Generate WiFi QR code
    const wifiString = `WIFI:S:${network};T:WPA;P:${password};;`;
    
    // Clear previous QR code
    elements.qrCodeContainer.innerHTML = '';
    
    // Generate new QR code
    QRCode.toCanvas(
        document.createElement('canvas'),
        wifiString,
        { 
            width: 250, 
            margin: 2, 
            color: { 
                dark: '#4e54c8', 
                light: '#ffffff' 
            } 
        },
        function(error, canvas) {
            if (error) {
                console.error('QR Code Error:', error);
                return;
            }
            currentQRCanvas = canvas;
            elements.qrCodeContainer.appendChild(canvas);
            elements.qrModal.style.display = 'flex';
        }
    );
}
