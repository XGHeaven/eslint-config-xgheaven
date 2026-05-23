const xg = require('.')

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'playground/**', 'docs/**', 'pnpm-lock.yaml'],
  },
  ...xg({ ts: true }),
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
