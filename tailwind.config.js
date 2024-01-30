/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500'
  ],
  theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)']
        },
        colors: {
          "dark-100": "#676767",
          "dark-200": "#606060",
          "dark-300": "#575757",
          "dark-400": "#505050",
          "dark-500": "#474747",
          "dark-600": "#404040",
          "dark-700": "#373737",
          "dark-800": "#303030",
          "dark-900": "#272727",
          "light-100": "#F7F7F7",
          "light-200": "#F0F0F0",
          "light-300": "#D7D7D7",
          "light-400": "#D0D0D0",
          "light-500": "#C7C7C7",
          "light-600": "#C0C0C0",
          "light-700": "#B7B7B7",
          "light-800": "#B0B0B0",
          "light-900": "#A7A7A7",
          "primary": "#9E3ED5",
          "secondary": "#950EE3",
          "modal": "rgba(0, 0, 0, .7)",
          "glass-dark": "rgba(55, 55, 55, .6)",
          "glass-light": "rgba(247, 247, 247, .6)",
          "glass-purple-l1": "rgba(158, 62, 213, .8)",
          "glass-purple-l2": "rgba(158, 62, 213, .7)",
          "glass-purple-d1": "rgba(158, 62, 213, .3)",
          "glass-purple-d2": "rgba(158, 62, 213, .2)",
        },
        boxShadow: {
          'full': '0 0 18px rgba(0, 0, 0, 0.3)',
          'menu': '0 0 30px rgb(126, 0, 206)'
        },
        keyframes: {
            shake: {
              '0%, 100%': { transform: 'translateX(0)' },
              '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
              '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
            }
        },
        animation: {
            shake: 'shake .9s forwards ease-in-out',
        },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
}