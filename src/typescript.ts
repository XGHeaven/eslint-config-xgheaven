const tseslint = require('typescript-eslint')

const tsFiles = ['**/*.{ts,tsx,mts,cts}']

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...tseslint.configs.recommended.map((config: Record<string, unknown>) => ({
    files: tsFiles,
    ...config,
  })),
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-unused-expressions': 'off',
      'promise/param-names': 'off',
      'n/no-callback-literal': 'off',
    },
  },
]
