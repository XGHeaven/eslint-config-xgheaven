const xg = require('../..')

module.exports = [
  ...xg(),
  {
    ignores: ['node_modules/**'],
  },
]
