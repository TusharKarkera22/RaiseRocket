/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
  ],
  theme: {
    extend: {
      fontFamily:{
        'excratch':['Excratch', 'sans-serif'],
        'kinetica':['Kinetica','sans-serif'],
        'kross':['KrossNeueGrotesk-Book','sans-serif']
      },
      colors: {
        'primary-black': '#131313',
        'secondary-white': '#FFFFFF',
        'green': '#02FE4A'

      },
      fontSize: {
        
        base: '40px',
        
      },
    },
  },
  plugins: [],
}