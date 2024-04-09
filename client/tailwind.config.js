/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homeBg': "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('C:/Users/Vilas/Desktop/ARVR/client/src/images/home-bg.jpg')"
      }
    },
  },
  plugins: [],
}

