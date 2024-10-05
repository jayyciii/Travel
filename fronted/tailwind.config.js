export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Đảm bảo đúng các file bạn dùng Tailwind CSS
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F7F8F9",
        primary: "#222222",
        accent: "#34495E",
      },
    },
  },
  plugins: [],
}
