/**
 * Project-specific rules layered on top of neostandard.
 * Keep this file small: rules already covered by neostandard or eslint-config-prettier
 * should not be repeated here.
 */
module.exports = {
  // stricter / different from neostandard
  'no-label-var': 'error',
  'no-redeclare': ['error', { builtinGlobals: true }],
  'no-var': 'error',
  'prefer-promise-reject-errors': 'off',

  // style preferences not handled by Prettier
  camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'spaced-comment': ['error', 'always', { line: { markers: ['*package'] }, block: { balanced: true } }],
}
