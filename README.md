# WiFi QR Code Generator

A web-based tool that extracts WiFi credentials from images and generates QR codes for easy network sharing.

![Version](https://img.shields.io/badge/version-1.4.1-blue.svg)
[![Made with Windsurf](https://img.shields.io/badge/Made%20with-windsurf.ai-4e54c8.svg)](https://windsurf.ai)

## Features

- 📷 OCR-powered WiFi credential extraction from images
- 🤖 AI-powered text analysis using Grok API
- 🔐 Secure credential handling
- 📱 Mobile-friendly interface
- 🎨 Clean, modern UI
- 📊 QR code generation for easy sharing

## Setup

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd wifi-qr-generator
```

2. Copy `js/config.template.js` to `js/config.js` and add your Grok API key:
```javascript
export const GROK_API_KEY = 'your_api_key_here';
```

3. Start a local server:
```bash
python3 -m http.server 8080
```

4. Open `http://localhost:8080` in your browser

### Vercel Deployment

1. Push your code to GitHub

2. Create a new project in Vercel and connect it to your GitHub repository

3. Configure environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `GROK_API_KEY` with your API key value
   - Save and redeploy

4. Important deployment notes:
   - The app requires camera access for mobile devices
   - Ensure your deployment is using HTTPS
   - The Grok API key must be properly set in Vercel environment variables

## Usage

1. Click "Upload Image" to select an image containing WiFi credentials
2. The app will automatically:
   - Extract text using OCR
   - Process the text using AI to identify network name and password
   - Generate a QR code
3. Scan the QR code with your phone to connect to the network

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Project Structure

```
├── index.html           # Main HTML file
├── js/
│   ├── main.js         # Application entry point
│   ├── init.js         # Initialization logic
│   ├── dom.js          # DOM element references
│   ├── navigation.js   # Screen navigation
│   ├── fileHandling.js # File input handling
│   ├── ocr.js         # OCR and AI processing
│   ├── credentials.js  # Credential management
│   ├── qrcode.js      # QR code generation
│   └── config.js       # Configuration (gitignored)
└── .env               # Environment variables (gitignored)
```

## Dependencies

All dependencies are loaded via CDN:
- [Tesseract.js](https://cdn.jsdelivr.net/npm/tesseract.js) - OCR processing
- [Grok API](https://x.ai) - AI-powered text analysis
- [QRCode.js](https://cdn.jsdelivr.net/npm/qrcode) - QR code generation

## Security

- API keys are stored in `.env` and not committed to version control
- Credentials are processed locally in the browser
- No server-side storage of sensitive information

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use and modify for your own projects!
