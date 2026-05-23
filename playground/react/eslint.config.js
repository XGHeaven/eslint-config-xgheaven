const xg = require('../..')

module.exports = [
  ...xg({ ts: true, react: true }),
  {
    ignores: ['node_modules/**'],
  },
]
