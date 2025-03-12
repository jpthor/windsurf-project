// WiFi network handling functions

/**
 * Join a WiFi network using the Web Network Information API
 * @param {string} ssid - Network name
 * @param {string} password - Network password
 */
export async function joinWiFiNetwork(ssid, password) {
    try {
        // Check if the Network Information API is available
        if ('connection' in navigator && 'wifi' in navigator.connection) {
            // Create WiFi credentials object
            const credentials = {
                ssid: ssid,
                password: password,
                networkType: 'wifi',
                securityType: 'WPA'
            };

            // Request to join the network
            await navigator.wifi?.connect(credentials);
            return true;
        } else {
            // Fallback for browsers that don't support the API
            // Create a special URL that iOS/Android can handle
            const wifiURL = `wifi://wifi.local/connect?ssid=${encodeURIComponent(ssid)}&password=${encodeURIComponent(password)}`;
            window.location.href = wifiURL;
            return true;
        }
    } catch (error) {
        console.error('Error joining WiFi:', error);
        return false;
    }
}

/**
 * Save QR code image to device photos
 * @param {HTMLCanvasElement} canvas - QR code canvas element
 */
export async function saveQRToPhotos(canvas) {
    try {
        // Convert canvas to blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        
        // Create object URL
        const url = URL.createObjectURL(blob);
        
        // Try using the native share API first
        if (navigator.share) {
            await navigator.share({
                files: [new File([blob], 'wifi-qr.png', { type: 'image/png' })]
            });
            return true;
        }
        
        // Fallback: Create a download link
        const link = document.createElement('a');
        link.download = 'wifi-qr.png';
        link.href = url;
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('Error saving QR code:', error);
        return false;
    }
}
