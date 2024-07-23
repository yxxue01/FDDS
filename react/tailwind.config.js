/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0.7 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10%)', opacity: 0.6 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
      },
      fontFamily:{
        'roboto-bold-italic': ['Roboto', 'sans-serif'],
        cabin: ['Cabin Condensed','cursive'],
        dmsans: ['DM Sans','cursive'],
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ],
      },
      fontWeight: {
        'roboto-bold-italic': 700,
      },
      fontStyle: {
        'roboto-bold-italic': 'italic',
      },
      fontSize:{
        'title':'30px',
        'subtitle':'20px',
        'button':'15px'
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
      },
      padding:{
        'content':'20px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
  darkMode: 'class',
}

