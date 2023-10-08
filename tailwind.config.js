/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        gradient: `repeating-linear-gradient(
        45deg,
        rgb(111, 166, 214),
        rgb(111, 166, 214) 33px,
        transparent 0px,
        transparent 41px,
        rgb(241, 141, 155) 0px,
        rgb(241, 141, 155) 74px,
        transparent 0px,
        transparent 82px
    );`
      },
      backgroundColor: {
        loginBg: "rgb(208, 1, 27)"
      }
    },
  },
  plugins: [],
}

