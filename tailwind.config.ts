import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'notif-red': '#EA5858',
        'surface-strokes': '#EBEDF0',
        'surface-gray-10': '#F4F7FA',
        // texts
        primary: '#222222',
        secondary: '#726E7D',
        terciary: '#BABDD5',
        link: '#BABDD5',
        destructive: '#FF0000',
        white: '#FFFFFF',
        blue: '#0038FF',
        black: '#000000',
        'button-primary': '#0038FF',
        'button-primary-hover': '#002CC9',
        'button-primary-pressed': '#001E88',
        'button-primary-disabled': '#F1F4F6',
        'button-secondary': '#E9EBF1',
        'button-secondary-hover': '#D6D9E5',
        'button-secondary-pressed': '#A9AEC4',
        'button-disabled': '#F1F4F6',
        'button-dark': '#222222',
        'tertiary-input': '#898CA8'
      },
      fontSize: {
        /**
         * font-size: 12px;
         * font-weight: 467;
         * line-height: 18px;
         * */
        'body-s': [
          '12px',
          {
            fontWeight: '467',
            lineHeight: '18px'
          }
        ]
      }
    }
  },
  plugins: []
}
export default config
