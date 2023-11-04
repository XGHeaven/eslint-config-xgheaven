/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',

    // Most of rules are unnecessary since typescript
    'no-unused-expressions': 'off', // typescript builtin support
    'promise/param-names': 'off',
    'standard/no-callback-literal': 'off',
  },
}
