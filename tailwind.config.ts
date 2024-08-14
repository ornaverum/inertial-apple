import flowbitePlugin from 'flowbite/plugin'

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', 
				'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
				'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
	],
  darkMode: 'selector',
	theme: {
		extend: {
      colors: {
		"primary": {
			"50": "#f1f9fe",
			"100": "#e2f2fc",
			"200": "#bfe3f8",
			"300": "#86cff3",
			"400": "#58bdec",
			"500": "#1e9dd9",
			"600": "#107db9",
			"700": "#0f6595",
			"800": "#10557c",
			"900": "#134767",
			"950": "#0d2d44"
			},
			"secondary": {
			"50": "#fef5fe",
			"100": "#fdeafd",
			"200": "#fad4f9",
			"300": "#f5b2f1",
			"400": "#ef8ae8",
			"500": "#e154d8",
			"600": "#c435b6",
			"700": "#a32895",
			"800": "#852378",
			"900": "#6d2262",
			"950": "#480a3f"
			},
			"accent": "#e85997"
      }
    }
	},

	plugins: [flowbitePlugin]
} as Config;