import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          200: '#b9cdff',
          300: '#85a8ff',
          400: '#4d7bff',
          500: '#2254f4',
          600: '#1a43e0',
          700: '#1633b5',
          800: '#172d93',
          900: '#172874',
        },
        surface: {
          DEFAULT: '#18181b',
          2: '#1f1f23',
          3: '#27272a',
          4: '#3f3f46',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
