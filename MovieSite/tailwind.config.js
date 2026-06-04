/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{ejs,html}",
    "./public/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        darker: '#1a1a1a',
        accent: '#ff6b6b',
        accentLight: '#ee5a6f',
      },
      backdropFilter: {
        'blur': 'blur(10px)',
      }
    },
  },
  plugins: [],
}
