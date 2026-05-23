const xconfig = require('../..')

module.exports = [
  ...xconfig({ ts: true }),
  {
    ignores: ['node_modules/**'],
  },
]
