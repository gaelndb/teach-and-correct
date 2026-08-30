import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: '#F7FAFF',
        foreground: '#172554',
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#EDE9FE',
          foreground: '#4C1D95',
        },
        accent: {
          DEFAULT: '#F97316',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#22C55E',
          foreground: '#052E16',
        },
        violet: {
          DEFAULT: '#7C3AED',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#EAF1FF',
          foreground: '#526078',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#172554',
        },
        border: '#D7E3F8',
        ring: '#7C3AED',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(37, 99, 235, 0.14)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scanNudge: {
          '0%, 78%, 100%': { transform: 'translateY(0) scale(1)' },
          '84%': { transform: 'translateY(-5px) scale(1.015)' },
          '90%': { transform: 'translateY(0) scale(1)' },
          '94%': { transform: 'translateY(-3px) scale(1.01)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        gentleFloat: 'gentleFloat 9s ease-in-out infinite',
        scanNudge: 'scanNudge 2s ease-in-out infinite',
        glow: 'glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
