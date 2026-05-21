/** import plugin — module resolution and import/export hygiene */
module.exports = {
  'import/export': 'error',
  'import/first': 'error',
  'import/no-absolute-path': ['error', { commonjs: false, amd: false }],
  'import/no-duplicates': 'error',
  'import/no-named-default': 'error',
  'import/no-webpack-loader-syntax': 'error',
}
