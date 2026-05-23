const xconfig = require('../..')

module.exports = [
  ...xconfig(),
  {
    ignores: ['node_modules/**'],
  },
]
