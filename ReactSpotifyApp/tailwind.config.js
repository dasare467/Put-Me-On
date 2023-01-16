/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': 'Poppins, Helvetica, Arial, sans-serif',
        'agency': 'AGENCYB, cursive' 
      }
    },
  },
  plugins: [],
}
