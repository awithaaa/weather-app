/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/assets/weather.jpg')",
      }
    },
  },
  plugins: [],
};
