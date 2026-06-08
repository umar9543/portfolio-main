import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: '#080B14',
        cyan: '#00F5FF',
        violet: '#7B2FFF',
      },
      fontFamily: {
        space: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
        'dm-mono': ['var(--font-dm-mono)', 'DM Mono', 'monospace'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        blink: 'blink 1s step-end infinite',
        gradient: 'gradient 4s ease infinite',
        'scroll-line': 'scroll-line 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scroll-line': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
}

export default config
