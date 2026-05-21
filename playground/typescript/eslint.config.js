const xg = require('../..')
const ts = require('../../typescript')

module.exports = [
  ...xg,
  ...ts,
  {
    ignores: ['node_modules/**'],
  },
]
