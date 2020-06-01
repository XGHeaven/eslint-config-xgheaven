/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],

  plugins: ['import', 'node', 'prettier'],

  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
      },
    ],
  },
}
