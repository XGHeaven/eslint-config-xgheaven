const xconfig = require('.')

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'playground/**', 'docs/**', 'pnpm-lock.yaml'],
  },
  ...xconfig({ ts: true }),
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
