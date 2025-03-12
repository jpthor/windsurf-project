import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const ICONS_DIR = './icons';
const BASE_ICON = path.join(ICONS_DIR, 'base-icon.svg');

// Define all the icons we need to generate
const ICONS = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'icon-72x72.png', size: 72 },
    { name: 'icon-96x96.png', size: 96 },
    { name: 'icon-128x128.png', size: 128 },
    { name: 'icon-144x144.png', size: 144 },
    { name: 'icon-152x152.png', size: 152 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-384x384.png', size: 384 },
    { name: 'icon-512x512.png', size: 512 },
    { name: 'social-preview.png', size: 1200 } // For social media preview
];

// Generate Safari pinned tab icon in monochrome
const generateSafariPinnedTab = async () => {
    const svgContent = await fs.readFile(BASE_ICON, 'utf8');
    // Modify SVG to be monochrome
    const monochromeContent = svgContent
        .replace(/<circle.*?\/>/, '<circle cx="256" cy="256" r="256" fill="black"/>')
        .replace(/fill="white".*?>/g, 'fill="black">')
        .replace(/fill-opacity="0.8"/g, '')
        .replace(/<defs>.*?<\/defs>/s, '');
    
    await fs.writeFile(
        path.join(ICONS_DIR, 'safari-pinned-tab.svg'),
        monochromeContent
    );
};

// Generate all PNG icons
const generateIcons = async () => {
    try {
        // Ensure icons directory exists
        await fs.mkdir(ICONS_DIR, { recursive: true });

        // Generate each icon
        await Promise.all(ICONS.map(async ({ name, size }) => {
            const outputPath = path.join(ICONS_DIR, name);
            
            // For social preview, add padding and text
            if (name === 'social-preview.png') {
                await sharp(BASE_ICON)
                    .resize(800, 800)
                    .extend({
                        top: 200,
                        bottom: 200,
                        left: 200,
                        right: 200,
                        background: { r: 78, g: 84, b: 200, alpha: 1 } // #4e54c8
                    })
                    .toFile(outputPath);
            } else {
                await sharp(BASE_ICON)
                    .resize(size, size)
                    .toFile(outputPath);
            }
            
            console.log(`Generated ${name} (${size}x${size})`);
        }));

        // Generate Safari pinned tab icon
        await generateSafariPinnedTab();
        console.log('Generated safari-pinned-tab.svg');

        console.log('All icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
};

generateIcons();
