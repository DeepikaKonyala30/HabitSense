/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium warm color palette (inspired by Duolingo, Finch, Apple Health)
        primary: {
          50: '#FEF3F0',
          100: '#FDD8CD',
          200: '#FCBFAB',
          300: '#FAA689',
          400: '#F88B6A',
          500: '#F56E4A', // Main brand color - warm orange
          600: '#E85B33',
          700: '#D64921',
          800: '#C23B19',
          900: '#A82D0D',
        },
        accent: {
          50: '#FEF6F0',
          100: '#FDDDC9',
          200: '#FCBFA1',
          300: '#FAA179',
          400: '#F88351',
          500: '#F56429', // Secondary warm tone
          600: '#E85118',
          700: '#D64407',
          800: '#C23605',
          900: '#9E2B03',
        },
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716B',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
        // Additional palette colors
        purple: {
          50: '#FAF5FF',
          400: '#C084FC',
          500: '#A855F7', // For streaks
          600: '#9333EA',
        },
        pink: {
          50: '#FDF2F8',
          400: '#F472B6',
          500: '#EC4899', // For motivation
          600: '#DB2777',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'premium': '0 12px 32px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(245, 110, 74, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'completion': 'completion 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        completion: {
          '0%': { transform: 'scale(0.5) rotate(-10deg)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
