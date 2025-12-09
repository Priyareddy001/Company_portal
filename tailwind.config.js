/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Exact Blue Gradient from Image
        'gradient-start': '#007BFF',  // Top blue (medium-dark vibrant blue)
        'gradient-end': '#0099FF',    // Bottom blue (lighter vibrant blue)
        
        // Legacy primary colors for compatibility
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      backgroundImage: {
        // Custom Blue Gradient - Fixed for both light and dark modes
        'blue-gradient': 'linear-gradient(to bottom, #00438A, #1E73BE)',
        'blue-gradient-horizontal': 'linear-gradient(to right, #00438A, #1E73BE)',
        
        // Legacy gradients for compatibility
        'gradient-blue': 'linear-gradient(to bottom,rgb(9, 72, 139),rgb(9, 72, 81))',
        'gradient-blue-horizontal': 'linear-gradient(to right,rgb(23, 64, 109), #0099FF)',
        'gradient-blue-dark': 'linear-gradient(to bottom, #007BFF, #0099FF)', // Same gradient for dark mode
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}