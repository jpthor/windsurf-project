import { elements } from './dom.js';

export function generateQRCode() {
    const network = elements.networkName.value.trim();
    const password = elements.networkPassword.value.trim();
    
    if (!network) {
        alert('Please enter a network name');
        return;
    }
    
    // Generate WiFi QR code
    const wifiString = `WIFI:S:${network};T:WPA;P:${password};;`;
    
    // Clear previous QR code
    elements.qrCodeContainer.innerHTML = '';
    
    // Generate new QR code
    QRCode.toCanvas(
        document.createElement('canvas'),
        wifiString,
        { width: 250, margin: 2, color: { dark: '#4e54c8', light: '#ffffff' } },
        function(error, canvas) {
            if (error) {
                console.error('QR Code Error:', error);
                return;
            }
            elements.qrCodeContainer.appendChild(canvas);
            elements.qrModal.style.display = 'flex';
        }
    );
}
