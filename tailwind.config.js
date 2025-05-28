/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'flow': 'flow 3s ease-in-out',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'neural-pulse': 'neuralPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flow: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(20px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
        neuralPulse: {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.7' 
          },
          '50%': { 
            transform: 'scale(1.1)', 
            opacity: '1' 
          },
        },
      },
      colors: {
        // MCT Design System Colors
        primary: {
          50: '#E6F2FF',  // Soft blues
          100: '#B3D9FF',
          200: '#80C1FF',
          300: '#4DA8FF',
          400: '#1A90FF',
          500: '#0066CC',
          600: '#004D99',
          700: '#003366',
          800: '#001A33',
          900: '#000D1A',
        },
        secondary: {
          50: '#F0E6FF',  // Gentle purples
          100: '#D9B3FF',
          200: '#C180FF',
          300: '#AA4DFF',
          400: '#921AFF',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3730A3',
        },
        accent: {
          50: '#FFE6E6',  // Warm coral
          100: '#FFB3B3',
          200: '#FF8080',
          300: '#FF4D4D',
          400: '#FF1A1A',
          500: '#E60000',
          600: '#CC0000',
          700: '#B30000',
          800: '#990000',
          900: '#800000',
        },
        background: {
          DEFAULT: '#FAFBFC',  // Off-white background
          card: '#FFFFFF',
          subtle: '#F8FAFC',
        },
        text: {
          primary: '#1A202C',  // Deep gray
          secondary: '#4A5568',
          muted: '#718096',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',  // Default border color
          light: '#F1F5F9',
          dark: '#CBD5E0',
        },
        neural: {
          encoder: '#3B82F6',
          decoder: '#8B5CF6',
          attention: '#F59E0B',
          embedding: '#10B981',
          output: '#DC2626',
          flow: '#6366F1',
        },
      },
      spacing: {
        // 8px spacing grid
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
        '32': '256px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '32px' }],
        '2xl': ['24px', { lineHeight: '36px' }],
        '3xl': ['30px', { lineHeight: '40px' }],
        '4xl': ['36px', { lineHeight: '48px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
        '6xl': ['60px', { lineHeight: '72px' }],
        '7xl': ['72px', { lineHeight: '80px' }],
      },
      backdropBlur: {
        xs: '2px',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      strokeWidth: {
        '3': '3',
        '4': '4',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'neural': '0 4px 20px rgba(99, 102, 241, 0.3)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} 