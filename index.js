module.exports = {
  extends: ['eslint:standard'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': ['error', {
      'ignoreComments': true
    }]
  }
}
