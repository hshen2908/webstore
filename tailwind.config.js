/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,ejs,jsx}'
  ],
  theme: {
    extend: {
        colors: {
            'white': '#f8f9fa',
            'black': '#222222',
          },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

