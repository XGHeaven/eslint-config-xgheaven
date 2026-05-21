const xg = require('.')

module.exports = [
  ...xg,
  {
    ignores: ['node_modules/**', 'playground/**', 'docs/**', 'pnpm-lock.yaml'],
  },
]
