const neostandard = require('neostandard')
const importPlugin = require('eslint-plugin-import')
const nPlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const prettierPlugin = require('eslint-plugin-prettier')
const eslintConfigPrettier = require('eslint-config-prettier/flat')
const prettierOptions = require('./prettier-options')

const baseRules = require('./rules/base')
const importRules = require('./rules/import')
const nodeRules = require('./rules/node')
const promiseRules = require('./rules/promise')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...neostandard({
    env: ['node', 'browser'],
    noStyle: true,
  }),
  {
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      ...importRules,
      ...nodeRules,
      ...promiseRules,
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      'prettier/prettier': ['warn', prettierOptions],
    },
  },
]
