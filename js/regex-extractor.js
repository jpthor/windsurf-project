// Regex patterns for common WiFi credential formats
const patterns = {
    networkName: [
        /SSID[:\s]+["']?([^"'\n]+)["']?/i,
        /Network(?:\sname)?[:\s]+["']?([^"'\n]+)["']?/i,
        /WiFi(?:\sname)?[:\s]+["']?([^"'\n]+)["']?/i
    ],
    password: [
        /(?:Password|PSK|Pass(?:phrase)?)[:\s]+["']?([^"'\n]+)["']?/i,
        /WPA[^:]*:[:\s]+["']?([^"'\n]+)["']?/i,
        /KEY[:\s]+["']?([^"'\n]+)["']?/i
    ]
};

export function extractCredentialsWithRegex(text) {
    let network = null;
    let password = null;

    // Try each pattern for network name
    for (const pattern of patterns.networkName) {
        const match = text.match(pattern);
        if (match && match[1]) {
            network = match[1].trim();
            break;
        }
    }

    // Try each pattern for password
    for (const pattern of patterns.password) {
        const match = text.match(pattern);
        if (match && match[1]) {
            password = match[1].trim();
            break;
        }
    }

    return { network, password };
}
