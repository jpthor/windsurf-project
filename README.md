# WiFi QR Code Generator

A web-based tool that extracts WiFi credentials from images and generates QR codes for easy network sharing. Last updated: April 3, 2025.

![Version](https://img.shields.io/badge/version-1.7.1-blue.svg)
[![Made with Windsurf](https://img.shields.io/badge/Made%20with-windsurf.ai-4e54c8.svg)](https://windsurf.ai)

## Features

- 📷 OCR-powered WiFi credential extraction from images
- 🤖 AI-powered text analysis using Grok API
- 🔐 Secure credential handling
- 📱 Mobile-friendly interface
- 🎨 Clean, modern UI
- 📊 QR code generation for easy sharing
- ✏️ Manual entry option for direct WiFi credential input
- 🖼️ Enhanced QR code display with credential information

## Setup

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd wifi-qr-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
# Copy from .env.example and add your API key
GROK_API_KEY=your_api_key_here
```

4. Start the development server with live reload:
```bash
npm run dev
```

5. Open `http://localhost:8080` in your browser

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview:dist
```

### Vercel Deployment

#### Option 1: One-Command Deployment

Deploy directly from your local machine with a single command:
```bash
npm run deploy
```

#### Option 2: GitHub Integration

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
│   ├── main.js          # Application entry point
│   ├── init.js          # Initialization logic
│   ├── dom.js           # DOM element references
│   ├── navigation.js    # Screen navigation
│   ├── fileHandling.js  # File input handling
│   ├── ocr.js           # OCR and AI processing
│   ├── credentials.js   # Credential management
│   ├── qrcode.js        # QR code generation
│   ├── config.js        # Environment variable handling (gitignored)
│   └── load-env.js      # Environment variable loader
├── icons/              # Application icons and assets
├── dist/               # Production build output (generated)
├── .env                # Environment variables (gitignored)
├── .env.example        # Example environment file
├── package.json        # Project dependencies and scripts
└── manifest.json       # PWA manifest
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run dev` | Start development server with watch mode and live reload |
| `npm run build` | Create optimized production build in `dist` folder |
| `npm run preview:dist` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code quality issues |
| `npm run lint:fix` | Automatically fix ESLint issues when possible |
| `npm run generate-icons` | Generate all required app icons |
| `npm run deploy` | Build and deploy to Vercel in one command |
| `npm run analyze` | Analyze the bundle size with source-map-explorer |

## Dependencies

### Runtime Dependencies
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR processing
- [Grok API](https://x.ai) - AI-powered text analysis
- [QRCode.js](https://github.com/soldair/node-qrcode) - QR code generation
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management

### Development Dependencies
- [esbuild](https://esbuild.github.io/) - Fast JavaScript bundler
- [PostCSS](https://postcss.org/) with cssnano - CSS optimization
- [live-server](https://github.com/tapio/live-server) - Development server with live reload
- [npm-watch](https://github.com/M-Zuber/npm-watch) - File watcher for development
- [html-minifier](https://github.com/kangax/html-minifier) - HTML optimization
- [ESLint](https://eslint.org/) - Code quality and standards
- [Vercel CLI](https://vercel.com/cli) - Deployment tool

## Security

- API keys are stored in `.env` (local) and Vercel environment variables (production)
- `.env` and `config.js` are in .gitignore to prevent accidental commits
- Credentials are processed locally in the browser
- No server-side storage of sensitive information
- HTTPS required for all deployments

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
