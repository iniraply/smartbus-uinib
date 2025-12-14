/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#3E0703", // Coklat Sangat Gelap (Teks/Sidebar)
          primary: "#660B05", // Merah Maroon (Header)
          accent: "#8C1007", // Merah Terang (Tombol/Icon Aktif)
          cream: "#FFF0C4", // Krem (Background)
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
