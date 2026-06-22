import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = 'src/assets/images/portfolio';

const projects = [
  { slug: 'bottega-ceramica-urbana', title: 'Bottega Ceramica', color: '#F59E0B' },
  { slug: 'studio-legale-rossi', title: 'Studio Legale', color: '#3B82F6' },
  { slug: 'osteria-del-borgo', title: 'Osteria del Borgo', color: '#EC4899' },
  { slug: 'atelier-marchigiano', title: 'Atelier Marchigiano', color: '#10B981' },
  { slug: 'falegnameria-f-lli-bianchi', title: 'Falegnameria Bianchi', color: '#78716C' },
  { slug: 'vini-colline', title: 'Vini Colline', color: '#DC2626' },
];

function generatePlaceholder(title, color, width = 1600, height = 1200) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 100 + Math.random() * 200;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 80px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, width / 2, height / 2);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '24px sans-serif';
  ctx.fillText('PLACEHOLDER', width / 2, height / 2 + 80);

  return canvas.toBuffer('image/jpeg', 0.85);
}

projects.forEach(project => {
  const dir = join(OUTPUT_DIR, project.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const hero = generatePlaceholder(project.title, project.color);
  writeFileSync(join(dir, 'hero.jpg'), hero);

  const detail1 = generatePlaceholder(project.title + ' - Dettaglio', project.color, 1200, 900);
  writeFileSync(join(dir, 'detail-01.jpg'), detail1);

  const detail2 = generatePlaceholder(project.title + ' - Gallery', project.color, 1200, 900);
  writeFileSync(join(dir, 'detail-02.jpg'), detail2);

  console.log('✓ Generato placeholder per ' + project.slug);
});

console.log('');
console.log('🎉 Placeholder generati! Sostituiscili con le foto reali quando le hai.');
