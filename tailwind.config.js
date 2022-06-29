/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily:{
        logo:"Saira Stencil One",
        default:"Raleway"
      },
      colors:{
        violet:{
          500:"#A328D6",
          700:"#8C11BE"
        }
      }
    },
  },
  plugins: [
    
  ],
}


