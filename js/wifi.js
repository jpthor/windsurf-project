// WiFi network handling functions

/**
 * Join a WiFi network using standard WiFi URL scheme
 * @param {string} ssid - Network name
 * @param {string} password - Network password
 */
export async function joinWiFiNetwork(ssid, password) {
    try {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (isIOS) {
            // Create WiFi configuration URL
            // Format: WIFI:T:WPA;S:<ssid>;P:<password>;;
            const wifiConfig = `WIFI:T:WPA;S:${ssid};P:${password};;`;
            const wifiURL = encodeURI(wifiConfig);
            
            // First try the direct WiFi URL scheme
            window.location.href = wifiURL;
            
            // If that doesn't work (after a short delay), try the settings URL
            setTimeout(() => {
                // Try the modern settings URL first
                window.location.href = 'prefs:root=WIFI';
                
                // If that doesn't work, show manual instructions after another delay
                setTimeout(() => {
                    const message = `Network Name: ${ssid}\nPassword: ${password}\n\nTo join this network:\n1. Open your WiFi settings\n2. Select "${ssid}"\n3. Enter the password shown above`;
                    alert(message);
                }, 1000);
            }, 1000);
        } else if (isAndroid) {
            // Use Android intent with WiFi configuration
            const wifiConfig = `WIFI:T:WPA;S:${ssid};P:${password};;`;
            window.location.href = `intent://settings/wifi#Intent;scheme=android-settings;package=com.android.settings;S.wifi_ssid=${encodeURIComponent(ssid)};end`;
        } else {
            // For desktop, show instructions
            const message = `Network Name: ${ssid}\nPassword: ${password}\n\nTo join this network:\n1. Open your WiFi settings\n2. Select "${ssid}"\n3. Enter the password shown above`;
            alert(message);
            console.log('Desktop browser detected, showing manual instructions');
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
