module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['@tanstack/query'],
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
};
