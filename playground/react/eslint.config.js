const xg = require('../..')
const ts = require('../../typescript')
const react = require('../../react')

module.exports = [
  ...xg,
  ...ts,
  ...react,
  {
    ignores: ['node_modules/**'],
  },
]
