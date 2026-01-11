/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2021,
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/nodes',
	],
	env: {
		node: true,
		es2021: true,
		jest: true,
	},
	ignorePatterns: ['dist/', 'node_modules/', '*.js', '!.eslintrc.js', 'test/'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'prefer-const': 'error',
		'no-var': 'error',
		'eqeqeq': ['error', 'always'],
		'curly': 'off',
		// n8n specific rules
		'n8n-nodes-base/node-param-description-missing-final-period': 'off',
		'n8n-nodes-base/node-param-description-wrong-for-return-all': 'off',
		'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-type-options-max-value-present': 'off',
		'n8n-nodes-base/node-param-operation-option-action-miscased': 'off',
	},
};
