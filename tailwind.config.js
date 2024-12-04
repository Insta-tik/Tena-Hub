/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neu-base': '#e0e5ec',
        'neu-dark': '#a3b1c6',
        'neu-light': '#ffffff',
        'dark-neu-base': '#1a1a1a',
        'dark-neu-dark': '#0d0d0d',
        'dark-neu-light': '#2d2d2d',
        // Tremor color overrides
        tremor: {
          brand: {
            faint: '#eff6ff',  // blue-50
            muted: '#bfdbfe',  // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff', // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151', // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff', // white
          },
        },
      },
      boxShadow: {
        'neu-flat': '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)',
        'neu-pressed': 'inset 9px 9px 16px rgb(163,177,198,0.6), inset -9px -9px 16px rgba(255,255,255, 0.5)',
        'neu-flat-sm': '5px 5px 10px rgb(163,177,198,0.6), -5px -5px 10px rgba(255,255,255, 0.5)',
        'neu-pressed-sm': 'inset 5px 5px 10px rgb(163,177,198,0.6), inset -5px -5px 10px rgba(255,255,255, 0.5)',
        'dark-neu-flat': '9px 9px 16px rgba(0,0,0,0.6), -9px -9px 16px rgba(45,45,45,0.5)',
        'dark-neu-pressed': 'inset 9px 9px 16px rgba(0,0,0,0.6), inset -9px -9px 16px rgba(45,45,45,0.5)',
        'dark-neu-flat-sm': '5px 5px 10px rgba(0,0,0,0.6), -5px -5px 10px rgba(45,45,45,0.5)',
        'dark-neu-pressed-sm': 'inset 5px 5px 10px rgba(0,0,0,0.6), inset -5px -5px 10px rgba(45,45,45,0.5)',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}