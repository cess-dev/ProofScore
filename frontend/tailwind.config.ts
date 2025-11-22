import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052CC',
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a2ff',
          400: '#3383ff',
          500: '#0052CC',
          600: '#0042a3',
          700: '#00317a',
          800: '#002152',
          900: '#001029',
        },
        secondary: {
          DEFAULT: '#1E1E1E',
        },
        success: {
          DEFAULT: '#00C853',
        },
        warning: {
          DEFAULT: '#FFB300',
        },
        background: {
          DEFAULT: '#F7F9FB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
