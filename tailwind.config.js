/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'exoset': {
          'blue': '#091EFF',
          'pink': '#FF28B0', 
          'cyan': '#1FFFE5'
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'exoset-gradient': 'linear-gradient(135deg, #091EFF 0%, #FF28B0 100%)',
        'exoset-gradient-hover': 'linear-gradient(135deg, #0818E6 0%, #E6239E 100%)',
      },
    },
  },
  plugins: [],
}

