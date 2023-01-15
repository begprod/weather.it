module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false,
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"body": ["Comfortaa", "sans-serif"],
			}
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
	plugins: [],
}
