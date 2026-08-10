module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#07090d",
        "ink-2": "#0d1117",
        accent: "#7c5cff",
        cyan: "#3ee6d8",
        amber: "#f7b955",
        muted: "#8b93a7",
      },
    },
  },
  plugins: [],
};
