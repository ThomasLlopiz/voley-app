/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        writingMode: {
          'vertical-rl': 'vertical-rl',
        },
      },
    },
    variants: {},
    plugins: [
      function ({ addUtilities }) {
        addUtilities({
          '.vertical-rl': {
            'writing-mode': 'vertical-rl',
          },
          '.rotate-180': {
            transform: 'rotate(180deg)',
          },
        })
      },
    ],
  },
  plugins: [],
}