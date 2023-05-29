/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,ejs,jsx}'
  ],
  safelist: [
    'animate-dropdownOpen',
    'animate-dropdownClose',
  ],
  theme: {
    extend: {
        colors: {
          'white': '#f8f9fa',
          'black': '#222222',
        },
        keyframes: {
          dropdownOpen: {
            '0%': {
              transform: 'scaleY(0)'
            },
            '80%': {
                transform: 'scaleY(1.1)'
            },
            '100%': {
                transform: 'scaleY(1)'
            },
          },
          dropdownClose: {
            '0%': {
              transform: 'scaleY(1)'
            },
            '80%': {
                transform: 'scaleY(1.1)'
            },
            '100%': {
                transform: 'scaleY(0)'
            },
          },
        },
        animation: {
          dropdownOpen: 'dropdownOpen 300ms ease-in-out forwards',  
          dropdownClose: 'dropdownClose 300ms ease-in-out forwards',     
        }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

