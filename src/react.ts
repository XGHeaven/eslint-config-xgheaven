const reactPlugin = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const globals = require('globals')

const reactHooksRecommended = reactHooks.configs.flat?.recommended?.rules ?? reactHooks.configs.recommended.rules

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksRecommended,
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            'everything-else',
            '/^(handle|on).+$/',
            '/^render.+$/',
            'render',
          ],
        },
      ],
      'react/no-unsafe': ['error', { checkAliases: true }],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
