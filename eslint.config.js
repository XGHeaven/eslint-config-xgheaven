const xg = require('.')
const ts = require('./dist/typescript')

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'playground/**', 'docs/**', 'pnpm-lock.yaml'],
  },
  ...xg,
  ...ts,
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
