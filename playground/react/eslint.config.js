const xconfig = require('../..')

module.exports = [
  ...xconfig({ ts: true, react: true }),
  {
    ignores: ['node_modules/**'],
  },
]
