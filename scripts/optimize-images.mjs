import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = 'src/assets/images/portfolio';
const OUTPUT_DIR = 'src/assets/images/portfolio-optimized';
const MAX_WIDTH = 1600;
const QUALITY = 82;

async function processImages() {
  if (!existsSync(INPUT_DIR)) {
    console.log('⚠️  Nessuna immagine trovata in ' + INPUT_DIR);
    return;
  }
  
  const categories = await readdir(INPUT_DIR);
  let processed = 0;
  let savedBytes = 0;

  for (const category of categories) {
    const catPath = join(INPUT_DIR, category);
    const stats = await stat(catPath);
    if (!stats.isDirectory()) continue;

    const outCatPath = join(OUTPUT_DIR, category);
    if (!existsSync(outCatPath)) await mkdir(outCatPath, { recursive: true });

    const files = await readdir(catPath);
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

      const inPath = join(catPath, file);
      const baseName = basename(file, ext);
      const outPath = join(outCatPath, baseName + '.webp');

      const beforeStats = await stat(inPath);

      await sharp(inPath)
        .resize({
          width: MAX_WIDTH,
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(outPath);

      const afterStats = await stat(outPath);
      const saved = beforeStats.size - afterStats.size;
      savedBytes += saved;

      console.log('✓ ' + category + '/' + file + ' → ' + Math.round(afterStats.size / 1024) + 'KB (risparmiati ' + Math.round(saved / 1024) + 'KB)');
      processed++;
    }
  }

  console.log('');
  console.log('🎉 Completato! ' + processed + ' immagini ottimizzate.');
  console.log('💾 Risparmio totale: ' + (Math.round(savedBytes / 1024 / 1024 * 100) / 100) + ' MB');
}

processImages().catch(console.error);
