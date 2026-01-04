
import fs from 'fs';
import path from 'path';

const checkMagicBytes = (filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);
        const hex = buffer.toString('hex', 0, 4).toUpperCase();
        console.log(`${path.basename(filePath)} Magic Bytes: ${hex}`);
        
        if (hex.startsWith('89504E47')) {
            console.log('-> Format: PNG');
        } else if (hex.startsWith('FFD8FF')) {
            console.log('-> Format: JPEG');
        } else {
            console.log('-> Format: Unknown');
        }
    } catch (e) {
        console.error(`Error reading ${filePath}: ${e.message}`);
    }
};

const publicDir = path.join(process.cwd(), 'public');
checkMagicBytes(path.join(publicDir, 'pwa-192x192.png'));
checkMagicBytes(path.join(publicDir, 'pwa-512x512.png'));
