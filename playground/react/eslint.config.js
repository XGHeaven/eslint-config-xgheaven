const xg = require('../..')
const ts = require('../../dist/typescript')
const react = require('../../dist/react')

module.exports = [
  ...xg,
  ...ts,
  ...react,
  {
    ignores: ['node_modules/**'],
  },
]
