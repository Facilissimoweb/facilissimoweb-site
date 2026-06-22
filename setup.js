#!/usr/bin/env node

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DOMAIN = 'facilissimoweb.com';
const BASE_DIR = process.cwd();

console.log('🚀 Creazione progetto FACILISSIMO WEB...\n');

// Helper per creare cartelle
function createDir(path) {
  const fullPath = join(BASE_DIR, path);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Creata cartella: ${path}`);
  }
}

// Helper per creare file
function createFile(path, content) {
  const fullPath = join(BASE_DIR, path);
  writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Creato file: ${path}`);
}

// ============================================
// 1. STRUTTURA CARTELLE
// ============================================
console.log('\n📂 Creo struttura cartelle...\n');

const dirs = [
  'public',
  'src/assets/images/portfolio',
  'src/components/chat',
  'src/components/layout',
  'src/components/legal',
  'src/components/ui',
  'src/layouts',
  'src/lib',
  'src/pages/portfolio',
  'src/styles',
  'scripts',
];

dirs.forEach(createDir);

// ============================================
// 2. FILE DI CONFIGURAZIONE
// ============================================
console.log('\n⚙️  Creo file di configurazione...\n');

// package.json
createFile('package.json', JSON.stringify({
  name: 'facilissimoweb',
  type: 'module',
  version: '1.0.0',
  scripts: {
    dev: 'astro dev',
    build: 'astro build',
    preview: 'astro preview',
    images: 'node scripts/optimize-images.mjs',
    placeholders: 'node scripts/generate-placeholders.mjs',
  },
  dependencies: {
    astro: '^4.15.0',
    '@astrojs/tailwind': '^5.1.0',
    '@astrojs/sitemap': '^3.1.6',
    tailwindcss: '^3.4.10',
    motion: '^10.18.0',
    gsap: '^3.12.5',
  },
  devDependencies: {
    sharp: '^0.33.0',
    canvas: '^2.11.2',
  },
}, null, 2));

// astro.config.mjs
createFile('astro.config.mjs', `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://${DOMAIN}',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  image: {
    defaultQuality: 80,
  },
});
`);

// tailwind.config.cjs
createFile('tailwind.config.cjs', `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        base:  '#FAF9F6',
        ink:   '#1A2B3C',
        pop:   '#FF6B35',
        muted: '#E8E6E1',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        body:    ['Inter', 'sans-serif'],
        label:   ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(26, 43, 60, 0.08)',
        'glow': '0 0 40px -8px rgba(255, 107, 53, 0.4)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float:   'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
`);

// vercel.json
createFile('vercel.json', JSON.stringify({
  buildCommand: 'astro build',
  outputDirectory: 'dist',
  framework: 'astro',
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
}, null, 2));

// .gitignore
createFile('.gitignore', `node_modules
dist
.astro
.env
.env.local
.DS_Store
*.log
`);

// ============================================
// 3. FILE PUBLIC
// ============================================
console.log('\n🌐 Creo file public...\n');

// robots.txt
createFile('public/robots.txt', `User-agent: *
Allow: /

Sitemap: https://${DOMAIN}/sitemap-index.xml
`);

// favicon.svg
createFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#FF6B35"/>
  <text x="32" y="44" font-family="Instrument Serif, serif" font-size="38" font-style="italic" fill="#FAF9F6" text-anchor="middle">F</text>
</svg>
`);

// ============================================
// 4. STILI GLOBALI
// ============================================
console.log('\n🎨 Creo stili globali...\n');

createFile('src/styles/global.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }
  body {
    @apply bg-base text-ink font-body;
  }
  ::selection {
    @apply bg-pop text-base;
  }
}

@layer components {
  .glass {
    @apply bg-ink/70 backdrop-blur-xl backdrop-saturate-150 border border-white/10;
  }
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2
           rounded-full bg-pop px-6 py-3
           font-label font-semibold text-base text-sm uppercase tracking-wider
           shadow-soft hover:shadow-glow
           hover:bg-pop/90 active:scale-95
           transition-all duration-300;
  }
  .btn-ghost {
    @apply inline-flex items-center justify-center gap-2
           rounded-full border border-ink/20 px-6 py-3
           font-label font-semibold text-ink text-sm uppercase tracking-wider
           hover:bg-ink hover:text-base
           transition-all duration-300;
  }
  .section {
    @apply px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32;
  }
}
`);

// ============================================
// 5. LAYOUT BASE
// ============================================
console.log('\n🏗️  Creo layout base...\n');

createFile('src/layouts/Base.astro', `---
import '../styles/global.css';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import CookieBanner from '../components/legal/CookieBanner.astro';
import ChatBubble from '../components/chat/ChatBubble.astro';

interface Props {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
const {
  title,
  description,
  image = 'https://${DOMAIN}/og-home.jpg',
  url = Astro.url.href,
} = Astro.props;
---
<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#1A2B3C" />

  <title>{title} — FACILISSIMO WEB</title>
  <meta name="description" content={description} />
  <meta name="author" content="M. Teresa Rogani" />
  <link rel="canonical" href={url} />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:site_name" content="FACILISSIMO WEB" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content={url} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="overflow-x-hidden">
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-pop focus:text-base focus:px-4 focus:py-2 focus:rounded-full">
    Salta al contenuto
  </a>

  <Header />

  <main id="main">
    <slot />
  </main>

  <Footer />
  <CookieBanner client:load />
  <ChatBubble client:visible />
</body>
</html>
`);

// ============================================
// 6. COMPONENTI
// ============================================
console.log('\n🧩 Creo componenti...\n');

// Header
createFile('src/components/layout/Header.astro', `---
const currentPath = Astro.url.pathname;
const nav = [
  { href: '/',           label: 'Home' },
  { href: '/chi-siamo',  label: 'Chi sono' },
  { href: '/servizi',    label: 'Servizi' },
  { href: '/portfolio',  label: 'Portfolio' },
  { href: '/contatti',   label: 'Contatti' },
];
---
<header class="fixed top-0 left-0 right-0 z-50
               bg-base/80 backdrop-blur-md border-b border-muted/50">
  <div class="flex items-center justify-between px-5 py-4 md:px-10">
    <a href="/" class="flex items-center gap-2 group">
      <span class="h-8 w-8 rounded-full bg-pop flex items-center justify-center
                   font-display text-base text-lg italic
                   group-hover:rotate-12 transition-transform duration-300">F</span>
      <span class="font-label text-sm font-bold uppercase tracking-wider text-ink">
        Facilissimo<span class="text-pop">.</span>
      </span>
    </a>

    <nav class="hidden md:flex items-center gap-8">
      {nav.map(item => (
        <a href={item.href}
           class:list={[
             'font-label text-sm uppercase tracking-wider transition-colors',
             currentPath === item.href ? 'text-pop' : 'text-ink/70 hover:text-ink'
           ]}>
          {item.label}
        </a>
      ))}
      <a href="/contatti" class="btn-primary !py-2 !px-5 !text-xs">Parliamone</a>
    </nav>

    <button id="menu-toggle"
      class="md:hidden relative h-10 w-10 flex items-center justify-center"
      aria-label="Apri menu" aria-expanded="false">
      <span class="h-0.5 w-6 bg-ink absolute transition-all duration-300 -translate-y-1.5" data-bar="top"></span>
      <span class="h-0.5 w-6 bg-ink absolute transition-all duration-300" data-bar="mid"></span>
      <span class="h-0.5 w-6 bg-ink absolute transition-all duration-300 translate-y-1.5" data-bar="bot"></span>
    </button>
  </div>

  <nav id="mobile-menu"
    class="md:hidden fixed inset-0 top-[73px] bg-base z-40
           flex flex-col justify-between px-6 py-10
           opacity-0 pointer-events-none transition-opacity duration-300">
    <div class="flex flex-col gap-6">
      {nav.map((item, i) => (
        <a href={item.href}
           class="font-display text-5xl text-ink border-b border-muted pb-4
                  transform translate-y-4 opacity-0 transition-all duration-500"
           style={\`transition-delay: \${i * 60}ms\`}
           data-menu-link>
          {item.label}
        </a>
      ))}
    </div>
    <a href="/contatti" class="btn-primary w-full">Inizia il progetto</a>
  </nav>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const bars = toggle?.querySelectorAll('[data-bar]');
  const links = menu?.querySelectorAll('[data-menu-link]');
  let open = false;

  toggle?.addEventListener('click', () => {
    open = !open;
    toggle.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('opacity-0', !open);
    menu?.classList.toggle('pointer-events-none', !open);
    bars?.[0].classList.toggle('rotate-45');
    bars?.[0].classList.toggle('translate-y-0');
    bars?.[1].classList.toggle('opacity-0');
    bars?.[2].classList.toggle('-rotate-45');
    bars?.[2].classList.toggle('translate-y-0');
    links?.forEach(l => {
      l.classList.toggle('translate-y-0', open);
      l.classList.toggle('opacity-100', open);
    });
  });

  links?.forEach(l => l.addEventListener('click', () => toggle.click()));
</script>
`);

// Footer
createFile('src/components/layout/Footer.astro', `<footer class="bg-ink text-base/80 section mt-20">
  <div class="grid gap-10 md:grid-cols-3">
    <div>
      <p class="font-display text-3xl text-base mb-3">
        Il web <em class="text-pop">Wow</em>,<br>facilissimo.
      </p>
      <p class="text-sm text-base/60">
        FACILISSIMO WEB di M. Teresa Rogani<br>
        Web Graphic Designer · Marche, Italia
      </p>
    </div>

    <div>
      <h4 class="font-label text-xs uppercase tracking-wider text-pop mb-4">Navigazione</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/chi-siamo" class="hover:text-pop transition">Chi sono</a></li>
        <li><a href="/servizi" class="hover:text-pop transition">Servizi</a></li>
        <li><a href="/portfolio" class="hover:text-pop transition">Portfolio</a></li>
        <li><a href="/contatti" class="hover:text-pop transition">Contatti</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-label text-xs uppercase tracking-wider text-pop mb-4">Legale</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="/privacy" class="hover:text-pop transition">Privacy Policy</a></li>
        <li><a href="/cookie-policy" class="hover:text-pop transition">Cookie Policy</a></li>
        <li><button id="cookie-revoke" class="hover:text-pop transition text-left">Gestisci cookie</button></li>
      </ul>
    </div>
  </div>

  <div class="mt-12 pt-6 border-t border-base/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-base/50">
    <p>© 2026 FACILISSIMO WEB · P.IVA 00000000000</p>
    <p>Fatto con ❤️ nelle Marche</p>
  </div>
</footer>

<script>
  document.getElementById('cookie-revoke')?.addEventListener('click', () => {
    localStorage.removeItem('cookie-consent');
    location.reload();
  });
</script>
`);

// CookieBanner
createFile('src/components/legal/CookieBanner.astro', `<div id="cookie-banner"
  class="fixed bottom-4 left-4 right-4 z-[60]
         rounded-3xl glass p-5 shadow-2xl
         md:left-auto md:right-6 md:max-w-sm
         translate-y-[120%] opacity-0 transition-all duration-500">
  <p class="font-body text-sm text-base/90 mb-4 leading-relaxed">
    Usiamo cookie tecnici e, col tuo consenso, analytics per migliorare il sito.
    <a href="/cookie-policy" class="underline text-pop">Info</a>.
  </p>
  <div class="flex gap-2">
    <button id="cookie-accept" class="flex-1 rounded-xl bg-pop px-4 py-2.5 text-sm font-semibold text-base hover:bg-pop/90 active:scale-95 transition">
      Accetta
    </button>
    <button id="cookie-custom" class="rounded-xl border border-base/20 px-4 py-2.5 text-sm text-base/80 hover:bg-base/10 transition">
      Solo essenziali
    </button>
  </div>
</div>

<script>
  const banner = document.getElementById('cookie-banner');
  const accept = document.getElementById('cookie-accept');
  const custom = document.getElementById('cookie-custom');

  if (!localStorage.getItem('cookie-consent')) {
    setTimeout(() => {
      banner?.classList.remove('translate-y-[120%]', 'opacity-0');
    }, 800);
  }

  const save = (val: string) => {
    localStorage.setItem('cookie-consent', val);
    banner?.classList.add('translate-y-[120%]', 'opacity-0');
  };

  accept?.addEventListener('click', () => save('all'));
  custom?.addEventListener('click', () => save('essential'));
</script>
`);

// ChatBubble
createFile('src/components/chat/ChatBubble.astro', `<div id="chat-widget" class="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
  <div id="chat-panel"
    class="absolute bottom-20 right-0 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[520px]
           rounded-4xl bg-base border border-muted shadow-2xl overflow-hidden
           flex flex-col origin-bottom-right
           scale-90 opacity-0 pointer-events-none
           transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
    
    <header class="bg-ink text-base p-5 flex items-center gap-3">
      <div class="relative">
        <div class="h-10 w-10 rounded-full bg-pop flex items-center justify-center font-display text-xl italic">T</div>
        <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-ink"></span>
      </div>
      <div>
        <p class="font-label text-[10px] uppercase tracking-widest text-base/60">Online ora</p>
        <p class="font-display text-xl leading-none">Ciao, sono Teresa</p>
      </div>
      <button id="chat-close" class="ml-auto h-8 w-8 rounded-full hover:bg-base/10 flex items-center justify-center" aria-label="Chiudi">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </header>

    <div id="chat-messages" class="flex-1 overflow-y-auto p-5 space-y-3 bg-muted/30">
      <div class="flex gap-2">
        <div class="h-7 w-7 rounded-full bg-pop flex-shrink-0 flex items-center justify-center font-display text-sm italic text-base">T</div>
        <div class="bg-base rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] shadow-soft">
          <p class="text-sm text-ink">Ciao! 👋 Hai un progetto in mente? Scrivimi qui, ti rispondo in giornata.</p>
          <p class="text-[10px] text-ink/40 mt-1">Teresa · ora</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 pl-9">
        <button class="quick-reply rounded-full border border-ink/20 px-3 py-1.5 text-xs hover:bg-ink hover:text-base transition">Voglio un sito</button>
        <button class="quick-reply rounded-full border border-ink/20 px-3 py-1.5 text-xs hover:bg-ink hover:text-base transition">Restyling</button>
        <button class="quick-reply rounded-full border border-ink/20 px-3 py-1.5 text-xs hover:bg-ink hover:text-base transition">Prezzi</button>
      </div>
    </div>

    <form id="chat-form" class="border-t border-muted p-3 flex gap-2 bg-base">
      <input id="chat-input" type="text" placeholder="Scrivi un messaggio..."
        class="flex-1 rounded-full bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pop/30" />
      <button type="submit" class="h-10 w-10 rounded-full bg-pop flex items-center justify-center hover:bg-pop/90 active:scale-90 transition">
        <svg class="h-4 w-4 text-base" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </form>
  </div>

  <button id="chat-toggle"
    class="h-14 w-14 rounded-full bg-pop shadow-glow
           flex items-center justify-center
           hover:scale-110 active:scale-95 transition-transform
           animate-float"
    aria-label="Apri chat">
    <svg id="chat-icon-open" class="h-6 w-6 text-base" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  </button>
</div>

<script>
  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const close = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input') as HTMLInputElement;
  const messages = document.getElementById('chat-messages');
  const icon = document.getElementById('chat-icon-open');

  let isOpen = false;
  const setPanel = (open: boolean) => {
    isOpen = open;
    panel?.classList.toggle('scale-90', !open);
    panel?.classList.toggle('opacity-0', !open);
    panel?.classList.toggle('pointer-events-none', !open);
    if (icon) {
      icon.innerHTML = open
        ? '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none"/>'
        : '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>';
    }
  };

  toggle?.addEventListener('click', () => setPanel(!isOpen));
  close?.addEventListener('click', () => setPanel(false));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input?.value.trim();
    if (!text || !messages) return;
    const bubble = document.createElement('div');
    bubble.className = 'ml-auto bg-pop text-base rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] shadow-soft';
    bubble.innerHTML = \`<p class="text-sm">\${text}</p>\`;
    messages.appendChild(bubble);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

  document.querySelectorAll('.quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      if (input) input.value = (btn as HTMLElement).textContent || '';
      input?.focus();
    });
  });
</script>
`);

// ProjectCard
createFile('src/components/ProjectCard.astro', `---
import { Image } from 'astro:assets';

interface Props {
  title: string;
  category: string;
  year: string;
  image: ImageMetadata;
  slug: string;
  color?: string;
}

const { title, category, year, image, slug, color = 'bg-muted' } = Astro.props;
---

<a href={\`/portfolio/\${slug}\`} class="group block" data-reveal>
  <div class:list={['aspect-[4/3] rounded-4xl overflow-hidden relative', color]}>
    <Image
      src={image}
      alt={title}
      width={1600}
      height={1200}
      class="absolute inset-0 w-full h-full object-cover
             group-hover:scale-110 transition-transform duration-700 ease-out"
      loading="lazy"
      decoding="async"
      formats={['avif', 'webp']}
      quality={80}
    />
    
    <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div class="absolute bottom-0 left-0 right-0 p-6
                translate-y-4 opacity-0
                group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500 text-base">
      <p class="font-label text-xs uppercase tracking-wider opacity-90 mb-1">
        {category} · {year}
      </p>
      <h3 class="font-display text-2xl md:text-3xl leading-tight">{title}</h3>
    </div>
  </div>
  
  <div class="mt-4 flex items-center justify-between md:hidden">
    <h3 class="font-display text-xl">{title}</h3>
    <span class="font-label text-xs uppercase tracking-wider text-pop">{category}</span>
  </div>
</a>
`);

// ============================================
// 7. LIBRERIE UTILITY
// ============================================
console.log('\n📚 Creo librerie utility...\n');

createFile('src/lib/animations.js', `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initRevealAnimations() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

export function initCounters() {
  gsap.utils.toArray('[data-counter]').forEach((el) => {
    const target = el.getAttribute('data-counter');
    const num = parseInt(target.replace(/\\D/g, ''), 10);
    const prefix = target.match(/^\\D*/)?.[0] || '';
    const suffix = target.match(/\\D*$/)?.[0] || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val) + suffix;
      },
    });
  });
}

export function initParallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
    gsap.to(el, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

export function initAllAnimations() {
  initRevealAnimations();
  initCounters();
  initParallax();
}
`);

// ============================================
// 8. PAGINE
// ============================================
console.log('\n📄 Creo pagine...\n');

// Home
createFile('src/pages/index.astro', `---
import Base from '../layouts/Base.astro';
---
<Base
  title="Il web Wow, facilissimo"
  description="Siti web d'impatto per artigiani, commercianti e professionisti delle Marche. Design moderno, zero complicazioni.">

  <section class="section pt-32 md:pt-40 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
    <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-6 opacity-0" data-hero-tag>
      Web Design · Marche
    </span>
    <h1 class="font-display text-[15vw] leading-[0.9] text-ink md:text-8xl lg:text-9xl">
      <span class="block overflow-hidden"><span class="block" data-hero-word>Il web</span></span>
      <span class="block overflow-hidden"><span class="block italic text-pop" data-hero-word>Wow,</span></span>
      <span class="block overflow-hidden"><span class="block" data-hero-word>facilissimo.</span></span>
    </h1>
    <p class="mt-8 max-w-xl text-lg text-ink/70 leading-relaxed opacity-0" data-hero-sub>
      Creo siti web belli, veloci e semplici da gestire per microimprenditori che vogliono crescere online senza stress.
    </p>
    <div class="mt-10 flex flex-wrap gap-3 opacity-0" data-hero-cta>
      <a href="/contatti" class="btn-primary">Inizia il progetto →</a>
      <a href="/portfolio" class="btn-ghost">Vedi i lavori</a>
    </div>

    <div class="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-pop/10 blur-3xl pointer-events-none"></div>
  </section>

  <section class="border-y border-muted py-6 overflow-hidden">
    <div class="flex gap-12 animate-marquee whitespace-nowrap font-display text-3xl italic text-ink/40">
      {Array(2).fill(null).map(() => (
        <>
          <span>Artigiani</span><span class="text-pop">✦</span>
          <span>Commercianti</span><span class="text-pop">✦</span>
          <span>Professionisti</span><span class="text-pop">✦</span>
          <span>Ristoranti</span><span class="text-pop">✦</span>
          <span>Studio</span><span class="text-pop">✦</span>
          <span>Botteghe</span><span class="text-pop">✦</span>
        </>
      ))}
    </div>
  </section>

  <section class="section">
    <h2 class="font-display text-5xl md:text-7xl mb-12 max-w-3xl">
      Perché <em class="text-pop">facilissimo</em>?
    </h2>
    <div class="grid gap-6 md:grid-cols-3">
      {[
        { n: '01', t: 'Zero codice', d: 'Gestisci testi e immagini senza toccare una riga di codice.' },
        { n: '02', t: 'Su misura', d: 'Design cucito sul tuo brand, niente template uguali a tutti.' },
        { n: '03', t: 'Veloce', d: 'Punteggio 95+ su Google. I clienti non aspettano.' },
      ].map(c => (
        <div class="rounded-4xl bg-muted/40 p-8 hover:bg-muted transition-colors group">
          <span class="font-label text-sm text-pop">{c.n}</span>
          <h3 class="font-display text-3xl mt-4 mb-3 group-hover:italic transition-all">{c.t}</h3>
          <p class="text-ink/70 leading-relaxed">{c.d}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="section">
    <div class="rounded-5xl bg-ink text-base p-10 md:p-16 text-center relative overflow-hidden">
      <h2 class="font-display text-5xl md:text-7xl relative z-10">
        Pronto per il tuo <em class="text-pop">Wow</em>?
      </h2>
      <p class="mt-6 text-base/70 max-w-xl mx-auto relative z-10">
        Raccontami il tuo progetto. Prima consulenza gratuita, senza impegno.
      </p>
      <a href="/contatti" class="btn-primary mt-8 relative z-10">Parliamone →</a>
      <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-pop/20 blur-3xl"></div>
    </div>
  </section>
</Base>

<script>
  import('gsap').then(({ gsap }) => {
    gsap.to('[data-hero-tag]', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.from('[data-hero-word]', {
      y: '110%', duration: 1, ease: 'power4.out', stagger: 0.12, delay: 0.3,
    });
    gsap.to('[data-hero-sub]', { opacity: 1, y: 0, duration: 0.8, delay: 1 });
    gsap.to('[data-hero-cta]', { opacity: 1, y: 0, duration: 0.8, delay: 1.2 });
  });
</script>
`);

// Chi sono
createFile('src/pages/chi-siamo.astro', `---
import Base from '../layouts/Base.astro';
---
<Base
  title="Chi sono — M. Teresa Rogani"
  description="Web Graphic Designer freelance nelle Marche. Creo siti web Wow e facilissimi per microimprenditori locali."
  image="https://${DOMAIN}/og-chi-sono.jpg">

  <section class="section pt-32 md:pt-40">
    <div class="grid gap-12 lg:grid-cols-5 lg:gap-16 items-center">
      <div class="lg:col-span-2 relative" data-reveal>
        <div class="aspect-[4/5] rounded-4xl overflow-hidden bg-muted relative">
          <div class="absolute inset-0 bg-gradient-to-br from-pop/20 to-ink/20"></div>
          <div class="absolute inset-0 flex items-center justify-center font-display text-9xl italic text-ink/20">MT</div>
        </div>
        <div class="absolute -bottom-6 -right-4 md:-right-8 bg-base rounded-3xl shadow-soft p-5 border border-muted">
          <p class="font-label text-xs uppercase tracking-wider text-pop">Dal</p>
          <p class="font-display text-3xl">2014</p>
          <p class="text-xs text-ink/60">nelle Marche</p>
        </div>
      </div>

      <div class="lg:col-span-3">
        <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-4 block" data-reveal>Ciao, sono Teresa</span>
        <h1 class="font-display text-5xl md:text-7xl leading-[0.95] mb-8" data-reveal>
          Web designer <em class="text-pop">artigiana</em><br>
          del digitale.
        </h1>
        <div class="space-y-5 text-lg text-ink/75 leading-relaxed" data-reveal>
          <p>
            <span class="font-display italic text-6xl float-left mr-2 leading-none text-pop">M</span>i chiamo Maria Teresa Rogani e vivo e lavoro nelle Marche. Da oltre dieci anni aiuto artigiani, commercianti e professionisti locali a trasformare la loro presenza online in qualcosa di bello, funzionante e — soprattutto — <strong class="text-ink">facile da gestire</strong>.
          </p>
          <p>
            Non credo nei template uguali per tutti. Credo nei siti cuciti addosso al tuo brand, come un abito su misura. Credo che il web debba essere <em class="text-pop italic">Wow</em> da vedere, ma <em>facilissimo</em> da usare — anche se non hai mai toccato un CMS in vita tua.
          </p>
          <p>
            Quando non disegno interfacce, cammino sui Sibillini, bevo caffè troppo forti e cerco il perfetto equilibrio tra un arancio Pantone e un blu notte.
          </p>
        </div>

        <div class="mt-10 flex items-center gap-4" data-reveal>
          <span class="font-label text-xs uppercase tracking-wider text-ink/50">Seguimi</span>
          <div class="flex gap-2">
            <a href="https://instagram.com/facilissimoweb" target="_blank" rel="noopener"
              class="h-11 w-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-base transition" aria-label="Instagram">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.2 2.1.5 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.5 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.1-.2 2.9-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.5-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.2-2.1-.5-2.9-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.6-.5-2.9-.5C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/></svg>
            </a>
            <a href="https://linkedin.com/in/facilissimoweb" target="_blank" rel="noopener"
              class="h-11 w-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-base transition" aria-label="LinkedIn">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            </a>
            <a href="https://facebook.com/facilissimoweb" target="_blank" rel="noopener"
              class="h-11 w-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-base transition" aria-label="Facebook">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section border-y border-muted" data-reveal>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { n: '+80', l: 'Progetti consegnati' },
        { n: '10+', l: 'Anni di esperienza' },
        { n: '95+', l: 'Punteggio PageSpeed' },
        { n: '100%', l: 'Clienti nelle Marche' },
      ].map(s => (
        <div>
          <p class="font-display text-5xl md:text-6xl text-pop" data-counter={s.n}>{s.n}</p>
          <p class="font-label text-xs uppercase tracking-wider text-ink/60 mt-2">{s.l}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="section">
    <h2 class="font-display text-5xl md:text-7xl mb-16 max-w-2xl" data-reveal>
      Il mio <em class="text-pop">percorso</em>.
    </h2>
    <div class="relative max-w-3xl">
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-muted md:-translate-x-1/2"></div>
      {[
        { y: '2014', t: 'Primi passi', d: 'Inizio a progettare siti per le attività del mio quartiere.' },
        { y: '2017', t: 'Freelance a tempo pieno', d: 'Scelgo di dedicarmi solo ai microimprenditori locali.' },
        { y: '2021', t: 'Svolta "facilissima"', d: 'Definisco il mio metodo: design Wow, gestione zero-stress.' },
        { y: '2026', t: 'Oggi', d: 'Oltre 80 progetti consegnati, sempre con la stessa passione.' },
      ].map((step, i) => (
        <div class:list={['relative pl-12 md:pl-0 mb-12 md:grid md:grid-cols-2 md:gap-12', i % 2 === 0 ? 'md:text-right' : 'md:col-start-2']} data-reveal>
          <div class:list={['absolute left-0 md:left-1/2 top-1 h-8 w-8 rounded-full bg-pop md:-translate-x-1/2 flex items-center justify-center text-base text-xs font-bold', i % 2 === 0 ? 'md:order-2' : 'md:order-1']}>
            {i + 1}
          </div>
          <div class:list={[i % 2 === 0 ? 'md:order-1' : 'md:order-2']}>
            <p class="font-label text-sm uppercase tracking-wider text-pop">{step.y}</p>
            <h3 class="font-display text-2xl md:text-3xl mt-1 mb-2">{step.t}</h3>
            <p class="text-ink/70">{step.d}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section class="section bg-muted/40 rounded-5xl mx-4 md:mx-10">
    <h2 class="font-display text-5xl md:text-7xl mb-12" data-reveal>In cosa credo</h2>
    <div class="grid gap-8 md:grid-cols-3">
      {[
        { i: '✦', t: 'Artigianalità', d: 'Ogni progetto è unico, come chi me lo commissiona.' },
        { i: '✧', t: 'Chiarezza', d: 'Niente tecnicismi. Ti spiego tutto, in italiano.' },
        { i: '❋', t: 'Relazione', d: 'Non sono un fornitore, sono la tua partner digitale.' },
      ].map(v => (
        <div data-reveal>
          <span class="font-display text-4xl text-pop">{v.i}</span>
          <h3 class="font-display text-3xl mt-3 mb-2">{v.t}</h3>
          <p class="text-ink/70">{v.d}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="section text-center">
    <h2 class="font-display text-5xl md:text-7xl mb-6" data-reveal>
      Ti va di <em class="text-pop">lavorare</em> insieme?
    </h2>
    <p class="text-lg text-ink/70 max-w-xl mx-auto mb-8" data-reveal>
      Prima chiacchierata gratuita, senza impegno. Raccontami la tua attività.
    </p>
    <a href="/contatti" class="btn-primary" data-reveal>Parliamone →</a>
  </section>
</Base>
`);
// ============================================
// 8. PAGINE (continuazione)
// ============================================

// Servizi
createFile('src/pages/servizi.astro', `---
import Base from '../layouts/Base.astro';
---
<Base
  title="Servizi — Web Design su misura"
  description="Siti vetrina, e-commerce, restyling e consulenza web per microimprenditori delle Marche.">

  <section class="section pt-32 md:pt-40">
    <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-4 block" data-reveal>Servizi</span>
    <h1 class="font-display text-6xl md:text-8xl leading-[0.9] mb-8 max-w-4xl" data-reveal>
      Cosa posso <em class="text-pop">fare</em> per te.
    </h1>
    <p class="text-xl text-ink/70 max-w-2xl leading-relaxed" data-reveal>
      Soluzioni web pensate per chi ha poco tempo e tante idee. Scegli il percorso più adatto al tuo business.
    </p>
  </section>

  <section class="section">
    <div class="grid gap-6 md:grid-cols-2">
      {[
        { n: '01', t: 'Sito Vetrina', d: 'La tua vetrina digitale, perfetta su mobile. Ideale per artigiani, studi professionali, ristoranti.', p: 'da € 1.200', tag: 'Più richiesto' },
        { n: '02', t: 'E-commerce', d: 'Vendi online i tuoi prodotti con un negozio bello, veloce e facile da gestire.', p: 'da € 2.400', tag: null },
        { n: '03', t: 'Restyling', d: 'Il tuo sito attuale non ti rappresenta più? Lo rendo moderno, veloce e coerente col tuo brand.', p: 'da € 800', tag: null },
        { n: '04', t: 'Consulenza', d: "Un'ora insieme per fare il punto sulla tua presenza online e definire i prossimi passi.", p: '€ 120/h', tag: 'Online' },
      ].map((s, i) => (
        <div class="group rounded-4xl border border-muted p-8 md:p-10 hover:border-pop hover:shadow-soft transition-all duration-500 relative overflow-hidden" data-reveal>
          {s.tag && (
            <span class="absolute top-6 right-6 bg-pop text-base text-[10px] font-label uppercase tracking-wider px-3 py-1 rounded-full">{s.tag}</span>
          )}
          <span class="font-label text-sm text-pop">{s.n}</span>
          <h3 class="font-display text-4xl md:text-5xl mt-3 mb-4 group-hover:italic transition-all">{s.t}</h3>
          <p class="text-ink/70 leading-relaxed mb-6">{s.d}</p>
          <div class="flex items-end justify-between pt-6 border-t border-muted">
            <p class="font-display text-2xl">{s.p}</p>
            <a href="/contatti" class="font-label text-xs uppercase tracking-wider text-pop hover:underline">Richiedi info →</a>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section class="section bg-ink text-base rounded-5xl mx-4 md:mx-10">
    <h2 class="font-display text-5xl md:text-7xl mb-16" data-reveal>
      Come <em class="text-pop">lavoriamo</em> insieme.
    </h2>
    <div class="grid gap-10 md:grid-cols-4">
      {[
        { n: '01', t: 'Ascolto', d: 'Chiacchierata gratuita per capire il tuo business e i tuoi obiettivi.' },
        { n: '02', t: 'Progetto', d: 'Ti presento wireframe e proposta grafica. Approvi prima di partire.' },
        { n: '03', t: 'Sviluppo', d: 'Costruisco il sito con aggiornamenti settimanali. Zero sorprese.' },
        { n: '04', t: 'Lancio', d: 'Mettiamo online. Ti insegno a gestirlo in 30 minuti.' },
      ].map(s => (
        <div data-reveal>
          <span class="font-display text-6xl text-pop/60">{s.n}</span>
          <h3 class="font-display text-3xl mt-2 mb-3">{s.t}</h3>
          <p class="text-base/70">{s.d}</p>
        </div>
      ))}
    </div>
  </section>

  <section class="section">
    <div class="rounded-5xl bg-gradient-to-br from-pop/10 to-muted p-10 md:p-16 grid gap-10 lg:grid-cols-2 items-center">
      <div data-reveal>
        <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-3 block">Gratis per te</span>
        <h2 class="font-display text-4xl md:text-6xl mb-4">
          Checklist: <em class="text-pop">10 errori</em> da evitare nel tuo sito.
        </h2>
        <p class="text-ink/70 text-lg mb-6">
          Scarica la guida PDF che uso con i miei clienti. In 5 minuti capisci cosa migliorare subito.
        </p>
        <ul class="space-y-2 text-sm text-ink/70">
          <li>✓ PDF di 12 pagine, pratico e illustrato</li>
          <li>✓ Esempi reali di siti marchigiani</li>
          <li>✓ Ricevi anche la newsletter mensile (1 email/mese, promesso)</li>
        </ul>
      </div>
      <form class="bg-base rounded-4xl p-8 shadow-soft space-y-4" data-reveal data-lead-form>
        <h3 class="font-display text-2xl mb-2">Scarica la checklist</h3>
        <div>
          <input type="text" name="name" required placeholder="Il tuo nome"
            class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition" />
        </div>
        <div>
          <input type="email" name="email" required placeholder="La tua email"
            class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition" />
        </div>
        <div>
          <select name="business" class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition">
            <option value="">Che attività hai?</option>
            <option>Artigianato</option>
            <option>Commercio / Negozio</option>
            <option>Ristorazione</option>
            <option>Libera professione</option>
            <option>Altro</option>
          </select>
        </div>
        <button type="submit" class="btn-primary w-full">Invia la checklist →</button>
        <p class="text-xs text-ink/50 text-center">Rispetto la tua privacy. Niente spam.</p>
      </form>
    </div>
  </section>

  <section class="section">
    <h2 class="font-display text-5xl md:text-7xl mb-12" data-reveal>Cosa dicono di me</h2>
    <div class="grid gap-6 md:grid-cols-3">
      {[
        { q: 'Teresa ha capito subito lo spirito della mia bottega. Il sito è bellissimo e lo gestisco da sola.', n: 'Marco B.', r: 'Ceramista, Urbania' },
        { q: 'Finalmente una web designer che parla italiano e non tecnico. Consigliatissima.', n: 'Giulia R.', r: 'Studio legale, Ancona' },
        { q: 'In 3 mesi dal lancio ho raddoppiato le prenotazioni online. Roba mai vista.', n: 'Luca M.', r: 'Ristorante, Macerata' },
      ].map(t => (
        <blockquote class="rounded-4xl bg-muted/40 p-8" data-reveal>
          <p class="font-display text-2xl italic leading-snug mb-6">"{t.q}"</p>
          <footer>
            <p class="font-label text-sm font-bold">{t.n}</p>
            <p class="text-xs text-ink/60">{t.r}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>

  <section class="section text-center">
    <h2 class="font-display text-5xl md:text-7xl mb-6" data-reveal>
      Hai un progetto in mente?
    </h2>
    <p class="text-lg text-ink/70 max-w-xl mx-auto mb-8" data-reveal>
      Raccontamelo. Ti rispondo in 24 ore, sempre.
    </p>
    <div class="flex flex-wrap gap-3 justify-center" data-reveal>
      <a href="/contatti" class="btn-primary">Inizia il progetto →</a>
      <a href="https://wa.me/390000000000" target="_blank" rel="noopener" class="btn-ghost">Scrivimi su WhatsApp</a>
    </div>
  </section>
</Base>
`);

// Portfolio (versione semplificata senza immagini reali)
createFile('src/pages/portfolio.astro', `---
import Base from '../layouts/Base.astro';

const projects = [
  { title: 'Bottega Ceramica Urbana', category: 'E-commerce', cat: 'ecommerce', year: '2026', slug: 'bottega-ceramica-urbana', color: 'bg-amber-100' },
  { title: 'Studio Legale Rossi', category: 'Sito vetrina', cat: 'vetrina', year: '2025', slug: 'studio-legale-rossi', color: 'bg-blue-100' },
  { title: 'Osteria del Borgo', category: 'Sito + Prenotazioni', cat: 'vetrina', year: '2025', slug: 'osteria-del-borgo', color: 'bg-rose-100' },
  { title: 'Atelier Marchigiano', category: 'Restyling', cat: 'restyling', year: '2024', slug: 'atelier-marchigiano', color: 'bg-emerald-100' },
  { title: 'Falegnameria F.lli Bianchi', category: 'Sito vetrina', cat: 'vetrina', year: '2024', slug: 'falegnameria-f-lli-bianchi', color: 'bg-stone-200' },
  { title: 'Vini Colline', category: 'E-commerce', cat: 'ecommerce', year: '2023', slug: 'vini-colline', color: 'bg-red-100' },
];
---
<Base
  title="Portfolio — Progetti recenti"
  description="Una selezione di siti web realizzati per artigiani, commercianti e professionisti delle Marche.">

  <section class="section pt-32 md:pt-40">
    <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-4 block" data-reveal>Portfolio</span>
    <h1 class="font-display text-6xl md:text-8xl leading-[0.9] mb-8 max-w-4xl" data-reveal>
      Progetti <em class="text-pop">reali</em>,<br>risultati veri.
    </h1>
    <p class="text-xl text-ink/70 max-w-2xl" data-reveal>
      Ogni sito è una storia. Qui trovi quelle che ho avuto il piacere di raccontare.
    </p>
  </section>

  <section class="px-5 md:px-10">
    <div class="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide" data-reveal>
      {[
        { k: 'all', l: 'Tutti' },
        { k: 'vetrina', l: 'Siti vetrina' },
        { k: 'ecommerce', l: 'E-commerce' },
        { k: 'restyling', l: 'Restyling' },
      ].map((f, i) => (
        <button data-filter={f.k}
          class:list={['filter-btn whitespace-nowrap rounded-full px-5 py-2.5 font-label text-xs uppercase tracking-wider transition',
            i === 0 ? 'bg-ink text-base' : 'border border-ink/20 text-ink hover:bg-ink hover:text-base']}>
          {f.l}
        </button>
      ))}
    </div>
  </section>

  <section class="section">
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" id="portfolio-grid">
      {projects.map(p => (
        <div data-cat={p.cat} data-reveal>
          <a href="#" class="group block" onclick="event.preventDefault()">
            <div class:list={['aspect-[4/3] rounded-4xl overflow-hidden relative flex items-center justify-center', p.color]}>
              <div class="font-display text-7xl italic text-ink/15 group-hover:scale-110 transition-transform duration-700">
                {p.title.charAt(0)}
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-base">
                <p class="font-label text-xs uppercase tracking-wider opacity-80">{p.category} · {p.year}</p>
                <h3 class="font-display text-2xl md:text-3xl mt-1">{p.title}</h3>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between md:hidden">
              <h3 class="font-display text-xl">{p.title}</h3>
              <span class="font-label text-xs uppercase tracking-wider text-pop">{p.category}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>

  <section class="section text-center">
    <h2 class="font-display text-5xl md:text-7xl mb-6" data-reveal>
      Il prossimo potrebbe essere il <em class="text-pop">tuo</em>.
    </h2>
    <a href="/contatti" class="btn-primary mt-6" data-reveal>Racconta il tuo progetto →</a>
  </section>
</Base>

<script>
  const buttons = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('#portfolio-grid > div');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.getAttribute('data-filter');
      buttons.forEach(b => {
        b.classList.remove('bg-ink', 'text-base');
        b.classList.add('border', 'border-ink/20', 'text-ink');
      });
      btn.classList.add('bg-ink', 'text-base');
      btn.classList.remove('border', 'border-ink/20');
      items.forEach(item => {
        const show = f === 'all' || item.getAttribute('data-cat') === f;
        if (show) {
          item.style.display = '';
          item.animate([
            { opacity: 0, transform: 'scale(0.9)' },
            { opacity: 1, transform: 'scale(1)' }
          ], { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>

<style is:global>
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
`);

// Contatti
createFile('src/pages/contatti.astro', `---
import Base from '../layouts/Base.astro';
---
<Base
  title="Contatti — Parliamone"
  description="Contatta FACILISSIMO WEB per una consulenza gratuita. Rispondo in 24 ore.">

  <section class="section pt-32 md:pt-40">
    <div class="grid gap-12 lg:grid-cols-5 lg:gap-16">
      <div class="lg:col-span-3">
        <span class="font-label text-xs uppercase tracking-[0.3em] text-pop mb-4 block" data-reveal>Contatti</span>
        <h1 class="font-display text-6xl md:text-8xl leading-[0.9] mb-6" data-reveal>
          Parliamone.<br><em class="text-pop">Senza impegno.</em>
        </h1>
        <p class="text-lg text-ink/70 mb-10 max-w-xl" data-reveal>
          Compila il form o scrivimi direttamente. Rispondo personalmente entro 24 ore, sempre.
        </p>

        <form class="space-y-5" data-reveal data-lead-form>
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Nome *</label>
              <input type="text" name="name" required
                class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition" />
            </div>
            <div>
              <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Email *</label>
              <input type="email" name="email" required
                class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition" />
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Telefono</label>
              <input type="tel" name="phone"
                class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition" />
            </div>
            <div>
              <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Tipo progetto *</label>
              <select name="project" required
                class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition">
                <option value="">Seleziona...</option>
                <option>Sito vetrina</option>
                <option>E-commerce</option>
                <option>Restyling sito esistente</option>
                <option>Consulenza</option>
                <option>Non so ancora</option>
              </select>
            </div>
          </div>

          <div>
            <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Raccontami il progetto *</label>
            <textarea name="message" rows="5" required
              class="w-full rounded-2xl border border-muted bg-muted/30 px-5 py-3.5 outline-none focus:border-pop transition resize-none"
              placeholder="Di cosa si occupa la tua attività? Quali obiettivi hai?"></textarea>
          </div>

          <div>
            <label class="font-label text-xs uppercase tracking-wider text-ink/60 mb-2 block">Budget indicativo</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['< € 1.500', '€ 1.500 - 3.000', '€ 3.000 - 5.000', '> € 5.000'].map(b => (
                <label class="cursor-pointer">
                  <input type="radio" name="budget" value={b} class="peer sr-only" />
                  <span class="block text-center rounded-2xl border border-muted py-3 text-sm peer-checked:border-pop peer-checked:bg-pop/10 transition">
                    {b}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <label class="flex items-start gap-3 text-sm text-ink/70">
            <input type="checkbox" required class="mt-1 accent-pop" />
            <span>Ho letto e accetto la <a href="/privacy" class="underline text-pop">Privacy Policy</a>. Acconsento al trattamento dei dati per ricevere una risposta.</span>
          </label>

          <button type="submit" class="btn-primary w-full md:w-auto">Invia richiesta →</button>
        </form>
      </div>

      <aside class="lg:col-span-2 lg:sticky lg:top-32 self-start space-y-8">
        <div class="rounded-4xl bg-muted/40 p-8" data-reveal>
          <h3 class="font-display text-2xl mb-6">Contatti diretti</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <span class="text-pop">✉</span>
              <div>
                <p class="font-label text-xs uppercase tracking-wider text-ink/50 mb-1">Email</p>
                <a href="mailto:ciao@${DOMAIN}" class="hover:text-pop transition">ciao@${DOMAIN}</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-pop">☎</span>
              <div>
                <p class="font-label text-xs uppercase tracking-wider text-ink/50 mb-1">Telefono / WhatsApp</p>
                <a href="tel:+390000000000" class="hover:text-pop transition">+39 000 000 0000</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-pop">◉</span>
              <div>
                <p class="font-label text-xs uppercase tracking-wider text-ink/50 mb-1">Zona operativa</p>
                <p>Marche, Italia · Lavoro da remoto in tutta Italia</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-4xl bg-ink text-base p-8" data-reveal>
          <h3 class="font-display text-2xl mb-3">Preferisci i social?</h3>
          <p class="text-base/70 text-sm mb-5">Seguimi per consigli, dietro le quinte e mini-tutorial.</p>
          <div class="flex gap-2">
            <a href="https://instagram.com/facilissimoweb" class="flex-1 rounded-full bg-base/10 hover:bg-pop py-2.5 text-center text-sm transition">Instagram</a>
            <a href="https://linkedin.com/in/facilissimoweb" class="flex-1 rounded-full bg-base/10 hover:bg-pop py-2.5 text-center text-sm transition">LinkedIn</a>
          </div>
        </div>

        <div class="rounded-4xl border border-pop p-6 text-center" data-reveal>
          <p class="font-display text-xl mb-2">⚡ Rispondo in <span class="text-pop">24h</span></p>
          <p class="text-sm text-ink/60">Lun-Ven · 9:00-18:00</p>
        </div>
      </aside>
    </div>
  </section>
</Base>
`);

// 404
createFile('src/pages/404.astro', `---
import Base from '../layouts/Base.astro';
---
<Base
  title="Pagina non trovata"
  description="Ops, questa pagina non esiste. Ma possiamo creare qualcosa di bellissimo insieme.">

  <section class="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-pop/10 blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-ink/5 blur-3xl animate-float" style="animation-delay: 1.5s"></div>
    </div>

    <div class="relative z-10 text-center max-w-3xl">
      <div class="relative mb-8">
        <h1 class="font-display text-[30vw] md:text-[20rem] leading-none text-ink/5 select-none" data-404>
          404
        </h1>
        <span class="absolute inset-0 flex items-center justify-center font-display text-[30vw] md:text-[20rem] leading-none text-pop italic opacity-0" data-404-pop>
          404
        </span>
      </div>

      <div class="space-y-4 mb-10">
        <p class="font-label text-xs uppercase tracking-[0.3em] text-pop opacity-0" data-msg-tag>
          Ops, pagina smarrita
        </p>
        <h2 class="font-display text-4xl md:text-6xl leading-tight opacity-0" data-msg-title>
          Questa pagina non esiste.<br>
          <em class="text-pop">Ma possiamo crearne una.</em>
        </h2>
        <p class="text-lg text-ink/70 max-w-xl mx-auto opacity-0" data-msg-sub>
          Forse hai digitato male l'indirizzo, o questa pagina è stata spostata. Nel dubbio, perché non ne creiamo una nuova insieme?
        </p>
      </div>

      <div class="flex flex-wrap gap-3 justify-center opacity-0" data-msg-cta>
        <a href="/" class="btn-primary">Torna alla home →</a>
        <a href="/contatti" class="btn-ghost">Crea una pagina Wow</a>
      </div>

      <div class="mt-12 opacity-0" data-msg-search>
        <p class="font-label text-xs uppercase tracking-wider text-ink/50 mb-3">Oppure cerca nel sito</p>
        <form class="flex gap-2 max-w-md mx-auto" onsubmit="event.preventDefault()">
          <input type="search" placeholder="Cerca..." 
            class="flex-1 rounded-full border border-muted bg-base px-5 py-3 text-sm outline-none focus:border-pop transition" />
          <button type="submit" class="rounded-full bg-ink text-base px-6 py-3 text-sm hover:bg-pop transition">
            Vai
          </button>
        </form>
      </div>
    </div>

    <div class="relative z-10 mt-16 flex flex-wrap gap-6 justify-center text-sm opacity-0" data-msg-links>
      <a href="/chi-siamo" class="text-ink/60 hover:text-pop transition">Chi sono</a>
      <span class="text-ink/20">·</span>
      <a href="/servizi" class="text-ink/60 hover:text-pop transition">Servizi</a>
      <span class="text-ink/20">·</span>
      <a href="/portfolio" class="text-ink/60 hover:text-pop transition">Portfolio</a>
      <span class="text-ink/20">·</span>
      <a href="/contatti" class="text-ink/60 hover:text-pop transition">Contatti</a>
    </div>
  </section>
</Base>

<script>
  import('gsap').then(({ gsap }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('[data-404]', {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
    })
    .to('[data-404-pop]', {
      opacity: 1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    }, '-=0.4')
    .to('[data-msg-tag]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    .to('[data-msg-title]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
    .to('[data-msg-sub]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('[data-msg-cta]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('[data-msg-search]', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    .to('[data-msg-links]', { opacity: 1, duration: 0.6 }, '-=0.2');

    const big404 = document.querySelector('[data-404]');
    big404?.addEventListener('mouseenter', () => {
      gsap.to(big404, {
        x: '+=3',
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        ease: 'power1.inOut',
      });
    });
  });
</script>
`);

// ============================================
// 9. SCRIPTS DI AUTOMAZIONE
// ============================================
console.log('\\n🔧 Creo script di automazione...\\n');

// optimize-images.mjs
createFile('scripts/optimize-images.mjs', `import sharp from 'sharp';
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
`);

// generate-placeholders.mjs
createFile('scripts/generate-placeholders.mjs', `import { createCanvas } from 'canvas';
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
`);

// ============================================
// 10. README.md
// ============================================
console.log('\\n📄 Creo README.md...\\n');

createFile('README.md', `# FACILISSIMO WEB

> Il web Wow, facilissimo.  
> Sito web ufficiale di M. Teresa Rogani — Web Graphic Designer nelle Marche.

## 🎯 Obiettivo

Creare siti web d'impatto per microimprenditori locali (artigiani, commercianti, professionisti) che vogliono crescere online senza stress. Design moderno, gestione zero-complicazioni.

## 🚀 Stack Tecnologico

- **Framework**: [Astro 4](https://astro.build) — Static site generator ultra-performante
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com) — Utility-first, mobile-first
- **Animazioni**: [GSAP 3](https://gsap.com) + [Motion One](https://motion.dev) — Fluide e performanti
- **Hosting**: [Vercel](https://vercel.com) — Deploy automatico, CDN globale

## 🛠️ Setup Locale

\\\`\\\`\\\`bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev
# → http://localhost:4321
\\\`\\\`\\\`

## 📜 Script Disponibili

| Comando | Descrizione |
|---|---|
| \\\`npm run dev\\\` | Avvia server di sviluppo |
| \\\`npm run build\\\` | Build produzione |
| \\\`npm run preview\\\` | Anteprima build produzione |
| \\\`npm run images\\\` | Ottimizza immagini portfolio (WebP, resize) |
| \\\`npm run placeholders\\\` | Genera placeholder immagini per sviluppo |

## 🎨 Design System

### Palette Colori
- **Base**: \\\`#FAF9F6\\\` (Bianco caldo)
- **Ink**: \\\`#1A2B3C\\\` (Blu notte)
- **Pop**: \\\`#FF6B35\\\` (Arancio accento)
- **Muted**: \\\`#E8E6E1\\\` (Grigio caldo)

### Typography
- **Display**: Instrument Serif (titoli)
- **Body**: Inter (testo)
- **Label**: Space Grotesk (micro-label)

## 🌐 Pagine

| Pagina | URL | Descrizione |
|---|---|---|
| Home | \\\`/\\\` | Hero + valore + CTA |
| Chi sono | \\\`/chi-siamo\\\` | Bio, timeline, valori |
| Servizi | \\\`/servizi\\\` | 4 servizi + lead magnet |
| Portfolio | \\\`/portfolio\\\` | Griglia progetti con filtri |
| Contatti | \\\`/contatti\\\` | Form + info dirette |
| 404 | \\\`/qualcosa\\\` | Pagina errore "Wow" |

## 🚀 Deploy

1. Push su GitHub
2. Vai su [vercel.com](https://vercel.com) → "Import Project"
3. Seleziona il repo
4. Deploy automatico ad ogni push su \\\`main\\\`

## 📞 Contatti

- **Email**: ciao@${DOMAIN}
- **Sito**: https://${DOMAIN}

---

**Fatto con ❤️ nelle Marche**
`);

// =========================================================
// 11. FILE .ENV ESEMPIO
// =========================================================
createFile('.env.example', `# Domain
SITE_URL=https://${DOMAIN}

# Sanity (opzionale, se vuoi usare il CMS)
SANITY_PROJECT_ID=xxx
SANITY_DATASET=production

# Formspree (per il form contatti)
FORMSPREE_ID=xxx
`);

// ============================================
// FINE SETUP
// ============================================
console.log('\\n' + '='.repeat(50));
console.log('✅ SETUP COMPLETATO CON SUCCESSO!');
console.log('='.repeat(50));
console.log('');
console.log('📋 Prossimi passi:');
console.log('');
console.log('1. Installa le dipendenze:');
console.log('   npm install');
console.log('');
console.log('2. (Opzionale) Genera placeholder immagini:');
console.log('   npm run placeholders');
console.log('');
console.log('3. Avvia il dev server:');
console.log('   npm run dev');
console.log('');
console.log('4. Apri il browser su:');
console.log('   http://localhost:4321');
console.log('');
console.log('5. Crea le OG image su Canva (1200x630px)');
console.log('   e salvale in public/');
console.log('');
console.log('6. Quando sei pronta, deploy su Vercel:');
console.log('   git init');
console.log('   git add .');
console.log('   git commit -m "First commit"');
console.log('   git push');
console.log('   → poi importa il repo su vercel.com');
console.log('');
console.log('🎨 Buon lavoro su ' + DOMAIN + '!');
console.log('');
