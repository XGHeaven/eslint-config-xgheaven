/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // Most of rules are unnecessary since typescript
    'no-unused-expressions': 'off', // typescript builtin support
    'promise/param-names': 'off',
    'standard/no-callback-literal': 'off',
  },
}
