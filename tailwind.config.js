/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        'app-primary': '#1a202c',
        'app-secondary': '#4a5568',
        'app-muted': '#718096',
        'accent-primary': '#86BD00',
        'accent-hover': '#75a500',
        'success': '#48bb78',
        'warning': '#ed8936',
        'error': '#f56565',
        'info': '#4299e1',
        primary: {
          50: '#f7fee7',
          100: '#ecfccb',
          500: '#86BD00',
          600: '#75a500',
          700: '#658900',
        },
        gray: {
          50: '#F5F7FA',
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        }
      },
      backgroundColor: {
        'app': '#F5F7FA',
        'surface': '#FFFFFF',
        'accent-primary': '#86BD00',
        'accent-hover': '#75a500',
      },
      textColor: {
        'app-primary': '#1a202c',
        'app-secondary': '#4a5568',
        'app-muted': '#718096',
      },
      borderColor: {
        'app': '#e2e8f0',
        'app-medium': '#cbd5e0',
      },
      boxShadow: {
        'app': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'app-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'app-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}