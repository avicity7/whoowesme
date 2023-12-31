/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      fontFamily: {
        albert: ['Albert Sans Variable']
      }
    },
  },
}

