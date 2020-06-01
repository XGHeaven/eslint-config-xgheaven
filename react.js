/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          '/^(handle|on).+$/',
          '/^render.+$/',
          'render',
        ],
      },
    ],
    'react/no-unsafe': ['error', { checkAliases: true }],
  },
}
