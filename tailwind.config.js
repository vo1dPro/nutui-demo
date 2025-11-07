/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        'yellow-1': '#FFC600',
        'yellow-2': '#FFF3C9',
        'yellow-3': '#A9680C',
        'yellow-4': '#663409',
        'blue-1': '#007FDA',
        'green-1': '#36B876',
        'red-1': '#D9361A',
        'black-1': '#2A2A2A',
        'black-2': '#828079',
        'black-3': '#CECDCA',
        'black-4': '#F7F5F3',
        'black-opacity-1': 'rgba(42, 42, 42, 0.8)',
        'black-opacity-2': 'rgba(42, 42, 42, 0.5)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
