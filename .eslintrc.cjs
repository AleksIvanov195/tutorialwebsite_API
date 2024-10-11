module.exports = {
	'env': {
		'node': true,
		'es6': true, // Enable ES6 features
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 2015, // Specifically targeting ES6 (or 2021 for latest features)
		'sourceType': 'module', // Enable ES6 module support (import/export)
	},
	'rules': {
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'comma-dangle': ['error', 'always-multiline'],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'curly': ['error', 'multi-line', 'consistent'],
		'dot-location': ['error', 'property'],
		'handle-callback-err': 'off',
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'max-nested-callbacks': ['error', { 'max': 6 }],
		'max-statements-per-line': ['error', { 'max': 2 }],
		'no-console': 'off',
		'no-empty-function': 'error',
		'no-floating-decimal': 'error',
		'no-inline-comments': 'error',
		'no-lonely-if': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
		'no-shadow': ['error', { 'allow': ['err', 'resolve', 'reject'] }],
		'no-trailing-spaces': ['error'],
		'no-var': 'error', // ES6: Disallow `var` to encourage `let`/`const`
		'object-curly-spacing': ['error', 'always'],
		'prefer-const': 'error', // ES6: Encourage use of `const` where applicable
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'space-before-blocks': 'error',
		'space-before-function-paren': ['error', {
			'anonymous': 'never',
			'named': 'never',
			'asyncArrow': 'always',
		}],
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': 'error',
		'yoda': 'error',
		'arrow-spacing': ['error', { 'before': true, 'after': true }], // ES6: Enforce spacing around arrow functions
		'no-duplicate-imports': 'error', // ES6: Disallow duplicate imports
		'no-useless-constructor': 'error', // ES6: Disallow unnecessary constructor
		'prefer-rest-params': 'error', // ES6: Encourage use of rest parameters (`...args`)
		'prefer-spread': 'error', // ES6: Use spread operator (`...`) over `apply()`
	},
};
