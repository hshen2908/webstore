/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,ejs,jsx}'
  ],
  safelist: [
    'animate-dropdownOpen',
    'animate-dropdownClose',
    'z-10',
    'scale-150',
    {
      pattern: /bg-+/,
    }
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
              opacity: '0',
              transform: 'translate(0px, -16px)'
            },
            '100%': {
                opacity: '1.0',
                transform: 'translate(0)'
            },
          },
          dropdownClose: {
            '0%': {
                opacity: '1.0',
                transform: 'translate(0)'
            },
            '100%': {
                opacity: '0',
                transform: 'translate(0px, -16px)'
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

