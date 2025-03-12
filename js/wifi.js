// WiFi network handling functions

/**
 * Join a WiFi network using standard WiFi URL scheme
 * @param {string} ssid - Network name
 * @param {string} password - Network password
 */
export async function joinWiFiNetwork(ssid, password) {
    try {
        // Show network details in a user-friendly way
        const message = `Network Name: ${ssid}\nPassword: ${password}\n\nTo join this network:\n1. Open your WiFi settings (opening now...)\n2. Select "${ssid}"\n3. Enter the password shown above`;
        
        // Show the details first
        alert(message);
        
        // Then open WiFi settings
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (isIOS) {
            // Use iOS settings URL scheme
            window.location.href = 'App-Prefs:root=WIFI';
        } else if (isAndroid) {
            // Use Android intent
            window.location.href = 'intent://settings/wifi#Intent;scheme=android-settings;end';
        } else {
            // For desktop, we've already shown the instructions
            console.log('Desktop browser detected, instructions already shown');
        }
        
        return true;
    } catch (error) {
        console.error('Error joining WiFi:', error);
        alert('Could not open WiFi settings. Please open them manually.');
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
