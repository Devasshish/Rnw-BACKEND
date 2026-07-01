/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        primary: '#3b82f6',
        'primary-hover': '#2563eb',
        accent: '#8b5cf6'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
