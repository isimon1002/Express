module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"mocha": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true
		},
		"sourceType": "module"
	},
	"plugins": ["react"],
	"rules": {
		"space-before-blocks": "error",
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "always",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"max-len": [
			"error",
			500
		],
		"no-console": [
			"error",
			{ "allow": ["warn", "error", "info"] }
		],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"no-unused-vars": 1
	}
};