const xg = require('../..')
const ts = require('../../dist/typescript')

module.exports = [
  ...xg,
  ...ts,
  {
    ignores: ['node_modules/**'],
  },
]
