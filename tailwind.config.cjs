/** @type {import('tailwindcss').Config} */
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
