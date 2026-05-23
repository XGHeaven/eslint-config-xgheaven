const xg = require('../..')

module.exports = [
  ...xg({ ts: true }),
  {
    ignores: ['node_modules/**'],
  },
]
