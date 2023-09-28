/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
			spacing:{
        '320' : '300px',
        '480': '480px',
				'640': '620px',
				'768': '728px',
				'1024': '984px',
				'1280': '1240px',
			},
    },
    screens:{
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
		}
  },
  plugins: [],
}
