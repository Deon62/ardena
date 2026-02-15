/**
 * Optimizes images for faster loading.
 * Run: npm run optimize:images
 * Requires Node.js and sharp.
 */
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

const images = [
  { name: 'landing.jpg', opts: { quality: 82, format: 'jpeg' } },
  { name: 'vehicle.jpg', opts: { quality: 82, format: 'jpeg' } },
  { name: 'location.jpg', opts: { quality: 82, format: 'jpeg' } },
  { name: 'availability.jpg', opts: { quality: 82, format: 'jpeg' } },
  { name: 'price.jpg', opts: { quality: 82, format: 'jpeg' } },
];

(async () => {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Run: npm install sharp --save-dev');
    process.exit(1);
  }

  for (const img of images) {
    const inputPath = path.join(ASSETS, img.name);
    if (!fs.existsSync(inputPath)) {
      console.warn(`Skipping ${img.name} (not found)`);
      continue;
    }
    const tempPath = path.join(ASSETS, img.name.replace(/\.[^.]+$/, '-opt$&'));
    try {
      const { size: beforeSize } = fs.statSync(inputPath);
      await sharp(inputPath)
        .jpeg({ quality: img.opts.quality, mozjpeg: true })
        .toFile(tempPath);
      const { size: afterSize } = fs.statSync(tempPath);
      fs.renameSync(tempPath, inputPath);
      const saved = Math.round((1 - afterSize / beforeSize) * 100);
      console.log(`${img.name}: ${(beforeSize / 1024).toFixed(1)}KB → ${(afterSize / 1024).toFixed(1)}KB${saved > 0 ? ` (${saved}% smaller)` : ''}`);
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`Error optimizing ${img.name}:`, err.message);
    }
  }
})();
