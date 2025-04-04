# Changelog

## [1.7.1] - 2025-04-03
### Added
- Comprehensive npm build scripts for development and production
- Modern bundling and optimization with esbuild
- CSS optimization with PostCSS and cssnano
- Automated deployment to Vercel with a single command
- Development watch mode for real-time updates
- Bundle analysis and performance tools
- Better environment separation for development and production

## [1.7.0] - 2025-04-03
### Changed
- Optimized Grok API usage with single check per page load
- Implemented exponential backoff for retries on connection failures
- Added jitter to avoid connection bursts
- Reduced API credits consumption while maintaining status accuracy

### Fixed
- Manual entry button click handler conflict resolved

## [1.6.0] - 2025-04-03
### Added
- Manual Entry button for direct WiFi credential input
- Enhanced QR code display with clear WiFi credentials
- Stylish border around QR codes for better visibility
- Streamlined QR code modal with focus on essential information

## [1.5.0] - 2025-03-13
### Changed
- Updated environment variables to use REACT_APP_ prefix
- Modified config.js to handle React environment variables
- Updated documentation for React environment setup

## [1.4.9] - 2025-03-13
### Security
- Removed hardcoded API key from codebase
- Added proper environment variable handling
- Improved local development security with .env file
- Added .env.example for better developer onboarding

## [1.4.8] - 2025-03-13
### Added
- Improved WiFi joining on iOS using direct WiFi URL scheme
- Fallback mechanism for older iOS versions
- Better error handling for WiFi connections

## [1.4.7] - 2025-03-13
### Added
- Detailed processing status messages during OCR
- Step-by-step feedback during image analysis
- Better error messages and progress indicators

## [1.4.6] - 2025-03-12
### Added
- One-click WiFi network joining functionality
- Improved QR code saving using native share API
- Better mobile device compatibility

## [1.4.5] - 2025-03-12
### Fixed
- Improved file handling with better error feedback
- Added validation for supported image formats
- Added debug logging for troubleshooting
- Fixed image preview not showing in review screen

## [1.4.4] - 2025-03-12
### Fixed
- Environment detection for proper API key handling
- Gallery picker now works correctly on local development
- Explicit file type support (jpeg, png, heic, heif)
- Improved mobile compatibility following deployment guide

## [1.4.2] - 2025-03-12
### Fixed
- Image persistence between screens
- Camera and gallery file handling
- Screen navigation with active files
- Back button behavior

## [1.4.1] - 2025-03-12
### Changed
- Updated button design with light theme and dashed borders
- Improved button contrast and readability
- Enhanced icon styling for better visual harmony

## [1.4.0] - 2025-03-12
### Added
- Separate camera and gallery buttons for better UX
- Modern button design with icons and hover effects
- Improved mobile responsiveness for button layout
- Direct camera access for iOS devices

## [1.3.2] - 2025-03-12
### Changed
- Enhanced social preview icon with larger size and cleaner design
- Improved gradient background for better visual appeal
- Optimized icon padding and dimensions

## [1.3.1] - 2025-03-12
### Fixed
- Improved file input configuration for better mobile camera access
- Added Vercel deployment configuration with environment variable support
- Updated documentation with detailed deployment instructions

## [1.3] - 2025-03-12
### Changed
- Enhanced Grok status indicator with more subtle, translucent design
- Improved blur effect and border styling for better visibility

## [1.2] - 2025-03-12
### Changed
- Made Grok status indicator persistent across all screens
- Enhanced status indicator with blur effect and better visibility
- Moved status indicator to fixed top-right position

## [1.1] - 2025-03-12
### Changed
- Improved Grok integration: now tries Grok first when connected, falls back to regex
- Enhanced footer with gradient background and better visibility
- Added Grok model information in footer when connected

## [1.0] - 2025-03-12
### Added
- Initial release
- OCR processing with Tesseract.js
- Grok API integration for credential extraction
- Regex-based fallback for credential extraction
- Real-time Grok API status monitoring
- Modern gradient-based icon design (#4e54c8, #ff6b6b, #ff9a3c)
- Complete icon set for all platforms
- PWA support with full icon set
- QR code generation for WiFi credentials
- Mobile-friendly UI with camera support
- SEO optimization and social media cards
