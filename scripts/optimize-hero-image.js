/**
 * Generates assets/landing.webp from assets/landing.jpg for faster hero loading.
 * Run once: npm install && npm run optimize:hero
 * Requires Node.js and writes to assets/landing.webp.
 */
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'assets', 'landing.jpg');
const outputPath = path.join(__dirname, '..', 'assets', 'landing.webp');

if (!fs.existsSync(inputPath)) {
  console.error('assets/landing.jpg not found. Nothing to optimize.');
  process.exit(1);
}

// Use dynamic import so script fails gracefully if sharp not installed
(async () => {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Run: npm install sharp --save-dev');
    process.exit(1);
  }

  try {
    await sharp(inputPath)
      .webp({ quality: 82 })
      .toFile(outputPath);
    console.log('Created assets/landing.webp (WebP). The home page will use it for faster loading.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
