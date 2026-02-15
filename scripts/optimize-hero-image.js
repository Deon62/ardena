/**
 * Optimizes assets/landing.jpg for faster loading (compresses in place).
 * Run: npm run optimize:hero
 * Requires Node.js and sharp.
 */
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'assets', 'landing.jpg');
const tempPath = path.join(__dirname, '..', 'assets', 'landing-optimized.jpg');

if (!fs.existsSync(inputPath)) {
  console.error('assets/landing.jpg not found. Nothing to optimize.');
  process.exit(1);
}

(async () => {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Run: npm install sharp --save-dev');
    process.exit(1);
  }

  try {
    const { size: beforeSize } = fs.statSync(inputPath);
    await sharp(inputPath)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tempPath);
    const { size: afterSize } = fs.statSync(tempPath);
    fs.renameSync(tempPath, inputPath);
    const saved = Math.round((1 - afterSize / beforeSize) * 100);
    console.log(`Optimized assets/landing.jpg (${(beforeSize / 1024).toFixed(1)}KB → ${(afterSize / 1024).toFixed(1)}KB${saved > 0 ? `, ${saved}% smaller` : ''})`);
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(err);
    process.exit(1);
  }
})();
